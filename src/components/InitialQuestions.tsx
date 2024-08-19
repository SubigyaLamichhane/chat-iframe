import React from "react";

interface InitialQuestionsProps {
  submitData: (data: string) => void;
}

const InitialQuestions = ({ submitData }: InitialQuestionsProps) => {
  return (
    <div className="flex items-center justify-center ">
      <div className="absolute inset-0 bg-gray-800/80 opacity-50"></div>
      <div className="relative z-10 flex flex-col items-center w-full h-full justify-center space-y-4">
        <button
          onClick={() =>
            submitData(
              "Show me the top investment properties in Toronto today."
            )
          }
          className="w-4/5 md:w-1/2 lg:w-1/3 py-4 px-6 text-white bg-black border-2 border-white rounded-md hover:bg-white hover:text-black transition duration-300"
        >
          Show me the top investment properties in Toronto today.
        </button>
        <button
          onClick={() =>
            submitData("Show me the top investment properties in Canada today.")
          }
          className="w-4/5 md:w-1/2 lg:w-1/3 py-4 px-6 text-white bg-black border-2 border-white rounded-md hover:bg-white hover:text-black transition duration-300"
        >
          Show me the top investment properties in Canada today.
        </button>
        <button
          onClick={() =>
            submitData(
              "With a $2,000,000 budget, show me the best investment options and combinations available today."
            )
          }
          className="w-4/5 md:w-1/2 lg:w-1/3 py-4 px-6 text-white bg-black border-2 border-white rounded-md hover:bg-white hover:text-black transition duration-300"
        >
          With a $2,000,000 budget, show me the best investment options and
          combinations available today.
        </button>
        <button
          onClick={() =>
            submitData(
              "Show me Ontario properties with a risk of decline under 20%, a 1-year growth rate over 10%, and a cap rate above 5% available today."
            )
          }
          className="w-4/5 md:w-1/2 lg:w-1/3 py-4 px-6 text-white bg-black border-2 border-white rounded-md hover:bg-white hover:text-black transition duration-300"
        >
          Show me Ontario properties with a risk of decline under 20%, a 1-year
          growth rate over 10%, and a cap rate above 5% available today.
        </button>
      </div>
    </div>
  );
};

export default InitialQuestions;
