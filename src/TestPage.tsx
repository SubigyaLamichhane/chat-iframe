import React, { useState } from "react";
import PropertyDetailsModal from "./components/PropertyDetails";

const propertyData = {
  "Property Code": "E6723026",
  "Days on Market": "0 days",
  Price: "C$899,000",
  Address: "1571 Greenmount St ,",
  Location: "Pickering ,Ontario",
  Beds: "3 beds",
  Baths: "3 bath",
  "Lot Size": "22.31 x 153.51 ft",
  Type: {
    value: "House",
    icon_url:
      "http://localhost:5000/proxy-image/wp-content/themes/houzez33/uiv2/images/all-icons/group181@3x.png",
  },
  Style: {
    value: "2-Storey",
    icon_url:
      "http://localhost:5000/proxy-image/wp-content/themes/houzez33/uiv2/images/all-icons/style@3x.png",
  },
  Irregulary: {
    value: "-",
    icon_url:
      "http://localhost:5000/proxy-image/wp-content/themes/houzez33/uiv2/images/all-icons/07.png",
  },
  Basement: {
    value: "Finished",
    icon_url:
      "http://localhost:5000/proxy-image/wp-content/themes/houzez33/uiv2/images/all-icons/basement@3x.png",
  },
  Age: {
    value: "-yrs",
    icon_url:
      "http://localhost:5000/proxy-image/wp-content/themes/houzez33/uiv2/images/all-icons/age@3x.png",
  },
  "Total Parking Spaces": {
    value: "3 gr",
    icon_url:
      "http://localhost:5000/proxy-image/wp-content/themes/houzez33/uiv2/images/all-icons/parking@3x.png",
  },
  Taxes: {
    value: "$4770.08 /2023",
    icon_url:
      "http://localhost:5000/proxy-image/wp-content/themes/houzez33/uiv2/images/all-icons/tax@3x.png",
  },
  LandSize: {
    value: "153.51 x 22.31 FT",
    icon_url:
      "http://localhost:5000/proxy-image/wp-content/themes/houzez33/uiv2/images/all-icons/07.png",
  },
  Features: [
    "Air Central",
    "Beach",
    "Fenced Yard",
    "Hospital",
    "Marina",
    "Public Transit",
  ],
  Images: [
    "https://images.gnohome.com/api/ActiveListingImages/view/E6723026/2/?width=800&height=700",
    "https://images.gnohome.com/api/ActiveListingImages/view/E6723026/3/?width=800&height=700",
    "https://images.gnohome.com/api/ActiveListingImages/view/E6723026/4/?width=800&height=700",
    "https://images.gnohome.com/api/ActiveListingImages/view/E6723026/5/?width=800&height=700",
  ],
};

const App: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className="App">
      <button
        onClick={() => setModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        View Property Details
      </button>

      <PropertyDetailsModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        data={propertyData}
      />
      <img
        src="http://localhost:5000/proxy-image/wp-content/themes/houzez33/uiv2/images/all-icons/basement@3x.png"
        alt="test"
        className="w-6 h-6"
      />
      <iframe
        src="http://localhost:5000/?property=1708-50-ordnance-st-toronto-ontario-m5k1a2-canada"
        className="w-full h-screen"
      ></iframe>
    </div>
  );
};

export default App;
