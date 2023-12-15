"use strict";
/*
You have to figure out which of the numbers you have appear in the
list of winning numbers. The first match makes the card worth one
point and each match after the first doubles the point value of that
card.

Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11

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
let scratchCards = [];
function ParseData(fileData) {
    let cardNumber = 0;
    let winningNumbers = [];
    let elfNumbers = [];
    const lines = fileData.split("\n");
    for (const line of lines) {
        // if not blank
        if (line.trim() != "") {
            // split on : - card / numbers
            let lineData = line.split(": ");
            // split card on " " - Card / number
            let cardInfo = lineData[0].trim().split(" ");
            let cardNumber = +cardInfo[1];
            // split numbers on | - winning numbers / elf numbers
            let gameNumbers = lineData[1].trim().split("|");
            // split winning numbers on spaces
            let winningNumbers = gameNumbers[0].trim().split(" ").map(x => +x);
            // remove empty elements
            winningNumbers = winningNumbers.filter(elm => elm);
            // split elf numbers on spaces
            let elfNumbers = gameNumbers[1].trim().split(" ").map(x => +x);
            // remove empty elements
            elfNumbers = elfNumbers.filter(elm => elm);
            // push to scratchcards array
            scratchCards.push({ cardNumber: cardNumber, winningNumbers: winningNumbers, elfNumbers: elfNumbers });
        }
        else {
            // throw error
            throw "Blank line found in data file";
        }
        counter++;
    }
}
// read file
const data = (0, fs_1.readFileSync)(dataFile, 'utf-8');
let counter = 0;
// parse file data
ParseData(data);
// walk through object array
scratchCards.forEach(scratchCard => {
    let matchCounter = 0;
    // walk through elf numbers
    scratchCard.elfNumbers.forEach(elfNumber => {
        // if in winning numbers array match counter doubled (or 1 if 0);
        if (scratchCard.winningNumbers.includes(elfNumber)) {
            // if match counter > 0
            if (matchCounter == 0) {
                // matchCounter = 1
                matchCounter = 1;
            }
            else {
                // double the counter
                matchCounter += matchCounter;
            }
        }
    });
    if (matchCounter > 0)
        resultsArray.push(matchCounter);
});
// walk through answer array
resultsArray.forEach(result => {
    // add value to total
    answerCounter += result;
});
// output result
console.log(answerCounter);
// eof
