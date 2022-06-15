import './App.css';
import Button from './components/button.js';

function App() {
  return (
    <div className="App">
      <Button text="NOT A CUSTOMER YET?" color="bg-red" onClick={() => alert('You clicked me!')} />
      <Button text="LOG IN" color="bg-slate" onClick={() => alert('You clicked me!')} />
    </div>
  );
}

export default App;

