import React, { useState } from 'react';
import type { ChangeEvent } from 'react';
import axios from "axios";
import type { AxiosResponse } from "axios";
import ReactMarkdown from "react-markdown";

// Type definitions
interface Message {
  sender: "user" | "bot";
  text: string;
}

interface GeminiApiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

interface GeminiRequestData {
  contents: Array<{
    parts: Array<{
      text: string;
    }>;
  }>;
}

const Chat: React.FC = () => {
  // State to store the current user input
  const [question, setQuestion] = useState<string>(""); 
  // State to store the conversation (array of messages)
  const [chat, setChat] = useState<Message[]>([]); 
  // State to show a "loading" message when waiting for response
  const [isLoading, setIsLoading] = useState<boolean>(false); 

  // Function to send user input & get response
  async function generateChat(): Promise<void> {
    if (!question.trim()) return; // stop empty input
    
    // Step 1: Immediately add user's message to the chat
    const newUserMsg: Message = { sender: "user", text: question };
    setChat(prev => [...prev, newUserMsg]);
    
    // Clear the input box after sending
    setQuestion("");
    
    try {
      setIsLoading(true); // show "bot is typing"
      
      // Step 2: Call Gemini API with user text
      const requestData: GeminiRequestData = {
        "contents": [
          {
            "parts": [{ "text": newUserMsg.text }]
          }
        ]
      };

      const response: AxiosResponse<GeminiApiResponse> = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=YOUR_API_KEY_HERE",
        method: "post",
        data: requestData
      });
      
      // Step 3: Extract response text from API
      const generatedAnswer: string = response.data.candidates[0].content.parts[0].text;
      
      // Step 4: Add the bot's response to chat
      const newBotMsg: Message = { sender: "bot", text: generatedAnswer };
      setChat(prev => [...prev, newBotMsg]);
    } catch (error) {
      console.error("Error fetching response:", error);
      // Add an error message in chat if API fails
      const errorMsg: Message = { sender: "bot", text: "Oops! Something went wrong." };
      setChat(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  }

  // Handle textarea change
  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setQuestion(e.target.value);
  };

  // Handle Enter key press (optional enhancement)
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      generateChat();
    }
  };

  return (
    <div className="h-[75%] w-full flex flex-col">
      {/* Chat history takes all space except input box */}
      <div className="flex-1 overflow-y-auto p-4 mb-2">
        {chat.map((message: Message, index: number) => (
          <div 
            key={index} 
            className={`flex ${message.sender === "user" ? "justify-start" : "justify-end"}`}
          >
            <p 
              className={`m-2 p-2 rounded-lg max-w-xs ${
                message.sender === "user" ? "bg-blue-200" : "bg-green-200"
              }`}
            >
              <ReactMarkdown>{message.text}</ReactMarkdown>
            </p>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-end">
            <p className="m-2 p-2 text-gray-500 italic">Bot is typing...</p>
          </div>
        )}
      </div>
      
      {/* Input area - fixed at bottom, never overlaps */}
      <div className="p-3  flex items-center ">
        <textarea
          className="flex-1 border-2 rounded-xl p-2 resize-none focus:outline-none bg-amber-50"
          rows={1}
          placeholder="Type a message..."
          value={question}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <button
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
          onClick={generateChat}
          disabled={isLoading || !question.trim()}
        >
          ➤
        </button>
      </div>
    </div>
  );
};

export default Chat;