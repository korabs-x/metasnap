import './App.css';
import {retreiveSnap} from "./retreiveSnap";
import React, {useEffect, useState} from 'react';
import getWeb3 from "./getWeb3";
import MetaSnapContract from "./contracts/MetaSnap.json";
import {BallTriangle} from "react-loader-spinner";

function App() {
    const [snaps, setSnaps] = useState({});
    const [hasRequestedResults, setHasRequestedResults] = useState(false);
    const [loadingState, setLoadingState] = useState('');
    const [web3state, setWeb3state] = useState({web3: null, accounts: null, contract: null});

    useEffect(async () => {
        try {
            // Get network provider and web3 instance.
            const web3 = await getWeb3();

            // Use web3 to get the user's accounts.
            const accounts = await web3.eth.getAccounts();

            // Get the contract instance.
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = MetaSnapContract.networks[networkId];
            const instance = new web3.eth.Contract(
                MetaSnapContract.abi,
                deployedNetwork && deployedNetwork.address,
            );

            // Set web3, accounts, and contract to the state, and then proceed with an
            // example of interacting with the contract's methods.
            setWeb3state({web3, accounts, contract: instance});
        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(error);
        }
    })

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
                        const {accounts, contract} = web3state;
                        //setLoadingState('');
                        const snap = await retreiveSnap(event.target.url.value, setLoadingState);
                        console.log(snap)
                        await contract.methods.addSnapshot(snap.url, snap.date, snap.snapUrl).send({from: accounts[0]});
                    }}
                >
                    <div style={{fontSize: 12}}>
                        Examples:<br/>
                        https://www.webkitx.com/doc/light/images/WebKitX_Logo_64x64.png<br/>
                        https://bafzbeibnbpxeejbzvkgb26ex4x6k336gwyr25kzldyxiwdlvalrmbwlpwq.textile.space/test.txt
                    </div>
                    <br/>
                    <input
                        name="url"
                        type="text"
                        placeholder="https://docs.filecoin.io/"
                        defaultValue="https://www.webkitx.com/doc/light/images/WebKitX_Logo_64x64.png"
                    />
                    <button type="submit" className="cta-button submit-gif-button">
                        Snap!
                    </button>
                </form>
                <div style={{
                    visibility: loadingState === '' ? 'hidden' : 'visible',
                    display: 'flex',
                    'margin-top': '10px',
                    fontSize: 15
                }}>
                    {/*<div style={{'margin-right': '10px', 'margin-top': 'auto', 'margin-bottom': 'auto'}}>{loadingState}</div>-->*/}
                    <BallTriangle
                        height="40"
                        width="40"
                        color="grey"
                        ariaLabel="loading-indicator"
                    />
                </div>
                <div style={{'margin-top': '10px', fontSize: 16}}>{loadingState}</div>

                <h3>
                    Or retrieve snapshots via url:
                </h3>
                <form
                    onSubmit={async (event) => {
                        event.preventDefault();
                        console.log(event.target.url.value)
                        const url = event.target.url.value
                        const {contract} = web3state
                        console.log(contract)
                        const snapshots = await contract.methods.getSnapsForUrl(url).call()
                        console.log("snapshots")
                        console.log(snapshots)
                        setSnaps(snapshots);
                        setHasRequestedResults(true)
                        //const dates = snaps.keys();
                        //setSnaps(JSON.parse(JSON.stringify(snaps)));
                    }}
                >
                    <input
                        name="url"
                        type="text"
                        placeholder="https://docs.filecoin.io/"
                        defaultValue="https://www.webkitx.com/doc/light/images/WebKitX_Logo_64x64.png"
                    />
                    <button type="submit" className="cta-button submit-gif-button">
                        Go!
                    </button>
                </form>
                <div style={{'margin-top': '30px'}}>
                    {hasRequestedResults ? (Object.values(snaps).length + ' snapshots available:') : ''}
                </div>
                {Object.values(snaps).map((val) => <div style={{'margin-top': '5px', fontSize: 26}} key={val.date}><a
                    href={val.url}>{new Date(parseInt(val.date)).toLocaleString()}</a><br/>
                </div>)}
            </header>
        </div>
    );
}

export default App;
