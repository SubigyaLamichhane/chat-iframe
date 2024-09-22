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

  return (
    <div className="bg-white rounded-xl shadow-lg max-w-sm mb-4 overflow-hidden">
      {/* Display Property Image */}
      {property.Images && property.Images.length > 0 && (
        <img
          src={property.Images[0]}
          alt="Property"
          className="w-full h-48 object-cover"
        />
      )}

      {/* Property Details */}
      <div className="p-4">
        {property.Address && (
          <h2 className="text-xl font-semibold text-gray-800 mb-1">
            <span
              className="text-blue-600 hover:underline cursor-pointer"
              onClick={openModal}
            >
              {property.Address}
            </span>
          </h2>
        )}
        {property.Price && (
          <p className="text-gray-700 mb-1">
            <strong>Price:</strong> {property.Price}
          </p>
        )}
        {property.Location && (
          <p className="text-gray-700 mb-1">
            <strong>Location:</strong> {property.Location}
          </p>
        )}
        {property.Type && (
          <p className="text-gray-700 mb-1">
            <strong>Type:</strong> {property.Type.value}
          </p>
        )}
        {property.Style && (
          <p className="text-gray-700">
            <strong>Style:</strong> {property.Style.value}
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
