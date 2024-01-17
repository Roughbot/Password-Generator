import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberaAllowed, setNumberAllowed] = useState(false);
  const [charrAllowed, setCharrAllowed] = useState(false);
  const [password, setpassword] = useState("");

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberaAllowed) str += "0123456789";
    if (charrAllowed) str += "!@#$%^&*()_+";

    for (let i = 1; i < length; i++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setpassword(pass);
  }, [length, numberaAllowed, charrAllowed]);

  useEffect(() => {
    generatePassword();
  }, [charrAllowed, numberaAllowed]);

  const CopyPasswordToClipBoard = () => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select();
  };

  const passwordRef = useRef(null);
  return (
    <div className="pt-6 mt-40 ">
      <div className="w-full  max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
        <h1 className="text-white text-center my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg mb-4 overflow-hidden">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
            onClick={CopyPasswordToClipBoard}
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={26}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(e.target.value)}
              name=""
              id=""
            />
            <label htmlFor="length">Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              defaultChecked={numberaAllowed}
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
              type="checkbox"
              name=""
              id=""
            />
            <label htmlFor="numbers"> Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              defaultChecked={charrAllowed}
              onChange={() => {
                setCharrAllowed((prev) => !prev);
              }}
              type="checkbox"
              name=""
              id=""
            />
            <label htmlFor="Characters"> Characters</label>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <button
          className="bg-green-600 rounded-xl shadow-md p-2 font-semibold text-white"
          onClick={generatePassword}
        >
          Generate
        </button>
      </div>
    </div>
  );
}

export default App;
