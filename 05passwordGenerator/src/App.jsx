import { useState, useCallback, useEffect, useRef } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="w-full max-w-md mx-auto shadow-lg rounded-lg p-6 my-10 bg-gray-800 text-orange-500 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105">
      <h1 className='text-2xl text-white text-center mb-6 font-bold animate-pulse'>Password Generator</h1>
      <div className="flex shadow-md rounded-lg overflow-hidden mb-6">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-2 px-4 bg-gray-700 text-white"
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copyPasswordToClipboard}
          className='bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition duration-300'
        >Copy</button>
      </div>
      <div className='flex flex-col gap-4'>
        <div className='flex items-center justify-between'>
          <label className="text-white">Length: {length}</label>
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer w-2/3'
            onChange={(e) => { setLength(e.target.value) }}
          />
        </div>
        <div className="flex items-center justify-between">
          <label htmlFor="numberInput" className="text-white">Numbers</label>
          <input
            type="checkbox"
            checked={numberAllowed}
            id="numberInput"
            className="form-checkbox h-5 w-5 text-blue-600"
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
          />
        </div>
        <div className="flex items-center justify-between">
          <label htmlFor="characterInput" className="text-white">Characters</label>
          <input
            type="checkbox"
            checked={charAllowed}
            id="characterInput"
            className="form-checkbox h-5 w-5 text-blue-600"
            onChange={() => {
              setCharAllowed((prev) => !prev)
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
