import './App.css';
import {retreiveSnap} from "./retreiveSnap";

function App() {
  retreiveSnap('https://stackoverflow.com/questions/247483/http-get-request-in-javascript')
  return (
    <div className="App">
      <header className="App-header">
        <h3>
          Paste url to store a snapshot of it:
        </h3>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            console.log(event.target.url.value)
            // todo call function to retrieve data of the website and store it
          }}
        >
          <input
            name="url"
            type="text"
            placeholder="https://docs.filecoin.io/"
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
            // todo call function to retrieve data of the website and store it
          }}
        >
          <input
            name="url"
            type="text"
            placeholder="https://docs.filecoin.io/"
          />
          <button type="submit" className="cta-button submit-gif-button">
            Go!
          </button>
        </form>
      </header>
    </div>
  );
}

export default App;
