import React from "react";
import ChatComponent from "./ChatComponent";
import axios from "axios";

let messages: {
  message: string;
  from: "us" | "them";
  properties?: any;
  propertyDataFromQuery?: any;
}[] = [
  {
    message: "Please enter the address you would like to analyze.",
    from: "them",
  },
];

const PropertyValuationChatbot = () => {
  const apiURL = "https://intelligenthomevaluation.com";

  return (
    <ChatComponent messages={messages} apiURL={apiURL} initialQuestions={[]} />
  );
};

export default PropertyValuationChatbot;
