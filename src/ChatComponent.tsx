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

// const Map = React.lazy(() => import("./components/MapComponent"));

let listen = false;

interface IChatComponentProps {
  apiURL: string;
  initialQuestions: string[];
  messages: {
    message: string;
    from: "us" | "them";
    properties?: any;
    propertyDataFromQuery?: any;
    propertiesRaw?: any;
  }[];
}

const sampleTempData: any = [
  {
    ml_num: "C9241819",
    addr: "107 Farnham Ave",
    zip: "M4V 1H6",
    apt_num: null,
    municipality: "Toronto",
    park_spcs: "2",
    type_own1_out: "Triplex",
    style: "3-Storey",
    yr_built: null,
    a_c: "Central Air",
    sqft: null,
    st_num: "107",
    st: "Farnham",
    st_sfx: "Ave",
    st_dir: null,
    community: "Yonge-St. Clair",
    municipality_district: "Toronto C02",
    lp_dol: 2699000,
    taxes: "11258.65",
    roomsArea: "1873.74",
    num_kit: "2",
    lotsz_code: "Feet",
    front_ft: 24.920000076293945,
    depth: 103.16999816894531,
    is_Condo: false,
    pool: "None",
    br_plus: 1,
    br: 4,
    bath_tot: 5,
    bsmt1_out: "Apartment",
    county: "Ontario",
    Latitude: 43.686961,
    Longitude: -79.399705,
    community_code: "01.C02.0830",
    lotArea: "2571.0",
    timestamp_sql: "2024-08-06 16:21:24",
    locker: null,
    availability: "60/90 Days/TBA",
    ad_text:
      "Located in the heart of Summerhill, this rarely offered 3343 sq ft Triplex boasts a total of 4+1 bedrooms and 5 bathrooms spread over three units. This beautifully maintained property provides an opportunity for income or to convert back to a large single family dwelling. The main floor, 2-bed suite offers a spacious living room with a fireplace, hardwood floors and a large bay window. The kitchen features glass cabinetry, granite counters, and a pass-thru to",
    Source: "TREB",
    PropertyType: "Residential",
    Amenities: "/////",
    gar_spaces: 0,
    PropertySubType: "",
    irreg: null,
    yr: 2024,
    zoning: null,
    maint: null,
    dom: 1,
    MLS: "C9241819",
    SellingPrice: "2699000",
    GnowiseValue: "3033000",
    RiskofDecline: 7,
    Value1Yr: "3344792",
    Value2yr: "3562865",
    PriceDifferencePerc: 12,
    Growth1YrPerc: 10,
    Growth2YrPerc: 17,
    Neighborhood: null,
    PriceHigh: "3336000",
    PriceLow: "2730000",
    LastSoldDate: null,
    LastSoldPrice: null,
    TopFeaturesResult: null,
    ReportData: null,
    Forecast:
      '[{"Date":"2022-08-31T00:00:00","ForecastValue":2766000.0},{"Date":"2022-09-30T00:00:00","ForecastValue":2790000.0},{"Date":"2022-10-31T00:00:00","ForecastValue":2797000.0},{"Date":"2022-11-30T00:00:00","ForecastValue":2812000.0},{"Date":"2022-12-31T00:00:00","ForecastValue":2854000.0},{"Date":"2023-01-31T00:00:00","ForecastValue":2910000.0},{"Date":"2023-02-28T00:00:00","ForecastValue":2954000.0},{"Date":"2023-03-31T00:00:00","ForecastValue":2965000.0},{"Date":"2023-04-30T00:00:00","ForecastValue":2980000.0},{"Date":"2023-05-31T00:00:00","ForecastValue":2994000.0},{"Date":"2023-06-30T00:00:00","ForecastValue":3009000.0},{"Date":"2023-07-31T00:00:00","ForecastValue":3020000.0},{"Date":"2023-08-31T00:00:00","ForecastValue":3051000.0},{"Date":"2023-09-30T00:00:00","ForecastValue":3085000.0},{"Date":"2023-10-31T00:00:00","ForecastValue":3116000.0},{"Date":"2023-11-30T00:00:00","ForecastValue":3136000.0},{"Date":"2023-12-31T00:00:00","ForecastValue":3166000.0},{"Date":"2024-01-31T00:00:00","ForecastValue":3175000.0},{"Date":"2024-02-29T00:00:00","ForecastValue":3151000.0},{"Date":"2024-05-31T00:00:00","ForecastValue":3120000.0},{"Date":"2024-06-30T00:00:00","ForecastValue":3096000.0},{"Date":"2024-07-31T00:00:00","ForecastValue":3068000.0},{"Date":"2024-08-31T00:00:00","ForecastValue":3033000.0},{"Date":"2024-09-30T00:00:00","ForecastValue":2989000.0},{"Date":"2024-10-31T00:00:00","ForecastValue":2967000.0},{"Date":"2024-11-30T00:00:00","ForecastValue":2939000.0},{"Date":"2024-12-31T00:00:00","ForecastValue":2913000.0},{"Date":"2025-01-31T00:00:00","ForecastValue":2884000.0},{"Date":"2025-02-28T00:00:00","ForecastValue":2836000.0},{"Date":"2025-03-31T00:00:00","ForecastValue":2792000.0},{"Date":"2025-04-30T00:00:00","ForecastValue":2755000.0},{"Date":"2025-05-31T00:00:00","ForecastValue":2735000.0},{"Date":"2025-06-30T00:00:00","ForecastValue":2700000.0},{"Date":"2025-07-31T00:00:00","ForecastValue":2663000.0},{"Date":"2025-08-31T00:00:00","ForecastValue":2633000.0},{"Date":"2025-09-30T00:00:00","ForecastValue":2617000.0},{"Date":"2025-10-31T00:00:00","ForecastValue":2587000.0},{"Date":"2025-11-30T00:00:00","ForecastValue":2554000.0},{"Date":"2025-12-31T00:00:00","ForecastValue":2512000.0},{"Date":"2026-01-31T00:00:00","ForecastValue":2477000.0},{"Date":"2026-02-28T00:00:00","ForecastValue":2433000.0},{"Date":"2026-03-31T00:00:00","ForecastValue":2401000.0},{"Date":"2026-04-30T00:00:00","ForecastValue":2381000.0},null,null,null,null,null,null]',
    SoldRecords: null,
    UpdatedDate: "2024-08-27 04:03:17.474342+00:00",
    CreatedDate: "2024-08-08 03:02:38.574015+00:00",
    GnowiseCapRate: 0.0324747774480712,
    GnowiseLease: 11400,
    ValuationSource: "A",
  },
  {
    ml_num: "E8366970",
    addr: "3025 Queen St E",
    zip: "M1N 1A5",
    apt_num: null,
    municipality: "Toronto",
    park_spcs: "10",
    type_own1_out: "Multiplex",
    style: "2 1/2 Storey",
    yr_built: null,
    a_c: "None",
    sqft: null,
    st_num: "3025",
    st: "Queen",
    st_sfx: "St",
    st_dir: "E",
    community: "Birchcliffe-Cliffside",
    municipality_district: "Toronto E06",
    lp_dol: 4849000,
    taxes: "16550.00",
    roomsArea: "0.00",
    num_kit: "6",
    lotsz_code: "Feet",
    front_ft: 70,
    depth: 225,
    is_Condo: false,
    pool: "None",
    br_plus: 4,
    br: 9,
    bath_tot: 9,
    bsmt1_out: "Apartment",
    county: "Ontario",
    Latitude: 43.674012,
    Longitude: -79.280961,
    community_code: "01.E06.1310",
    lotArea: "15750.0",
    timestamp_sql: "2024-06-10 09:57:54",
    locker: null,
    availability: "tbd",
    ad_text:
      "Very rare, special 7-unit investment property with a rich history! Located in the Beaches neighbourhood, directly overlooking Lake Ontario! The home has long been named, Chateau de Quatre Vents (Castle of the Four Winds) and was originally designed by the renowned architect who is known for Casa Loma and Old City Hall. This castle-themed house has been creatively divided into 7 self-contained units, each with separate hydro. 3 units are rentable and 4 units a",
    Source: "TREB",
    PropertyType: "Residential",
    Amenities: "/////",
    gar_spaces: 0,
    PropertySubType: "",
    irreg: "See attached survey",
    yr: 2023,
    zoning: null,
    maint: null,
    dom: 20,
    MLS: "E8366970",
    SellingPrice: "4849000",
    GnowiseValue: "5154000",
    RiskofDecline: 39,
    Value1Yr: "5274088",
    Value2yr: "5315320",
    PriceDifferencePerc: 6,
    Growth1YrPerc: 2,
    Growth2YrPerc: 3,
    Neighborhood: null,
    PriceHigh: "5669000",
    PriceLow: "4639000",
    LastSoldDate: null,
    LastSoldPrice: null,
    TopFeaturesResult: null,
    ReportData: null,
    Forecast:
      '[{"Date":"2022-08-31T00:00:00","ForecastValue":5677000.0},{"Date":"2022-09-30T00:00:00","ForecastValue":5704000.0},{"Date":"2022-10-31T00:00:00","ForecastValue":5720000.0},{"Date":"2022-11-30T00:00:00","ForecastValue":5725000.0},{"Date":"2022-12-31T00:00:00","ForecastValue":5720000.0},{"Date":"2023-01-31T00:00:00","ForecastValue":5704000.0},{"Date":"2023-02-28T00:00:00","ForecastValue":5693000.0},{"Date":"2023-03-31T00:00:00","ForecastValue":5688000.0},{"Date":"2023-04-30T00:00:00","ForecastValue":5693000.0},{"Date":"2023-05-31T00:00:00","ForecastValue":5688000.0},{"Date":"2023-06-30T00:00:00","ForecastValue":5699000.0},{"Date":"2023-07-31T00:00:00","ForecastValue":5704000.0},{"Date":"2023-08-31T00:00:00","ForecastValue":5709000.0},{"Date":"2023-09-30T00:00:00","ForecastValue":5709000.0},{"Date":"2023-10-31T00:00:00","ForecastValue":5704000.0},{"Date":"2023-11-30T00:00:00","ForecastValue":5688000.0},{"Date":"2023-12-31T00:00:00","ForecastValue":5645000.0},{"Date":"2024-01-31T00:00:00","ForecastValue":5587000.0},{"Date":"2024-02-29T00:00:00","ForecastValue":5539000.0},{"Date":"2024-05-31T00:00:00","ForecastValue":5442000.0},{"Date":"2024-06-30T00:00:00","ForecastValue":5346000.0},{"Date":"2024-07-31T00:00:00","ForecastValue":5245000.0},{"Date":"2024-08-31T00:00:00","ForecastValue":5154000.0},{"Date":"2024-09-30T00:00:00","ForecastValue":5058000.0},{"Date":"2024-10-31T00:00:00","ForecastValue":4956000.0},{"Date":"2024-11-30T00:00:00","ForecastValue":4850000.0},{"Date":"2024-12-31T00:00:00","ForecastValue":4759000.0},{"Date":"2025-01-31T00:00:00","ForecastValue":4689000.0},{"Date":"2025-02-28T00:00:00","ForecastValue":4620000.0},{"Date":"2025-03-31T00:00:00","ForecastValue":4556000.0},{"Date":"2025-04-30T00:00:00","ForecastValue":4481000.0},{"Date":"2025-05-31T00:00:00","ForecastValue":4390000.0},{"Date":"2025-06-30T00:00:00","ForecastValue":4289000.0},{"Date":"2025-07-31T00:00:00","ForecastValue":4187000.0},{"Date":"2025-08-31T00:00:00","ForecastValue":4075000.0},{"Date":"2025-09-30T00:00:00","ForecastValue":3974000.0},{"Date":"2025-10-31T00:00:00","ForecastValue":3878000.0},{"Date":"2025-11-30T00:00:00","ForecastValue":3787000.0},{"Date":"2025-12-31T00:00:00","ForecastValue":3685000.0},{"Date":"2026-01-31T00:00:00","ForecastValue":3584000.0},{"Date":"2026-02-28T00:00:00","ForecastValue":3493000.0},{"Date":"2026-03-31T00:00:00","ForecastValue":3408000.0},{"Date":"2026-04-30T00:00:00","ForecastValue":3306000.0},null,null,null,null,null,null]',
    SoldRecords: null,
    UpdatedDate: "2024-08-27 05:00:03.905608+00:00",
    CreatedDate: "2024-07-10 03:03:26.323231+00:00",
    GnowiseCapRate: 0.00469383003492433,
    GnowiseLease: 2800,
    ValuationSource: "A",
  },
  {
    ml_num: "C9265899",
    addr: "55 Ann O'reilly Rd",
    zip: "M2T 0E1",
    apt_num: "3908",
    municipality: "Toronto",
    park_spcs: "1",
    type_own1_out: "Condo Apt",
    style: "Apartment",
    yr_built: null,
    a_c: "Central Air",
    sqft: "700-799",
    st_num: "55",
    st: "Ann O'reilly",
    st_sfx: "Rd",
    st_dir: null,
    community: "Henry Farm",
    municipality_district: "Toronto C15",
    lp_dol: 688000,
    taxes: "2688.00",
    roomsArea: "692.89",
    num_kit: "1",
    lotsz_code: null,
    front_ft: null,
    depth: null,
    is_Condo: true,
    pool: null,
    br_plus: null,
    br: 2,
    bath_tot: 2,
    bsmt1_out: "None",
    county: "Ontario",
    Latitude: 43.774059,
    Longitude: -79.330038,
    community_code: "01.C15.0650",
    lotArea: null,
    timestamp_sql: "2024-08-22 13:46:02",
    locker: "None",
    availability: "Flexible",
    ad_text:
      "Amazing Trio At Atria by Tridel, a modern condominium nestled in the heart of North York. Gorgeous Panoramic city view of Toronto on the 39th  floor.  Southwest exposure, bright sun filled  corner unit with 2 bedrooms, 2 bathrooms, freshly painted. Modern custom designed kitchen features: S/S appl, backsplash, quartz countertop, engineered single plank laminate flooring and thoughtfully planned entertaining spaces. Most convenient and rarely offered huge hand",
    Source: "TREB",
    PropertyType: "Residential",
    Amenities: "/////",
    gar_spaces: null,
    PropertySubType: "",
    irreg: null,
    yr: 2024,
    zoning: null,
    maint: "487.0000",
    dom: 4,
    MLS: "C9265899",
    SellingPrice: "688000",
    GnowiseValue: "943000",
    RiskofDecline: null,
    Value1Yr: null,
    Value2yr: null,
    PriceDifferencePerc: 37,
    Growth1YrPerc: 0,
    Growth2YrPerc: 0,
    Neighborhood: null,
    PriceHigh: "1037000",
    PriceLow: "849000",
    LastSoldDate: null,
    LastSoldPrice: null,
    TopFeaturesResult: null,
    ReportData: null,
    Forecast: null,
    SoldRecords: null,
    UpdatedDate: "2024-08-27 04:34:22.317112+00:00",
    CreatedDate: "2024-08-27 04:34:22.317112+00:00",
    GnowiseCapRate: 0.0238218451749735,
    GnowiseLease: 2600,
    ValuationSource: "A",
  },
];

function App({ apiURL, initialQuestions, messages }: IChatComponentProps) {
  const location = useLocation();
  const [message, setMessage] = useState("");
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
  const messageFieldColor = "131317";
  const backgroundColor = "ffffff";

  const outgoingMessageColor = "ffffff";
  const outgoingMessageTextColor = "000000";
  const messageFieldTextColor = "ffffff";
  const [thread, setThread] = useState("");
  const [answering, setAnswering] = useState(false);
  const [uttering, setUttering] = useState(false);
  const [tempPropertyData, setTempPropertyData] = useState<any>(sampleTempData);
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
  // const [tempPropertyData, setTempPropertyData] = useState<any>(null);

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
  console.log(messages);
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

    const response = await axios.get(
      apiURL +
        `/query?query=${encodedMessage}&thread_id=${thread}&tts=${wasLastMessageVoice}`
    );

    bottomRef.current?.scrollIntoView();
    setAnswering(false);
    messages.push({
      message: response.data.message,
      from: "them",
      properties: response.data.properties
        ? JSON.parse(response.data.properties)
        : null,
      propertiesRaw: response.data.propertiesRaw
        ? JSON.parse(response.data.propertiesRaw)
        : null,
    });
    console.log(
      response.data.properties
        ? JSON.parse(response.data.properties)
        : response.data.propertiesRaw
        ? JSON.parse(response.data.propertiesRaw)
        : null
    );

    setMessageCount(messageCount + 1);
    setTempPropertyData(
      response.data.properties
        ? JSON.parse(response.data.properties)
        : response.data.propertiesRaw
        ? JSON.parse(response.data.propertiesRaw)
        : null
    );

    console.log(wasLastMessageVoice);
    if (wasLastMessageVoice) {
      console.log(response.data.tts);
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
    console.log(query.get("property"));
    if (query.get("property")) {
      const response = await axios.get(
        apiURL + `/get-thread-with-query?property=${query.get("property")}`
      );
      console.log(response.data);
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
        });
      }
      setMessageCount(messageCount + 1);
    });
  }, []);

  const renderMessages = () => {
    console.log(messages);
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
            <PropertyCard property={message.propertyDataFromQuery} />
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
                    components={
                      {
                        // a: ({ node, ...props }) => {
                        //   return (
                        //     <a
                        //       {...props}
                        //       target="_blank"
                        //       className="text-yellow-100"
                        //       onClick={(event) => {
                        //         event.preventDefault();
                        //         console.log(props.href);
                        //       }}
                        //     >
                        //       {props.children}
                        //     </a>
                        //   );
                        // },
                      }
                    }
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
      if (message.properties) {
        return (
          <div>
            <PropertyGrid properties={message.properties} />
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
                <p className="w-full md:text-justify text-left max-w-full markdown-body">
                  <ReactMarkdown
                    components={
                      {
                        // a: ({ node, ...props }) => {
                        //   return (
                        //     <a
                        //       {...props}
                        //       target="_blank"
                        //       className="text-yellow-100"
                        //       onClick={(event) => {
                        //         // event.preventDefault();
                        //         console.log(props.href);
                        //       }}
                        //     >
                        //       {props.children}
                        //     </a>
                        //   );
                        // },
                      }
                    }
                    // rehypePlugins={[rehypeRaw]}
                    remarkPlugins={[remarkGfm]}
                    className="markdown-body"
                  >
                    {message.message}
                  </ReactMarkdown>
                </p>
              </li>
            </ul>
          </div>
        );
      }
      if (message.propertiesRaw) {
        return (
          <div>
            <PropertyGrid properties={message.propertiesRaw} />
            {message.propertiesRaw.length < 1 && (
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
                          backgroundColor:
                            sidebarCustomization.background_color,
                          color: sidebarCustomization.text_color,
                        }
                  }
                >
                  <p className="w-full md:text-justify text-left max-w-full markdown-body">
                    <ReactMarkdown
                      components={
                        {
                          // a: ({ node, ...props }) => {
                          //   return (
                          //     <a
                          //       {...props}
                          //       target="_blank"
                          //       className="text-yellow-100"
                          //       onClick={(event) => {
                          //         // event.preventDefault();
                          //         console.log(props.href);
                          //       }}
                          //     >
                          //       {props.children}
                          //     </a>
                          //   );
                          // },
                        }
                      }
                      // rehypePlugins={[rehypeRaw]}
                      remarkPlugins={[remarkGfm]}
                      className="markdown-body"
                    >
                      {message.message}
                    </ReactMarkdown>
                  </p>
                </li>
              </ul>
            )}
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
                  // rehypePlugins={[rehypeRaw]}
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
                            // console.log(props.href);

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
  bottomRef.current?.scrollIntoView({ behavior: "smooth" });

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
      className="md:h-screen bg-gray-100"
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
              <div className="flex fixed bottom-0 w-full md:relative bg-gray-100 p-4">
                <div className="flex items-center w-full bg-white rounded-full shadow-md p-2">
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
        {tempPropertyData && tempPropertyData.length != 0 && (
          // <Suspense fallback={<p>Loading map...</p>}>
          <div className="w-1/2">
            {" "}
            <Map data={tempPropertyData} />
          </div>

          // </Suspense>
        )}
      </div>
      {/* <iframe src="https://intelligenthomevaluation.com" className="w-full h-screen"></iframe>  */}
    </div>
  );
}

export default App;
