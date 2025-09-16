import React, { useState } from "react";
import type { ChangeEvent } from "react";
import axios from "axios";
import type { AxiosResponse } from "axios";
import ReactMarkdown from "react-markdown";


// Type definitions
interface Message {
  sender: "user" | "bot";
  text: string;
}

interface Response {
  mood: string;
  confidence: number;
  reply: string;
}

interface RequestData {
  text: string;
  timestamp: string; // ISO 8601 date string
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
    setChat((prev) => [...prev, newUserMsg]);

    // Clear the input box after sending
    setQuestion("");

    try {
      setIsLoading(true); // show "bot is typing"

     
      // Step 2: Call Gemini API with user text
      const requestData: RequestData = {
        text: newUserMsg.text,
        timestamp: new Date().toISOString(),
      };

      const apiUrl = import.meta.env.VITE_API_URL;
      const response: AxiosResponse<Response> = await axios({
        url: `${apiUrl}/api/v1/process`,
        method: "post",
        data: requestData,
      });
      console.log(import.meta.env.VITE_API_URL);

      // Step 3: Extract response text from API
      const generatedAnswer: string = (response.data as Response).reply;
      console.log((response.data as Response).mood)

      // Step 4: Add the bot's response to chat
      const newBotMsg: Message = { sender: "bot", text: generatedAnswer };
      setChat((prev) => [...prev, newBotMsg]);
    } catch (error) {
      console.error("Error fetching response:", error);
      // Add an error message in chat if API fails
      const errorMsg: Message = {
        sender: "bot",
        text: "Oops! Something went wrong.",
      };
      setChat((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  }

  // Handle textarea change
  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    setQuestion(e.target.value);
  };

  // Handle Enter key press (optional enhancement)
  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ): void => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      generateChat();
    }
  };

  return (
    
      <div className="h-[75%] w-full flex flex-col  ">
      
      <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] overflow-x-hidden p-4 mb-2 ">
        {chat.map((message: Message, index: number) => (
          <div
            key={index}
            className={`flex w-full ${
              message.sender === "user" ? "justify-start" : "justify-end"
            }`}
          >
            <p
              className={`max-w-[70%] p-3 m-1 rounded-lg break-words overflow-wrap-anywhere ${
                message.sender === "user" ? "bg-[#160842] text-white" : "bg-[#38005f] text-white"
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

     
      <div className="p-3 max-h-fit   flex items-center ">
        <textarea
          className="flex-1 min-h-[40px] max-h-[200px] h-fit border-2 rounded-xl p-2 focus:outline-none bg-purple-100 text-purple-900 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          rows={1}
          placeholder="Type a message..."
          value={question}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <button
          className="ml-2 px-4 py-2 bg-purple-200 border-2 text-purple-900 rounded-lg hover:bg-[#190457]"
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
