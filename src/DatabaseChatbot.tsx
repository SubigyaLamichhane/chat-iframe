import React from "react";
import ChatComponent from "./ChatComponent";
import axios from "axios";

const initialQuestions = [
  "Show me the top investment properties in Toronto today.",
  "Show me the top investment properties in Canada today.",
  "With a $2,000,000 budget, show me the best investment options and combinations available today.",
  "Show me Ontario properties with a risk of decline under 20%, a 1-year growth rate over 10%, and a cap rate above 5% available today.",
];

let messages: {
  message: string;
  from: "us" | "them";
  properties?: any;
  propertyDataFromQuery?: any;
}[] = [];

const PropertyValuationChatbot = () => {
  const apiURL = "https://intelligenthomevaluation.com/database";
  //   const apiURL = "http://localhost:5000/database";

  return (
    <ChatComponent
      messages={messages}
      apiURL={apiURL}
      initialQuestions={initialQuestions}
    />
  );
};

export default PropertyValuationChatbot;
