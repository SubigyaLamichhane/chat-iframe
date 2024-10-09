import React, { useState } from "react";
import PropertyModal from "./PropertyModal";
import { Property } from "../types"; // Import the Property type
import { AiOutlineHeart } from "react-icons/ai"; // You can use react-icons for the heart icon

interface PropertyCardProps {
  property: Property;
}

function toInt(value: string | number | null): number | null {
  if (value === null || value === undefined) {
    return null;
  }
  if (typeof value === "number") {
    return value;
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

  // Skip rendering if the property has critical missing fields (like price, address, etc.)
  if (!property.addr || !property.lp_dol || !property.municipality) {
    return null;
  }

  return (
    <div className="relative bg-white rounded-xl shadow-lg max-w-sm overflow-hidden">
      {/* Heart icon */}
      <div className="absolute top-2 right-2 z-10">
        <AiOutlineHeart className="text-2xl text-gray-600" />
      </div>
      {/* Property Image */}
      <img
        src={`https://portal.gnowise.com/Lookup/GetPropertyImage?mlsno=${property.ml_num}`}
        alt="Property"
        className="w-full h-48 object-cover"
      />
      {/* Property Details */}
      <div className="p-4">
        {property.lp_dol && (
          <p className="text-lg font-bold text-gray-900">
            C${toInt(property.lp_dol)?.toLocaleString()}
          </p>
        )}

        {property.br && property.bath_tot && (
          <p className="text-sm text-gray-500">
            {property.br} bds | {property.bath_tot} ba - {property.style} for
            sale
          </p>
        )}

        <p
          className="text-base font-semibold text-gray-800 hover:text-blue-600 cursor-pointer mt-2"
          onClick={openModal}
        >
          {property.addr}, {property.municipality}, {property.zip}
        </p>

        {/* Conditionally render additional data */}
        {property.yr_built && (
          <p className="text-sm text-gray-500">
            Year Built: {property.yr_built}
          </p>
        )}
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
      {/* View Details Button */}

      {/* Property Modal */}
      {isModalOpen && (
        <PropertyModal property={property} onClose={closeModal} />
      )}
    </div>
  );
};

export default PropertyCard;

// import React, { useState } from "react";
// import PropertyModal from "./PropertyModal";
// import { Property } from "../types"; // Import the Property type

// interface PropertyCardProps {
//   property: Property;
// }

// function toInt(value: string | number | null): number | null {
//   if (value === null) {
//     return null;
//   }
//   if (typeof value === "number") {
//     value = value.toString();
//   }
//   const parsed = parseInt(value, 10);
//   if (isNaN(parsed)) {
//     return null;
//   }
//   return parsed;
// }

// const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-lg max-w-sm overflow-hidden">
//       {/* Property Image */}
//       <img
//         src={`https://portal.gnowise.com/Lookup/GetPropertyImage?mlsno=${property.ml_num}`}
//         alt="Property"
//         className="w-full h-48 object-cover"
//       />

//       {/* Property Details */}
//       <div className="p-4">
//         <h2
//           className="text-xl font-semibold text-gray-800 hover:text-blue-600 cursor-pointer"
//           onClick={openModal}
//         >
//           {property.addr}, {property.municipality}
//         </h2>
//         <p className="text-sm text-gray-500 mb-2">
//           {property.county && <span>County: {property.county}</span>}
//         </p>

//         {/* Property Type and Style */}
//         {property.PropertyType && (
//           <p className="text-gray-600">
//             <strong>Property Type:</strong> {property.PropertyType}
//           </p>
//         )}
//         {property.style && (
//           <p className="text-gray-600">
//             <strong>Property Style:</strong> {property.style}
//           </p>
//         )}

//         {/* Property Price */}
//         {property.lp_dol && (
//           <p className="text-gray-900 font-bold">
//             <strong>Price:</strong> ${toInt(property.lp_dol)?.toLocaleString()}
//           </p>
//         )}

//         {/* View Details Button */}
//         <button
//           className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
//           onClick={openModal}
//         >
//           View Details
//         </button>
//       </div>

//       {/* Property Modal */}
//       {isModalOpen && (
//         <PropertyModal property={property} onClose={closeModal} />
//       )}
//     </div>
//   );
// };

// export default PropertyCard;
