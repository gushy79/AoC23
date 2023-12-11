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
let runMode = "real"; // sample / real
// ***** do not edit below this line *****
// import libraries
const fs_1 = require("fs");
let dataFile = './a-sample-data.txt'; // sample data file
if (runMode == "real")
    dataFile = './a-data.txt'; // real/live data file
// set variables
let resultsArray = [0];
let answerCounter = 0;
let topLine = ['0'];
topLine.pop(); // hack to make an empty, assigned array
let middleLine = ['0'];
middleLine.pop(); // hack to make an empty, assigned array
let bottomLine = ['0'];
bottomLine.pop(); // hack to make an empty, assigned array
let partNumbers = [0];
let calcAnswer = 0;
function IsCharAlphanumeric(checkString) {
    if (checkString === undefined)
        return false;
    let strRegex = new RegExp(/^[a-z0-9.]+$/i);
    return strRegex.test(checkString);
}
function IsCharSymbol(checkString) {
    if (checkString === undefined)
        return false;
    return !IsCharAlphanumeric(checkString);
}
// function: check for parts (line data, counter) array of numbers
function CheckForParts(line, lineCounter) {
    let foundParts = false;
    // if counter = 0
    if (lineCounter == 0) {
        // add line to middle array
        bottomLine = Array.from(line);
        // return false
        return false;
    }
    else {
        // set top array = middle array
        topLine = middleLine;
        // set middle array = bottom array
        middleLine = bottomLine;
        // set bottom array = line
        bottomLine = Array.from(line);
    }
    // walk through middle array
    if (lineCounter > 0) {
        let charCounter = 0;
        let tempNumber = "";
        let matchedNumber = "";
        let matchFlag = false;
        middleLine.forEach(lineChar => {
            // if number get index id (mID)
            if (!isNaN(+lineChar)) {
                // is match flag set, if yes no need to check for symbols, it's part of the same number
                if (matchFlag) {
                    // add to matched number
                    matchedNumber = matchedNumber.concat(lineChar);
                }
                else {
                    // check top array for symbols at locations mID-1, mID, mID+1
                    if (IsCharSymbol(topLine[charCounter - 1]) || IsCharSymbol(topLine[charCounter]) || IsCharSymbol(topLine[charCounter + 1])) {
                        // if Y add to matched number
                        if (tempNumber != '' && matchedNumber == '')
                            matchedNumber = tempNumber;
                        matchedNumber = matchedNumber.concat(lineChar);
                        // set match flag
                        matchFlag = true;
                        // if match flag = false, check middle array for symbols at mID-1, mID+1
                    }
                    else if (IsCharSymbol(middleLine[charCounter - 1]) || IsCharSymbol(middleLine[charCounter]) || IsCharSymbol(middleLine[charCounter + 1])) {
                        // if Y add to return array
                        if (tempNumber != '' && matchedNumber == '')
                            matchedNumber = tempNumber;
                        matchedNumber = matchedNumber.concat(lineChar);
                        // set match flag
                        matchFlag = true;
                    }
                    else if (IsCharSymbol(bottomLine[charCounter - 1]) || IsCharSymbol(bottomLine[charCounter]) || IsCharSymbol(bottomLine[charCounter + 1])) {
                        // if match flag = false, check bottom array for symbols at mID-1, mID+1
                        // if Y add to return array
                        if (tempNumber != '' && matchedNumber == '')
                            matchedNumber = tempNumber;
                        matchedNumber = matchedNumber.concat(lineChar);
                        // set match flag
                        matchFlag = true;
                    }
                    else {
                        // add the number to temp holding variable in case the symbol comes later.
                        tempNumber = tempNumber.concat(lineChar);
                    }
                }
            }
            else {
                // if match flag set
                if (matchFlag) {
                    // add to array
                    resultsArray.push(+matchedNumber);
                    // set found parts flag
                    foundParts = true;
                    // reset match flag
                    matchFlag = false;
                    // reset matched number
                    matchedNumber = '';
                    // reset holding / temp number
                    tempNumber = '';
                }
                else {
                    tempNumber = '';
                }
            }
            // increment index counter
            charCounter++;
        });
        // if last matched part was the end of the line
        if (matchFlag) {
            // add to array
            resultsArray.push(+matchedNumber);
            // set found parts flag
            foundParts = true;
            // reset match flag
            matchFlag = false;
            // reset matched number
            matchedNumber = '';
            // reset holding / temp number
            tempNumber = '';
        }
    }
    // return array or false
    return foundParts;
}
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
        // check for parts (line, counter)
        CheckForParts(line.trim(), counter);
    }
    else {
        // throw error
        throw "Blank line found in data file";
    }
    counter++;
}
// run check again for the last line
if (counter > 0) {
    // check for parts (line, counter)
    CheckForParts('', counter);
}
// walk through answer array
resultsArray.forEach(result => {
    // console.log(result);
    // add value to total
    answerCounter += result;
});
// output result
console.log("Answer: " + answerCounter);
// eof
