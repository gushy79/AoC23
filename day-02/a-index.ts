/*
Determine which games would have been possible if the bag had been loaded with
only 12 red cubes, 13 green cubes, and 14 blue cubes. What is the sum of the IDs
of those games?

Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
*/

// config
let runMode: string  = "real";  // sample / real

// ***** do not edit below this line *****
// import libraries
import { readFileSync } from 'fs';

let dataFile: string = './a-sample-data.txt'; // sample data file
if (runMode == "real") dataFile = './a-data.txt'; // real/live data file


let gameIDs: number[] = [0]; // power of games array, start with a 0, this won't affect the score.
let totalOfGameIDs: number = 0; // total of games powers = 0
const maxReds: number = 12;
const maxGreens: number = 13;
const maxBlues: number = 14;

// read file
const data = readFileSync(dataFile, 'utf-8');

let counter: number = 0;

// walk through lines of file
const lines = data.split("\n");
for (const line of lines) {
    // if not blank
    if (line.trim() != "") {
        let validGame = true;

        // split on colon [Game][Cubes]
        let gameData = line.split(": ");
        // split game on space [Game][ID]
        let gameID = gameData[0].split(" ");
        // split Cubes on  , or ;
        let gameCubes = gameData[1].split(/, |; /gm);
        // walk through cubes array
        gameCubes.forEach(cube => {
            // split cube on space [number][colour]
            let cubeDetail = cube.split(" ");
            // if colour = red and it's more than the max, the game is invalid.
            if (cubeDetail[1].trim().toLowerCase() == "red") {
                let i: number = parseInt(cubeDetail[0].trim(),10);
                if (i > maxReds) validGame = false;
            }
            // if colour = green and it's more than the max, the game is invalid.
            if (cubeDetail[1].trim().toLowerCase() == "green") {
                let i: number = parseInt(cubeDetail[0].trim(),10);
                if (i > maxGreens) validGame = false;
            }
            // if colour = blue and it's more than the max, the game is invalid.
            if (cubeDetail[1].trim().toLowerCase() == "blue")  {
                let i: number = parseInt(cubeDetail[0].trim(),10);
                if (i > maxBlues) validGame = false;
            }
        })
        // if the game is valid and add to array
        if (validGame) gameIDs.push(parseInt(gameID[1],10));
    } else {
        // throw error
        throw "Blank line found in data file";
    }
    counter++;
}

// walk through valid games array
gameIDs.forEach(gameID => {
    // add value to total of games ids
    totalOfGameIDs += gameID;
})

// output result
console.log(totalOfGameIDs);

// eof