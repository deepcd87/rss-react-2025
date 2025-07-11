import { Component, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

class Greeting extends Component {
  state = {
    name: 'Denis',
  };

  changeName = (e) => {
    const newName = e.target.value;
    this.setState({
      name: newName,
    });
    // this.setState({ name: 'Bob' });
  };
  render() {
    return (
      <div>
        <h1>Hello, {this.state.name}</h1>
        {/* <button type="button" onClick={this.changeName}>
          Change name
        </button> */}
        <input value={this.state.name} onChange={this.changeName} />
      </div>
    );
  }
}
function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      {/* <div>
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React My (my 2)</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
      <Greeting name="Den" />
    </>
  );
}

export default App;
