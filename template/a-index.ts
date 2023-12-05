/*
Challenge Instructions Here
*/

// config
let runMode: string  = "sample";  // sample / real

// ***** do not edit below this line *****
// import libraries
import { readFileSync } from 'fs';

let dataFile: string = './a-sample-data.txt'; // sample data file
if (runMode == "real") dataFile = './a-data.txt'; // real/live data file

// set variables
let resultsArray: number[] = [0];
let answerCounter: number = 0;
let resultA: number = 0;
let resultB: number = 0;
let resultC: number = 0;
let calcAnswer: number = 0;

// read file
const data = readFileSync(dataFile, 'utf-8');

let counter: number = 0;

// walk through lines of file
const lines = data.split("\n");
for (const line of lines) {
    // if not blank
    if (line.trim() != "") {
        // reset max values
        resultA = 0;
        resultB = 0;
        resultC = 0;
        calcAnswer = 0;
        // split line data
        let lineData = line.split(": ");
        // or using regex
        // let lineData = line.split(/, |; /gm);

        // walk through data array
        lineData.forEach(dataPoint => {
            // do stuff
            
        })
        // calculate answer and add to array
        calcAnswer = 1 + 2 + 3;
        resultsArray.push(calcAnswer);
    } else {
        // throw error
        throw "Blank line found in data file";
    }
    counter++;
}

// walk through answer array
resultsArray.forEach(result => {
    // add value to total
    answerCounter += result;
})

// output result
console.log(answerCounter);

// eof