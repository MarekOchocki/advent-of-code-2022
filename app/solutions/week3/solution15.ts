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

    public getManhattanDistanceTo(vec: Vector2): number {
        return Math.abs(vec.x - this.x) + Math.abs(vec.y - this.y);
    }
}

class Sensor {
    public position: Vector2;
    public distanceCovered: number;

    public constructor(position: Vector2, distanceCovered: number) {
        this.position = position;
        this.distanceCovered = distanceCovered;
    }
}

class Grid {
    private sensors: Sensor[] = [];
    private beacons: Vector2[] = [];

    public constructor() {
        const inputContent = fs.readFileSync('./app/res/week3/input15.txt').toString();
        inputContent.split('\n').forEach(line => this.parseInputLine(line));
    }

    public getHowManyPositionsWithoutBeacon(row: number): number {
        const askedRowRange = this.getCheckedPositionsRange(row);
        let sum = 0;
        for(let x = askedRowRange.x; x <= askedRowRange.y; x++) {
            const pos = new Vector2(x, row);
            if(!this.hasBeacon(pos) && this.isCovered(pos)) {
                sum++;
            }
        }
        return sum;
    }

    public findEmptyPositionInRange(from: Vector2, to: Vector2): Vector2 {
        for(let x = from.x; x <= to.x; x++) {
            for(let y = from.y; y <= to.y;) {
                const howManyToSkip = this.howManyPositionsCanSkip(new Vector2(x, y));
                if(howManyToSkip === 0) {
                    return new Vector2(x, y);
                }
                y += howManyToSkip;
            }
        }
        throw "Couldn't find empty position in range";
    }

    private howManyPositionsCanSkip(pos: Vector2): number {
        for(let i = 0; i < this.sensors.length; i++) {
            const s = this.sensors[i];
            if(s.position.getManhattanDistanceTo(pos) <= s.distanceCovered) {
                if(s.position.x < pos.x) {
                    return (s.position.x - pos.x) + (s.distanceCovered - Math.abs(s.position.y - pos.y)) + 1;
                } else {
                    return (s.distanceCovered - Math.abs(s.position.y - pos.y)) - (s.position.x - pos.x) + 1;
                }
            }
        }
        return 0;
    }

    private hasBeacon(pos: Vector2): boolean {
        return this.beacons.some(b => b.equals(pos));
    }

    private isCovered(pos: Vector2): boolean {
        return this.sensors.some(s => s.position.getManhattanDistanceTo(pos) <= s.distanceCovered);
    }

    private getCheckedPositionsRange(row: number): Vector2 {
        const askedRowRange = new Vector2(+Infinity, -Infinity);
        this.sensors.forEach(s => {
            const distY = Math.abs(s.position.y - row);
            const lowestX = s.position.x - s.distanceCovered + distY;
            const largestX = s.position.x + s.distanceCovered - distY;
            askedRowRange.x = lowestX < askedRowRange.x ? lowestX : askedRowRange.x; 
            askedRowRange.y = largestX > askedRowRange.y ? largestX : askedRowRange.y; 
        });
        return askedRowRange;
    }

    private parseInputLine(line: string): void {
        const numbers = [...line.matchAll(/[\-]?\d+/g)].map(r => Number.parseInt(r[0]));
        const sensorPos = new Vector2(numbers[0], numbers[1]);
        const beaconPos = new Vector2(numbers[2], numbers[3]);
        this.sensors.push(new Sensor(sensorPos, sensorPos.getManhattanDistanceTo(beaconPos)));
        this.beacons.push(beaconPos);
    }
}

function printSolution15Part1() {
    const grid = new Grid();
    console.log(grid.getHowManyPositionsWithoutBeacon(2000000));
}

function printSolution15Part2() {
    const grid = new Grid();
    const emptyPos = grid.findEmptyPositionInRange(new Vector2(0, 0), new Vector2(4000000, 4000000));
    console.log(emptyPos.x * 4000000 + emptyPos.y);
}

export function printSolutions15() {
    printSolution15Part1();
    printSolution15Part2();
}
