import React from "react";
import PropertyCard from "./PropertyCard";
import { Property } from "../types"; // Import the Property type

interface PropertyGridProps {
  properties: Property[];
  setHoveredProperty: (property: Property | null) => void;
}

const PropertyGrid: React.FC<PropertyGridProps> = ({
  properties,
  setHoveredProperty,
}) => {
  return (
    <div className="grid grid-cols-1 gap-6 p-4 max-w-7xl">
      {properties.map((property, index) => (
        <PropertyCard
          key={index}
          property={property}
          setHoveredProperty={setHoveredProperty}
        />
      ))}
    </div>
  );
};

export default PropertyGrid;
