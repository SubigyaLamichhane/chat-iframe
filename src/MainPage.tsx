import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import autoAnimate from "@formkit/auto-animate";
// import react markdown
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import InitialQuestions from "./components/InitialQuestions";
import MicroPhoneIcon from "./assets/microphone.png";
import MicroPhoneListeningIcon from "./assets/microphone-listening.png";
import StartRecordingSound from "./assets/start-recording.mp3";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import AddressTooltip from "./components/AddressTooltip";
import { getPostalCode } from "./utils";
import remarkExternalLinks from "remark-external-links";
import PropertyGrid from "./components/PropertyGrid";
import PropertyCard from "./components/PropertyCardForQuery";

let messages: { message: string; from: "us" | "them"; properties?: any }[] = [
  {
    message: "Please enter the address you would like to analyze.",
    from: "them",
  },
];

let listen = false;

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
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);

  const apiURL = "https://intelligenthomevaluation.com";
  // const apiURL = "http://localhost:5000";
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
  const [uttering, setUttering] = useState(false);
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
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [placeAutocomplete, setPlaceAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const places = useMapsLibrary("places");
  const [propertyData, setPropertyData] = useState<any>({});
  // const inputBoxRef = useRef<HTMLInputElement>(null);

  // useEffect(() => {
  //   // console.log(places);
  //   if (!places || !inputBoxRef.current) return;

  //   const options = {
  //     fields: ["name", "formatted_address"],
  //     componentRestrictions: { country: "ca" },
  //   };

  //   setPlaceAutocomplete(new places.Autocomplete(inputBoxRef.current, options));
  //   // console.log(placeAutocomplete?.getPlace());
  // }, [places]);

  // useEffect(() => {
  //   if (!placeAutocomplete) return;

  //   placeAutocomplete.getPlacePredic
  //   // placeAutocomplete.addListener("");
  //   placeAutocomplete.addListener("place_changed", () => {
  //     const place = placeAutocomplete.getPlace();
  //     if (!place) return;
  //     const address = place.formatted_address;
  //     console.log(address);
  //     if (!address) return;
  //     setMessage(address);
  //     // submitData(address);
  //   });
  // }, [placeAutocomplete]);

  useEffect(() => {
    if (!message) {
      setSuggestions([]);
      return;
    }
    if (
      suggestions &&
      suggestions.length > 0 &&
      suggestions.includes(message)
    ) {
      setSuggestions([]);
      return;
    }
    (async () => {
      //@ts-ignore
      const { AutocompleteService, PlacesService } =
        await google.maps.importLibrary("places");
      const service = new AutocompleteService();
      // const map = new google.maps.Map(
      //   document.getElementById("map") as HTMLElement
      // );
      // const placesService = new PlacesService(map);
      service.getPlacePredictions(
        {
          input: message,
          componentRestrictions: { country: "ca" },
          // also get the postal code in the prediction
          fields: ["address_components", "geometry", "place_id"],
        },
        async (predictions: any, status: any) => {
          // console.log(predictions);
          if (status !== "OK") return;
          if (!predictions) return;
          // Get details for each prediction to fetch postal code
          // const suggestions = predictions.map((prediction: any) => {
          //   console.log(prediction);
          //   getPostalCode(prediction.description).then((postalCode) => {
          //     // console.log(postalCode);
          //     const secondaryText = prediction.structured_formatting
          //       ? prediction.structured_formatting.secondary_text || ""
          //       : "";
          //     // console.log(secondaryText);
          //     let cityName = "";
          //     if (secondaryText.includes(",")) {
          //       cityName = secondaryText.split(",")[0];
          //     }
          //     return `${
          //       prediction.structured_formatting &&
          //       prediction.structured_formatting.main_text
          //     }, ${postalCode}, ${cityName}`;
          //   });
          // });

          const suggestionsList: string[] = [];
          for (let i = 0; i < predictions.length; i++) {
            const prediction = predictions[i];
            const postalCode = await getPostalCode(prediction.description);
            const secondaryText = prediction.structured_formatting
              ? prediction.structured_formatting.secondary_text || ""
              : "";
            let cityName = "";
            if (secondaryText.includes(",")) {
              cityName = secondaryText.split(",")[0];
            }
            suggestionsList.push(
              `${
                prediction.structured_formatting &&
                prediction.structured_formatting.main_text
              }, ${postalCode}, ${cityName}`
            );
            // console.log(suggestionsList);
            // setSuggestions((prev) => [
            //   ...prev,
            //   `${
            //     prediction.structured_formatting &&
            //     prediction.structured_formatting.main_text
            //   }, ${postalCode}, ${cityName}`,
            // ]);
          }
          // console.log(suggestions);
          setSuggestions(suggestionsList);
        }
      );
    })();
    // const { AutocompleteService } = await google.maps.importLibrary("places");
  }, [message]);

  let wasLastMessageVoice = false;
  const recognition = new (window as any).webkitSpeechRecognition();

  useEffect(() => {
    const loadVoices = () => {
      const synth = window.speechSynthesis;
      const voiceList = synth.getVoices();
      // console.log(voiceList);

      // if microsoft mark is available use it
      const microsoftMark = voiceList.find(
        (voice) => voice.name === "Microsoft Mark - English (United States)"
      );

      // if google Us English is available use it
      const googleUsEnglish = voiceList.find(
        (voice) => voice.name === "Google US English"
      );

      if (googleUsEnglish) {
        setVoice(googleUsEnglish);
      } else if (microsoftMark) {
        setVoice(microsoftMark);
      } else {
        setVoice(voiceList[0]);
      }
    };

    loadVoices();

    if (
      typeof window !== "undefined" &&
      window.speechSynthesis.onvoiceschanged !== undefined
    ) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const startRecording = () => {
    listen = true;
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";
    recognition.start();
    recognition.onstart = () => {
      setTimeout(() => {
        const audio = new Audio(StartRecordingSound);
        audio.play();
        setListening(true);
        setSpeechRecognitionStarted(true);
        console.log("started");
        // play a tudu sound
      }, 500);
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
          if (listen) {
            interimTranscript += event.results[i][0].transcript;
          }
        }
      }
      if (interimTranscript !== "") {
        finalTranscript = interimTranscript;
        setTranscript(interimTranscript);
        // setMessage(interimTranscript);
      }
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
    };

    recognition.onend = () => {
      console.log("Speech recognition ended.");
      setListening(false);
      setTranscript("");
      if (finalTranscript !== "") {
        wasLastMessageVoice = true;
        submitData(finalTranscript);
      }
    };
  };

  const stopRecording = () => {
    listen = false;
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

    var encodedMessage = encodeURIComponent(prevMessage);

    const response = await axios.get(
      apiURL +
        `/query?query=${encodedMessage}&thread_id=${thread}&tts=${wasLastMessageVoice}`
    );

    // create fake response with timeout of 3 seconds
    // const response: any = await new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve({
    //       data: {
    //         message: "This is a fake response.",
    //       },
    //     });
    //   }, 3000);
    // });

    // const addressAutocomplete = await axios.get(
    //   `https://maps.googleapis.com/maps/api/js?key=${
    //     import.meta.env.REACT_APP_GOOGLE_MAPS_API_KEY
    //   }&libraries=places`
    // );

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
      setUttering(true);
      // use Google English (en-US) voice if available if not use Microsoft David if not use default voice
      const utterance = new SpeechSynthesisUtterance();
      // utterance.voice = "Microsoft Mark - English (United States)";
      utterance.voice = voice;
      utterance.lang = language;
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.volume = 1;
      utterance.text = response.data.tts
        ? response.data.tts
        : response.data.message;
      speechSynthesis.speak(utterance);
      wasLastMessageVoice = false;
      // wait for utterance to be spoken
      utterance.onend = () => {
        setUttering(false);
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
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messageCount]);

  const getThread = async () => {
    const query = new URLSearchParams(location.search);
    console.log(query.get("property"));
    if (query.get("property")) {
      const response = await axios.get(
        apiURL + `/get-thread-with-query?property=${query.get("property")}`
      );
      return response.data;
    } else {
      const response = await axios.get(apiURL + `/get-thread`);
      return response.data;
    }
  };

  useEffect(() => {
    // get thread id
    const thread = getThread();
    thread.then((data) => {
      setThread(data.thread_id);
      if (data.property_data) {
        messages = [
          {
            message:
              "Would you like to know anything else about this property?",
            from: "them",
            properties: [data.property_data],
          },
        ];
      }
    });
  }, []);

  const renderMessages = () => {
    if (messages.length === 0) {
      return <InitialQuestions submitData={submitData} />;
    }
    return messages.map((message, index) => {
      if (message.properties) {
        return (
          <div>
            <PropertyCard property={message.properties[0]} />
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
                <div className="w-full md:text-justify text-left max-w-full markdown-body">
                  <ReactMarkdown
                    // components={
                    //   {
                    //     // a: ({ node, ...props }) => {
                    //     //   return (
                    //     //     <a
                    //     //       {...props}
                    //     //       target="_blank"
                    //     //       className="text-blue-500"
                    //     //     >
                    //     //       {props.children}
                    //     //     </a>
                    //     //   );
                    //     // },
                    //   }
                    // }
                    // rehypePlugins={[rehypeRaw]}
                    remarkPlugins={[remarkGfm]}
                    className="markdown-body"
                  >
                    {message.message}
                  </ReactMarkdown>
                </div>
              </li>
            </ul>
          </div>
        );
      }
      return (
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
              <div className="w-full md:text-justify text-left max-w-full markdown-body">
                <ReactMarkdown
                  // linkTarget="_blank"
                  // linkTargets="_blank"
                  rehypePlugins={[rehypeRaw]}
                  remarkPlugins={[
                    [
                      // @ts-ignore
                      remarkExternalLinks,
                      { target: "_blank", rel: "noopener noreferrer" },
                    ],
                  ]}
                  // components={{
                  //   a: ({ node, ...props }) => {
                  //     return (
                  //       <a
                  //         {...props}
                  //         target="_blank"
                  //         className="text-yellow-500"
                  //       >
                  //         {props.children}
                  //       </a>
                  //     );
                  //   },
                  // }}
                >
                  {message.message}
                </ReactMarkdown>
              </div>
            ) : (
              <p className="w-full md:text-justify text-left max-w-full">
                {message.message}
              </p>
            )}
          </li>
        </ul>
      );
    });
  };
  bottomRef.current?.scrollIntoView({ behavior: "smooth" });

  // loading icon if thread not present
  if (thread === "") {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader"></div>
      </div>
    );
  }

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
                {listening && <p>Listening...</p>}
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
                {" "}
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
                ></input>{" "}
                <AddressTooltip
                  disabled={!!uttering || answering || messages.length > 1}
                  suggestions={suggestions}
                  setMessage={setMessage}
                />
                <button
                  disabled={!!uttering || answering}
                  onClick={() => {
                    if (!listening) {
                      startRecording();
                    } else {
                      stopRecording();
                    }
                  }}
                  className="h-16 w-16 rounded-none bg-black flex justify-center items-center"
                  type="button"
                >
                  {listening ? (
                    <img
                      src={MicroPhoneListeningIcon}
                      alt="microphone-listening-icon"
                    />
                  ) : (
                    <img src={MicroPhoneIcon} alt="microphone-icon" />
                  )}
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
