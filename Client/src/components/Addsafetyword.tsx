import { useState, useEffect } from "react";

export default function RestrictedWordsInput() {
    // State for current input and error message
    const [input, setInput] = useState("");
    const [error, setError] = useState("");
    
    // State for restricted and saved words
    const [restrictedWords, setRestrictedWords] = useState(() => {
        // Initialize from localStorage or use default array
        const saved = localStorage.getItem("restrictedWords");
        return saved ? JSON.parse(saved) : ["bad", "wrong", "inappropriate"];
    });
    
    const [savedWords, setSavedWords] = useState(() => {
        // Initialize from localStorage or use empty array
        const saved = localStorage.getItem("savedWords");
        return saved ? JSON.parse(saved) : [];
    });

    // Update localStorage whenever restricted or saved words change
    useEffect(() => {
        localStorage.setItem("restrictedWords", JSON.stringify(restrictedWords));
    }, [restrictedWords]);

    useEffect(() => {
        localStorage.setItem("savedWords", JSON.stringify(savedWords));
    }, [savedWords]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Check if input is empty
        if (!input.trim()) {
            setError("Please enter a word");
            return;
        }

        // Check if word is restricted
        if (restrictedWords.includes(input.toLowerCase().trim())) {
            setError(`"${input}" is a restricted word!`);
            return;
        }

        // Check if word is already saved
        if (savedWords.includes(input.toLowerCase().trim())) {
            setError(`"${input}" is already saved!`);
            return;
        }

        // Add word to saved words
        setSavedWords(prev => [...prev, input.toLowerCase().trim()]);
        setInput("");
        setError("");
    };

    const removeWord = (wordToRemove) => {
        setSavedWords(prev => prev.filter(word => word !== wordToRemove));
    };

    return (
        <div className="p-6 max-w-md mx-auto bg-gradient-to-t from-gray-700 to-black shadow-lg rounded-xl text-white">
      <h2 className="text-2xl font-bold mb-4">Word Storage</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter a word..."
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black"
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
        >
          Save Word
        </button>
      </form>

      {/* Display saved words */}
      <div className="mt-6">
        <h3 className="font-semibold mb-2">Saved Words:</h3>
        {savedWords.length === 0 ? (
          <p className="text-gray-500">No words saved yet</p>
        ) : (
          <div className="space-y-2">
            {savedWords.map((word, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-black p-2 rounded"
              >
                <span>{word}</span>
                <button
                  onClick={() => removeWord(word)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Display restricted words */}
    </div>
    );
}