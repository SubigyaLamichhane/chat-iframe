import React, { useState } from "react";
import PropertyModal from "./PropertyModal";
import { Property } from "../types"; // Import the Property type

interface PropertyCardProps {
  property: Property;
}

function toInt(value: string | number | null): number | null {
  if (value === null) {
    return null;
  }
  if (typeof value === "number") {
    value = value.toString();
  }
  const parsed = parseInt(value, 10);
  if (isNaN(parsed)) {
    return null;
  }
  return parsed;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg max-w-sm overflow-hidden">
      {/* Property Image */}
      <img
        src={`https://portal.gnowise.com/Lookup/GetPropertyImage?mlsno=${property.ml_num}`}
        alt="Property"
        className="w-full h-48 object-cover"
      />

      {/* Property Details */}
      <div className="p-4">
        <h2
          className="text-xl font-semibold text-gray-800 hover:text-blue-600 cursor-pointer"
          onClick={openModal}
        >
          {property.addr}, {property.municipality}
        </h2>
        <p className="text-sm text-gray-500 mb-2">
          {property.county && <span>County: {property.county}</span>}
        </p>

        {/* Property Type and Style */}
        {property.PropertyType && (
          <p className="text-gray-600">
            <strong>Property Type:</strong> {property.PropertyType}
          </p>
        )}
        {property.style && (
          <p className="text-gray-600">
            <strong>Property Style:</strong> {property.style}
          </p>
        )}

        {/* Property Price */}
        {property.lp_dol && (
          <p className="text-gray-900 font-bold">
            <strong>Price:</strong> ${toInt(property.lp_dol)?.toLocaleString()}
          </p>
        )}

        {/* View Details Button */}
        <button
          className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
          onClick={openModal}
        >
          View Details
        </button>
      </div>

      {/* Property Modal */}
      {isModalOpen && (
        <PropertyModal property={property} onClose={closeModal} />
      )}
    </div>
  );
};

export default PropertyCard;
