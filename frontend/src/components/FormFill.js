export default function FormFill({ text, type, onFill, name}) {    
    return (
        <div className="mb-3">
        <label 
            className="block font-medium">
                {text}
        </label>
        <input 
            type={type}
            className={`${name} border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500` }
            placeholder={text}
            {...onFill}
        />
        </div>
    );
}
