import * as fs from 'fs';

class File {
    public constructor(public name: string, public size: number) {}
}

class Directory {
    public directories: Directory[] = [];
    public files: File[] = [];

    public constructor(public name: string, public directoryAbove: Directory | null) {}

    public getSize(): number {
        let sum = 0;
        this.directories.forEach(dir => sum += dir.getSize());
        this.files.forEach(file => sum += file.size);
        return sum;
    }

    public isSizeAboveThreshold(threshold: number): boolean {
        return this.getSize() > threshold;
    }

    public getDirectoriesBelowThresholdDeep(threshold: number): Directory[] {
        const result: Directory[] = [];
        this.directories.forEach(dir => {
            result.push(...dir.getDirectoriesBelowThresholdDeep(threshold));
        });
        if(!this.isSizeAboveThreshold(threshold)) result.push(this);
        return result;
    }

    public getDirectoriesAboveThresholdDeep(threshold: number): Directory[] {
        const result: Directory[] = [];
        this.directories.forEach(dir => {
            result.push(...dir.getDirectoriesAboveThresholdDeep(threshold));
        });
        if(this.isSizeAboveThreshold(threshold)) result.push(this);
        return result;
    }
}

function handleChangeDirectory(line: string, currentDirectory: Directory, topDirectory: Directory): Directory {
    const newDirectoryName = line.split('$ cd ')[1];
    if(newDirectoryName === '/') return topDirectory;

    if(newDirectoryName === '..') {
        if(!currentDirectory.directoryAbove) throw 'cd .. performed on top directory';
        return currentDirectory.directoryAbove;
    }
    
    const newDirectory = currentDirectory.directories.find(dir => dir.name === newDirectoryName);
    if(!newDirectory) throw `cd couldn't find directory ${newDirectoryName}`;
    return newDirectory;
}

function handleLsResultLine(line: string, currentDirectory: Directory): void {
    if(line.startsWith('dir ')) {
        currentDirectory.directories.push(new Directory(line.split('dir ')[1], currentDirectory));
    } else {
        const size = Number.parseInt(line.split(' ')[0]);
        const fileName = line.split(' ')[1];
        currentDirectory.files.push(new File(fileName, size));
    }
}

function handleLine(line: string, currentDirectory: Directory, topDirectory: Directory): Directory {
    if(line.startsWith('$ cd')) return handleChangeDirectory(line, currentDirectory, topDirectory);
    if(line.startsWith('$ ls')) return currentDirectory;
    handleLsResultLine(line, currentDirectory);
    return currentDirectory;
}

function findSmallest(directories: Directory[]): Directory {
    let smallest = directories[0];
    let smallestSize = directories[0].getSize();
    for(let i = 1; i < directories.length; i++) {
        const currDirSize = directories[i].getSize();
        if(currDirSize < smallestSize) {
            smallest = directories[i];
            smallestSize = currDirSize;
        }
    }
    return smallest;
}

export function printSolution7Part1() {
    const inputContent = fs.readFileSync('./app/res/week1/input7.txt').toString();
    const topDirectory = new Directory('/', null); 
    let currentDirectory: Directory = topDirectory;

    const lines = inputContent.split('\n');

    lines.forEach(line => {
        currentDirectory = handleLine(line, currentDirectory, topDirectory);
    });

    const directoriesBelow100000 = topDirectory.getDirectoriesBelowThresholdDeep(100000);
    const sum =directoriesBelow100000.reduce((p, c) => p +c.getSize(), 0);
    console.log(sum);
}

export function printSolution7Part2() {
    const inputContent = fs.readFileSync('./app/res/week1/input7.txt').toString();
    const topDirectory = new Directory('/', null); 
    let currentDirectory: Directory = topDirectory;

    const lines = inputContent.split('\n');

    lines.forEach(line => {
        currentDirectory = handleLine(line, currentDirectory, topDirectory);
    });

    const unusedSpace = 70000000 - topDirectory.getSize();
    const neededSpace = 30000000 - unusedSpace

    const directoriesWithEnoughSize = topDirectory.getDirectoriesAboveThresholdDeep(neededSpace);
    const smallestDir = findSmallest(directoriesWithEnoughSize);
    console.log(smallestDir.getSize());
}

export function printSolutions7() {
    printSolution7Part1();
    printSolution7Part2();
}
