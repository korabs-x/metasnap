import './App.css';
import { retreiveSnap } from "./retreiveSnap";
import { getSnapsForURL } from "./manageSnaps";
import React, { useState } from 'react';

function App() {
    const [snaps, setSnaps] = useState({});

    console.log("t:" + JSON.stringify(Object.entries(snaps)));
    return (
        <div className="App">
            <header className="App-header">
                <h3>
                    Paste url to store a snapshot of it:
                </h3>
                <form
                    onSubmit={async (event) => {
                        event.preventDefault();
                        console.log(event.target.url.value)
                        const snap = await retreiveSnap(event.target.url.value);
                        console.log(snap)
                        //const snap = {date: 'nowStr', url: 'url', snapUrl: 'snapUrl'};
                        //storeSnapMetadata(snap);
                    }}
                >
                    <div style={{ fontSize: 12 }}>
                        Examples:<br />
                        https://www.webkitx.com/doc/light/images/WebKitX_Logo_64x64.png<br />
                        https://bafzbeibnbpxeejbzvkgb26ex4x6k336gwyr25kzldyxiwdlvalrmbwlpwq.textile.space/test.txt
                    </div>
                    <br />
                    <input
                        name="url"
                        type="text"
                        placeholder="https://docs.filecoin.io/"
                        defaultValue="https://bafzbeibnbpxeejbzvkgb26ex4x6k336gwyr25kzldyxiwdlvalrmbwlpwq.textile.space/test.txt"
                    />
                    <button type="submit" className="cta-button submit-gif-button">
                        Snap!
                    </button>
                </form>


                <h3>
                    Or retrieve snapshots via url:
                </h3>
                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        console.log(event.target.url.value)
                        const url = event.target.url.value
                        const snaps = getSnapsForURL(url)
                        console.log(snaps)
                        // TODO: list dates of available snaps with dates
                        //const dates = snaps.keys();
                        console.log("t1:" + JSON.stringify(Object.entries(snaps)));
                        setSnaps(snaps);
                        console.log("t2:" + JSON.stringify(Object.entries(snaps)));
                    }}
                >
                    <input
                        name="url"
                        type="text"
                        placeholder="https://docs.filecoin.io/"
                        defaultValue="https://bafzbeibnbpxeejbzvkgb26ex4x6k336gwyr25kzldyxiwdlvalrmbwlpwq.textile.space/test.txt"
                    />
                    <button type="submit" className="cta-button submit-gif-button">
                        Go!
                    </button>
                </form>
                <ul>
                    {Object.entries(snaps).map(([key, val]) => <li key={key}><a href={val.snapUrl}>{key}</a></li>)}
                </ul>
            </header>
        </div>
    );
}

export default App;
