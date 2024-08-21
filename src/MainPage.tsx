import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import autoAnimate from "@formkit/auto-animate";
// import react markdown
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import InitialQuestions from "./components/InitialQuestions";

const messages: { message: string; from: "us" | "them" }[] = [
  {
    message: "Please enter the address you would like to analyze.",
    from: "them",
  },
];

function App() {
  const defaultMessages: { message: string; from: "us" | "them" }[] = [
    {
      message: "Please enter the address you would like to analyze.",
      from: "them",
    },
  ];
  const location = useLocation();
  const [message, setMessage] = useState("");
  // const [messages, setMessages] =
  //   useState<{ message: string; from: "us" | "them" }[]>(defaultMessages);
  const [messageCount, setMessageCount] = useState(0);
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

  // Voice-related state
  const [transcript, setTranscript] = useState("");
  const [listening, setListening] = useState(false);
  const [isSpeechRecognitionStarted, setSpeechRecognitionStarted] =
    useState(false);
  const [language, setLanguage] = useState<"en-US" | "ne-NP">("en-US");

  let wasLastMessageVoice = false;
  const recognition = new (window as any).webkitSpeechRecognition();

  const startRecording = () => {
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";
    recognition.start();
    recognition.onstart = () => {
      setTimeout(() => {
        setListening(true);
        setSpeechRecognitionStarted(true);
        console.log("started");
      }, 1000);
      // setListening(true);
      // setSpeechRecognitionStarted(true);
      // console.log("started");
    };

    let finalTranscript = "";

    recognition.onresult = (event: any) => {
      let interimTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          recognition.stop();
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      if (interimTranscript !== "") {
        finalTranscript = interimTranscript;
        // setTranscript(interimTranscript);
        // setMessage(interimTranscript);
      }
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
    };

    recognition.onend = () => {
      console.log("Speech recognition ended.");
      setListening(false);
      // setTranscript("");
      if (finalTranscript !== "") {
        wasLastMessageVoice = true;
        submitData(finalTranscript);
      }
    };
  };

  const stopRecording = () => {
    setListening(false);
    setSpeechRecognitionStarted(false);
    // const recognition = new (window as any).webkitSpeechRecognition();
    recognition.stop();
  };

  const submitData = async (message: string) => {
    setAnswering(true);
    setMessage("");
    // setMessages([
    //   ...messages,
    //   {
    //     message,
    //     from: "us",
    //   },
    // ]);
    messages.push({
      message,
      from: "us",
    });
    setMessageCount(messageCount + 1);
    messageParent.current && autoAnimate(messageParent.current);
    bottomRef.current?.scrollIntoView();
    const prevMessage = message;
    // const bodyFormData = new FormData();
    // bodyFormData.append("message", prevMessage);
    // const response = await axios.post(
    //   apiURL + `chat/${botId}/${ID}/`,
    //   bodyFormData
    // );

    // while (thread === "") {
    //   console.log("waiting for thread");
    // }

    // const response = await axios.get(
    //   apiURL + `/query?query=${prevMessage}&thread_id=${thread}`
    // );

    // create fake response with timeout of 3 seconds
    const response: any = await new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            message: "This is a fake response.",
          },
        });
      }, 3000);
    });

    bottomRef.current?.scrollIntoView();
    setAnswering(false);

    // setMessages([
    //   ...messages,
    //   {
    //     message: prevMessage,
    //     from: "us",
    //   },
    //   {
    //     message: response.data.message,
    //     from: "them",
    //   },
    // ]);
    messages.push({
      message: response.data.message,
      from: "them",
    });
    setMessageCount(messageCount + 1);

    if (wasLastMessageVoice) {
      const utterance = new SpeechSynthesisUtterance();
      utterance.lang = language;
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.volume = 1;
      utterance.text = response.data.message;
      speechSynthesis.speak(utterance);
      wasLastMessageVoice = false;
      // wait for utterance to be spoken
      utterance.onend = () => {
        startRecording();
      };
      // startRecording();
    }
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
        <p className="hidden">{messageCount}</p>
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

            {listening && <p>Listening...</p>}
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
                  value={transcript ? transcript : message}
                  placeholder="Type your message..."
                  onChange={(e) => setMessage(e.target.value)}
                  style={{
                    backgroundColor: "#" + messageFieldColor,
                    color: "#" + messageFieldTextColor,
                  }}
                  className="h-16 p-4 flex-grow rounded-none "
                ></input>
                <button
                  onClick={() => {
                    if (!listening) {
                      startRecording();
                    } else {
                      stopRecording();
                    }
                  }}
                  className="h-16 w-16 rounded-none bg-gray-700"
                  type="button"
                >
                  <svg
                    height="30px"
                    width="30px"
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 278.163 278.163"
                    xmlSpace="preserve"
                    fill="#e5e7eb"
                    stroke="#e5e7eb"
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
                          <path
                            style={{ fill: "#15803d" }}
                            d="M225.235,94.987h-25.17V69.762c0-29.47-23.281-53.436-51.902-53.436 c-28.594,0-51.875,23.965-51.875,53.436v25.225H69.283c-3.834,0-6.957,3.177-6.957,7.148v50.067 c0,45.794,34.4,83.454,78.004,87.097v24.568h-20.596c-3.834,0-6.929,3.177-6.929,7.148c0,3.944,3.095,7.148,6.929,7.148h54.12 c3.834,0,6.957-3.204,6.957-7.148c0-3.971-3.122-7.148-6.957-7.148h-19.665v-24.568c43.603-3.643,77.976-41.302,77.976-87.097 v-50.067C232.165,98.165,229.07,94.987,225.235,94.987z M218.279,152.203c0,40.316-31.853,73.128-71.019,73.128 s-71.047-32.812-71.047-73.128v-42.918h20.076v41.713c0,29.443,23.281,53.436,51.875,53.436c28.621,0,51.902-23.993,51.902-53.436 v-41.713h18.214C218.279,109.284,218.279,152.203,218.279,152.203z"
                          ></path>{" "}
                          <g id="XMLID_18_">
                            {" "}
                            <g>
                              {" "}
                              {/* <path
                                  style={{ fill: '#e5e7eb' }}
                                  d="M169.852,114.513v20.158c0,21.582-17.036,39.139-38.016,39.139 c-20.952,0-37.988-17.556-37.988-39.139v-20.158h7.176c3.807,0,6.929-3.204,6.929-7.149c0-3.944-3.122-7.148-6.929-7.148h-7.176 V63.433h7.176c3.807,0,6.929-3.204,6.929-7.149s-3.122-7.149-6.929-7.149h-6.929c2.082-19.556,18.214-34.839,37.742-34.839 c19.556,0,35.688,15.283,37.769,34.839h-7.258c-3.834,0-6.929,3.205-6.929,7.149s3.095,7.149,6.929,7.149h7.505v36.783h-7.505 c-3.834,0-6.929,3.204-6.929,7.148s3.095,7.149,6.929,7.149C162.348,114.513,169.852,114.513,169.852,114.513z"
                                ></path>{' '} */}
                              <path
                                style={{ fill: "#e5e7eb" }}
                                d="M53.458,137.824L53.458,137.824c-4.18,0-7.359,3.659-6.907,7.814 c1.137,10.443,4.073,20.331,8.474,29.336c1.175,2.407,3.607,3.949,6.286,3.949h0.063c5.122,0,8.526-5.368,6.253-9.956 c-3.782-7.625-6.302-16.02-7.272-24.888C59.968,140.532,57.026,137.824,53.458,137.824z"
                              ></path>{" "}
                              <path
                                style={{ fill: "#e5e7eb" }}
                                d="M208.909,78.661h-25.17V53.436C183.738,23.965,160.458,0,131.836,0 c-28.594,0-51.875,23.965-51.875,53.436v25.225H52.956c-3.834,0-6.957,3.177-6.957,7.149v40.818 c0,3.834,3.109,6.943,6.943,6.943l0,0c3.834,0,6.943-3.109,6.943-6.943v-33.67h20.076v41.713 c0,29.443,23.281,53.436,51.875,53.436c28.621,0,51.902-23.993,51.902-53.436V92.958h18.214v42.918 c0,40.316-31.853,73.128-71.019,73.128c-20.528,0-39.048-9.016-52.025-23.401c-1.364-1.512-3.265-2.427-5.302-2.427l0,0 c-6.023,0-9.304,7.138-5.302,11.638c14.07,15.825,33.708,26.321,55.701,28.159v24.568h-20.596c-3.834,0-6.929,3.177-6.929,7.148 c0,3.944,3.095,7.149,6.929,7.149h54.12c3.834,0,6.957-3.204,6.957-7.149c0-3.971-3.122-7.148-6.957-7.148h-19.665v-24.568 c43.603-3.643,77.976-41.302,77.976-87.097V85.809C215.838,81.838,212.743,78.661,208.909,78.661z M169.852,100.216h-7.505 c-3.834,0-6.929,3.204-6.929,7.148s3.095,7.149,6.929,7.149h7.505v20.158c0,21.582-17.036,39.139-38.016,39.139 c-20.952,0-37.988-17.556-37.988-39.139v-20.158h7.176c3.807,0,6.929-3.204,6.929-7.149c0-3.944-3.122-7.148-6.929-7.148h-7.176 V63.433h7.176c3.807,0,6.929-3.204,6.929-7.149s-3.122-7.149-6.929-7.149h-6.929c2.082-19.556,18.214-34.839,37.742-34.839 c19.556,0,35.688,15.283,37.769,34.839h-7.258c-3.834,0-6.929,3.205-6.929,7.149s3.095,7.149,6.929,7.149h7.505v36.783H169.852z "
                              ></path>{" "}
                            </g>{" "}
                          </g>{" "}
                        </g>{" "}
                      </g>{" "}
                    </g>
                  </svg>
                </button>
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
