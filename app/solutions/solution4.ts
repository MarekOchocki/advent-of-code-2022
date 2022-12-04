import * as fs from 'fs';

class Range {
    public low: number;
    public high: number;
    
    constructor(rangeString: string) {
        this.low = Number.parseInt(rangeString.split('-')[0]);
        this.high = Number.parseInt(rangeString.split('-')[1]);
    }

    public includes(other: Range): boolean {
        return other.low >= this.low && other.high <= this.high;
    }

    public overlaps(other: Range): boolean {
        return this.isNumberInRange(other.low) || this.isNumberInRange(other.high) || other.includes(this);
    }

    private isNumberInRange(number: number): boolean {
        return number >= this.low && number <= this.high;
    }
}

class RangePair {
    public first: Range;
    public second: Range;

    constructor(line: string) {
        this.first = new Range(line.split(',')[0]);
        this.second = new Range(line.split(',')[1]);
    }

    doesOnePairIncludeTheOther(): boolean {
        return this.first.includes(this.second) || this.second.includes(this.first);
    }

    doPairsOverlap(): boolean {
        return this.first.overlaps(this.second);
    }
}

export function solution4() {
    const inputContent = fs.readFileSync('./app/res/input4.txt').toString();
    const lines = inputContent.split('\n');
    const result = lines.reduce((sum, line) => sum + (new RangePair(line).doesOnePairIncludeTheOther() ? 1 : 0), 0);
    console.log(result);
}

export function solution4_2() {
    const inputContent = fs.readFileSync('./app/res/input4.txt').toString();
    const lines = inputContent.split('\n');
    const result = lines.reduce((sum, line) => sum + (new RangePair(line).doPairsOverlap() ? 1 : 0), 0);
    console.log(result);
}
