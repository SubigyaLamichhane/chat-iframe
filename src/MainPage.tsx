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
    message: "Please enter your query below.",
    from: "them",
  },
];

const PropertyValuationChatbot = () => {
  const apiURL = "https://ai-scrapper.subigyalamichhane.com.np";

  return (
    <ChatComponent messages={messages} apiURL={apiURL} initialQuestions={[]} />
  );
};

export default PropertyValuationChatbot;
