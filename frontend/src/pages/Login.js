import { useForm} from 'react-hook-form';

export default function Login() {
    // Make POST request and navigate to next page
    const onSubmit = async (data) => {  
        console.log(data);
        // Make POST request to server
        // If successful, navigate to next page
        // If not, display error message
    }
    
    return (
        <div>
            <form onSubmit = {onSubmit}>
                <label>
                    What is your mobile number?
                    <input name="mobile"/>
                </label>
                <input type="submit" value="submit"/>
            </form>
        </div>
    );

}