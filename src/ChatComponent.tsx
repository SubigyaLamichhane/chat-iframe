import React, { useEffect, useRef, useState, Suspense } from "react";
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
import PropertyCard from "./components/PropertyCard";
import PropertyModal from "./components/PropertyModal";
import Map from "./components/MapComponent";
import { Comparable } from "./types";

// const Map = React.lazy(() => import("./components/MapComponent"));

let listen = false;

const comparablesDataPre: any = {
  C9055851: {
    Address: "5 braemar ave",
    AptUnit: "NA",
    Bedrooms: "3",
    Den: "0",
    Longitude: "-79.40754",
    Latitude: "43.6997",
    PostalCode: "M5P 2L1",
    SoldDate: "2024-07-25",
    SoldPrice: "3580000.0",
    ListPrice: null,
    Sqft: null,
    Style: "2-Storey",
    Type1: "Detached",
    Washrooms: "4",
  },
  C9242916: {
    Address: "69 duplex ave",
    AptUnit: "NA",
    Bedrooms: "3",
    Den: "0",
    Longitude: "-79.39856",
    Latitude: "43.7",
    PostalCode: "M5P 2A5",
    SoldDate: "2024-08-07",
    SoldPrice: "1695000.0",
    ListPrice: null,
    Sqft: null,
    Style: "2-Storey",
    Type1: "Detached",
    Washrooms: "2",
  },
  C9261496: {
    Address: "9 maxwell ave",
    AptUnit: "NA",
    Bedrooms: "3",
    Den: "0",
    Longitude: "-79.40085",
    Latitude: "43.70452",
    PostalCode: "M5P 2B4",
    SoldDate: "2024-10-19",
    SoldPrice: "1900000.0",
    ListPrice: null,
    Sqft: null,
    Style: "2-Storey",
    Type1: "Detached",
    Washrooms: "3",
  },
  C9302175: {
    Address: "161 chaplin cres",
    AptUnit: "NA",
    Bedrooms: "3",
    Den: "0",
    Longitude: "-79.40741",
    Latitude: "43.69898",
    PostalCode: "M5P 1B1",
    SoldDate: "2024-09-05",
    SoldPrice: "1899000.0",
    ListPrice: null,
    Sqft: null,
    Style: "2-Storey",
    Type1: "Detached",
    Washrooms: "2",
  },
  C9302897: {
    Address: "20 elderwood dr",
    AptUnit: "NA",
    Bedrooms: "3",
    Den: "2",
    Longitude: "-79.41806",
    Latitude: "43.69648",
    PostalCode: "M5P 1W5",
    SoldDate: "2024-10-31",
    SoldPrice: "6100000.0",
    ListPrice: null,
    Sqft: null,
    Style: "2-Storey",
    Type1: "Detached",
    Washrooms: "4",
  },
  C9373127: {
    Address: "71 lascelles blvd",
    AptUnit: "NA",
    Bedrooms: "3",
    Den: "0",
    Longitude: "-79.40162",
    Latitude: "43.70122",
    PostalCode: "M5P 2E3",
    SoldDate: "2024-10-23",
    SoldPrice: "2455000.0",
    ListPrice: null,
    Sqft: null,
    Style: "2-Storey",
    Type1: "Detached",
    Washrooms: "4",
  },
  C9374003: {
    Address: "59 eastbourne ave",
    AptUnit: "NA",
    Bedrooms: "3",
    Den: "0",
    Longitude: "-79.40293",
    Latitude: "43.7012",
    PostalCode: "M5P 2G1",
    SoldDate: "2024-10-15",
    SoldPrice: "2272000.0",
    ListPrice: null,
    Sqft: null,
    Style: "2-Storey",
    Type1: "Detached",
    Washrooms: "2",
  },
  C9419803: {
    Address: "161 chaplin cres",
    AptUnit: "NA",
    Bedrooms: "3",
    Den: "0",
    Longitude: "-79.40741",
    Latitude: "43.69898",
    PostalCode: "M5P 1B1",
    SoldDate: "2024-10-31",
    SoldPrice: "1725000.0",
    ListPrice: null,
    Sqft: null,
    Style: "2-Storey",
    Type1: "Detached",
    Washrooms: "2",
  },
};

const reportData = {
  appr_attributes: {
    property_type: "Detached",
    "rooms area": 1622,
    "lot area": 0,
  },
  gnowise_value: 2765000,
  risk_of_decline: 40,
  value_high: 3042000,
  value_low: 2488000,
  gnowise_lease: 7600,
  lease_low: 7000,
  lease_high: 8000,
  property_attributes: {
    AC: "Central Air",
    Address: "301 Chaplin Crescent",
    Age: "100+",
    AptUnit: "",
    Basement1: "Fin W/O",
    Bedrooms: 3,
    Den: 2,
    FSA: "m5p",
    Kitchens: 1,
    LotArea: 3090,
    ParkingSpaces: 1,
    Municipality: "Toronto",
    Pool: "Other",
    PostalCode: "m5p1b1",
    Province: "ON",
    RoomsArea: 1622,
    Sqft: "Other",
    Style: "2 1/2 Storey",
    Type1: "Detached",
    Washrooms: 3,
  },
  dom_high: 56,
  dom_low: 24,
  gnowise_cap_rate: 0.023748282097649186,
  hpi: {
    M5P_All_median_price: 76825,
    M5P_Apartment_median_price: 1049600,
    M5P_Detached_median_price: 5258481,
    M5P_Other_median_price: 1945770,
    M5P_Row_median_price: 2082669,
    M5P_Semi_median_price: 2082669,
  },
  liquidity_score: 0.71,
  one_year_growth_rate: 0.96,
  price_in_one_year: 2791544,
  price_in_two_years: 2820023,
  two_year_growth_rate: 1.99,
  valuation_source: "A",
};

// let comparablesData: Comparable[] = [];

const convertComparablesToArray = (data: any) => {
  const comparablesData: Comparable[] = [];
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const element = data[key];
      comparablesData.push({ ml_num: key, ...element });
    }
  }
  return comparablesData;
};

// convertComparablesToArray(comparablesDataPre);

interface IChatComponentProps {
  apiURL: string;
  initialQuestions: string[];
  addressRecommendationDisabled?: boolean | undefined;
  messages: {
    message: string;
    from: "us" | "them";
    properties?: any;
    propertyDataFromQuery?: any;
    propertiesRaw?: any;
    coordinates?: {
      latitude: number;
      longitude: number;
    } | null;
  }[];
}

const sampleTempData: any = [];

function App({
  apiURL,
  initialQuestions,
  messages,
  addressRecommendationDisabled,
}: IChatComponentProps) {
  const location = useLocation();
  const [message, setMessage] = useState("");
  const [messageCount, setMessageCount] = useState(0);
  const [fetched, setFetched] = useState(true);
  const messageDivRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputBoxRef = useRef<HTMLInputElement>(null);
  const queryParams = new URLSearchParams(location.search);
  const parent = useRef(null);
  const messageParent = useRef(null);
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);
  const messageFieldColor = "131317";
  const backgroundColor = "ffffff";

  const outgoingMessageColor = "ffffff";
  const outgoingMessageTextColor = "000000";
  const messageFieldTextColor = "ffffff";
  const [thread, setThread] = useState("");
  const [answering, setAnswering] = useState(false);
  const [uttering, setUttering] = useState(false);
  const [tempPropertyData, setTempPropertyData] = useState<any>(sampleTempData);
  const [hoveredProperty, setHoveredProperty] = useState<any>(null);
  const [coordinates, setCoordinates] = useState<any>(null);
  const [comparables, setComparables] = useState<Comparable[]>([]);
  const [valuationReport, setValuationReport] = useState<any>(null);
  const sidebarCustomization = {
    background_color: "#131317",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMdM9MEQ0ExL1PmInT3U5I8v63YXBEdoIT0Q&s",
    text_color: "#ffffff",
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
  };

  console.log(messages);

  const botId = queryParams.get("botId") || "2";
  const [ID, setID] = useState(crypto.randomUUID());

  // Voice-related state
  const [transcript, setTranscript] = useState("");
  const [listening, setListening] = useState(false);
  const [isSpeechRecognitionStarted, setSpeechRecognitionStarted] =
    useState(false);
  const [language, setLanguage] = useState<"en-US" | "ne-NP">("en-US");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempProperty, setTempProperty] = useState<any>(null);

  // console.log(messages);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
      if (addressRecommendationDisabled) return;
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
          if (status !== "OK") return;
          if (!predictions) return;

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
          }
          setSuggestions(suggestionsList);
        }
      );
    })();
  }, [message]);

  let wasLastMessageVoice = false;
  const recognition = new (window as any).webkitSpeechRecognition();

  useEffect(() => {
    const loadVoices = () => {
      const synth = window.speechSynthesis;
      const voiceList = synth.getVoices();

      const microsoftMark = voiceList.find(
        (voice) => voice.name === "Microsoft Mark - English (United States)"
      );

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
      }, 500);
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
    recognition.stop();
  };
  const submitData = async (message: string) => {
    setAnswering(true);
    setMessage("");
    messages.push({
      message,
      from: "us",
    });
    setMessageCount(messageCount + 1);
    messageParent.current && autoAnimate(messageParent.current);
    bottomRef.current?.scrollIntoView();
    const prevMessage = message;

    var encodedMessage = encodeURIComponent(prevMessage);

    let response;
    try {
      response = await axios.get(
        apiURL +
          `/query?query=${encodedMessage}&thread_id=${thread}&tts=${wasLastMessageVoice}`
      );
    } catch (e) {
      console.log(e);
      try {
        response = await axios.get(
          apiURL +
            `/query?query=${encodedMessage}&thread_id=${thread}&tts=${wasLastMessageVoice}`
        );
      } catch (e) {
        console.log(e);
        messages.push({
          message: "Sorry, Couldn't query your request at this time.",
          from: "them",
        });
        setMessageCount(messageCount + 1);
        setAnswering(false);
        messageParent.current && autoAnimate(messageParent.current);
        bottomRef.current?.scrollIntoView();
        return;
      }
    }

    bottomRef.current?.scrollIntoView();
    setAnswering(false);
    try {
      if (response && response.data && response.data.coordinates) {
        setCoordinates(response.data.coordinates);
        if (response.data.property_report) {
          setValuationReport(response.data.property_report);
        }
        if (response.data.comparables) {
          setComparables(convertComparablesToArray(response.data.comparables));
        }
      }
      messages.push({
        message: response.data.message,
        from: "them",
        properties: response.data.properties
          ? JSON.parse(response.data.properties)
          : null,
        propertiesRaw: response.data.propertiesRaw
          ? JSON.parse(response.data.propertiesRaw)
          : null,
        coordinates: response.data.coordinates
          ? response.data.coordinates
          : null,
      });
    } catch (e) {
      console.log(e);
      messages.push({
        message: "Sorry, Couldn't query your request at this time.",
        from: "them",
      });
    }

    setMessageCount(messageCount + 1);
    setTempPropertyData(
      response.data.properties
        ? JSON.parse(response.data.properties)
        : response.data.propertiesRaw
        ? JSON.parse(response.data.propertiesRaw)
        : null
    );

    if (wasLastMessageVoice) {
      if (response.data.tts) {
        setUttering(true);
        // play a audio given a url

        const audio = new Audio(
          apiURL.replace("/database", "") + response.data.tts
        );
        audio.play();
        wasLastMessageVoice = false;
        // wait for audio to finish
        audio.onended = () => {
          setUttering(false);
          startRecording();
        };
        return;
      }
      setUttering(true);
      // use Google English (en-US) voice if available if not use Microsoft David if not use default voice
      const utterance = new SpeechSynthesisUtterance();
      // utterance.voice = "Microsoft Mark - English (United States)";
      utterance.voice = voice;
      utterance.lang = language;
      utterance.rate = 1;
      utterance.pitch = 1;
      utterance.volume = 1;
      utterance.text = response.data.message;
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

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messageCount]);

  const getThread = async () => {
    const query = new URLSearchParams(location.search);
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

      if (data.property_data && messages.length === 0) {
        messages.push({
          message: "Would you like to know anything else about this property?",
          from: "them",
          propertyDataFromQuery: data.property_data,
          coordinates: data.coordinates ? data.coordinates : null,
        });
      }
      setMessageCount(messageCount + 1);
    });
  }, []);

  const renderMessages = () => {
    if (messages.length === 0 && !messages[0]?.propertyDataFromQuery) {
      return (
        <InitialQuestions
          submitData={submitData}
          initialQuestions={initialQuestions}
        />
      );
    }

    return messages.map((message, index) => {
      if (message.propertyDataFromQuery) {
        return (
          <div>
            {/* <PropertyCard property={message.propertyDataFromQuery} /> */}
            <ul
              key={index}
              ref={messageParent}
              className={`flex items-center max-w-2xl ${
                message.from === "us" ? "justify-end" : "justify-start"
              }`}
            >
              <li
                className={`fadeIn text-md py-2 px-4 mb-2 max-w-2xl ${
                  message.from === "us"
                    ? "rounded-3xl shadow-md border border-gray-200"
                    : "rounded-3xl shadow-md"
                }`}
                style={
                  message.from === "us"
                    ? {
                        backgroundColor: "#ffffff", // White background for outgoing messages
                        color: "#000000", // Black text for outgoing messages
                      }
                    : {
                        backgroundColor: "#3b82f6", // Blue background for incoming messages
                        color: "#ffffff", // White text for incoming messages
                      }
                }
              >
                {message.from === "them" ? (
                  <div className="w-full md:text-justify text-left max-w-full markdown-body">
                    <ReactMarkdown
                      remarkPlugins={[
                        [
                          // @ts-ignore
                          remarkExternalLinks,
                          { target: "_blank", rel: "noopener noreferrer" },
                        ],
                      ]}
                      components={{
                        a: ({ node, ...props }) => {
                          return (
                            <a
                              {...props}
                              target="_blank"
                              className="!text-blue-500"
                              onClick={(event) => {
                                if (
                                  props.href &&
                                  props.href.includes("gnohome.com")
                                ) {
                                  event.preventDefault();
                                  // setTempPropertyData(
                                  //   message.propertiesRaw.find(
                                  //     (property: any) =>
                                  //       property.ml_num ===
                                  //       props.href?.split("=").pop()
                                  //   )
                                  // );
                                  openModal();
                                }
                              }}
                              onMouseEnter={() => {
                                setHoveredProperty(
                                  message.propertyDataFromQuery
                                );
                              }}
                              onMouseLeave={() => {
                                setHoveredProperty(null);
                              }}
                            >
                              {props.children}
                            </a>
                          );
                        },
                      }}
                    >
                      {message.message}
                    </ReactMarkdown>
                    {isModalOpen && (
                      <PropertyModal
                        property={tempPropertyData}
                        onClose={closeModal}
                      />
                    )}
                  </div>
                ) : (
                  <p className="w-full md:text-justify text-left max-w-full">
                    {message.message}
                  </p>
                )}
              </li>
            </ul>
          </div>
        );
      }
      if (message.properties) {
        return (
          <div>
            <PropertyGrid
              setHoveredProperty={setHoveredProperty}
              properties={message.properties}
            />
            <ul
              key={index}
              ref={messageParent}
              className={`flex items-center ${
                message.from === "us" ? "justify-end" : "justify-start"
              }`}
            >
              <li
                className={`fadeIn text-md py-2 px-4 mb-2 max-w-2xl ${
                  message.from === "them"
                    ? "rounded-3xl shadow-md border border-gray-200"
                    : "rounded-3xl shadow-md"
                }`}
                style={
                  message.from === "them"
                    ? {
                        backgroundColor: "#ffffff", // White background for outgoing messages
                        color: "#000000", // Black text for outgoing messages
                      }
                    : {
                        backgroundColor: "#3b82f6", // Blue background for incoming messages
                        color: "#ffffff", // White text for incoming messages
                      }
                }
              >
                {message.from === "them" ? (
                  <div className="w-full md:text-justify text-left max-w-full markdown-body">
                    <ReactMarkdown
                      remarkPlugins={[
                        [
                          // @ts-ignore
                          remarkExternalLinks,
                          { target: "_blank", rel: "noopener noreferrer" },
                        ],
                      ]}
                      components={{
                        a: ({ node, ...props }) => {
                          return (
                            <a
                              {...props}
                              target="_blank"
                              className="!text-blue-500"
                              onClick={(event) => {
                                if (
                                  props.href &&
                                  props.href.includes("gnohome.com")
                                ) {
                                  event.preventDefault();
                                  // setTempPropertyData(
                                  //   message.propertiesRaw.find(
                                  //     (property: any) =>
                                  //       property.ml_num ===
                                  //       props.href?.split("=").pop()
                                  //   )
                                  // );
                                  openModal();
                                }
                              }}
                              onMouseEnter={() => {
                                setHoveredProperty(
                                  message.propertyDataFromQuery
                                );
                              }}
                              onMouseLeave={() => {
                                setHoveredProperty(null);
                              }}
                            >
                              {props.children}
                            </a>
                          );
                        },
                      }}
                    >
                      {message.message}
                    </ReactMarkdown>
                    {isModalOpen && (
                      <PropertyModal
                        property={tempPropertyData}
                        onClose={closeModal}
                      />
                    )}
                  </div>
                ) : (
                  <p className="w-full md:text-justify text-left max-w-full">
                    {message.message}
                  </p>
                )}
              </li>
            </ul>
          </div>
        );
      }
      if (message.propertiesRaw) {
        return (
          <div>
            {/* <PropertyGrid properties={message.propertiesRaw} /> */}
            {
              <ul
                key={index}
                ref={messageParent}
                className={`flex items-center ${
                  message.from === "us" ? "justify-end" : "justify-start"
                }`}
              >
                <li
                  className={`fadeIn text-md py-2 px-4 mb-2 max-w-2xl ${
                    message.from === "them"
                      ? "rounded-3xl shadow-md border border-gray-200"
                      : "rounded-3xl shadow-md"
                  }`}
                  style={
                    message.from === "them"
                      ? {
                          backgroundColor: "#ffffff", // White background for outgoing messages
                          color: "#000000", // Black text for outgoing messages
                        }
                      : {
                          backgroundColor: "#3b82f6", // Blue background for incoming messages
                          color: "#ffffff", // White text for incoming messages
                        }
                  }
                >
                  {message.from === "them" ? (
                    <div className="w-full md:text-justify text-left max-w-full markdown-body">
                      <ReactMarkdown
                        remarkPlugins={[
                          [
                            // @ts-ignore
                            remarkExternalLinks,
                            { target: "_blank", rel: "noopener noreferrer" },
                          ],
                        ]}
                        components={{
                          a: ({ node, ...props }) => {
                            return (
                              <a
                                {...props}
                                target="_blank"
                                className="!text-blue-500"
                                onClick={(event) => {
                                  if (
                                    props.href &&
                                    props.href.includes("gnohome.com")
                                  ) {
                                    event.preventDefault();
                                    setTempProperty(
                                      message.propertiesRaw.find(
                                        (property: any) =>
                                          property.ml_num ===
                                          props.href?.split("=").pop()
                                      )
                                    );
                                    openModal();
                                  }
                                }}
                                onMouseEnter={() => {
                                  if (
                                    props.href &&
                                    props.href.includes("gnohome.com")
                                  ) {
                                    setHoveredProperty(
                                      message.propertiesRaw.find(
                                        (property: any) =>
                                          property.ml_num ===
                                          props.href?.split("=").pop()
                                      )
                                    );
                                  }
                                }}
                                onMouseLeave={() => {
                                  if (
                                    props.href &&
                                    props.href.includes("gnohome.com")
                                  ) {
                                    setHoveredProperty(null);
                                  }
                                }}
                              >
                                {props.children}
                              </a>
                            );
                          },
                        }}
                      >
                        {message.message}
                      </ReactMarkdown>
                      {isModalOpen && (
                        <PropertyModal
                          property={tempProperty}
                          onClose={closeModal}
                        />
                      )}
                    </div>
                  ) : (
                    <p className="w-full md:text-justify text-left max-w-full">
                      {message.message}
                    </p>
                  )}
                </li>
              </ul>
            }
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
            className={`fadeIn text-md py-2 px-4 mb-2 max-w-2xl ${
              message.from === "them"
                ? "rounded-3xl shadow-md border border-gray-200"
                : "rounded-3xl shadow-md"
            }`}
            style={
              message.from === "them"
                ? {
                    backgroundColor: "#ffffff", // White background for outgoing messages
                    color: "#000000", // Black text for outgoing messages
                  }
                : {
                    backgroundColor: "#3b82f6", // Blue background for incoming messages
                    color: "#ffffff", // White text for incoming messages
                  }
            }
          >
            {message.from === "them" ? (
              <div className="w-full md:text-justify text-left max-w-full markdown-body">
                <ReactMarkdown
                  remarkPlugins={[
                    [
                      // @ts-ignore
                      remarkExternalLinks,
                      { target: "_blank", rel: "noopener noreferrer" },
                    ],
                  ]}
                  components={{
                    a: ({ node, ...props }) => {
                      return (
                        <a
                          {...props}
                          target="_blank"
                          className="text-yellow-100"
                          onClick={(event) => {
                            if (
                              props.href &&
                              props.href.includes("gnohome.com")
                            ) {
                              event.preventDefault();
                              setTempPropertyData(
                                message.propertiesRaw.find(
                                  (property: any) =>
                                    property.ml_num ===
                                    props.href?.split("=").pop()
                                )
                              );
                              openModal();
                            }
                          }}
                        >
                          {props.children}
                        </a>
                      );
                    },
                  }}
                >
                  {message.message}
                </ReactMarkdown>
                {isModalOpen && (
                  <PropertyModal
                    property={tempPropertyData}
                    onClose={closeModal}
                  />
                )}
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
  // bottomRef.current?.scrollIntoView({ behavior: "smooth" });

  // loading icon if thread not present
  if (thread === "") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-black border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div
      style={
        {
          // backgroundColor: "#" + backgroundColor,
        }
      }
      className="md:h-screen "
    >
      <style>
        {`
        input::placeholder {
          color: #${backgroundColor};
        }
        `}
      </style>
      <div className="md:flex" ref={parent}>
        {fetched && (
          <div className="flex-grow flex flex-col md:h-screen justify-end items-end ">
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
                className="w-full p-4 pb-0 max-h-[calc(100vh-9rem)] md:max-h-screen overflow-y-auto overflow-x-hidden custom-scrollbar"
              >
                {renderMessages()}
                <div ref={bottomRef} className="h-6"></div>{" "}
                {listening && <p className="mb-4">Listening...</p>}
                {answering && (
                  <div className="w-full p-2 fade-in mb-4">
                    <div
                      className="flex justify-start w-fit p-2 rounded-full bg-blue-500"
                      // style={{
                      //   backgroundColor: "#" + messageFieldColor,
                      // }}
                    >
                      <div className="container relative">
                        <div
                          className="bouncing-ball "
                          style={{
                            backgroundColor: "#" + backgroundColor,
                          }}
                        ></div>
                      </div>
                      <div className="container relative">
                        <div
                          className="bouncing-ball2  "
                          style={{
                            backgroundColor: "#" + backgroundColor,
                          }}
                        ></div>
                      </div>
                      <div className="container relative">
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

            {/* <form
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
            </form> */}
            <form
              className="w-full"
              onSubmit={async (e) => {
                e.preventDefault();
                if (message === "") return;
                submitData(message);
              }}
            >
              <div className="flex fixed bottom-0 w-full md:relative  p-4">
                <div className="flex items-center w-full bg-white rounded-full shadow-md p-2 border">
                  {/* Address Input */}
                  <input
                    autoFocus
                    ref={inputBoxRef}
                    value={transcript ? transcript : message}
                    placeholder="Type your message..."
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-grow h-12 px-4 bg-transparent border-none outline-none text-gray-800 placeholder:text-gray-600"
                  />
                  {/* Address Tooltip */}
                  <AddressTooltip
                    disabled={!!uttering || answering || messages.length > 1}
                    suggestions={suggestions}
                    setMessage={setMessage}
                  />
                  {/* Recording Button */}
                  <button
                    disabled={!!uttering || answering}
                    onClick={() => {
                      if (!listening) {
                        startRecording();
                      } else {
                        stopRecording();
                      }
                    }}
                    className="flex items-center justify-center h-10 w-10 ml-2 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition duration-300"
                    type="button"
                  >
                    {listening ? (
                      <img
                        src={MicroPhoneListeningIcon}
                        alt="microphone-listening-icon"
                        className="h-5 w-5"
                      />
                    ) : (
                      <img
                        src={MicroPhoneIcon}
                        alt="microphone-icon"
                        className="h-5 w-5"
                      />
                    )}
                  </button>
                  {/* Send Button */}
                  <button
                    type="submit"
                    disabled={thread === ""}
                    style={{
                      backgroundColor: `#${messageFieldColor}`,
                      color: `#${messageFieldTextColor}`,
                    }}
                    className="flex items-center justify-center h-10 w-10 ml-2 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition duration-300"
                  >
                    <svg
                      fill={`#${backgroundColor}`}
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
                        <g>
                          <g>
                            <path d="M505.021,5.868c-0.064-0.043-0.085-0.107-0.128-0.149c-0.128-0.107-0.256-0.128-0.384-0.235 c-1.131-0.981-2.475-1.621-3.797-2.325c-0.427-0.213-0.747-0.576-1.195-0.768c-0.064-0.021-0.107-0.021-0.149-0.043 c-0.469-0.192-0.853-0.533-1.323-0.704c-1.771-0.661-3.648-0.875-5.547-1.045c-0.576-0.043-1.131-0.299-1.707-0.299 c-2.475-0.021-4.971,0.384-7.403,1.259L14.055,172.225c-7.445,2.709-12.779,9.323-13.867,17.173 c-1.045,7.851,2.304,15.637,8.768,20.245l141.888,101.355l20.032,140.309c1.237,8.533,7.488,15.488,15.851,17.643 c1.749,0.448,3.541,0.661,5.291,0.661c6.592,0,12.971-3.072,17.045-8.533l50.347-67.093l132.032,113.237 c3.947,3.371,8.875,5.141,13.909,5.141c2.389,0,4.779-0.405,7.125-1.216c7.168-2.56,12.48-8.768,13.845-16.277l85.995-468.928 C513.725,18.262,510.738,10.71,505.021,5.868z M240.125,348.396l-1.536,2.219l-32.747,43.669l-12.395-86.827l185.109-160.448 L240.125,348.396z"></path>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
        {(coordinates ||
          (tempPropertyData && tempPropertyData.length != 0)) && (
          // <Suspense fallback={<p>Loading map...</p>}>
          <div className="w-2/3">
            {" "}
            <Map
              data={tempPropertyData}
              hoveredProperty={hoveredProperty}
              coordinates={coordinates}
              comparables={comparables}
              valuationReport={valuationReport}
            />
          </div>

          // </Suspense>
        )}
      </div>
      {/* <iframe src="https://intelligenthomevaluation.com" className="w-full h-screen"></iframe>  */}
    </div>
  );
}

export default App;
