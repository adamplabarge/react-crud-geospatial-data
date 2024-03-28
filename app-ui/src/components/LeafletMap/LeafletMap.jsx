import React, { useMemo, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import Controls from "./Controls";

import HospitalsDataService from "../../services/hospital.service";
import allStates from "../../data/us-state-topo-data.json";
import stateNamesToInitials from "../../data/state-names-to-initials.json";


const LeafletMap = () => {

  const [stateData, setStateData] = useState([]);
  const [markers, setMarkers] = useState([]);

  const fetchStateData = async (stateInitials = 'AL') => {
    const res = await HospitalsDataService.findByState(stateInitials);

    if (res.status === 200) setStateData(res.data);
  };

  const createMarkers = useMemo(() => {
    const markers = stateData.reduce((acc, curr) => {

      if (!curr.lon || !curr.lat)
        return acc

      return {
        ...acc,
        [curr.Facility_ID]: {
          markerOffset: -20,
          name: curr.City,
          coordinates: [curr.lat,curr.lon],
          ...curr,
          rating: [...acc[curr.Facility_ID]?.rating || [], curr.Hospital_overall_rating]
        }
      }
    }, {});
    setMarkers(Object.values(markers));
  }, [stateData]);

  useEffect(() => {
    if (!stateData.length) {
      fetchStateData()
    }
  }, [markers, setMarkers, stateData, createMarkers]);

  return (
    <div>
      <MapContainer center={[39.8097343, -98.5556199]} zoom={5} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {
          Boolean(markers.length) && markers.map(marker => {
            return <Marker position={marker.coordinates}>
              <Popup>
                {marker.Facility_Name}
              </Popup>
            </Marker>
          })
        }
        <Controls />
      </MapContainer>
    </div>
  );
};

export default LeafletMap;
