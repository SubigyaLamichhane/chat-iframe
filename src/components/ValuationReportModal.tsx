import React from "react";
import { ForecastEntry, Property, ValuationReport } from "../types"; // Import the Property type
import ForecastGraph from "./ForecastGraph";
import DetailsTab from "./DetailsTab";
// import Slider from "react-slick";
import { Slide } from "react-slideshow-image";

interface PropertyModalProps {
  valuationReport: ValuationReport;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  onClose: () => void;
}

const spanStyle = {
  padding: "10px",
  background: "rgba(0, 0, 0, 0.5)",
  color: "#ffffff",
  borderRadius: "4px",
};

const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundSize: "cover",
  backgroundPosition: "center",
  height: "100%", // Full height of the modal
};

const ValuationReportModal: React.FC<PropertyModalProps> = ({
  valuationReport,
  coordinates,
  onClose,
}) => {
  const [tab, setTab] = React.useState("Details");
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current: any, next: any) => setCurrentSlide(next),
  };
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-gray-50 text-gray-900 rounded-xl overflow-hidden w-11/12 max-w-4xl shadow-lg"
        onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
      >
        <div className="flex flex-col md:flex-row">
          {/* Content Section */}
          {
            //   "appr_attributes": {
            //     "property_type": "Detached",
            //     "rooms area": 1622,
            //     "lot area": 0
            //   },
            //   "gnowise_value": 2765000,
            //   "risk_of_decline": 40,
            //   "value_high": 3042000,
            //   "value_low": 2488000,
            //   "gnowise_lease": 7600,
            //   "lease_low": 7000,
            //   "lease_high": 8000,
            //   "property_attributes": {
            //     "AC": "Central Air",
            //     "Address": "301 Chaplin Crescent",
            //     "Age": "100+",
            //     "AptUnit": "",
            //     "Basement1": "Fin W/O",
            //     "Bedrooms": 3,
            //     "Den": 2,
            //     "FSA": "m5p",
            //     "Kitchens": 1,
            //     "LotArea": 3090,
            //     "ParkingSpaces": 1,
            //     "Municipality": "Toronto",
            //     "Pool": "Other",
            //     "PostalCode": "m5p1b1",
            //     "Province": "ON",
            //     "RoomsArea": 1622,
            //     "Sqft": "Other",
            //     "Style": "2 1/2 Storey",
            //     "Type1": "Detached",
            //     "Washrooms": 3
            //   },
            //   "dom_high": 56,
            //   "dom_low": 24,
            //   "gnowise_cap_rate": 0.023748282097649186,
            //   "hpi": {
            //     "M5P_All_median_price": 76825,
            //     "M5P_Apartment_median_price": 1049600,
            //     "M5P_Detached_median_price": 5258481,
            //     "M5P_Other_median_price": 1945770,
            //     "M5P_Row_median_price": 2082669,
            //     "M5P_Semi_median_price": 2082669
            //   },
            //   "liquidity_score": 0.71,
            //   "one_year_growth_rate": 0.96,
            //   "price_in_one_year": 2791544,
            //   "price_in_two_years": 2820023,
            //   "two_year_growth_rate": 1.99,
            //   "valuation_source": "A"
            // },
          }

          <div
            className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
            onClick={onClose}
          >
            <div
              className="bg-gray-50 text-gray-900 rounded-xl overflow-hidden w-11/12 max-w-4xl shadow-lg"
              onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
            >
              <div className="p-6 overflow-y-auto h-[500px] custom-scrollbar">
                <h2 className="text-2xl font-bold mb-4 text-blue-600">
                  {valuationReport.property_attributes.Address}
                  {valuationReport.property_attributes.AptUnit &&
                    `, ${valuationReport.property_attributes.AptUnit}`}
                </h2>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p>
                      <strong>Property Type:</strong>{" "}
                      {valuationReport.appr_attributes.property_type}
                    </p>
                    <p>
                      <strong>Bedrooms:</strong>{" "}
                      {valuationReport.property_attributes.Bedrooms}
                    </p>
                    <p>
                      <strong>Bathrooms:</strong>{" "}
                      {valuationReport.property_attributes.Washrooms}
                    </p>
                    <p>
                      <strong>Den:</strong>{" "}
                      {valuationReport.property_attributes.Den}
                    </p>
                    <p>
                      <strong>Lot Area:</strong>{" "}
                      {valuationReport.property_attributes.LotArea} sq. ft.
                    </p>
                    <p>
                      <strong>Rooms Area:</strong>{" "}
                      {valuationReport.property_attributes.RoomsArea} sq. ft.
                    </p>
                  </div>
                  <div>
                    <p>
                      <strong>Age:</strong>{" "}
                      {valuationReport.property_attributes.Age}
                    </p>
                    <p>
                      <strong>Style:</strong>{" "}
                      {valuationReport.property_attributes.Style}
                    </p>
                    <p>
                      <strong>AC:</strong>{" "}
                      {valuationReport.property_attributes.AC}
                    </p>
                    <p>
                      <strong>Parking Spaces:</strong>{" "}
                      {valuationReport.property_attributes.ParkingSpaces}
                    </p>
                    <p>
                      <strong>Municipality:</strong>{" "}
                      {valuationReport.property_attributes.Municipality}
                    </p>
                    <p>
                      <strong>Postal Code:</strong>{" "}
                      {valuationReport.property_attributes.PostalCode}
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-bold mb-2">Valuation Details</h3>
                  <p>
                    <strong>Gnowise Value:</strong> $
                    {valuationReport.gnowise_value.toLocaleString()}
                  </p>
                  <p>
                    <strong>Risk of Decline:</strong>{" "}
                    {valuationReport.risk_of_decline}%
                  </p>
                  <p>
                    <strong>High Estimate:</strong> $
                    {valuationReport.value_high.toLocaleString()}
                  </p>
                  <p>
                    <strong>Low Estimate:</strong> $
                    {valuationReport.value_low.toLocaleString()}
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-bold mb-2">Lease Details</h3>
                  <p>
                    <strong>Gnowise Lease:</strong> $
                    {valuationReport.gnowise_lease.toLocaleString()}
                  </p>
                  <p>
                    <strong>Lease Range:</strong> $
                    {valuationReport.lease_low.toLocaleString()} - $
                    {valuationReport.lease_high.toLocaleString()}
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-bold mb-2">Market Insights</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <p>
                      <strong>Liquidity Score:</strong>{" "}
                      {valuationReport.liquidity_score}
                    </p>
                    <p>
                      <strong>One-Year Growth Rate:</strong>{" "}
                      {(valuationReport.one_year_growth_rate * 100).toFixed(2)}%
                    </p>
                    <p>
                      <strong>Price in One Year:</strong> $
                      {valuationReport.price_in_one_year.toLocaleString()}
                    </p>
                    <p>
                      <strong>Two-Year Growth Rate:</strong>{" "}
                      {(valuationReport.two_year_growth_rate * 100).toFixed(2)}%
                    </p>
                    <p>
                      <strong>Price in Two Years:</strong> $
                      {valuationReport.price_in_two_years.toLocaleString()}
                    </p>
                    <p>
                      <strong>Cap Rate:</strong>{" "}
                      {(valuationReport.gnowise_cap_rate * 100).toFixed(2)}%
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-bold mb-2">
                    HPI (Median Prices)
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(valuationReport.hpi).map(([key, value]) => (
                      <p key={key}>
                        <strong>
                          {key.replace(/_/g, " ").replace(/M5P /, "")}:
                        </strong>{" "}
                        ${value.toLocaleString()}
                      </p>
                    ))}
                  </div>
                </div>
                {coordinates.latitude && coordinates.longitude && (
                  <button
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 mr-4"
                    onClick={() =>
                      window.open(
                        `https://www.google.com/maps/search/?api=1&query=${coordinates.latitude},${coordinates.longitude}`,
                        "_blank"
                      )
                    }
                  >
                    View in Google Maps
                  </button>
                )}
                <button
                  className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
                  onClick={onClose}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValuationReportModal;
