import React from "react";
import Property1 from "../assets/property1.svg";
import Property2 from "../assets/property2.svg";
import Property3 from "../assets/property3.svg";
import Property4 from "../assets/property4.svg";

interface InitialQuestionsProps {
  submitData: (data: string) => void;
  initialQuestions: string[];
}

const InitialQuestions = ({
  submitData,
  initialQuestions,
}: InitialQuestionsProps) => {
  return (
    <div className="flex items-center justify-center ">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-6 space-y-4 border">
        <h2 className="text-xl font-semibold text-gray-800">
          A few questions to help you get started...
        </h2>
        {initialQuestions.map((question, index) => (
          <button
            key={index}
            onClick={() => submitData(question)}
            className="w-full py-3 px-4 text-left text-gray-800 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 transition duration-300 flex items-center space-x-3"
          >
            {/* <span className="material-icons text-blue-500">search</span> */}
            {/* Select icons property1 to 4 based on the index mod */}
            {index % 4 === 0 && (
              <img src={Property1} alt="property1" className="w-8 h-8" />
            )}
            {index % 4 === 1 && (
              <img src={Property2} alt="property2" className="w-8 h-8" />
            )}
            {index % 4 === 2 && (
              <img src={Property3} alt="property3" className="w-8 h-8" />
            )}
            {index % 4 === 3 && (
              <img src={Property4} alt="property4" className="w-8 h-8" />
            )}

            <span>{question}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default InitialQuestions;
