import React from "react";
import { Comparable, Property } from "../types"; // Import the Property type

interface PropertyCardProps {
  property: Comparable;
  openModal: () => void;
}

function toInt(value: string | number | null): number | null {
  if (value === null) {
    return null;
  }
  if (typeof value === "number") {
    // remove zeros
    value = value.toString();
  }
  const parsed = parseInt(value, 10);
  if (isNaN(parsed)) {
    return null;
  }
  return parsed;
}

const ComparableCardPopup: React.FC<PropertyCardProps> = ({
  property,
  openModal,
}) => {
  console.log(property);
  return (
    <div className="bg-white rounded-xl shadow-lg max-w-sm overflow-hidden h-[400px]">
      {/* Image with rounded corners */}
      <div className="relative">
        <img
          src={`https://intelligenthomevaluation.com/Lookup/GetPropertyImage?mlsno=${property.ml_num}`}
          alt="Property"
          className="w-full h-52 object-cover"
        />
        {/* Active badge */}
        {/* {property.availability ? (
          <span className="absolute top-2 left-2 bg-white text-green-600 font-semibold text-sm px-3 py-1 rounded-full shadow-md">
            Active
          </span>
        ) : ( */}
        <span className="absolute top-2 left-2 bg-gray-200 text-gray-700 font-semibold text-sm px-3 py-1 rounded-full shadow-md">
          Off Market
        </span>
        {/* )} */}
      </div>

      <div className="p-4">
        {property.Address && (
          <p className="text-lg font-bold text-gray-900 !m-0">
            {property.AptUnit &&
              property.AptUnit != "NA" &&
              property.AptUnit != "N/A" &&
              `${property.AptUnit} - `}
            {property.Address}
          </p>
        )}
        {property.Bedrooms && (
          <p className="text-sm text-gray-500 !m-0">
            {property.Bedrooms} bds | {property.Washrooms} baths -{" "}
            {property.Style} for sale
          </p>
        )}
        {property.SoldPrice && (
          <p className="text-lg font-bold text-gray-900">
            Sold at C${toInt(property.SoldPrice)?.toLocaleString()} <br />
            <span className="font-thin text-sm ">
              {property.SoldDate &&
                `on ${
                  // date format 19th June 2021
                  new Date(property.SoldDate).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                }`}
            </span>
          </p>
        )}
        {property.ListPrice && !property.SoldPrice && (
          <p className="text-lg font-bold text-gray-900 ">
            List Price: C${toInt(property.ListPrice)?.toLocaleString()}
          </p>
        )}
        <p className="text-sm text-gray-500 ">
          {property.ml_num && <span>MLS@ {property.ml_num}</span>}
        </p>
        {/* {property.GnowiseValue && (
          <p className="text-sm text-gray-500">
            Gnowise Value: {property.GnowiseValue}
          </p>
        )} */}
        {/* <button
          className=" w-full py-2 px-2 bg-blue-600 text-center text-white border-gray-300 rounded-lg hover:bg-blue-500 transition duration-300 mt-2"
          onClick={openModal}
        >
          Property Intelligence
        </button> */}
      </div>
    </div>
  );
};

export default ComparableCardPopup;
