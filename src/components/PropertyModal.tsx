import React from "react";
import { ForecastEntry, Property } from "../types"; // Import the Property type
import ForecastGraph from "./ForecastGraph";
import DetailsTab from "./DetailsTab";

interface PropertyModalProps {
  property: Property;
  onClose: () => void;
}

const PropertyModal: React.FC<PropertyModalProps> = ({ property, onClose }) => {
  const [tab, setTab] = React.useState("Details");
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
          {/* Image Section */}
          <div className="md:w-2/5 w-full">
            <img
              src={`https://portal.gnowise.com/Lookup/GetPropertyImage?mlsno=${property.ml_num}`}
              alt="Property"
              className="w-full h-64 md:h-full object-cover rounded-t-xl md:rounded-t-none md:rounded-l-xl"
            />
          </div>

          {/* Content Section */}

          <div className="p-6 md:w-3/5 overflow-y-auto h-[500px] custom-scrollbar">
            <h2 className="text-2xl font-bold mb-4 text-blue-600">
              {/* <a
                href={`https://portal.gnowise.com/${property.ml_num}`}
                className=" hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              > */}
              {property.addr}
              {/* </a> */}
            </h2>
            {/* // create two tabs Details and Insights */}
            <div className="flex mb-4">
              <button
                className={`${
                  tab === "Details" ? "bg-blue-600 text-white" : "text-blue-600"
                } px-4 py-2 rounded-tl-lg`}
                onClick={() => setTab("Details")}
              >
                Details
              </button>
              <button
                className={`${
                  tab === "Insights"
                    ? "bg-blue-600 text-white"
                    : "text-blue-600"
                } px-4 py-2 rounded-tr-lg`}
                onClick={() => setTab("Insights")}
              >
                Insights
              </button>
            </div>
            {tab === "Details" ? (
              <DetailsTab property={property} />
            ) : (
              <>
                {property.GnowiseValue && (
                  <p className="mb-4">
                    <strong>Gnowise Value: </strong>
                    {!isNaN(parseFloat(property.GnowiseValue))
                      ? `$${parseFloat(property.GnowiseValue).toLocaleString()}`
                      : property.GnowiseValue}
                  </p>
                )}{" "}
                {property.SellingPrice && (
                  <p className="mb-4">
                    <strong>Selling Price: </strong>
                    {!isNaN(parseFloat(property.SellingPrice))
                      ? `$${parseFloat(property.SellingPrice).toLocaleString()}`
                      : property.SellingPrice}
                  </p>
                )}{" "}
                <div className="grid grid-cols-2 gap-4 border rounded-sm p-2 text-sm mt-1 mb-4">
                  <p>
                    <strong>Sqft:</strong> {property.roomsArea}
                  </p>
                  <p>
                    <strong>Sqft Lot:</strong> {property.sqft}
                  </p>
                </div>
                {/* Climate Risks Section */}
                <strong className="">Climate Risks: </strong>
                <div className="border rounded-sm p-2 text-sm mt-1 mb-4 bg-gray-50">
                  <div className="grid grid-cols-2 gap-4">
                    <p>
                      <strong>Flood Score:</strong> [FloodScore]
                    </p>
                    <p>
                      <strong>Fire Score:</strong> [FireScore]
                    </p>
                    <p>
                      <strong>Heat Score:</strong> [HeatScore]
                    </p>
                    <p>
                      <strong>Wind Score:</strong> [WindScore]
                    </p>
                  </div>
                </div>
                <strong className="mb-2">Insights:</strong>
                <div className="grid grid-cols-2 gap-4 border rounded-sm p-2 text-sm mt-1">
                  {property.GnowiseCapRate && (
                    <p className="">
                      <strong>Cap Rate: </strong>
                      {!isNaN(parseFloat(property.GnowiseCapRate))
                        ? `${parseFloat(property.GnowiseCapRate).toFixed(4)}%`
                        : property.GnowiseCapRate}
                    </p>
                  )}
                  {property.PriceDifferencePerc && (
                    <p className="">
                      <strong>Price Difference: </strong>
                      {!isNaN(
                        parseFloat(property.PriceDifferencePerc as string)
                      )
                        ? `${parseFloat(
                            property.PriceDifferencePerc as string
                          ).toFixed(2)}%`
                        : property.PriceDifferencePerc}
                    </p>
                  )}
                  {property.Growth1YrPerc && (
                    <p className="">
                      <strong>1-Year Growth: </strong>
                      {!isNaN(parseFloat(property.Growth1YrPerc as string))
                        ? `${parseFloat(
                            property.Growth1YrPerc as string
                          ).toFixed(2)}%`
                        : property.Growth1YrPerc}
                    </p>
                  )}
                  {property.Growth2YrPerc && (
                    <p className="">
                      <strong>2-Year Growth: </strong>
                      {!isNaN(parseFloat(property.Growth2YrPerc as string))
                        ? `${parseFloat(
                            property.Growth2YrPerc as string
                          ).toFixed(2)}%`
                        : property.Growth2YrPerc}
                    </p>
                  )}
                  {property.RiskofDecline && (
                    <p className="">
                      <strong>Risk of Decline: </strong>
                      {!isNaN(parseFloat(property.RiskofDecline as string))
                        ? `${parseFloat(
                            property.RiskofDecline as string
                          ).toFixed(2)}%`
                        : property.RiskofDecline}
                    </p>
                  )}
                </div>
                {/* {property.Forecast && (
                  <div className="mt-4">
                    <strong>Forecast:</strong>
                    <table className="table-auto border-collapse border border-gray-300 w-full text-sm">
                      <thead>
                        <tr>
                          <th className="border border-gray-300 px-4 py-2">
                            Date
                          </th>
                          <th className="border border-gray-300 px-4 py-2">
                            Forecast Value
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {JSON.parse(property.Forecast)
                          .filter((forecast: ForecastEntry | null) => {
                            // Filter out forecasts that are before today's date
                            if (!forecast) return false;
                            const forecastDate = new Date(forecast.Date);
                            return forecastDate >= new Date(); // Only future dates
                          })
                          .map(
                            (forecast: ForecastEntry | null, index: number) => {
                              if (!forecast) return null;
                              return (
                                <tr key={index}>
                                  <td className="border border-gray-300 px-4 py-2">
                                    {new Date(
                                      forecast.Date
                                    ).toLocaleDateString()}
                                  </td>
                                  <td className="border border-gray-300 px-4 py-2">
                                    {!isNaN(
                                      parseFloat(
                                        forecast.ForecastValue as string
                                      )
                                    )
                                      ? `$${parseFloat(
                                          forecast.ForecastValue as string
                                        ).toLocaleString()}`
                                      : forecast.ForecastValue}
                                  </td>
                                </tr>
                              );
                            }
                          )}
                      </tbody>
                    </table>
                  </div>
                )} */}
                <ForecastGraph property={property} />
              </>
            )}

            {property.Latitude && property.Longitude && (
              <button
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 mr-4"
                onClick={() =>
                  window.open(
                    `https://www.google.com/maps/search/?api=1&query=${property.Latitude},${property.Longitude}`,
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
  );
};

export default PropertyModal;
