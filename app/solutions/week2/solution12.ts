import * as fs from 'fs';

class Vector2 {
    public x = 0;
    public y = 0;

    public constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    public equals(vec: Vector2): boolean {
        return vec.x === this.x && vec.y === this.y;
    }
}

class Grid {
    public elements: GridElement[][] = [];
    public startPosition = new Vector2();
    public endPosition = new Vector2();

    public constructor() {
        const inputContent = fs.readFileSync('./app/res/week2/input12.txt').toString();
        const lines = inputContent.split('\n');
        const sizeX = lines[0].length;
        const sizeY = lines.length;
        for(let i = 0; i < sizeY; i++) {
            this.elements.push([]);
            for(let j = 0; j < sizeX; j++) {
                this.elements[i].push(new GridElement(lines[i][j]));
                if(lines[i][j] === 'S') this.startPosition = new Vector2(j, i);
                if(lines[i][j] === 'E') this.endPosition = new Vector2(j, i);
            }
        }
    }

    public getNumberOfStepsInShortestPath(): number {
        return this.foo(this.startPosition, (pos) => pos.equals(this.endPosition),
            (pos: Vector2, nPos: Vector2) => this.isReachable(pos, nPos)
        );
    }

    public getNumberOfStepsInShortestPathReversed(): number {
        return this.foo(this.endPosition, (pos) => this.elements[pos.y][pos.x].height === 0,
            (pos: Vector2, nPos: Vector2) => this.isReachable(nPos, pos)
        );
    }

    private foo(from: Vector2, isDestination: (p: Vector2) => boolean, isNeighbourReachable: (pos: Vector2, nPos: Vector2) => boolean): number {
        let elementsToCheck: Vector2[] = [from];
        let nextElementsToCheck: Vector2[] = [];

        for(let steps = 0; steps < 10000; steps++) {
            for(const pos of elementsToCheck) {
                if(isDestination(pos)) {
                    return steps;
                }
                nextElementsToCheck.push(...this.findReachablePositions(pos, isNeighbourReachable));
            }
            elementsToCheck = nextElementsToCheck;
            nextElementsToCheck = [];
        }
        throw "Infinite loop";
    }

    private findReachablePositions(from: Vector2, isNeighbourReachable: (pos: Vector2, nPos: Vector2) => boolean): Vector2[] {
        const neighbours = this.getNeighbours(from);
        const reachablePositions = neighbours.filter(currentPos => {
            return this.isValidPosition(currentPos) && isNeighbourReachable(from, currentPos) && this.isNotVisited(currentPos);
        });
        reachablePositions.forEach(p => this.getElement(p).isVisited = true);
        return reachablePositions;
    }

    private getNeighbours(pos: Vector2): Vector2[] {
        return [
            new Vector2(pos.x - 1, pos.y),
            new Vector2(pos.x + 1, pos.y),
            new Vector2(pos.x, pos.y - 1),
            new Vector2(pos.x, pos.y + 1)
        ];
    }

    private isReachable(from: Vector2, to: Vector2): boolean {
        return this.elements[from.y][from.x].height >= this.elements[to.y][to.x].height - 1;
    }

    private isNotVisited(pos: Vector2): boolean {
        return !this.elements[pos.y][pos.x].isVisited;
    }

    private getElement(pos: Vector2): GridElement {
        return this.elements[pos.y][pos.x];
    }

    private isValidPosition(pos: Vector2): boolean {
        return pos.x >= 0 && pos.x < this.elements[0].length && pos.y >= 0 && pos.y < this.elements.length;
    }
}

class GridElement {
    public isVisited = false;
    public height = 0;
    public elevationLetter = '';

    public constructor(gridLetter: string) {
        this.elevationLetter = gridLetter
        if(gridLetter === 'S') this.elevationLetter = 'a';
        if(gridLetter === 'E') this.elevationLetter = 'z';
        this.height = this.elevationLetter.charCodeAt(0) - 'a'.charCodeAt(0);
    }
}


function printSolution12Part1() {
    const grid = new Grid();
    console.log(grid.getNumberOfStepsInShortestPath());
}

function printSolution12Part2() {
    const grid = new Grid();
    console.log(grid.getNumberOfStepsInShortestPathReversed());
}

export function printSolutions12() {
    printSolution12Part1();
    printSolution12Part2();
}