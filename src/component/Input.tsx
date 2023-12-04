import { useState, KeyboardEvent } from "react";
import { AiOutlineClear } from "react-icons/ai";
import axios from "axios";

const Input = () => {
  const [items, setItems] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [generatedText, setGeneratedText] = useState<string | null>(null);

  const addItem = async () => {
    if (inputValue.trim() !== "") {
      try {
        const response = await axios.post(
          "https://api.openai.com/v1/engines/davinci/completions",
          {
            prompt: inputValue,
            max_tokens: 50,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization:
                "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", // Replace with your actual API key
            },
          }
        );

        if (response.data.choices && response.data.choices.length > 0) {
          const text = response.data.choices[0]?.text.trim();
          setItems([...items, text || inputValue]);
          setInputValue("");
          setGeneratedText(text);
        } else {
          console.error("Invalid response from OpenAI API");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const deleteItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addItem();
    }
  };

  return (
    <>
      <ul>
        {items.map((item, index) => (
          <li key={index} className="flex items-center px-10">
            <div className="bg-green-500 w-8 h-8 rounded-full mr-2 mb-2"></div>
            {item}
            <button
              className="px-3 py-2 outline-none bg-slate-300 hover:bg-slate-400 ml-1 text-slate-900"
              onClick={() => deleteItem(index)}
            >
              <AiOutlineClear />
            </button>
          </li>
        ))}
      </ul>
      <div className="flex justify-center">
        <input
          className="text-slate-600 bg-slate-300 px-3 py-2 outline-none"
          type="text"
          placeholder="Enter Something..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button
          className="px-3 py-2 outline-none bg-slate-300 hover:bg-slate-400 ml-2 text-slate-900"
          onClick={addItem}
        >
          Send
        </button>
      </div>
      {generatedText && (
        <p className="text-slate-900 mt-4">Generated Text: {generatedText}</p>
      )}
    </>
  );
};

export default Input;
