import './App.css';
import Button from './components/button.js';

function App() {
  return (
    <div className="App">
      <Button text="NOT A CUSTOMER YET?" bgcolor="bg-red-500" hovercolor = "hover:bg-red-700" onClick={() => alert('You clicked me!')} />
      <Button text="LOG IN" bgcolor="bg-slate-500" hovercolor="hover:bg-slate-700" onClick={() => alert('You clicked me!')} />
      <h1>Hello World!</h1>
      <h2 className='bg-green-400'>Testing</h2>
    </div>
  );
}

export default App;

