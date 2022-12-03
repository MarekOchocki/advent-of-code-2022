import * as fs from 'fs';

function findRepeatingLetter2(firstPart: string, secondPart: string): string {
    for(let i = 0; i < firstPart.length; i++) {
        for(let j = 0; j < secondPart.length; j++) {
            if(firstPart[i] === secondPart[j])
                return firstPart[i];
        }
    }
    throw 'no repetitions found';
}

function findRepeatingLetter3(firstPart: string, secondPart: string, thirdPart: string): string {
    for(let i = 0; i < firstPart.length; i++) {
        for(let j = 0; j < secondPart.length; j++) {
            for(let k = 0; k < thirdPart.length; k++) {
                if(firstPart[i] === secondPart[j] && firstPart[i] === thirdPart[k])
                    return firstPart[i];
            }
        }
    }
    throw 'no repetitions found';
}

function letterToScore(letter: string): number {
    if(letter.charCodeAt(0)  > 'Z'.charCodeAt(0))
        return letter.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
    return letter.charCodeAt(0) - 'A'.charCodeAt(0) + 27;
}

export function solution3() {
    const inputContent = fs.readFileSync('./app/res/input3.txt').toString();
    let score = 0;
    inputContent.split('\n').forEach(line => {
        const firstPart = line.slice(0, line.length / 2);
        const secondPart = line.slice(line.length / 2);
        const repeatingLetter = findRepeatingLetter2(firstPart, secondPart);
        score += letterToScore(repeatingLetter);
    })
    console.log(score);
}

export function solution3_2() {
    const inputContent = fs.readFileSync('./app/res/input3.txt').toString();
    let score = 0;
    const lines = inputContent.split('\n')
    for(let i = 0; i < lines.length; i += 3) {
        const firstPart = lines[i];
        const secondPart = lines[i + 1];
        const thirdPart = lines[i + 2];
        const repeatingLetter = findRepeatingLetter3(firstPart, secondPart, thirdPart);
        score += letterToScore(repeatingLetter);
    }
    console.log(score);
}
