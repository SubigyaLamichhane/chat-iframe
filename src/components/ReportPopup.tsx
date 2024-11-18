import React from "react";
import { Comparable, Property, ValuationReport } from "../types"; // Import the Property type

interface PropertyCardProps {
  valuationReport: ValuationReport;
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
  if (isNaN(parsed)) {
    return null;
  }
  return parsed;
}

const ValuationReportPopup: React.FC<PropertyCardProps> = ({
  valuationReport,
  openModal,
}) => {
  // console.log(property);
  return (
    <div className="bg-white rounded-xl shadow-lg max-w-sm overflow-hidden h-[350px]">
      {/* Image with rounded corners */}
      <div className="relative">
        {/* <img
          src={`https://intelligenthomevaluation.com/Lookup/GetPropertyImage?mlsno=${valuationReport..ml_num}`}
          alt="Property"
          className="w-full h-52 object-cover"
        /> */}
        {/* Active badge */}
        {/* {property.availability ? ( */}
        <span className="absolute top-2 left-2 bg-white text-green-600 font-semibold text-sm px-3 py-1 rounded-full shadow-md">
          Valuation Report
        </span>
        {/* ) : ( */}
        {/* <span className="absolute top-2 left-2 bg-gray-200 text-gray-700 font-semibold text-sm px-3 py-1 rounded-full shadow-md">
          Off Market
        </span> */}
        {/* )} */}
      </div>
      {/* {
    "appr_attributes": {
      "property_type": "Detached",
      "rooms area": 1622,
      "lot area": 0
    },
    "gnowise_value": 2765000,
    "risk_of_decline": 40,
    "value_high": 3042000,
    "value_low": 2488000,
    "gnowise_lease": 7600,
    "lease_low": 7000,
    "lease_high": 8000,
    "property_attributes": {
      "AC": "Central Air",
      "Address": "301 Chaplin Crescent",
      "Age": "100+",
      "AptUnit": "",
      "Basement1": "Fin W/O",
      "Bedrooms": 3,
      "Den": 2,
      "FSA": "m5p",
      "Kitchens": 1,
      "LotArea": 3090,
      "ParkingSpaces": 1,
      "Municipality": "Toronto",
      "Pool": "Other",
      "PostalCode": "m5p1b1",
      "Province": "ON",
      "RoomsArea": 1622,
      "Sqft": "Other",
      "Style": "2 1/2 Storey",
      "Type1": "Detached",
      "Washrooms": 3
    },
    "dom_high": 56,
    "dom_low": 24,
    "gnowise_cap_rate": 0.023748282097649186,
    "hpi": {
      "M5P_All_median_price": 76825,
      "M5P_Apartment_median_price": 1049600,
      "M5P_Detached_median_price": 5258481,
      "M5P_Other_median_price": 1945770,
      "M5P_Row_median_price": 2082669,
      "M5P_Semi_median_price": 2082669
    },
    "liquidity_score": 0.71,
    "one_year_growth_rate": 0.96,
    "price_in_one_year": 2791544,
    "price_in_two_years": 2820023,
    "two_year_growth_rate": 1.99,
    "valuation_source": "A"
  }, */}
      <div className="p-4 mt-10">
        <div className="my-4">
          <p className="text-lg font-bold text-gray-900 !m-0">
            C${valuationReport.gnowise_value}{" "}
          </p>
          <p className="font-normal text-sm !m-0">Gnowise Valuation</p>
        </div>
        <p className="text-lg font-bold text-gray-900 !m-0">
          {valuationReport.property_attributes.Address}
        </p>
        <p className="text-sm text-gray-500 !m-0 pb-4">
          {valuationReport.property_attributes.Bedrooms} bds |{" "}
          {valuationReport.property_attributes.Washrooms} baths -{" "}
          {valuationReport.property_attributes.Style}
        </p>

        <p className="text-lg text-gray-900 !m-0">
          Risk of Decline:{" "}
          <span className="font-semibold">
            {" "}
            {valuationReport.risk_of_decline}%
          </span>
        </p>
        <p className="text-lg text-gray-900 !m-0">
          Value High:{" "}
          <span className="font-semibold">
            C${valuationReport.value_high.toLocaleString()}
          </span>
        </p>
        <p className="text-lg text-gray-900 !m-0">
          Value Low:{" "}
          <span className="font-semibold">
            C${valuationReport.value_low.toLocaleString()}
          </span>
        </p>
        {/* <p className="text-lg text-gray-900 !m-0">
          Gnowise Lease:{" "}
          <span className="font-semibold">
            C${valuationReport.gnowise_lease.toLocaleString()}
          </span>
        </p> */}
      </div>
      <button
        onClick={openModal}
        className="bg-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-lg w-full "
      >
        View Full Report
      </button>
    </div>
  );
};

export default ValuationReportPopup;
