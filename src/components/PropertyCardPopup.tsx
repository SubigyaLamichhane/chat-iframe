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
        {/* Address */}
        <h2 className="text-lg font-semibold text-gray-800" onClick={openModal}>
          {property.addr}, {property.municipality}
        </h2>
        <p className="text-sm text-gray-500">
          {property.county}, {property.zip}
        </p>

        {/* Details */}
        <div className="flex justify-between items-center text-gray-600 text-sm my-2">
          <span>Bed / Bath / ft²</span>
          <span>
            {property.br} / {property.bath_tot} / {property.sqft}
          </span>
        </div>

        {/* List Price */}
        <p className="text-lg font-bold text-gray-900">
          List Price: ${toInt(property.lp_dol)?.toLocaleString()}
        </p>

        {/* Button */}
        <button
          className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
          onClick={openModal}
        >
          Get Property Report
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;
