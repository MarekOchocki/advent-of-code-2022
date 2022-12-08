import * as fs from 'fs';

export function isTreeVisibleFromBorders(trees: number[][], x: number, y: number): boolean {
    const visibleUp = trees.slice(x + 1).map(v => v[y]).every(v => v < trees[x][y]);
    const visibleDown = trees.slice(0, x).map(v => v[y]).every(v => v < trees[x][y]);
    const visibleLeft = trees[x].slice(0, y).every(v => v < trees[x][y]);
    const visibleRight = trees[x].slice(y + 1).every(v => v < trees[x][y]);
    return visibleUp || visibleDown || visibleLeft || visibleRight;
}
export function getNumberOfTreesVisibleFromHeight(trees: number[], height: number): number {
    const lastNotVisibleTree = trees.findIndex(v => v >= height);
    return lastNotVisibleTree === -1 ? trees.length : lastNotVisibleTree + 1;
}

export function replaceTreeScoreIfHigher(trees: number[][], x: number, y: number, highScore: {score: number}): void {
    let visibleUp = getNumberOfTreesVisibleFromHeight(trees.slice(0, x).map(v => v[y]).reverse(), trees[x][y]);
    let visibleDown = getNumberOfTreesVisibleFromHeight(trees.slice(x + 1).map(v => v[y]), trees[x][y]);
    let visibleLeft = getNumberOfTreesVisibleFromHeight(trees[x].slice(0, y).reverse(), trees[x][y]);
    let visibleRight = getNumberOfTreesVisibleFromHeight(trees[x].slice(y + 1), trees[x][y]);
    const treeScore = visibleUp * visibleDown * visibleLeft * visibleRight;
    highScore.score = treeScore > highScore.score ? treeScore : highScore.score;
}

export function printSolutions8() {
    const input = fs.readFileSync('./app/res/input8.txt').toString();
    let trees = input.split('\n').map(line => line.split('').map(c => +c));
    let result1 = 0;
    let result2 = {score: 0};
    trees.forEach((treeLine, y) => treeLine.forEach((_, x) => result1 += isTreeVisibleFromBorders(trees, x , y) ? 1 : 0));
    trees.forEach((treeLine, y) => treeLine.forEach((_, x) => replaceTreeScoreIfHigher(trees, x, y, result2)));
    console.log(result1);
    console.log(result2.score);
}
