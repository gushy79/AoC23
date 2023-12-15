/*
You win copies of the scratchcards below the winning card equal to
the number of matches. So, if card 10 were to have 5 matching
numbers, you would win one copy each of cards 11, 12, 13, 14, and
15.

Copies of scratchcards are scored like normal scratchcards and have
the same card number as the card they copied. So, if you win a copy
of card 10 and it has 5 matching numbers, it would then win a copy
of the same cards that the original card 10 won: cards 11, 12, 13,
14, and 15. This process repeats until none of the copies cause you
to win any more cards. (Cards will never make you copy a card past
the end of the table.)

Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11

while continueChecking == true
    if counter == 0 checkSet = fileData
    countCards(fileData, checkSet)


*/

// config
let runMode: string  = "real";  // sample / real

import { match } from 'assert';
// ***** do not edit below this line *****
// import libraries
import { readFileSync } from 'fs';
import { exit } from 'process';
import { start } from 'repl';

let dataFile: string = './b-sample-data.txt'; // sample data file
if (runMode == "real") dataFile = './b-data.txt'; // real/live data file

// set variables
let answerCounter: number = 0;
// scratch card object
type scratchCard = {
    cardNumber: number,
    winningNumbers: number[],
    elfNumbers: number[]
}
let scratchCards: scratchCard[] = [];

// function to parse the challenge data
function ParseData(fileData: string) {
    const lines = fileData.split("\n");
    for (const line of lines) {
        let cardNumber: number = 0;
        let winningNumbers: number[] = [];
        let elfNumbers: number[] = [];
        // if not blank
        if (line.trim() != "") {
            // split on : - card / numbers
            let lineData = line.split(": ");
            // split card on " " - Card / number
            //  let cardInfo = lineData[0].trim().split(" ");
            //  cardNumber = +cardInfo[1];
            cardNumber = +lineData[0].replace('Card ', '').trim();
            // split numbers on | - winning numbers / elf numbers
            let gameNumbers = lineData[1].trim().split("|");
            // split winning numbers on spaces
            //  let winningNumbers = gameNumbers[0].trim().split(" ").map(x => +x);
            // remove empty elements
            //  winningNumbers = winningNumbers.filter(elm => elm);

            // get winning numbers
            let pattern = /\d+/g;
            let match;
            while ((match = pattern.exec(gameNumbers[0])) !== null) {
                winningNumbers.push(+match[0]);
            }
            // split elf numbers on spaces
            //  let elfNumbers = gameNumbers[1].trim().split(" ").map(x => +x);
            // remove empty elements
            //  elfNumbers = elfNumbers.filter(elm => elm);
            
            // get elf numbers
            while ((match = pattern.exec(gameNumbers[1])) !== null) {
                elfNumbers.push(+match[0]);
            }
            // push to scratchcards array
            scratchCards.push({cardNumber: cardNumber, winningNumbers: winningNumbers, elfNumbers: elfNumbers});
        } else {
            // throw error
            throw "Blank line found in data file";
        }
    }
}


// function to get match counts on all game cards
function GetCardCounts(allCards: scratchCard[]): number[] {
    let matchCounts: number[] = [];
    // iterate through scratchcards
    allCards.forEach(gameCard => {
        let cardMatchCounter = 0;
        // walk through winningNumbers and look for matches
        gameCard.winningNumbers.forEach(winningNumber => {
            // if in elf numbers array match counter increased
            if (gameCard.elfNumbers.includes(winningNumber)) cardMatchCounter++;
        });
        // add card to array
        matchCounts[gameCard.cardNumber] = cardMatchCounter;
    });
    // remove empty matches
    //matchCounts = matchCounts.filter(elm => elm);
    // return result
    return matchCounts;
}

// add a new copy of a card
function copyCard(card: number) {
    if (card > 0) {
        answerCounter++;
        // get card match count
        let matchCount = cardMatches[card];
        // loop until match count
        if (matchCount> 0) {
            for (let i = card+1; i<=card+matchCount;i++) {
                // create copy of the next card
                copyCard(i);
            }
        }
    }
} 

// read file
const data = readFileSync(dataFile, 'utf-8');

// parse file data - populate scratchCards array
ParseData(data);

// convert list of cards into an array of card numbers and the number of matches it has
let cardMatches: number[] = GetCardCounts(scratchCards);

// walk through array recursively adding up matches to get total
cardMatches.forEach((matches,card) => {
    copyCard(card);
});

    // output result
console.log(answerCounter);

// eof