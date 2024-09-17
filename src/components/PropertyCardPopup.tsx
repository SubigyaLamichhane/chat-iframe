import React, { useState } from "react";
import PropertyModal from "./PropertyModal";
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
  // Check if the parsed value is a valid number
  if (isNaN(parsed)) {
    return null; // or false, depending on how you want to handle this
  }
  return parsed;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, openModal }) => {
  return (
    <div className="p-4 bg-gray-900 text-white shadow rounded-md max-w-sm">
      <img
        src={`https://portal.gnowise.com/Lookup/GetPropertyImage?mlsno=${property.ml_num}`}
        alt="Property"
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h2
        className="text-lg font-bold text-blue-400 hover:cursor-pointer"
        onClick={openModal}
      >
        {/* <a
          target="_blank"
          className="text-blue-400"
          href={`https://portal.gnowise.com/${property.ml_num}`}
        > */}
        {property.addr}, {property.municipality}
        {/* </a> */}
      </h2>
      {property.lp_dol && (
        <p className="text-gray-400">Price: ${toInt(property.lp_dol)}</p>
      )}
      {property.county && (
        <p className="text-gray-400">County: {property.county}</p>
      )}
      {/* {property.municipality && (
        <p className="text-gray-400">Municipality: {property.municipality}</p>
      )} */}
      {property.PropertyType && (
        <p className="text-gray-400">Property Type: {property.PropertyType}</p>
      )}
      {/* {property.PropertySubType && (
        <p className="text-gray-400">Subtype: {property.PropertySubType}</p>
      )} */}
      {property.style && (
        <p className="text-gray-400">Property Style: {property.style}</p>
      )}
      <button
        className="mt-4 px-4 py-2 bg-white text-black rounded hover:bg-gray-300"
        onClick={openModal}
      >
        View Details
      </button>
    </div>
  );
};

export default PropertyCard;
