import React from "react";

interface AddressTooltipProps {
  suggestions: string[];
  setMessage: (message: string) => void;
  disabled: boolean;
}

const AddressTooltip: React.FC<AddressTooltipProps> = ({
  suggestions,
  setMessage,
  disabled,
}) => {
  if (suggestions.length === 0 || disabled) {
    return <div></div>;
  }

  return (
    <div className="absolute bg-white border border-gray-300 rounded-md shadow-lg p-2 w-64 z-50 bottom-full mb-2">
      {suggestions.map((address, index) => (
        <div
          key={index}
          className="cursor-pointer p-2 hover:bg-gray-100 border-b last:border-none"
          onClick={() => {
            setMessage(address);
          }}
        >
          {address}
        </div>
      ))}
    </div>
  );
};

export default AddressTooltip;
