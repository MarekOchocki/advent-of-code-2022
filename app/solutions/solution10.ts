import * as fs from 'fs';

function getPixel(cycleNumber: number, registerValue: number): string {
    return Math.abs(cycleNumber - registerValue - 40 * Math.floor(cycleNumber / 40)) < 2 ? "#" : ".";
}

export function printSolutions10() {
    const inputContent = fs.readFileSync('./app/res/input10.txt').toString();
    
    const addends = inputContent.split('\n').flatMap(l => l.startsWith('noop') ? 0 : [0, Number.parseInt(l.split(' ')[1])]);
    let register = 1;
    let pixels: string = "";
    let sum = 0;
    addends.forEach((a, i) => {
        if((i+21) % 40 === 0) {
            sum += register * (i + 1);
        }
        pixels += getPixel(i, register);
        if((i+1) % 40 === 0) {
            pixels += '\n';
        }
        register += a;
    });
    console.log(sum);
    console.log(pixels);
}
