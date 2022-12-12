import { printSolutions1 } from './week1/solution1';
import { printSolutions2 } from './week1/solution2';
import { printSolutions3 } from './week1/solution3';
import { printSolutions4 } from './week1/solution4';
import { printSolutions5 } from './week1/solution5';
import { printSolutions6 } from './week1/solution6';
import { printSolutions7 } from './week1/solution7';
import { printSolutions8 } from './week2/solution8';
import { printSolutions9 } from './week2/solution9';
import { printSolutions10 } from './week2/solution10';
import { printSolutions11 } from './week2/solution11';

function printSolution(day: number, solution: () => void): void {
    console.log(`\nDay ${day}`);
    solution();
}

export function printWeek1Solutions() {
    let day = 1;
    printSolution(day, printSolutions1); day++;
    printSolution(day, printSolutions2); day++;
    printSolution(day, printSolutions3); day++;
    printSolution(day, printSolutions4); day++;
    printSolution(day, printSolutions5); day++;
    printSolution(day, printSolutions6); day++;
    printSolution(day, printSolutions7); day++;
}

export function printWeek2Solutions() {
    let day = 8;
    printSolution(day, printSolutions8); day++;
    printSolution(day, printSolutions9); day++;
    printSolution(day, printSolutions10); day++;
    printSolution(day, printSolutions11); day++;
}

export function printAllSolutions() {
    printWeek1Solutions();
    printWeek2Solutions();
}