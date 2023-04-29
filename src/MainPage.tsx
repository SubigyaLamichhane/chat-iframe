import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import autoAnimate from "@formkit/auto-animate";

function createUUID() {
  // http://www.ietf.org/rfc/rfc4122.txt
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
  // @ts-ignore
  s[19] = parseInt(hexDigits.substr((s[19] & 0x3) | 0x8, 1)); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";

  var uuid = s.join("");
  return uuid;
}

function App() {
  const [count, setCount] = useState(0);
  const location = useLocation();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    { message: string; from: "us" | "them" }[]
  >([]);
  const [fetched, setFetched] = useState(false);
  const messageDivRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputBoxRef = useRef<HTMLInputElement>(null);
  // console.log(location.search);
  const queryParams = new URLSearchParams(location.search);
  const parent = useRef(null);
  const messageParent = useRef(null);

  const apiURL = "https://chat-dev.witlingo.com/api/";

  // const backgroundColor = queryParams.get("backgroundColor") || "#fff";

  // const messageFieldColor = queryParams.get("messageFieldColor") || "#fff";
  // const incommingMessageColor =
  //   queryParams.get("incommingMessageColor") || "#fff";
  // const incommingMessageTextColor =
  //   queryParams.get("incommingMessageTextColor") || "#fff";
  // const outgoingMessageColor =
  //   queryParams.get("outgoingMessageColor") || "#fff";
  // const outgoingMessageTextColor =
  //   queryParams.get("outgoingMessageTextColor") || "#fff";
  // const messageFieldTextColor =
  //   queryParams.get("messageFieldTextColor") || "#ffffff";

  const [backgroundColor, setBackgroundColor] = useState("ffffff");
  const [messageFieldColor, setMessageFieldColor] = useState("3b3b3b");
  const [incommingMessageColor, setIncommingMessageColor] = useState("04aa6d");
  const [incommingMessageTextColor, setIncommingMessageTextColor] =
    useState("ffffff");
  const [outgoingMessageColor, setOutgoingMessageColor] = useState("02764c");
  const [outgoingMessageTextColor, setOutgoingMessageTextColor] =
    useState("ffffff");
  const [messageFieldTextColor, setMessageFieldTextColor] = useState("ffffff");
  const [sidebarCustomization, setSidebarCustomization] = useState({
    background_color: "#E6F5F7",
    // background_color: "#FFFFFF",
    logo: "https://witlingo.com/wp-content/uploads/2019/07/witlingo_logo.png",
    // logo: "",
    links: [
      {
        name: "Launch your custom ChatGPT based Chatbot",
        url: "https://witlingo.com/chatgpt/",
      },
      {
        name: "Power up your current bot with ChatGPT capabilities",
        url: "https://witlingo.com/ivr/",
      },
      {
        name: "Pricing",
        url: "https://witlingo.com/pricing/",
      },
    ],
  });

  const botId = queryParams.get("botId") || "2";
  const [ID, setID] = useState(crypto.randomUUID());

  const getData = async () => {
    const response = await axios.get(apiURL + "chat/" + botId + "/");
    return response.data.data;
  };

  const getSidebarData = async () => {
    const response2 = await axios.get(apiURL + "chat/" + botId + "/");

    const response = {
      data: {
        background_color: response2.data.data.background_color,
        logo: response2.data.data.avatar,
        links: response2.data.data.urls as { name: string; url: string }[],
      },
    };

    return response.data;
  };

  useEffect(() => {
    const data = getData();
    data.then((data) => {
      // console.log(data);
      if (data.settings) {
        setMessageFieldColor(data.settings.messageFieldColor);
        setIncommingMessageColor(data.settings.incommingMessageColor);
        setIncommingMessageTextColor(data.settings.incommingMessageTextColor);
        setOutgoingMessageColor(data.settings.outgoingMessageColor);
        setOutgoingMessageTextColor(data.settings.outgoingMessageTextColor);
        setMessageFieldTextColor(data.settings.messageFieldTextColor);
        setBackgroundColor(data.settings.backgroundColor);
      }
    });
    const sidebarData = getSidebarData();
    sidebarData.then((data) => {
      setSidebarCustomization(data);
      setFetched(true);
      parent.current && autoAnimate(parent.current);
    });
  }, []);

  const renderMessages = () => {
    return messages.map((message, index) => (
      <div
        key={index}
        ref={messageParent}
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
      <div className="flex" ref={parent}>
        {fetched && (
          <div
            className="hidden md:block w-1/3 transition-all duration-500 ease-in-out"
            style={{
              backgroundColor: sidebarCustomization.background_color,
            }}
          >
            <div className="flex flex-col items-center justify-center h-screen">
              <div className=" h-1/4"></div>
              <div className="flex flex-col items-center">
                <img
                  className="w-1/2"
                  src={sidebarCustomization.logo}
                  alt="logo"
                />
              </div>
              <div className="pb-16"></div>
              <div className="">
                <ul
                  className="p-2 list-disc"
                  style={{
                    color: "#008ea4",
                  }}
                >
                  {sidebarCustomization.links.map((link, index) => (
                    <li className="flex-1 p-2" key={index}>
                      <a
                        key={index}
                        className="text-left font-bold text-sm"
                        style={{
                          color: "#008ea4",
                        }}
                        href={link.url}
                        target="_blank"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
        {fetched && (
          <div className="flex-grow flex flex-col h-screen justify-end items-end">
            {fetched && (
              <div
                className="md:hidden w-full h-20 flex justify-center items-center"
                style={{
                  backgroundColor: sidebarCustomization.background_color,
                }}
              >
                <img
                  className="h-12"
                  src={sidebarCustomization.logo}
                  alt="logo"
                />
              </div>
            )}
            <div className="flex-grow flex flex-col w-full justify-end">
              <div
                // id="message-box"
                ref={messageDivRef}
                className="w-full p-4 overflow-y-auto overflow-x-hidden"
              >
                {renderMessages()}
                <div ref={bottomRef} className="h-6"></div>
              </div>
            </div>

            {/* <div className="md:hidden p-4 w-full flex justify-between">
            {sidebarCustomization.links.map((link, index) => (
              <div className="flex-1 flex justify-center p-2">
                <a
                  key={index}
                  className="text-center font-bold"
                  style={{
                    color: "#008ea4",
                  }}
                  href={link.url}
                >
                  {link.name}
                </a>
              </div>
            ))}
          </div> */}
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
                messageParent.current && autoAnimate(messageParent.current);
                bottomRef.current?.scrollIntoView({ behavior: "smooth" });
                const prevMessage = message;
                setMessage("");
                const bodyFormData = new FormData();
                bodyFormData.append("message", prevMessage);
                const response = await axios.post(
                  apiURL + `chat/${botId}/${ID}/`,
                  bodyFormData
                );
                console.log(response.data);

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
                messageParent.current && autoAnimate(messageParent.current);

                bottomRef.current?.scrollIntoView();
              }}
            >
              <div className="flex">
                <input
                  autoFocus
                  ref={inputBoxRef}
                  value={message}
                  placeholder="Type your message..."
                  onChange={(e) => setMessage(e.target.value)}
                  style={{
                    backgroundColor: "#" + messageFieldColor,
                    color: "#" + messageFieldTextColor,
                  }}
                  className="h-16 p-4 flex-grow rounded-none "
                ></input>
                <button
                  type="submit"
                  style={{
                    backgroundColor: "#" + messageFieldColor,
                    color: "#" + messageFieldTextColor,
                  }}
                  className="p-4"
                >
                  <svg
                    fill={"#" + backgroundColor}
                    height="20px"
                    width="20px"
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 512.662 512.662"
                    xmlSpace="preserve"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <g>
                        {" "}
                        <g>
                          {" "}
                          <path d="M505.021,5.868c-0.064-0.043-0.085-0.107-0.128-0.149c-0.128-0.107-0.256-0.128-0.384-0.235 c-1.131-0.981-2.475-1.621-3.797-2.325c-0.427-0.213-0.747-0.576-1.195-0.768c-0.064-0.021-0.107-0.021-0.149-0.043 c-0.469-0.192-0.853-0.533-1.323-0.704c-1.771-0.661-3.648-0.875-5.547-1.045c-0.576-0.043-1.131-0.299-1.707-0.299 c-2.475-0.021-4.971,0.384-7.403,1.259L14.055,172.225c-7.445,2.709-12.779,9.323-13.867,17.173 c-1.045,7.851,2.304,15.637,8.768,20.245l141.888,101.355l20.032,140.309c1.237,8.533,7.488,15.488,15.851,17.643 c1.749,0.448,3.541,0.661,5.291,0.661c6.592,0,12.971-3.072,17.045-8.533l50.347-67.093l132.032,113.237 c3.947,3.371,8.875,5.141,13.909,5.141c2.389,0,4.779-0.405,7.125-1.216c7.168-2.56,12.48-8.768,13.845-16.277l85.995-468.928 C513.725,18.262,510.738,10.71,505.021,5.868z M240.125,348.396l-1.536,2.219l-32.747,43.669l-12.395-86.827l185.109-160.448 L240.125,348.396z"></path>{" "}
                        </g>{" "}
                      </g>{" "}
                    </g>
                  </svg>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
