import * as fs from 'fs';

function visitPosition(position: number[], visitedPositions: number[][]): void {
    if(visitedPositions.find(pos => pos[0] === position[0] && pos[1] === position[1])) return;
    visitedPositions.push([...position]);
}

function moveTail(headPos: number[], tailPos: number[]): void {
    const distance = Math.abs(headPos[0] - tailPos[0]) + Math.abs(headPos[1] - tailPos[1]);
    if(distance === 2) {
        if(headPos[0] > tailPos[0] + 1) {
            tailPos[0]++;
        } else if(headPos[0] < tailPos[0] - 1) {
            tailPos[0]--;
        }
        if(headPos[1] > tailPos[1] + 1) {
            tailPos[1]++;
        } else if(headPos[1] < tailPos[1] - 1) {
            tailPos[1]--;
        }
    }
    if(distance > 2) {
        if(headPos[0] > tailPos[0]) {
            tailPos[0]++;
        } else if(headPos[0] < tailPos[0]) {
            tailPos[0]--;
        }
        if(headPos[1] > tailPos[1]) {
            tailPos[1]++;
        } else if(headPos[1] < tailPos[1]) {
            tailPos[1]--;
        }
    }
}

function performLine(line: string, visitedPositions: number[][], linePos: number[][]): void {
    const direction = line.split(' ')[0];
    const movesCount = Number.parseInt(line.split(' ')[1]);
    for(let i = 0; i < movesCount; i++) {
        if(direction === "R") {
            linePos[0][0]++;
        }
        if(direction === "U") {
            linePos[0][1]--;
        }
        if(direction === "L") {
            linePos[0][0]--;
        }
        if(direction === "D") {
            linePos[0][1]++;
        }
        for(let i = 0; i < linePos.length - 1; i++) {
            moveTail(linePos[i], linePos[i + 1]);
        }
        visitPosition(linePos[linePos.length - 1], visitedPositions);
    }
}

function printSolutionForLine(length: number): void {
    const input = fs.readFileSync('./app/res/week2/input9.txt').toString();
    const visitedPositions: number[][] = [[0, 0]];
    const linePos: number[][] = [];
    for(let i = 0; i < length; i++)
        linePos.push([0, 0]);
    input.split('\n').forEach(line => performLine(line, visitedPositions, linePos));
    console.log(visitedPositions.length);
}

function printSolution9Part1() {
    printSolutionForLine(2);
}

function printSolution9Part2() {
    printSolutionForLine(10);
}

export function printSolutions9() {
    printSolution9Part1();
    printSolution9Part2();
}
