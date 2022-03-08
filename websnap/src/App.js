import './App.css';
import {retreiveSnap} from "./retreiveSnap";

function App() {
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
            retreiveSnap(event.target.url.value); //https://stackoverflow.com/questions/247483/http-get-request-in-javascript
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
