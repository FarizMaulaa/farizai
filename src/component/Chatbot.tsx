import React, { useState, useEffect } from "react";
import axios from "axios";

interface Message {
  id: number;
  content: string;
  sender: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const openaiAPIKey = "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";

  useEffect(() => {
    const fetchBotResponse = async () => {
      if (input.trim() !== "") {
        try {
          const response = await axios.post(
            "https://api.openai.com/v1/engines/davinci-codex/completions",
            {
              prompt: input,
              max_tokens: 50,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${openaiAPIKey}`,
              },
            }
          );

          const generatedText = response.data.choices[0].text.trim();
          const botMessage: Message = {
            id: messages.length + 2,
            content: generatedText,
            sender: "Bot",
          };
          setMessages([...messages, botMessage]);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchBotResponse();
  }, [input]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSendMessage = () => {
    if (input.trim() !== "") {
      const newMessage: Message = {
        id: messages.length + 1,
        content: input,
        sender: "User",
      };
      setMessages([...messages, newMessage]);
      setInput("");
    }
  };

  return (
    <div>
      <div>
        {messages.map((message) => (
          <div key={message.id}>
            <strong>{message.sender}: </strong>
            {message.content}
          </div>
        ))}
      </div>
      <div>
        <input type="text" value={input} onChange={handleInputChange} />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;

// 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
