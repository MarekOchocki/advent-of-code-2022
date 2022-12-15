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

    public add(vec: Vector2): Vector2 {
        return new Vector2(this.x + vec.x, this.y + vec.y);
    }

    public goOneTileInDirection(vec: Vector2): Vector2 {
        const diffX = Math.abs(vec.x - this.x) > 0 ? (vec.x - this.x) / Math.abs(vec.x - this.x) : 0;
        const diffY = Math.abs(vec.y - this.y) > 0 ? (vec.y - this.y) / Math.abs(vec.y - this.y) : 0;
        return new Vector2(this.x + diffX, this.y + diffY);
    }
}

class Grid {
    private elements: GridElement[][] = [];
    private sandElementsCount = 0;
    private lowestRockYPos = 0;
    private useFloor = false;

    public constructor() {
        const inputContent = fs.readFileSync('./app/res/week2/input14.txt').toString();
        inputContent.split('\n').forEach(line => this.parseInputLine(line));
    }

    public addFloor() {
        this.useFloor = true;
    }

    public fillWithSand() {
        let nextSandPosition = this.findNextSandFinalPosition();
        while(nextSandPosition !== null) {
            this.setElement(nextSandPosition, new GridElement(TileMaterial.SAND));
            this.sandElementsCount++;
            nextSandPosition = this.findNextSandFinalPosition();
            if(nextSandPosition?.equals(new Vector2(500, 0))) {
                this.setElement(nextSandPosition, new GridElement(TileMaterial.SAND));
                this.sandElementsCount++;
                return;
            }
        }
    }

    private findNextSandFinalPosition(): Vector2 | null {
        let currentPos = new Vector2(500, 0);
        while(currentPos.y < this.lowestRockYPos + 3) {
            const nextPosition = this.getNextSandPosition(currentPos);
            if(currentPos.equals(nextPosition)) return nextPosition;
            currentPos = nextPosition;
        }
        return null;
    }

    private getNextSandPosition(currentPos: Vector2): Vector2 {
        let elementBelow = this.getElement(currentPos.add(new Vector2(0, 1)));
        let elementDownLeft = this.getElement(currentPos.add(new Vector2(-1, 1)));
        let elementDownRight = this.getElement(currentPos.add(new Vector2(1, 1)));
        if(elementBelow.material === TileMaterial.AIR)
            return currentPos.add(new Vector2(0, 1));
        if(elementDownLeft.material === TileMaterial.AIR)
            return currentPos.add(new Vector2(-1, 1));
        if(elementDownRight.material === TileMaterial.AIR)
            return currentPos.add(new Vector2(1, 1));
        return currentPos;
    }

    public getAmountOfSandElements(): number {
        return this.sandElementsCount;
    }

    public print(from: Vector2, to: Vector2): void {
        for(let y = from.y; y <= to.y; y++) {
            let rowString = '';
            for(let x = from.x; x <= to.x; x++) {
                rowString += this.getElement(new Vector2(x, y)).material;
            }
            console.log(rowString);
        }
    }

    private parseInputLine(line: string): void {
        const points = line.split(' -> ').map(pointString => {
            const x = Number.parseInt(pointString.split(',')[0]);
            const y = Number.parseInt(pointString.split(',')[1]);
            if(y > this.lowestRockYPos) this.lowestRockYPos = y;
            return new Vector2(x, y);
        });
        for(let i = 0; i < points.length - 1; i++) {
            this.saveRocks(points[i], points[i + 1]);
        }
    }

    private saveRocks(start: Vector2, end: Vector2): void {
        let currentTile = start;
        while(!currentTile.equals(end)) {
            this.setElement(currentTile, new GridElement(TileMaterial.ROCK));
            currentTile = currentTile.goOneTileInDirection(end);
        }
        this.setElement(end, new GridElement(TileMaterial.ROCK));
    }

    private setElement(pos: Vector2, element: GridElement): void {
        if(this.elements[pos.x] === undefined)
            this.elements[pos.x] = [];
        this.elements[pos.x][pos.y] = element;
    }

    private getElement(pos: Vector2): GridElement {
        if(this.useFloor && pos.y === this.lowestRockYPos + 2) return new GridElement(TileMaterial.ROCK);
        if(this.elements[pos.x] === undefined)
            return new GridElement(TileMaterial.AIR);
        return this.elements[pos.x][pos.y] ?? new GridElement(TileMaterial.AIR);
    }
}

enum TileMaterial {
    AIR = '.',
    ROCK = '#',
    SAND = '+'
}

class GridElement {
    public material = TileMaterial.AIR;

    public constructor(material: TileMaterial) {
        this.material = material;
    }
}


function printSolution14Part1() {
    const grid = new Grid();
    grid.fillWithSand();
    console.log(grid.getAmountOfSandElements());
}

function printSolution14Part2() {
    const grid = new Grid();
    grid.addFloor();
    grid.fillWithSand();
    console.log(grid.getAmountOfSandElements());
}

export function printSolutions14() {
    printSolution14Part1();
    printSolution14Part2();
}
