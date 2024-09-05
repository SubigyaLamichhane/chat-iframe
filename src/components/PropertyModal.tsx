import React from "react";
import { Property } from "../types"; // Import the Property type

interface PropertyModalProps {
  property: Property;
  onClose: () => void;
}

const PropertyModal: React.FC<PropertyModalProps> = ({ property, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-90 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div className="bg-gray-900 text-white rounded-lg overflow-hidden w-11/12 max-w-4xl md:flex">
        <div className="md:w-1/3 hidden md:block">
          <img
            src={`https://portal.gnowise.com/Lookup/GetPropertyImage?mlsno=${property.ml_num}`}
            alt="Property"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6 md:w-2/3 overflow-y-auto max-h-96">
          <h2 className="text-2xl font-bold mb-4">
            <a
              href={`https://portal.gnowise.com/${property.ml_num}`}
              className="text-blue-400"
            >
              {property.addr}
            </a>
          </h2>
          <p className="mb-2">
            <strong>Price:</strong> ${property.lp_dol}
          </p>
          <p className="mb-2">
            <strong>County:</strong> {property.county}
          </p>
          <p className="mb-2">
            <strong>Municipality:</strong> {property.municipality}
          </p>
          <p className="mb-2">
            <strong>Zip Code:</strong> {property.zip}
          </p>
          <p className="mb-2">
            <strong>Year Built:</strong> {property.yr_built}
          </p>
          <p className="mb-2">
            <strong>Style:</strong> {property.style}
          </p>
          <p className="mb-2">
            <strong>Bedrooms:</strong> {property.br}
          </p>
          <p className="mb-2">
            <strong>Bathrooms:</strong> {property.bath_tot}
          </p>
          <p className="mb-2">
            <strong>Community:</strong> {property.community}
          </p>
          {/* <p className="mb-2"><strong>Latitude:</strong> {property.Latitude}</p> */}
          {/* <p className="mb-2"><strong>Longitude:</strong> {property.Longitude}</p> */}
          <p className="mb-2">
            <strong>Amenities:</strong> {property.Amenities}
          </p>
          <p className="mb-4">
            <strong>Description:</strong> {property.ad_text}
          </p>
          <p className="mb-2">
            <strong>Parking Spaces:</strong> {property.park_spcs}
          </p>
          <p className="mb-2">
            <strong>Locker:</strong> {property.locker}
          </p>
          <p className="mb-2">
            <strong>Availability:</strong> {property.availability}
          </p>

          {property.GnowiseCapRate && (
            <p className="mb-2">
              <strong>Cap Rate:</strong> {property.GnowiseCapRate}
            </p>
          )}

          {/* <p className="mb-2"><strong>Source:</strong> {property.Source}</p> */}

          {property.Latitude && property.Longitude && (
            <button
              className="mt-4 px-4 py-2 bg-white text-black rounded hover:bg-gray-300 mr-4"
              onClick={() =>
                window.open(
                  `https://www.google.com/maps/search/?api=1&query=${property.Latitude},${property.Longitude}`
                )
              }
            >
              View in Google Maps
            </button>
          )}
          <button
            className="mt-4 px-4 py-2 bg-white text-black rounded hover:bg-gray-300"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyModal;
