import React, {useState} from 'react';
import './RandomSong.scss';


// putting a pin in this :(
const RandomSongComplex = () => {

    const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

    const [options, setOptions] = useState({
        keys: [] = notes,
        degrees: [] = [1,2,3,4,5,6,7],
    });
    const [allNotes, setAllNotes] = useState<boolean>(true);
    const [progression, setProgression] = useState("");

    const getRandFromArr = (arr: any[]) => arr.length && arr[Math.floor(Math.random() * 10)];
    const getRandomTheory = (allKeys: string[], allChords: string[], allModes?: string[],
                             length?: number, repeat?: boolean) => {
        const keyCenter = getRandFromArr(allKeys);
        const chord = getRandFromArr(allChords);
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
            </header>

            <div className="selection-box key-select">
                <form>
                    <input type="button" onClick={() => console.log( $('form').serializeArray())}  />
                <details>
                    <summary>Keys</summary>
                    <fieldset>
                        <input type="checkbox" id="all-keys" name="all-keys" defaultChecked={true} checked={allNotes}
                               onChange={() => setAllNotes(!allNotes)}/>
                        <label htmlFor="all-keys"> All Keys</label>

                        <div className="selection-box">

                            {notes.map(note => {
                                return <span className="check-selection">
                                    <input type="checkbox" id={`note-${note}`} name={`note-${note}`} defaultChecked
                                           disabled={allNotes}/>
                                    <label htmlFor={`note-${note}`}>{note}</label>
                                </span>
                            })}
                        </div>
                    </fieldset>
                </details>

                <div className="selection-box degree-select">

                    <details>
                        <fieldset>
                            <summary>Degrees</summary>
                            {
                                Array.from({length: 7}).map((n, index) => {
                                    return <span className="check-selection">
                                    <input type="checkbox" id={`degree-${index + 1}`} defaultChecked/>
                                    <label htmlFor="all-keys">{index + 1}</label>
                                </span>
                                })

                            }
                        </fieldset>
                    </details>

                </div>
                </form>
            </div>

        </div>
    );
}

export default RandomSongComplex;
