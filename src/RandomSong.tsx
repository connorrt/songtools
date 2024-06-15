import React, {useState} from 'react';
import './RandomSong.scss';


// simple version without 100% note selection
// a note on all the utils functions: very little guarding for bad cases because this does not accept user input, if you
// were to use these for something else, you would need sanity checks so no one asks for something in the key of H
const RandomSong = () => {

    // output
    const [key, setKey] = useState<string>("C");
    const [progression, setProgression] = useState<number[]>([]);

    //params
    const [progLength, setProgLength] = useState(3);

    // utils

    const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    // tonality of chords in a major key
    const chords = ["M", "m", "m", "M", "M", "m", "D"];
    // intervals between notes in a major scale
    const intervals = [2, 2, 1, 2, 2, 2, 1];
    // modes listed for offset values
    const modes = ["ionian", "dorian", "phrygian", "lydian", "mixolydian", "aeolian", "locrian"]


    // get the actual chord names of the progression
    // offset should be an int from 0-6 representing the mode 0 - ionian, 1 - dorian, etc
    // TODO fix this its broke!!!!
    const getChords = (root: string, progression: number[], offset: number): string[] => {
        const result = [];
        const rootIndex:number = notes.indexOf(root);
        // sanity check
        if (rootIndex === -1) return [];
        console.log("progression::", progression)
        return progression.map((chordNum, index) => {
            console.log(index)
            // first get chord root notes in the key
            let semitoneDistance: number = 0;
            for (let i = chordNum; i > 0; i--) {
                semitoneDistance+=intervals[(i-1 + offset) % intervals.length];
                console.log("inter::", intervals[(i + offset) % intervals.length])
            }
            console.log("root::", rootIndex)
            console.log("std::", semitoneDistance)
            console.log("distance::", rootIndex + semitoneDistance)
            console.log("note::", notes[rootIndex + semitoneDistance])
            console.log("note::", notes[(rootIndex + semitoneDistance) % (notes.length+1)] )

            if (chords[(chordNum-1 + offset) % (chords.length + 1)] === "m") return notes[(rootIndex + semitoneDistance) % (notes.length+1)] + "m ";
            if (chords[(chordNum-1 + offset) % (chords.length + 1)] === "D") return notes[(rootIndex + semitoneDistance) % (notes.length+1)] + "dim ";
            return notes[(rootIndex + semitoneDistance) % (notes.length+1)] + " ";

        })

        // return progression.map((chordNum) => {
        //     // determine their tonality
        //     if (chords[(chordNum-1 + offset) % (chords.length + 1)] === "m") return notes[(rootIndex + chordNum) % (notes.length+1)] + "m";
        //     if (chords[(chordNum-1 + offset) % (chords.length + 1)] === "D") return notes[(rootIndex + chordNum) % (notes.length+1)] + "dim";
        //     return notes[(rootIndex + chordNum) % (notes.length+1)];
        // })
    }
    // get a roman numeral from a number
    // offset should be an int from 0-6 representing the mode 0 - ionian, 1 - dorian, etc
    // adapted from https://blog.stevenlevithan.com/archives/javascript-roman-numeral-converter
    const romanize = (num: number, offset: number) => {
        const numInit = num;
        let lookup:object = {V:5,IV:4,I:1},roman = '',i;
        for ( i in lookup ) {
            // @ts-ignore
            while ( num >= lookup[i] ) {
                roman += i;
                // @ts-ignore
                num -= lookup[i];
            }
        }

        if (chords[(numInit-1 + offset) % (chords.length + 1)] === "m") return roman.toLowerCase();
        if (chords[(numInit-1 + offset) % (chords.length + 1)] === "D") return roman + "dim";
        return roman;
    }
    // TODO: fix
    const romanizeArray = (nums: number[], tonality: string): string[] => {
        // assume its major/ionian
        if (tonality === "minor") {
            return nums.map((num) => romanize(num, 5));
        }
        return nums.map((num) => `${romanize(num, 0)} `);
    }

    // main functions
    const getRandFromArr = (arr: any[]) => arr.length && arr[Math.floor(Math.random() * 10)];
    const getRandomProgression = () => {
        const keyCenter = getRandFromArr(notes);

        const prog = [1];
        for (let i = 1; i <= progLength; i++) {
            prog.push(Math.floor(Math.random() * 7) + 1);
        }
        setKey(keyCenter);
        setProgression(prog);
    }

    return (
        <div className="RandomSong">
            <header className="song-generator-widget">
                <h1>
                    Random Song Structure
                </h1>
                <p>
                    plug some stuff in :)
                </p>

                <div id="song">
                    <ul>
                        <li>Key: {key}</li>
                        <li>Progression: {romanizeArray(progression, "major")}</li>
                        <li>Chords (wip): {getChords(key, progression, 0)}</li>
                    </ul>
                </div>

                <div className="selection-box key-select">
                    <button onClick={getRandomProgression}>
                        New Progression
                    </button>
                </div>
            </header>
        </div>
    );
}

export default RandomSong;
