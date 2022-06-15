import Button from '../components/Button.js';

export default function Landing() {
    return (
        <div>
            <Button text="NOT A CUSTOMER YET?" bgcolor="bg-red-500" hovercolor = "hover:bg-red-700" onClick={() => alert('You clicked me!')} />
            <Button text="LOG IN" bgcolor="bg-slate-500" hovercolor="hover:bg-slate-700" onClick={() => alert('You clicked me!')} />
            <h1>Hello World!</h1>
            <h2 className='bg-green-400'>Testing</h2>
        </div>
    )
}