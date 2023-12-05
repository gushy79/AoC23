"use strict";
/*
The engine schematic (your puzzle input) consists of a visual representation of
the engine. There are lots of numbers and symbols you don't really understand,
but apparently any number adjacent to a symbol, even diagonally, is a "part number"
and should be included in your sum. (Periods (.) do not count as a symbol.)

467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
*/
Object.defineProperty(exports, "__esModule", { value: true });
// config
let runMode = "sample"; // sample / real
// ***** do not edit below this line *****
// import libraries
const fs_1 = require("fs");
let dataFile = './a-sample-data.txt'; // sample data file
if (runMode == "real")
    dataFile = './a-data.txt'; // real/live data file
// set variables
let resultsArray = [0];
let answerCounter = 0;
let lineAbove = [0];
lineAbove.pop(); // hack to make an empty, assigned array
let currentline = [0];
currentline.pop(); // hack to make an empty, assigned array
let lineBelow = [0];
lineBelow.pop(); // hack to make an empty, assigned array
let partNumbers = [0];
let calcAnswer = 0;
// read file
const data = (0, fs_1.readFileSync)(dataFile, 'utf-8');
let counter = 0;
// walk through lines of file
const lines = data.split("\n");
for (const line of lines) {
    // if not blank
    if (line.trim() != "") {
        // reset max values
        calcAnswer = 0;
        // split line data
        let lineData = line.split(": ");
        // or using regex
        // let lineData = line.split(/, |; /gm);
        // walk through data array
        lineData.forEach(dataPoint => {
            // do stuff
        });
        // calculate answer and add to array
        calcAnswer = 1 + 2 + 3;
        resultsArray.push(calcAnswer);
    }
    else {
        // throw error
        throw "Blank line found in data file";
    }
    counter++;
}
// walk through answer array
resultsArray.forEach(result => {
    // add value to total
    answerCounter += result;
});
// output result
console.log(answerCounter);
// eof
