import React, { useState } from "react";
import MainPage from "./MainPage";

interface ProxyPageProps {}

const ProxyPage: React.FC<ProxyPageProps> = ({}) => {
  const defaultMessages: { message: string; from: "us" | "them" }[] = [
    {
      message: "Please enter the address you would like to analyze.",
      from: "them",
    },
  ];
  const [messages, setMessages] =
    useState<{ message: string; from: "us" | "them" }[]>(defaultMessages);
  return <MainPage messages={messages} setMessages={setMessages} />;
};

export default ProxyPage;
