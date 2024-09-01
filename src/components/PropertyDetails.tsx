import React from "react";
import Modal from "react-modal"; // You can use any modal library or a custom implementation
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface PropertyDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    [key: string]: any;
  };
}

const PropertyDetailsModal: React.FC<PropertyDetailsProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    draggable: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const renderValue = (key: string, value: any) => {
    if (typeof value === "string") {
      return <p className="text-gray-700">{value}</p>;
    } else if (
      typeof value === "object" &&
      value !== null &&
      !Array.isArray(value)
    ) {
      return (
        <div className="flex items-center space-x-2">
          <img src={value.icon_url} alt={key} className="w-6 h-6" />
          <p className="text-gray-700">{value.value}</p>
        </div>
      );
    } else if (Array.isArray(value)) {
      return (
        <ul className="list-disc list-inside">
          {value.map((item, index) => (
            <li key={index} className="text-gray-700">
              {item}
            </li>
          ))}
        </ul>
      );
    }
    return null;
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="fixed inset-0 flex items-center justify-center p-4 bg-gray-800 bg-opacity-75"
      ariaHideApp={false}
    >
      <div className="bg-white rounded-lg shadow-lg max-w-[550px] md:max-w-4xl max-h-[80vh] overflow-y-auto md:overflow-y-hidden">
        <div className="relative">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-2 right-8 text-gray-500 hover:text-gray-800 text-2xl"
          >
            &times;
          </button>

          <div className="grid grid-cols-2">
            <div>
              {data.Images && (
                <Slider {...settings}>
                  {data.Images.map((image: string, index: number) => (
                    <div key={index} className="h-[400px]">
                      <div
                        className="h-full bg-contain bg-center bg-no-repeat"
                        style={{
                          backgroundImage: `url(${image})`,
                          //   backgroundSize: "cover",
                          //   backgroundPosition: "center",
                        }}
                      ></div>
                    </div>
                  ))}
                </Slider>
              )}
              <div className="text-sm text-gray-500 text-center mt-8">
                <p>
                  {data["Property Code"]} | {data["Days on Market"]}
                </p>
              </div>
            </div>

            <div className="overflow-y-auto h-[500px]">
              {/* Address */}
              <div className="p-6">
                <h2 className="text-3xl font-bold text-gray-900">
                  {data.Address}
                </h2>
                <p className="text-xl text-gray-700">{data.Location}</p>

                {/* Price */}
                <p className="text-2xl font-semibold text-gray-900 mt-4">
                  {data.Price}
                </p>

                {/* Tags for Beds, Baths, and Lot Size */}
                <div className="flex space-x-4 mt-4">
                  <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full">
                    {data.Beds}
                  </span>
                  <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full">
                    {data.Baths}
                  </span>
                  <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full">
                    {data["Lot Size"]}
                  </span>
                </div>

                {/* Additional Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  {Object.keys(data)
                    .filter(
                      (key) =>
                        ![
                          "Images",
                          "Property Code",
                          "Days on Market",
                          "Address",
                          "Location",
                          "Price",
                          "Beds",
                          "Baths",
                          "Lot Size",
                          "Features",
                        ].includes(key)
                    )
                    .map((key, index) => (
                      <div key={index} className="mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {key}
                        </h3>
                        {renderValue(key, data[key])}
                      </div>
                    ))}
                </div>

                {/* Features */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Features
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {data.Features &&
                      data.Features.map((feature: string, index: number) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded"
                        >
                          {feature}
                        </span>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PropertyDetailsModal;
