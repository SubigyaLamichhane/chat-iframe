import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import autoAnimate from "@formkit/auto-animate";
// import react markdown
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import InitialQuestions from "./components/InitialQuestions";

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
  const defaultMessages: { message: string; from: "us" | "them" }[] = [
    {
      message: "Please enter the address you would like to analyze.",
      from: "them",
    },
  ];
  const location = useLocation();
  const [message, setMessage] = useState("");
  const [messages, setMessages] =
    useState<{ message: string; from: "us" | "them" }[]>(defaultMessages);
  const [fetched, setFetched] = useState(true);
  const messageDivRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputBoxRef = useRef<HTMLInputElement>(null);
  // console.log(location.search);
  const queryParams = new URLSearchParams(location.search);
  const parent = useRef(null);
  const messageParent = useRef(null);

  const apiURL = "https://intelligenthomevaluation.com";
  // const apiURL = "https://chat-dev.witlingo.com/api/";

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
  const [messageFieldColor, setMessageFieldColor] = useState("131317");
  const [incommingMessageColor, setIncommingMessageColor] = useState("134f9c");
  const [incommingMessageTextColor, setIncommingMessageTextColor] =
    useState("ffffff");
  const [outgoingMessageColor, setOutgoingMessageColor] = useState("ffffff");
  const [outgoingMessageTextColor, setOutgoingMessageTextColor] =
    useState("000000");
  const [thread, setThread] = useState("");
  const [answering, setAnswering] = useState(false);
  const [messageFieldTextColor, setMessageFieldTextColor] = useState("ffffff");
  const [sidebarCustomization, setSidebarCustomization] = useState({
    background_color: "#131317",
    // background_color: "#FFFFFF",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMdM9MEQ0ExL1PmInT3U5I8v63YXBEdoIT0Q&s",
    text_color: "#ffffff",
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

  const submitData = async (message: string) => {
    setMessages([
      ...messages,
      {
        message,
        from: "us",
      },
    ]);
    messageParent.current && autoAnimate(messageParent.current);
    setAnswering(true);
    bottomRef.current?.scrollIntoView();
    const prevMessage = message;
    setMessage("");
    // const bodyFormData = new FormData();
    // bodyFormData.append("message", prevMessage);
    // const response = await axios.post(
    //   apiURL + `chat/${botId}/${ID}/`,
    //   bodyFormData
    // );

    // while (thread === "") {
    //   console.log("waiting for thread");
    // }

    const response = await axios.get(
      apiURL + `/query?query=${prevMessage}&thread_id=${thread}`
    );

    bottomRef.current?.scrollIntoView();
    setAnswering(false);

    setMessages([
      ...messages,
      {
        message: prevMessage,
        from: "us",
      },
      {
        message: response.data.message,
        from: "them",
      },
    ]);
    messageParent.current && autoAnimate(messageParent.current);

    bottomRef.current?.scrollIntoView();
  };

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
        text_color: response2.data.data.text_color,
      },
    };

    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      //@ts-ignore
      link.rel = "icon";
      document.getElementsByTagName("head")[0].appendChild(link);
    }
    //@ts-ignore
    link.href = response.data.logo;

    return response.data;
  };

  // useEffect(() => {
  //   const data = getData();
  //   data.then((data) => {
  //     // console.log(data);
  //     if (data.settings) {
  //       setMessageFieldColor(data.settings.messageFieldColor);
  //       setIncommingMessageColor(data.settings.incommingMessageColor);
  //       setIncommingMessageTextColor(data.settings.incommingMessageTextColor);
  //       setOutgoingMessageColor(data.settings.outgoingMessageColor);
  //       setOutgoingMessageTextColor(data.settings.outgoingMessageTextColor);
  //       setMessageFieldTextColor(data.settings.messageFieldTextColor);
  //       setBackgroundColor(data.settings.backgroundColor);
  //     }
  //     // console.log("data", data);
  //   });
  //   const sidebarData = getSidebarData();
  //   sidebarData.then((data) => {
  //     setSidebarCustomization(data);
  //     // console.log(data);
  //     setFetched(true);
  //     parent.current && autoAnimate(parent.current);
  //   });
  // }, []);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getThread = async () => {
    const response = await axios.get(apiURL + `/get-thread`);
    return response.data;
  };

  useEffect(() => {
    // get thread id
    const thread = getThread();
    thread.then((data) => {
      setThread(data.thread_id);
    });
  }, []);

  const renderMessages = () => {
    // if (messages.length === 0) {
    //   return <InitialQuestions submitData={submitData} />;
    // }
    return messages.map((message, index) => (
      <ul
        key={index}
        ref={messageParent}
        className={`flex items-center ${
          message.from === "us" ? "justify-end" : "justify-start"
        }`}
      >
        <li
          className={`fadeIn text-md  py-2 px-4 mb-2 max-w-1/2 ${
            message.from === "us"
              ? "rounded-br-xl rounded-tl-xl border border-[#131317]"
              : "max-w-lg rounded-bl-xl rounded-tr-xl"
          }`}
          style={
            message.from === "us"
              ? {
                  backgroundColor: "#" + outgoingMessageColor,
                  color: "#" + outgoingMessageTextColor,
                }
              : {
                  backgroundColor: sidebarCustomization.background_color,
                  color: sidebarCustomization.text_color,
                }
          }
        >
          {message.from === "them" ? (
            <p className="w-full md:text-justify text-left max-w-full markdown-body">
              <ReactMarkdown
                // linkTarget="_blank"
                rehypePlugins={[rehypeRaw]}
                remarkPlugins={[remarkGfm]}
              >
                {message.message}
              </ReactMarkdown>
            </p>
          ) : (
            <p className="w-full md:text-justify text-left max-w-full">
              {message.message}
            </p>
          )}
        </li>
      </ul>
    ));
  };
  bottomRef.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <div
      style={{
        backgroundColor: "#" + backgroundColor,
      }}
      className="md:h-screen "
    >
      <style>
        {`
        input::placeholder {
          color: #${backgroundColor};
        }
        `}
      </style>
      <div className="flex" ref={parent}>
        {fetched && (
          <div className="flex-grow flex flex-col md:h-screen justify-end items-end">
            {/* {fetched && (
              <div
                className="md:hidden w-full h-20 flex justify-center items-center"
                style={{
                  backgroundColor: sidebarCustomization.background_color,
                }}
              >
                {sidebarCustomization.logo && (
                  <img
                    className="h-12"
                    src={sidebarCustomization.logo}
                    alt="logo"
                  />
                )}
              </div>
            )} */}
            {/* <div className=" bg-black min-h-full"></div> */}
            <div className="fixed bottom-16 md:relative md:bottom-0 flex-grow flex flex-col w-full justify-end overflow-auto">
              <div
                // id="message-box"
                ref={messageDivRef}
                className="w-full p-4 pb-0 max-h-[calc(100vh-9rem)] md:max-h-screen overflow-y-auto overflow-x-hidden"
              >
                {renderMessages()}
                <div ref={bottomRef} className="h-6"></div>{" "}
                {answering && (
                  <div className="w-full p-2 fade-in">
                    <div
                      className="flex justify-start w-fit p-2 rounded-full"
                      style={{
                        backgroundColor: "#" + messageFieldColor,
                      }}
                    >
                      <div className="container relative">
                        <div
                          className="bouncing-ball "
                          style={{
                            backgroundColor: "#" + backgroundColor,
                          }}
                        ></div>
                      </div>
                      <div className="container  relative">
                        <div
                          className="bouncing-ball2  "
                          style={{
                            backgroundColor: "#" + backgroundColor,
                          }}
                        ></div>
                      </div>
                      <div className="container  relative">
                        <div
                          className="bouncing-ball "
                          style={{
                            backgroundColor: "#" + backgroundColor,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>{" "}
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
                submitData(message);
              }}
            >
              <div className="flex fixed bottom-0 w-full md:relative">
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
                  disabled={thread === ""}
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
      {/* <iframe src="https://intelligenthomevaluation.com" className="w-full h-screen"></iframe>  */}
    </div>
  );
}

export default App;
