import * as fs from 'fs';

class Tree {
    public visible: boolean = false;

    public constructor(public height: number) {
    }
}

class Vector2 {
    public constructor(public x: number = 0, public y: number = 0) { }

    public add(vector: Vector2): Vector2 {
        return new Vector2(this.x + vector.x, this.y + vector.y);
    }
}

class Forest {
    private sizeX = 0;
    private sizeY = 0;

    public constructor(private trees: Tree[][]) {
        this.sizeX = trees[0].length;
        this.sizeY = trees.length;
    }

    public getMaxScenicScore(): number {
        let maxScenicScore = 0;
        for(let x = 0; x < this.sizeX; x++) {
            for(let y = 0; y < this.sizeY; y++) {
                const currentTreeScore = this.getScenicScoreForTree(new Vector2(x, y));
                maxScenicScore = currentTreeScore > maxScenicScore ? currentTreeScore : maxScenicScore;
            }
        }
        return maxScenicScore;
    }

    public getCountOfVisibleTrees(): number {
        this.lookAtTheTreesFromBorders();
        return this.trees.reduce((sum, treeLine) =>{
            const visibleTreesInLine = treeLine.reduce((sumLine, tree) => sumLine + (tree.visible ? 1 : 0), 0);
            return sum + visibleTreesInLine;
        }, 0);
    }

    private getScenicScoreForTree(treePosition: Vector2): number {
        let score = this.getNumberOfVisibleTrees(new Vector2(1, 0), treePosition);
        score *= this.getNumberOfVisibleTrees(new Vector2(-1, 0), treePosition);
        score *= this.getNumberOfVisibleTrees(new Vector2(0, 1), treePosition);
        score *= this.getNumberOfVisibleTrees(new Vector2(0, -1), treePosition);
        return score;
    }

    private lookAtTheTreesFromBorders(): void {
        this.lookFromTopBorder();
        this.lookFromRightBorder();
        this.lookFromBottomBorder();
        this.lookFromLeftBorder();
    }

    private lookFromTopBorder(): void {
        for(let i = 0; i < this.sizeX; i++)
            this.setVisibleTrees(new Vector2(0, 1), new Vector2(i, 0));
    }

    private lookFromRightBorder(): void {
        for(let i = 0; i < this.sizeY; i++)
            this.setVisibleTrees(new Vector2(-1, 0), new Vector2(this.sizeX - 1, i));
    }

    private lookFromBottomBorder(): void {
        for(let i = 0; i < this.sizeX; i++)
            this.setVisibleTrees(new Vector2(0, -1), new Vector2(i, this.sizeY - 1));
    }

    private lookFromLeftBorder(): void {
        for(let i = 0; i < this.sizeY; i++)
            this.setVisibleTrees(new Vector2(1, 0), new Vector2(0, i));
    }

    private getNumberOfVisibleTrees(direction: Vector2, startPosition: Vector2): number {
        let result = 0;
        const startPositionTree = this.trees[startPosition.x][startPosition.y];
        let currentPosition = startPosition.add(direction);
        while(this.isPositionInGrid(currentPosition)) {
            let currentTree = this.trees[currentPosition.x][currentPosition.y];
            if(currentTree.height >= startPositionTree.height) {
                result++;
                break;
            }
            result++;
            currentPosition = currentPosition.add(direction);
        }
        return result;
    }
    
    private setVisibleTrees(direction: Vector2, firstTreePosition: Vector2): void {
        let currentPosition = firstTreePosition;
        let currentHighestTree = this.trees[currentPosition.x][currentPosition.y];
        currentHighestTree.visible = true;
        currentPosition = currentPosition.add(direction);
    
        while(this.isPositionInGrid(currentPosition)) {
            let currentTree = this.trees[currentPosition.x][currentPosition.y];
            if(currentTree.height > currentHighestTree.height) {
                currentTree.visible = true;
                currentHighestTree = currentTree;
            }
            currentPosition = currentPosition.add(direction);
        }
    }

    private isPositionInGrid(position: Vector2): boolean {
        return position.x >= 0 && position.x < this.sizeX && position.y >= 0 && position.y < this.sizeY;
    }
}

function inputToForest(input: string): Forest {
    const trees: Tree[][] = [];
    const lines = input.split('\n');
    lines.forEach(line => {
        const treeLine: Tree[] = [];
        for(let i = 0; i < line.length; i++) {
            treeLine.push(new Tree(Number.parseInt(line[i])));
        }
        trees.push(treeLine);
    });
    return new Forest(trees);
}


export function solution8() {
    const inputContent = fs.readFileSync('./app/res/input8.txt').toString();
    let forest = inputToForest(inputContent);
    console.log(forest.getCountOfVisibleTrees());
}

export function solution8_2() {
    const inputContent = fs.readFileSync('./app/res/input8.txt').toString();
    let forest = inputToForest(inputContent);
    console.log(forest.getMaxScenicScore());
}
