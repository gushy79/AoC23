"use strict";
/*
A gear is any * symbol that is adjacent to exactly two part numbers.
Its gear ratio is the result of multiplying those two numbers together.

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

eg.
467*35
755*598

1. put found numbers into an object:
    partNumber: number
    symbol: string
    symbolPosition: number
2. Find all parts where the symbol is *
3. Find parts with the same symbolPosition.
4. Get part numbers for each matched *
5. Calculate ratio
6. Add ratio to results array.
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
// array of parts
let partsFound = [];
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
        let symbol = "";
        let symbolPosition = 0;
        let symbolLine = 0;
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
                        // get the symbol and symbol position
                        if (IsCharSymbol(topLine[charCounter - 1])) {
                            symbol = topLine[charCounter - 1];
                            symbolPosition = charCounter - 1;
                            symbolLine = counter - 1;
                        }
                        else if (IsCharSymbol(topLine[charCounter])) {
                            symbol = topLine[charCounter];
                            symbolPosition = charCounter;
                            symbolLine = counter - 1;
                        }
                        else if (IsCharSymbol(topLine[charCounter + 1])) {
                            symbol = topLine[charCounter + 1];
                            symbolPosition = charCounter + 1;
                            symbolLine = counter - 1;
                        }
                        // if match flag = false, check middle array for symbols at mID-1, mID+1
                    }
                    else if (IsCharSymbol(middleLine[charCounter - 1]) || IsCharSymbol(middleLine[charCounter]) || IsCharSymbol(middleLine[charCounter + 1])) {
                        // if Y add to return array
                        if (tempNumber != '' && matchedNumber == '')
                            matchedNumber = tempNumber;
                        matchedNumber = matchedNumber.concat(lineChar);
                        // set match flag
                        matchFlag = true;
                        // get the symbol and symbol position
                        if (IsCharSymbol(middleLine[charCounter - 1])) {
                            symbol = middleLine[charCounter - 1];
                            symbolPosition = charCounter - 1;
                            symbolLine = counter;
                        }
                        else if (IsCharSymbol(middleLine[charCounter])) {
                            symbol = middleLine[charCounter];
                            symbolPosition = charCounter;
                            symbolLine = counter;
                        }
                        else if (IsCharSymbol(middleLine[charCounter + 1])) {
                            symbol = middleLine[charCounter + 1];
                            symbolPosition = charCounter + 1;
                            symbolLine = counter;
                        }
                    }
                    else if (IsCharSymbol(bottomLine[charCounter - 1]) || IsCharSymbol(bottomLine[charCounter]) || IsCharSymbol(bottomLine[charCounter + 1])) {
                        // if match flag = false, check bottom array for symbols at mID-1, mID+1
                        // if Y add to return array
                        if (tempNumber != '' && matchedNumber == '')
                            matchedNumber = tempNumber;
                        matchedNumber = matchedNumber.concat(lineChar);
                        // set match flag
                        matchFlag = true;
                        // get the symbol and symbol position
                        if (IsCharSymbol(bottomLine[charCounter - 1])) {
                            symbol = bottomLine[charCounter - 1];
                            symbolPosition = charCounter - 1;
                            symbolLine = counter + 1;
                        }
                        else if (IsCharSymbol(bottomLine[charCounter])) {
                            symbol = bottomLine[charCounter];
                            symbolPosition = charCounter;
                            symbolLine = counter + 1;
                        }
                        else if (IsCharSymbol(bottomLine[charCounter + 1])) {
                            symbol = bottomLine[charCounter + 1];
                            symbolPosition = charCounter + 1;
                            symbolLine = counter + 1;
                        }
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
                    // add to array of parts
                    partsFound.push({ partNumber: +matchedNumber, symbol: symbol, symbolPosition: symbolPosition, symbolLine: symbolLine });
                    //resultsArray.push(+matchedNumber);
                    // set found parts flag
                    foundParts = true;
                    // reset match flag
                    matchFlag = false;
                    // reset matched number
                    matchedNumber = '';
                    // reset holding / temp number
                    tempNumber = '';
                    // reset symbol
                    symbol = '';
                    symbolPosition = 0;
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
            partsFound.push({ partNumber: +matchedNumber, symbol: symbol, symbolPosition: symbolPosition, symbolLine: symbolLine });
            //resultsArray.push(+matchedNumber);
            // set found parts flag
            foundParts = true;
            // reset match flag
            matchFlag = false;
            // reset matched number
            matchedNumber = '';
            // reset holding / temp number
            tempNumber = '';
            // reset symbol
            symbol = '';
            symbolPosition = 0;
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
// filter out possible gears
// TODO: Move this to a function
let filteredParts = partsFound.filter((part) => {
    return part.symbol ? part.symbol == "*" : false;
});
// sort array of filtered parts by symbol line then symbol position
filteredParts.sort(function (a, b) {
    return a.symbolLine - b.symbolLine || a.symbolPosition - b.symbolPosition;
});
// walk through filtered parts to find gears
let lastPartNumber = 0;
let lastSymbolPosition = 0;
let lastSymbolLine = 0;
filteredParts.forEach(part => {
    if (part.symbolPosition == lastSymbolPosition && part.symbolLine == lastSymbolLine) {
        // gear found
        let gearRatio = lastPartNumber * part.partNumber;
        resultsArray.push(gearRatio);
        //console.log("Line: " + lastSymbolLine + " - " + lastPartNumber + "*" + part.partNumber);
    }
    else {
        // not a gear, reset
        lastPartNumber = part.partNumber;
        lastSymbolPosition = part.symbolPosition;
        lastSymbolLine = part.symbolLine;
    }
});
// walk through answer array
resultsArray.forEach(result => {
    //console.log(result);
    // add value to total
    answerCounter += result;
});
// output result
filteredParts.forEach(part => {
    //console.log(part);
});
console.log("Answer: " + answerCounter);
// eof
