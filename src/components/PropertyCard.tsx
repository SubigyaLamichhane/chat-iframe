import React, { useState } from "react";
import PropertyModal from "./PropertyModal";
import { Property } from "../types"; // Import the Property type

interface PropertyCardProps {
  property: Property;
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
    <div className="p-4 bg-gray-900 text-white shadow rounded-md max-w-sm">
      <img
        src={`https://portal.gnowise.com/Lookup/GetPropertyImage?mlsno=${property.ml_num}`}
        alt="Property"
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h2 className="text-lg font-bold">{property.addr}</h2>
      {property.lp_dol && (
        <p className="text-gray-400">Price: ${property.lp_dol}</p>
      )}
      {property.county && (
        <p className="text-gray-400">County: {property.county}</p>
      )}
      {property.municipality && (
        <p className="text-gray-400">Municipality: {property.municipality}</p>
      )}
      {property.PropertyType && (
        <p className="text-gray-400">Type: {property.PropertyType}</p>
      )}
      {property.PropertySubType && (
        <p className="text-gray-400">Subtype: {property.PropertySubType}</p>
      )}
      {property.style && (
        <p className="text-gray-400">Style: {property.style}</p>
      )}
      <button
        className="mt-4 px-4 py-2 bg-white text-black rounded hover:bg-gray-300"
        onClick={openModal}
      >
        View Details
      </button>

      {isModalOpen && (
        <PropertyModal property={property} onClose={closeModal} />
      )}
    </div>
  );
};

export default PropertyCard;
