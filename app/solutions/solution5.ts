import * as fs from 'fs';

class Stack {
    private boxes: string[] = [];

    public addBox(boxLetter: string): void {
        this.boxes.push(boxLetter);
    }

    public popBox(): string {
        const box = this.boxes.pop();
        if(box === undefined) throw 'tried to get box from empty stack';
        return box;
    }

    public moveNBoxesTo(n: number, destination: Stack): void {
        for(let i = 0; i < n; i++) {
            destination.addBox(this.popBox());
        }
    }
    
    public moveNBoxesTo9001(n: number, destination: Stack): void {
        const boxesToMove: string [] = [];
        for(let i = 0; i < n; i++) {
            boxesToMove.push(this.popBox());
        }
        for(let i = boxesToMove.length - 1; i >= 0; i--) {
            destination.addBox(boxesToMove[i]);
        }
    }
}

class MoveInstruction {
    public numberOfBoxes;
    public indexOfSource;
    public indexOfDestination;

    public constructor(instructionLine: string) {
        this.numberOfBoxes = Number.parseInt(instructionLine.split('move ')[1].split(' from ')[0]);
        const instructionPart2 = instructionLine.split('move ')[1].split(' from ')[1];
        this.indexOfSource = Number.parseInt(instructionPart2.split(' to ')[0]) - 1 ;
        this.indexOfDestination = Number.parseInt(instructionPart2.split(' to ')[1]) - 1;
    }
}

function createStacks(lines: string[]): Stack[] {
    const stacks: Stack[] = [];
    const numberOfStacks = (lines[0].length + 1) / 4;
    for(let i = 0; i < numberOfStacks; i++) {
        stacks.push(new Stack());
    }

    const highestStackNumberOfBoxes = lines.findIndex(line => line.startsWith(' 1'));

    for(let i = highestStackNumberOfBoxes - 1; i >= 0; i--) {
        for(let j = 0; j < numberOfStacks; j++) {
            const boxLetter = lines[i][1 + j*4];
            if(boxLetter !== ' ') {
                stacks[j].addBox(lines[i][1 + j*4]);
            }
        }
    }

    return stacks;
}

export function solution5() {
    const inputContent = fs.readFileSync('./app/res/input5.txt').toString();
    
    const lines = inputContent.split('\n');
    const stacks = createStacks(lines);
    const firstLineWithMovementIndex = lines.findIndex(line => line.startsWith('move '));
    for(let i = firstLineWithMovementIndex; i < lines.length; i++) {
        const instruction = new MoveInstruction(lines[i]);
        stacks[instruction.indexOfSource].moveNBoxesTo(instruction.numberOfBoxes, stacks[instruction.indexOfDestination]);
    }

    const topBoxesList = stacks.map(stack => stack.popBox());
    const topBoxesString = topBoxesList.reduce((p, c) => p + c, '');
    console.log(topBoxesString);
}

export function solution5_2() {
    const inputContent = fs.readFileSync('./app/res/input5.txt').toString();
    
    const lines = inputContent.split('\n');
    const stacks = createStacks(lines);
    const firstLineWithMovementIndex = lines.findIndex(line => line.startsWith('move '));
    for(let i = firstLineWithMovementIndex; i < lines.length; i++) {
        const instruction = new MoveInstruction(lines[i]);
        stacks[instruction.indexOfSource].moveNBoxesTo9001(instruction.numberOfBoxes, stacks[instruction.indexOfDestination]);
    }

    const topBoxesList = stacks.map(stack => stack.popBox());
    const topBoxesString = topBoxesList.reduce((p, c) => p + c, '');
    console.log(topBoxesString);
}
