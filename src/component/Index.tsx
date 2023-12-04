import { useState, KeyboardEvent } from "react";
import { AiOutlineClear } from "react-icons/ai";

const Index = () => {
  const [items, setItems] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const addItem = () => {
    if (inputValue.trim() !== "") {
      setItems([...items, inputValue]);
      setInputValue("");
    }
  };

  const deleteItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (inputValue.trim() !== "") {
        setItems([...items, inputValue]);
        setInputValue("");
      }
    }
  };

  return (
    <>
      <ul>
        {items.map((item, index) => (
          <li key={index} className="flex items-center px-10">
            <div className="bg-green-500 w-8 h-8 rounded-full mr-2 mb-2"></div>
            {item}
            {/* <button
              className="px-3 py-2 outline-none bg-slate-300 hover:bg-slate-400 ml-1 text-slate-900"
              onClick={() => deleteItem(index)}
            >
              <AiOutlineClear />
            </button> */}
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
        {items.length > 0 && (
          <button
            className="px-3 py-2 outline-none bg-slate-300 hover:bg-slate-400 ml-1 text-slate-900"
            onClick={() => deleteItem(items.length - 1)}
          >
            <AiOutlineClear />
          </button>
        )}
      </div>
    </>
  );
};

export default Index;
