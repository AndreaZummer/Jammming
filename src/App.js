import logo from './logo.svg';
import './App.css';

import GetDataFromAPI from './files/containers/getDataFromAPI';
import Searching from './files/containers/searching';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>JAMMMING</h1>
        <Searching />
        <GetDataFromAPI />
      </header>
    </div>
  );
}

export default App;
