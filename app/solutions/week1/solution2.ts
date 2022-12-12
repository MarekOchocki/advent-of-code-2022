import * as fs from 'fs';

enum Result {
    WIN = 'win',
    DRAW = 'draw',
    LOSE = 'lose'
}

enum Choice {
    ROCK = 'rock',
    PAPER = 'paper',
    SCISSORS = 'scissors'
}

class Relation {
    constructor(public choice1: Choice, public choice2: Choice, public result: Result) {}
}

const relations = [
    new Relation(Choice.ROCK, Choice.PAPER, Result.LOSE),
    new Relation(Choice.ROCK, Choice.SCISSORS, Result.WIN),
    new Relation(Choice.SCISSORS, Choice.PAPER, Result.WIN),
    new Relation(Choice.SCISSORS, Choice.ROCK, Result.LOSE),
    new Relation(Choice.PAPER, Choice.SCISSORS, Result.LOSE),
    new Relation(Choice.PAPER, Choice.ROCK, Result.WIN)
];

function getRoundResult(yourChoice: Choice, elfChoice: Choice): Result {
    if(elfChoice === yourChoice) return Result.DRAW;
    const relation = relations.find(relation => {
        return relation.choice1 === yourChoice && relation.choice2 === elfChoice;
    });
    if(relation === undefined) {throw 'someone fucked up with relations array';}
    return relation.result;
}

function getYourChoiceBasedOnResult(result: Result, elfChoice: Choice): Choice {
    if(result === Result.DRAW) return elfChoice;
    const relation = relations.find(relation => {
        return relation.result === result && relation.choice2 === elfChoice;
    });
    if(relation === undefined) {throw 'someone fucked up with relations array';}
    return relation.choice1;
}

function elfChoiceToEnum(elfChoice: string): Choice {
    if(elfChoice === 'A') return Choice.ROCK;
    if(elfChoice === 'B') return Choice.PAPER;
    return Choice.SCISSORS;
}

function yourChoiceToEnum(yourChoice: string): Choice {
    if(yourChoice === 'X') return Choice.ROCK;
    if(yourChoice === 'Y') return Choice.PAPER;
    return Choice.SCISSORS;
}

function yourChoiceToScore(choice: Choice): number {
    if(choice === Choice.ROCK) return 1;
    if(choice === Choice.PAPER) return 2;
    return 3;
}

function resultToScore(result: Result): number {
    if(result === Result.WIN) return 6;
    if(result === Result.DRAW) return 3;
    return 0;
}

function noteToResult(note: string): Result {
    if(note === 'X') return Result.LOSE;
    if(note === 'Y') return Result.DRAW;
    return Result.WIN;
}

function printSolution2Part1() {
    const inputContent = fs.readFileSync('./app/res/week1/input2.txt').toString();
    let score = 0;
    inputContent.split('\n').forEach(line => {
        const elfChoice = elfChoiceToEnum(line.split(' ')[0]);
        const yourChoice = yourChoiceToEnum(line.split(' ')[1]);
        const result = getRoundResult(yourChoice, elfChoice);
        score += yourChoiceToScore(yourChoice) + resultToScore(result);
    });
    console.log(score);
}

function printSolution2Part2() {
    const inputContent = fs.readFileSync('./app/res/week1/input2.txt').toString();
    let score = 0;
    inputContent.split('\n').forEach(line => {
        const elfChoice = elfChoiceToEnum(line.split(' ')[0]);
        const result = noteToResult(line.split(' ')[1]);
        const yourChoice = getYourChoiceBasedOnResult(result, elfChoice);
        score += yourChoiceToScore(yourChoice) + resultToScore(result);
    });
    console.log(score);
}

export function printSolutions2() {
    printSolution2Part1();
    printSolution2Part2();
}
