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

function performLine(line: string, visitedPositions: number[][], headPos: number[], tailPos: number[]): void {
    const direction = line.split(' ')[0];
    const movesCount = Number.parseInt(line.split(' ')[1]);
    for(let i = 0; i < movesCount; i++) {
        if(direction === "R") {
            headPos[0]++;
        }
        if(direction === "U") {
            headPos[1]--;
        }
        if(direction === "L") {
            headPos[0]--;
        }
        if(direction === "D") {
            headPos[1]++;
        }
        moveTail(headPos, tailPos);
        visitPosition(tailPos, visitedPositions);
    }
}

function performLine2(line: string, visitedPositions: number[][], linePos: number[][]): void {
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
        for(let i = 0; i < 9; i++) {
            moveTail(linePos[i], linePos[i + 1]);
        }
        visitPosition(linePos[9], visitedPositions);
    }
}

export function printSolution9() {
    const input = fs.readFileSync('./app/res/input9.txt').toString();
    const visitedPositions: number[][] = [[0, 0]];
    const headPos: number[] = [0, 0];
    const tailPos: number[] = [0, 0];
    input.split('\n').forEach(line => performLine(line, visitedPositions, headPos, tailPos));
    console.log(visitedPositions.length);
}

export function printSolution9_2() {
    const input = fs.readFileSync('./app/res/input9.txt').toString();
    const visitedPositions: number[][] = [[0, 0]];
    const linePos: number[][] = [];
    for(let i = 0; i < 10; i++)
        linePos.push([0, 0]);
    input.split('\n').forEach(line => performLine2(line, visitedPositions, linePos));
    console.log(visitedPositions.length);
}