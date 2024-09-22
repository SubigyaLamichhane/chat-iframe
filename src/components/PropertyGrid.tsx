import React from "react";
import PropertyCard from "./PropertyCard";
import { Property } from "../types"; // Import the Property type

interface PropertyGridProps {
  properties: Property[];
}

const PropertyGrid: React.FC<PropertyGridProps> = ({ properties }) => {
  return (
    <div className="grid grid-cols-1 gap-6 p-4 max-w-7xl">
      {properties.map((property, index) => (
        <PropertyCard key={index} property={property} />
      ))}
    </div>
  );
};

export default PropertyGrid;
