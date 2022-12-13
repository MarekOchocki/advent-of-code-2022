import * as fs from 'fs';

enum ComparisonResult {
    RIGHT_ORDER,
    THE_SAME,
    NOT_RIGHT_ORDER
}

type SignalList = (SignalList | number)[];

function isANumber(signal: SignalList | number): signal is number {
    return typeof signal === "number";
}

function pairStringToLists(pairString: string): SignalList[] {
    const result: SignalList[] = [];
    result.push(eval(pairString.split('\n')[0]) as SignalList);
    result.push(eval(pairString.split('\n')[1]) as SignalList);
    return result;
}

function compareSignals(signal1: SignalList, signal2: SignalList): ComparisonResult {
    for(let i = 0; true; i++) {
        let item1 = signal1[i];
        let item2 = signal2[i];
        if(item1 === undefined && item2 === undefined) return ComparisonResult.THE_SAME;
        if(item1 === undefined) return ComparisonResult.RIGHT_ORDER;
        if(item2 === undefined) return ComparisonResult.NOT_RIGHT_ORDER;
        if(isANumber(item1) && isANumber(item2)) {
            if(item1 === item2) continue;
            return item1 < item2 ? ComparisonResult.RIGHT_ORDER : ComparisonResult.NOT_RIGHT_ORDER;
        }
        if(!isANumber(item1) && !isANumber(item2)) {
            const itemCompResult = compareSignals(item1, item2);
            if(itemCompResult !== ComparisonResult.THE_SAME) return itemCompResult;
            continue;
        }
        if(isANumber(item1)) item1 = [item1];
        if(isANumber(item2)) item2 = [item2];
        const itemCompResult = compareSignals(item1, item2);
        if(itemCompResult !== ComparisonResult.THE_SAME) return itemCompResult;
    }
}

function comparisonResultToDiffNumber(result: ComparisonResult): number {
    return result - 1;
}

function printSolution13Part1() {
    const inputContent = fs.readFileSync('./app/res/week2/input13.txt').toString();
    const pairsString = inputContent.split('\n\n');
    const pairsSignal = pairsString.map(s => pairStringToLists(s));
    let sum = 0;
    pairsSignal.forEach((pair, index) => {
        if(compareSignals(pair[0], pair[1]) === ComparisonResult.RIGHT_ORDER) {
            sum += index + 1;
        }
    });
    console.log(sum);
}

function printSolution13Part2() {
    const inputContent = fs.readFileSync('./app/res/week2/input13.txt').toString();
    const pairsString = inputContent.split('\n\n');
    const signals = pairsString.flatMap(s => pairStringToLists(s));
    signals.push([[2]]);
    signals.push([[6]]);
    signals.sort((a, b) => comparisonResultToDiffNumber(compareSignals(a, b)));
    const indexDivider1 = 1 + signals.findIndex(s => {
        return s.length == 1 && !isANumber(s[0]) && s[0].length === 1 && isANumber(s[0][0]) && s[0][0] === 2;
    });
    const indexDivider2 = 1 + signals.findIndex(s => {
        return s.length == 1 && !isANumber(s[0]) && s[0].length === 1 && isANumber(s[0][0]) && s[0][0] === 6;
    });
    console.log(indexDivider1 * indexDivider2);
}

export function printSolutions13() {
    printSolution13Part1();
    printSolution13Part2();
}
