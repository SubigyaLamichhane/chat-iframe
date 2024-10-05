import React from "react";
import { Property } from "../types"; // Import the Property type

interface PropertyCardProps {
  property: Property;
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

const PropertyCard: React.FC<PropertyCardProps> = ({ property, openModal }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg max-w-sm overflow-hidden">
      {/* Image with rounded corners */}
      <div className="relative">
        <img
          src={`https://portal.gnowise.com/Lookup/GetPropertyImage?mlsno=${property.ml_num}`}
          alt="Property"
          className="w-full h-48 object-cover"
        />
        {/* Active badge */}
        <span className="absolute top-2 left-2 bg-white text-green-600 font-semibold text-sm px-3 py-1 rounded-full shadow-md">
          Active
        </span>
      </div>

      <div className="p-4">
        {property.lp_dol && (
          <p className="text-lg font-bold text-gray-900">
            C${toInt(property.lp_dol)?.toLocaleString()}
          </p>
        )}

        {property.br && property.bath_tot && (
          <p className="text-sm text-gray-500">
            {property.br} bds | {property.bath_tot} ba -{" "}
            {property.is_Condo ? "Condo" : "Apartment"} for sale
          </p>
        )}

        <p
          className="text-base font-semibold text-gray-800 hover:text-blue-600 cursor-pointer mt-2"
          onClick={openModal}
        >
          {property.addr}, {property.municipality}, {property.zip}
        </p>

        {/* Conditionally render additional data */}
        {/* {property.yr_built && (
          <p className="text-sm text-gray-500">
            Year Built: {property.yr_built}
          </p>
        )} */}
        <p className="text-sm text-gray-500">
          {property.ml_num && <span>MLS@ {property.ml_num}</span>}
        </p>

        {/* {property.GnowiseValue && (
          <p className="text-sm text-gray-500">
            Gnowise Value: {property.GnowiseValue}
          </p>
        )} */}
        <button
          className="mt-2  w-full py-2 px-2 bg-blue-600 text-center text-white border-gray-300 rounded-lg hover:bg-blue-500 transition duration-300"
          onClick={openModal}
        >
          Property Intelligence
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;
