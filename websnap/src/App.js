import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
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
            placeholder="Enter gif link!"
          />
          <button type="submit" className="cta-button submit-gif-button">
            Submit
          </button>
        </form>
      </header>
    </div>
  );
}

export default App;
