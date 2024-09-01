import React, { useState } from "react";
import PropertyModal from "./PropertyDetails";

interface Property {
  Price?: string;
  Address?: string;
  Location?: string;
  Type?: { value: string };
  Style?: { value: string };
  Images?: string[];
}

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

  console.log(property);

  return (
    <div className="p-4 bg-gray-900 text-white shadow rounded-md max-w-sm mb-3">
      {property.Images && property.Images.length > 0 && (
        <img
          src={property.Images[0]}
          alt="Property"
          className="w-full h-48 object-cover rounded-md mb-4"
        />
      )}
      {property.Address && (
        <h2 className="text-lg font-bold">
          <span className="text-blue-400">{property.Address}</span>
        </h2>
      )}
      {property.Price && (
        <p className="text-gray-400">Price: {property.Price}</p>
      )}
      {property.Location && (
        <p className="text-gray-400">Location: {property.Location}</p>
      )}
      {property.Type && (
        <p className="text-gray-400">Type: {property.Type.value}</p>
      )}
      {property.Style && (
        <p className="text-gray-400">Style: {property.Style.value}</p>
      )}
      <button
        className="mt-4 px-4 py-2 bg-white text-black rounded hover:bg-gray-300"
        onClick={openModal}
      >
        View Details
      </button>

      {isModalOpen && (
        <PropertyModal
          data={property}
          onClose={closeModal}
          isOpen={isModalOpen}
        />
      )}
    </div>
  );
};

export default PropertyCard;
