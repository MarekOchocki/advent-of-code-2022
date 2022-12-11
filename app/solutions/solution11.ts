import * as fs from 'fs';

class MonkeyOperation {
    private isMultiply = false;
    private useOldAsSecondArg = false;
    private secondArg = 0;

    public constructor(operationLine: string) {
        const parts = operationLine.split('Operation: new = old ')[1].split(' ');
        this.isMultiply = parts[0] === '*';
        this.useOldAsSecondArg = parts[1] === 'old';
        this.secondArg = this.useOldAsSecondArg ? 0 : Number.parseInt(parts[1]);
    }

    public apply(old: number): number {
        this.secondArg = this.useOldAsSecondArg ? old : this.secondArg;
        if(this.isMultiply)
            return old * this.secondArg;
        return old + this.secondArg;
    }
}

class Monkey {
    public items: number[];
    public operation: MonkeyOperation;
    public testDivisor: number;
    public destMonkeyIfTrue: number;
    public destMonkeyIfFalse: number;
    public inspectTimes = 0;

    public constructor(monkeyDescription: string) {
        const lines = monkeyDescription.split('\n');
        this.items = lines[1].split('Starting items: ')[1].split(', ').map(v => Number.parseInt(v));
        this.operation = new MonkeyOperation(lines[2]);
        this.testDivisor = Number.parseInt(lines[3].split('Test: divisible by ')[1]);
        this.destMonkeyIfTrue = Number.parseInt(lines[4].split('If true: throw to monkey ')[1]);
        this.destMonkeyIfFalse = Number.parseInt(lines[5].split('If false: throw to monkey ')[1]);
    }

    public makeTurn(monkeys: Monkey[]): void {
        while(this.items.length > 0) {
            this.inspectTimes++;
            let item = this.items[0];
            this.items = this.items.slice(1);
            item = Math.floor(this.operation.apply(item) / 3);
            if(item % this.testDivisor === 0) {
                monkeys[this.destMonkeyIfTrue].items.push(item);
            } else {
                monkeys[this.destMonkeyIfFalse].items.push(item);
            }
        }
    }
    
    public makeTurnWithBigNumbers(monkeys: Monkey[]): void {
        while(this.items.length > 0) {
            this.inspectTimes++;
            let item = this.items[0];
            this.items = this.items.slice(1);
            item = this.operation.apply(item);
            item = item % 9699690; // multiplied first 8 prime numbers
            if(item % this.testDivisor === 0) {
                monkeys[this.destMonkeyIfTrue].items.push(item);
            } else {
                monkeys[this.destMonkeyIfFalse].items.push(item);
            }
        }
    }
}

export function printSolution11() {
    const inputContent = fs.readFileSync('./app/res/input11.txt').toString();
    const monkeys = inputContent.split('Monkey').slice(1).map(desc => new Monkey(desc));
    for(let i = 0; i < 20; i++) {
        monkeys.forEach(m => m.makeTurn(monkeys));
    }
    monkeys.sort((a, b) => b.inspectTimes - a.inspectTimes);
    console.log(monkeys[0].inspectTimes * monkeys[1].inspectTimes);
}

export function printSolution11_2() {
    const inputContent = fs.readFileSync('./app/res/input11.txt').toString();
    const monkeys = inputContent.split('Monkey').slice(1).map(desc => new Monkey(desc));
    for(let i = 0; i < 10000; i++) {
        monkeys.forEach(m => m.makeTurnWithBigNumbers(monkeys));
    }
    monkeys.sort((a, b) => b.inspectTimes - a.inspectTimes);
    console.log(monkeys[0].inspectTimes * monkeys[1].inspectTimes);
}