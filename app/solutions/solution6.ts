import * as fs from 'fs';

function isMarkerInPosition(signal: string, position: number, numberOfPlacesToCheck: number): boolean {
    for(let i = 0; i < numberOfPlacesToCheck; i++) {
        for(let j = i + 1; j < numberOfPlacesToCheck; j++) {
            if(signal[position - i] === signal[position - j])
                return false;
        }
    }
    return true;
}

export function solution6() {
    const inputContent = fs.readFileSync('./app/res/input6.txt').toString();
    
    for(let i = 3; i < inputContent.length; i++) {
        if(isMarkerInPosition(inputContent, i, 4)) {
            console.log(i + 1);
            return;
        }
    }
}

export function solution6_2() {
    const inputContent = fs.readFileSync('./app/res/input6.txt').toString();
    
    for(let i = 13; i < inputContent.length; i++) {
        if(isMarkerInPosition(inputContent, i, 14)) {
            console.log(i + 1);
            return;
        }
    }
}
