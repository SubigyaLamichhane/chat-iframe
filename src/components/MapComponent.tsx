import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L, { LatLngBounds } from "leaflet";
import "leaflet/dist/leaflet.css";
import PropertyCard from "./PropertyCard"; // Import the PropertyCard component
import markerIconPng from "leaflet/dist/images/marker-icon.png"; // Default marker icon
import { Property } from "../types";
import MarkerClusterGroup from "react-leaflet-cluster";

import { Icon, divIcon, point } from "leaflet";

// Assuming the data format

interface MapComponentProps {
  data: Property[];
}

const AdjustMapBounds = ({ data }: { data: Property[] }) => {
  const map = useMap();

  useEffect(() => {
    if (data.length > 0) {
      const bounds = new LatLngBounds(
        data.map(
          (property) =>
            [property.Latitude, property.Longitude] as [number, number]
        )
      );
      map.fitBounds(bounds); // Adjust the map to show all markers
    }
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

const MapComponent: React.FC<MapComponentProps> = ({ data }) => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );
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
  if (data.length === 0) {
    return <div>No properties to display</div>;
  }

  return (
    <MapContainer
      center={[data[0].Latitude, data[0].Longitude]} // Default to first property
      zoom={12}
      scrollWheelZoom={true}
      style={{ height: "100vh" }}
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
      {data.map((property, index) => (
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
                <PropertyCard property={property} />
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
      ))}
      {/* </MarkerClusterGroup> */}
      {/* Adjust the map bounds to fit all markers */}
      <AdjustMapBounds data={data} />
    </MapContainer>
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
