import * as fs from 'fs';

function printSolution1Part1() {
    const inputContent = fs.readFileSync('./app/res/week1/input1.txt').toString();
    
    let max3Sum = 0;
    let max2Sum = 0;
    let max1Sum = 0;
    let currentSum = 0;
    inputContent.split('\n').forEach(line => {
        if(line === '') {
            if(max1Sum <= currentSum) {
                max3Sum = max2Sum;
                max2Sum = max1Sum;
                max1Sum = currentSum;
            }
            currentSum = 0;
        } else {
            currentSum += Number.parseInt(line);
        }
    });
    console.log(max1Sum);
}

function printSolution1Part2() {
    const inputContent = fs.readFileSync('./app/res/week1/input1.txt').toString();
    
    let max3Sum = 0;
    let max2Sum = 0;
    let max1Sum = 0;
    let currentSum = 0;
    inputContent.split('\n').forEach(line => {
        if(line === '') {
            if(max1Sum <= currentSum) {
                max3Sum = max2Sum;
                max2Sum = max1Sum;
                max1Sum = currentSum;
            }
            currentSum = 0;
        } else {
            currentSum += Number.parseInt(line);
        }
    });
    console.log(max1Sum + max2Sum + max3Sum);
}

export function printSolutions1() {
    printSolution1Part1();
    printSolution1Part2();
}
