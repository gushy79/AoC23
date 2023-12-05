/*
Your calculation isn't quite right. It looks like some of the digits are
actually spelled out with letters: one, two, three, four, five, six, seven,
eight, and nine also count as valid "digits".

Equipped with this new information, you now need to find the real first and
last digit on each line.

two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen
*/

// config
let runMode: string  = "real";  // sample / real

// ***** do not edit below this line *****
// import libraries
import { readFileSync } from 'fs';

let dataFile: string = './b-sample-data.txt'; // sample data file
if (runMode == "real") dataFile = './b-data.txt'; // real/live data file

// set variables
let resultsArray: number[] = [0];
let answerCounter: number = 0;
let firstDigit: string = "";
let firstDigitIndex: number = 0;
let lastDigit: string = "";
let lastDigitIndex: number = 0;
let calcAnswer: number = 0;
let lineCounter: number = 0;

// read file
const data = readFileSync(dataFile, 'utf-8');

// walk through lines of file
const lines = data.split("\n");
for (const line of lines) {
    // if not blank
    if (line.trim() != "") {
        // set search array of digits 1-9
        const searchArray: string[] = ['1','2','3','4','5','6','7','8','9'];
        const numbersArray: string[] = ['one','two','three','four','five','six','seven','eight','nine'];
        // reset values
        firstDigit = "";
        firstDigitIndex = 0;
        lastDigit = "";
        lastDigitIndex =  0;
        let counter = 0;
        
        // search string for earch digit
        searchArray.forEach(digitMatch => {
            // search for first digit in the line (string)
            const firstMatch = line.trim().indexOf(digitMatch);
            // do we have a result?
            if (firstMatch != -1) {
                //console.log("line " + lineCounter + ": found match for " + digitMatch);
                // if first loop set both digits without comparison
                if (counter == 0) {
                    firstDigit = digitMatch;
                    firstDigitIndex = firstMatch;
                } else {
                    // check if it's the first digit in the string
                    if (firstMatch < firstDigitIndex ) {
                        firstDigit = digitMatch;
                        firstDigitIndex = firstMatch;
                    }
                }
            }
            // search for last digit in the line (string)
            const lastMatch = line.trim().lastIndexOf(digitMatch);
            // do we have a result?
            if (lastMatch != -1) {
                //console.log("line " + lineCounter + ": found match for " + digitMatch);
                // if first loop set both digits without comparison
                if (counter == 0) {
                    lastDigit = digitMatch;
                    lastDigitIndex = lastMatch;
                    counter++;
                } else {
                    // check if it's the last digit in the string
                    if (lastMatch > lastDigitIndex) {
                        lastDigit = digitMatch;
                        lastDigitIndex = lastMatch;
                    }
                    counter++;
                }
            }
        });
        // search string for written numbers
        numbersArray.forEach(digitMatch => {
            // search for first digit in the line (string)
            const firstMatch = line.trim().indexOf(digitMatch);
            // do we have a result?
            if (firstMatch != -1) {
                //console.log("line " + lineCounter + ": found match for " + digitMatch);
                // if first loop set both digits without comparison
                if (counter == 0) {
                    firstDigit = String(numbersArray.indexOf(digitMatch)+1);
                    firstDigitIndex = firstMatch;
                } else {
                    // check if it's the first digit in the string
                    if (firstMatch < firstDigitIndex ) {
                        firstDigit = String(numbersArray.indexOf(digitMatch)+1);
                        firstDigitIndex = firstMatch;
                    }
                }
            }
            // search for last digit in the line (string)
            const lastMatch = line.trim().lastIndexOf(digitMatch);
            // do we have a result?
            if (lastMatch != -1) {
                //console.log("line " + lineCounter + ": found match for " + digitMatch);
                // if first loop set both digits without comparison
                if (counter == 0) {
                    lastDigit = String(numbersArray.indexOf(digitMatch)+1);
                    lastDigitIndex = lastMatch;
                    counter++;
                } else {
                    // check if it's the last digit in the string
                    if (lastMatch > lastDigitIndex) {
                        lastDigit = String(numbersArray.indexOf(digitMatch)+1);
                        lastDigitIndex = lastMatch;
                    }
                    counter++;
                }
            }
        });
        
        // calculate answer and add to array
        calcAnswer = parseInt(firstDigit.concat(lastDigit),10);
        if (lineCounter == 0) resultsArray.pop();
        resultsArray.push(calcAnswer);
        //console.log(line + " = " + calcAnswer);
    } else {
        // throw error
        throw "Blank line found in data file";
    }
    lineCounter++;
}

// walk through answer array
resultsArray.forEach(result => {
    // add value to total
    answerCounter += result;
    //console.log(result);
})

// output result
console.log("Answer: " + answerCounter);

// eof