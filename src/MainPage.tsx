import { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function App() {
  const [count, setCount] = useState(0);
  const location = useLocation();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    { message: string; from: "us" | "them" }[]
  >([]);
  const messageDivRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  console.log(location.search);
  const queryParams = new URLSearchParams(location.search);
  const backgroundColor = queryParams.get("backgroundColor") || "#fff";
  const messageFieldColor = queryParams.get("messageFieldColor") || "#fff";
  const incommingMessageColor =
    queryParams.get("incommingMessageColor") || "#fff";
  const incommingMessageTextColor =
    queryParams.get("incommingMessageTextColor") || "#fff";
  const outgoingMessageColor =
    queryParams.get("outgoingMessageColor") || "#fff";
  const outgoingMessageTextColor =
    queryParams.get("outgoingMessageTextColor") || "#fff";
  const messageFieldTextColor =
    queryParams.get("messageFieldTextColor") || "#ffffff";
  const botId =
    queryParams.get("botId") || "17c61dc1-62c1-4a77-860a-db11dff0b58b";

  console.log(
    "backgroundColor:",
    backgroundColor,
    "messageFieldColor:",
    messageFieldColor,
    "incommingMessageColor:",
    incommingMessageColor,
    "incommingMessageTextColor:",
    incommingMessageTextColor,
    "outgoingMessageColor:",
    outgoingMessageColor,
    "outgoingMessageTextColor:",
    outgoingMessageTextColor,
    "messageFieldTextColor:",
    messageFieldTextColor
  );

  const renderMessages = () => {
    return messages.map((message, index) => (
      <div
        key={index}
        className={`flex items-center ${
          message.from === "us" ? "justify-end" : "justify-start"
        }`}
      >
        <div
          className={`py-1 px-4 mb-2 max-w-1/2 ${
            message.from === "us"
              ? "rounded-tl-lg rounded-br-lg"
              : "max-w-lg rounded-tr-lg rounded-bl-lg"
          }`}
          style={
            message.from === "us"
              ? {
                  backgroundColor: "#" + outgoingMessageColor,
                  color: "#" + outgoingMessageTextColor,
                }
              : {
                  backgroundColor: "#" + incommingMessageColor,
                  color: "#" + incommingMessageTextColor,
                }
          }
        >
          <p className="w-full text-justify max-w-full">{message.message}</p>
        </div>
      </div>
    ));
  };
  bottomRef.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <div
      style={{
        backgroundColor: "#" + backgroundColor,
      }}
      className="h-screen"
    >
      <div className="flex flex-col h-screen justify-end items-end">
        <div
          // id="message-box"
          ref={messageDivRef}
          className="w-full p-4 overflow-y-auto overflow-x-hidden"
        >
          {renderMessages()}
          <div ref={bottomRef} className="h-6"></div>
        </div>
        <form
          className="w-full"
          onSubmit={async (e) => {
            e.preventDefault();
            if (message === "") return;
            setMessages([
              ...messages,
              {
                message,
                from: "us",
              },
            ]);
            bottomRef.current?.scrollIntoView({ behavior: "smooth" });
            const prevMessage = message;
            setMessage("");
            const bodyFormData = new FormData();
            bodyFormData.append("message", prevMessage);
            const response = await axios.post(
              "https://chat.witlingo.com/api/chat/7/" + botId + "/",
              bodyFormData
            );
            console.log(response.data);
            setTimeout(() => {
              setMessages([
                ...messages,
                {
                  message: prevMessage,
                  from: "us",
                },
                {
                  message: response.data.answer,
                  from: "them",
                },
              ]);
            }, 1000);
            console.log(bottomRef.current);
            bottomRef.current?.scrollIntoView();
            //   handleMessageSubmit(message);
          }}
        >
          <div className="flex">
            <input
              value={message}
              placeholder="Type your message..."
              onChange={(e) => setMessage(e.target.value)}
              style={{
                backgroundColor: "#" + messageFieldColor,
                color: "#" + messageFieldTextColor,
              }}
              className="h-16 p-4 w-full rounded-none "
            ></input>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
