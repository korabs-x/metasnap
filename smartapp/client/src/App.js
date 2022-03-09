import React, {Component} from "react";
import MetaSnapContract from "./contracts/MetaSnap.json";
import getWeb3 from "./getWeb3";

import "./App.css";
import {retreiveSnap} from "../../../app/src/retreiveSnap";
import {getSnapsForURL} from "../../../app/src/manageSnaps";

class App extends Component {
    state = {storageValue: 0, web3: null, accounts: null, contract: null};

    componentDidMount = async () => {
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
            this.setState({web3, accounts, contract: instance}, this.runExample);
        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(error);
        }
    };

    runExample = async () => {
        const {accounts, contract} = this.state;

        // Stores a given value, 5 by default.
        //await contract.methods.set(5).send({ from: accounts[0] });
        await contract.methods.addSnapshot('https://weburl', 20201444, 'https://snapshoturl3').send({from: accounts[0]});

        // Get the value from the contract to prove it worked.
        const response = await contract.methods.get().call();

        // Update state with the result.
        this.setState({storageValue: response});
    };

    render() {
        if (!this.state.web3) {
            return <div>Loading Web3, accounts, and contract...</div>;
        }
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
                            defaultValue="https://www.webkitx.com/doc/light/images/WebKitX_Logo_64x64.png"
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
                            setSnaps(JSON.parse(JSON.stringify(snaps)));
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
                    <ul>
                        {Object.entries(snaps).map(([key, val]) => <div key={key} ><a href={val.snapUrl}>{key}</a><br/></div>)}
                    </ul>
                </header>
            </div>
        );
    }
}

export default App;
