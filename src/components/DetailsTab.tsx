import React from "react";
import ReactMarkdown from "react-markdown";
import { FaBed, FaBath, FaHome } from "react-icons/fa"; // Icons for a better UI
import { Property } from "../types";

interface PropertyDetailsProps {
  property: Property;
}

const DetailsTab: React.FC<PropertyDetailsProps> = ({ property }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {/* Price: Make it bigger and bold */}
      <p className="mb-4 text-3xl font-bold text-gray-900">
        $
        {property.lp_dol ? parseFloat(property.lp_dol).toLocaleString() : "N/A"}
      </p>

      {/* Property Type and Year Built in a horizontal layout */}
      <div className="flex justify-between items-center mb-4 text-sm text-gray-500">
        <p>
          <strong>Type:</strong> {property.style}
        </p>
        <p>
          <strong>Year Built:</strong>{" "}
          {property.yr_built ? property.yr_built : "N/A"}
        </p>
      </div>

      {/* Icons for Bedrooms, Bathrooms, and Style */}
      <div className="flex items-center space-x-4 mb-4 text-gray-700">
        <p className="flex items-center">
          <FaBed className="mr-1" />
          {property.br} Bedrooms
        </p>
        <p className="flex items-center">
          <FaBath className="mr-1" />
          {property.bath_tot} Bathrooms
        </p>
        <p className="flex items-center">
          <FaHome className="mr-1" />
          {property.style}
        </p>
      </div>

      {/* Location details */}

      {/* Conditionally render amenities */}
      {property.Amenities && property.Amenities !== "/////" && (
        <div className="mb-4 text-sm text-gray-500">
          <strong>Amenities:</strong>{" "}
          {property.Amenities && property.Amenities !== "/////"
            ? property.Amenities
            : "N/A"}
        </div>
      )}

      {/* Description rendered with react-markdown */}
      <div className="mb-4 text-gray-700">
        <strong>Description:</strong>
        <ReactMarkdown>{property.ad_text}</ReactMarkdown>
      </div>
      <div className="mb-4 text-sm text-gray-500">
        <p className="mb-1">
          <strong>Municipality:</strong> {property.municipality}
        </p>
        <p className="mb-1">
          <strong>Province:</strong> {property.county}
        </p>
        <p className="mb-1">
          <strong>Postal Code:</strong> {property.zip}
        </p>
        {property.community && (
          <p className="mb-1">
            <strong>Community:</strong> {property.community}
          </p>
        )}
      </div>
      {/* Lot and tax details in a horizontal layout */}
      <div className="flex justify-between items-center mb-2 text-sm text-gray-500">
        {property.lotArea && (
          <p>
            <strong>Lot Size:</strong> {property.lotArea}
            {property.lotsz_code ? ` (${property.lotsz_code})` : ""}
          </p>
        )}
        <p>
          <strong>Taxes:</strong> $
          {property.taxes ? parseFloat(property.taxes).toLocaleString() : "N/A"}
        </p>
      </div>

      {/* Parking and locker information */}
      <div className="mb-2 text-sm text-gray-500 flex justify-between">
        <p>
          <strong>Parking Spaces:</strong> {property.park_spcs}
        </p>
        <p>
          <strong>Locker:</strong> {property.locker ? property.locker : "None"}
        </p>
      </div>
      <div className="mb-2 text-sm text-gray-500 flex justify-between">
        {/* Frontage and Depth */}
        {property.front_ft && (
          <p className="mb-2 text-sm text-gray-500">
            <strong>Frontage:</strong>{" "}
            {!isNaN(parseFloat(property.front_ft))
              ? parseFloat(property.front_ft).toFixed(2)
              : "N/A"}{" "}
            ft
          </p>
        )}
        {property.depth && (
          <p className="mb-2 text-sm text-gray-500">
            <strong>Depth:</strong>{" "}
            {!isNaN(parseFloat(property.depth))
              ? parseFloat(property.depth).toFixed(2)
              : "N/A"}{" "}
            ft
          </p>
        )}
      </div>
    </div>
  );
};

export default DetailsTab;
