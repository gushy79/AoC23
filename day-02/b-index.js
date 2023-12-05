"use strict";
/*
What is the fewest number of cubes of each color that could have been in
the bag to make the game possible?

The power of a set of cubes is equal to the numbers of red, green, and blue
cubes multiplied together. The power of the minimum set of cubes in game 1 is 48.
In games 2-5 it was 12, 1560, 630, and 36, respectively. Adding up these five
powers produces the sum 2286.

Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
*/
Object.defineProperty(exports, "__esModule", { value: true });
// config
let runMode = "real"; // sample / real
// ***** do not edit below this line *****
// import libraries
const fs_1 = require("fs");
let dataFile = './b-sample-data.txt'; // sample data file
if (runMode == "real")
    dataFile = './b-data.txt'; // real/live data file
let powerOfGames = [0]; // power of games array, start with a 0, this won't affect the score.
let totalOfGamesPowers = 0; // total of games powers = 0
let maxReds = 0;
let maxGreens = 0;
let maxBlues = 0;
let power = 0;
// read file
const data = (0, fs_1.readFileSync)(dataFile, 'utf-8');
let counter = 0;
// walk through lines of file
const lines = data.split("\n");
for (const line of lines) {
    // if not blank
    if (line.trim() != "") {
        // reset max values
        maxReds = 0;
        maxBlues = 0;
        maxGreens = 0;
        power = 0;
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
            // if colour = red and it's the highest number seen in this game, record it
            if (cubeDetail[1].trim().toLowerCase() == "red") {
                let i = parseInt(cubeDetail[0].trim(), 10);
                if (i > maxReds)
                    maxReds = i;
            }
            // if colour = gren and it's the highest number seen in this game, record it
            if (cubeDetail[1].trim().toLowerCase() == "green") {
                let i = parseInt(cubeDetail[0].trim(), 10);
                if (i > maxGreens)
                    maxGreens = i;
            }
            // if colour = blue and it's the highest number seen in this game, record it
            if (cubeDetail[1].trim().toLowerCase() == "blue") {
                let i = parseInt(cubeDetail[0].trim(), 10);
                if (i > maxBlues)
                    maxBlues = i;
            }
        });
        // calculate power of cubes and add to array
        power = maxReds * maxBlues * maxGreens;
        powerOfGames.push(power);
    }
    else {
        // throw error
        throw "Blank line found in data file";
    }
    counter++;
}
// walk through valid games array
powerOfGames.forEach(gamePower => {
    // add value to total of games ids
    totalOfGamesPowers += gamePower;
});
// output result
console.log(totalOfGamesPowers);
// eof
