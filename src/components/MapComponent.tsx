import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L, { LatLngBounds } from "leaflet";
import "leaflet/dist/leaflet.css";
import PropertyCardPopup from "./PropertyCardPopup"; // Import the PropertyCard component
import PropertyCardPopupForHover from "./PropertyCardPopupForHover";
import markerIconPng from "leaflet/dist/images/marker-icon.png"; // Default marker icon
import redMarkerIconPng from "../assets/red-marker.png";
import { Property } from "../types";
import MarkerClusterGroup from "react-leaflet-cluster";
import ReactDOMServer from "react-dom/server";

import { Icon, divIcon, point } from "leaflet";
import PropertyModal from "./PropertyModal";

// Assuming the data format

interface MapComponentProps {
  data: Property[];
  hoveredProperty: Property | null;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

const AdjustMapBounds = ({
  data,
  hoveredProperty,
  coordinates,
}: MapComponentProps) => {
  const map = useMap();

  useEffect(() => {
    if (
      hoveredProperty &&
      hoveredProperty.Latitude &&
      hoveredProperty.Longitude
    ) {
      // create popup with property details using Leaflet
      if (map) {
        const propertyCardHtml = ReactDOMServer.renderToString(
          <PropertyCardPopupForHover
            property={hoveredProperty}
            openModal={() => {
              // Define what should happen when modal opens here
            }}
          />
        );

        const popup = L.popup()
          .setLatLng([hoveredProperty.Latitude, hoveredProperty.Longitude])
          .setContent(propertyCardHtml) // Set PropertyCard HTML as content
          .openOn(map as L.Map);
      } else {
        console.warn("Map reference is not available.");
      }
    }

    if (!hoveredProperty && map) {
      map.closePopup();
    }
  }, [hoveredProperty, map]);

  useEffect(() => {
    if (!map) return;
    if (!data) return;
    if (data.length === 0) return;
    // Filter out properties with valid latitude and longitude
    const validCoordinates = data.filter(
      (property) =>
        property.Latitude !== null &&
        property.Latitude !== undefined &&
        property.Longitude !== null &&
        property.Longitude !== undefined
    );

    // Proceed only if there are valid coordinates
    if (validCoordinates.length > 0) {
      const bounds = new LatLngBounds(
        validCoordinates.map(
          (property) =>
            [property.Latitude as number, property.Longitude as number] as [
              number,
              number
            ]
        )
      );
      map.fitBounds(bounds); // Adjust the map to show all markers
    }
  }, [data, map]);

  useEffect(() => {
    if (!map) return;
    if (!coordinates) return;

    map.setView([coordinates.latitude, coordinates.longitude], 14);
  }, [data, map]);

  return null;
};

// create custom icon
const customIcon = new Icon({
  // iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
  iconUrl: markerIconPng,
  iconSize: [38, 38], // size of the icon
});

const createClusterCustomIcon = function (cluster: any) {
  //@ts-ignore
  return new divIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: point(33, 33, true),
  });
};

const MapComponent: React.FC<MapComponentProps> = ({
  data,
  hoveredProperty,
  coordinates,
}) => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log(coordinates);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const mapRef = useRef<L.Map | null>(null);

  // Function to adjust map bounds to include all markers
  // const adjustMapBounds = ({ data }: { data: Property[] }) => {

  // Function to handle pin click (centers the map on the clicked marker)
  const handlePinClick = (property: Property) => {
    setSelectedProperty(property);
    if (mapRef.current) {
      mapRef.current.setView([property.Latitude, property.Longitude], 14);
    }
  };

  // If there's no data, we don't render the map
  // if (data.length === 0) {
  //   return <div>No properties to display</div>;
  // }

  // filter data for Latitude and Longitude
  const filteredData = data
    ? data.filter(
        (property) =>
          property.Latitude !== null &&
          property.Latitude !== undefined &&
          property.Longitude !== null &&
          property.Longitude !== undefined
      )
    : [];

  return (
    <div>
      <div className="">
        <MapContainer
          center={
            coordinates
              ? [coordinates.latitude, coordinates.longitude]
              : [filteredData[0].Latitude, filteredData[0].Longitude]
          } // Default to first property
          zoom={12}
          scrollWheelZoom={true}
          style={{ height: "100vh", zIndex: 1 }}
          // whenCreated={(mapInstance: L.Map) => {
          //   mapRef.current = mapInstance;
          // }}
        >
          <TileLayer
            attribution="Google Maps"
            // url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}" // regular
            // url="http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}" // satellite
            url="http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}" // terrain
            maxZoom={20}
            subdomains={["mt0", "mt1", "mt2", "mt3"]}
          />
          {/* <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createClusterCustomIcon}
      > */}
          {data.map((property, index) => {
            if (!property.Latitude || !property.Longitude) return null; // Skip if no coordinates
            return (
              <Marker
                key={index}
                position={[property.Latitude, property.Longitude]}
                icon={
                  new L.Icon({
                    iconUrl: markerIconPng,
                    iconSize: [25, 41],
                    iconAnchor: [13, 41],
                  })
                }
                eventHandlers={{
                  click: () => handlePinClick(property),
                }}
              >
                {selectedProperty?.Latitude === property.Latitude &&
                  selectedProperty?.Longitude === property.Longitude && (
                    <Popup>
                      <PropertyCardPopup
                        property={property}
                        openModal={openModal}
                      />
                      {/* <div
                  onClick={() => {
                    alert("hello");
                  }}
                >
                  <img
                    src="https://plus.unsplash.com/premium_photo-1672116453187-3aa64afe04ad?q=80&w=1769&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dhttps://"
                    alt="property"
                  />
                  <h1>{property.addr}</h1>
                </div> */}
                    </Popup>
                  )}
              </Marker>
            );
          })}
          {coordinates && (
            <Marker
              position={[coordinates.latitude, coordinates.longitude]}
              icon={
                new L.Icon({
                  iconUrl: redMarkerIconPng,
                  iconSize: [41, 41],
                  iconAnchor: [21, 21],
                })
              }
            >
              <Popup>
                <div>
                  <h1>Selected Location</h1>
                </div>
              </Popup>
            </Marker>
          )}
          {/* </MarkerClusterGroup> */}
          {/* Adjust the map bounds to fit all markers */}
          <AdjustMapBounds
            data={data}
            hoveredProperty={hoveredProperty}
            coordinates={coordinates}
          />
        </MapContainer>
      </div>
      {isModalOpen && selectedProperty && (
        <PropertyModal property={selectedProperty} onClose={closeModal} />
      )}
    </div>
  );
};

export default MapComponent;

// import React from "react";
// import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
// import "leaflet/dist/leaflet.css";

// const Map = () => {
//   const latitude = 51.505; // Replace with your default latitude
//   const longitude = -0.09; // Replace with your default longitude
//   const position = [51.505, -0.09];

//   return (
//     <MapContainer
//       center={position}
//       zoom={13}
//       scrollWheelZoom={false}
//       key={new Date().getTime()}
//     >
//       <TileLayer
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />
//       <Marker position={position}>
//         <Popup>
//           A pretty CSS3 popup. <br /> Easily customizable.
//         </Popup>
//       </Marker>
//     </MapContainer>
//   );
// };

// export default Map;
