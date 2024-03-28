import React, { useMemo, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import Controls from "./Controls";
import useGeolocation from 'react-hook-geolocation'
import HospitalsDataService from "../../services/hospital.service";
import allStates from "../../data/us-state-topo-data.json";
import stateNamesToInitials from "../../data/state-names-to-initials.json";


const traformDataForMarkers = (data) => {
  const markers = data.reduce((acc, curr) => {

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

  return Object.values(markers)
}

const LeafletMap = () => {

  const geolocation = useGeolocation()

  const [selected, setSelected] = useState('')
  const [data, setData] = useState([]);
  const [mapMarkers, setMapMarkers] = useState([])
  const [isGeoLocationBased, setIsGeoLocationBased] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  const [isFetchError, setIsFetchError] = useState(false)

  const fetchByState = async (stateInitials = 'AL') => {
    setIsFetching(true)

    const res = await HospitalsDataService.findByState(stateInitials);

    if (res.status === 200) {
      setData(res.data);
    } else {
      setIsFetchError(true)
    }

    setIsFetching(false)
  };

  const fetchByGeoLocation = async (lat, lon) => {
    setIsFetching(true)

    const res = await HospitalsDataService.findByGeoLocation(lat, lon)

    if (res.status === 200) {
      setData(res.data);
    } else {
      setIsFetchError(true)
    }

    setIsFetching(false)
  }

  const markers = useMemo(() => {
    const markers = traformDataForMarkers(data)
    return markers
  }, [data]);

  const {
    latitude: geoLocationLat,
    longitude: geoLocationLon
  } = geolocation || {}

  useEffect(() => {
    if (geoLocationLat && geoLocationLon && data.length === 0) {
      setIsGeoLocationBased(true)
      fetchByGeoLocation(geoLocationLat, geoLocationLon)
    }

    if (!geoLocationLat && !geoLocationLon) {
      setIsGeoLocationBased(false)
    }

    if (markers.length) {
      setMapMarkers(markers)
    }
  }, [markers, data, geoLocationLat, geoLocationLon ]);

  const hanldeChangeOption = (selection) => {
    const stateInitials = stateNamesToInitials[selection]
    setSelected(selection)
    fetchByState(stateInitials)
  }

  return (
    <div>
      <MapContainer center={[39.8097343, -98.5556199]} zoom={5} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {
          Boolean(mapMarkers.length) && markers.map(marker => {
            return <Marker position={marker.coordinates}>
              <Popup>
                {marker.Facility_Name}
              </Popup>
            </Marker>
          })
        }
        <Controls
          isGeoLocationBased={isGeoLocationBased}
          selected={selected}
          options={Object.keys(stateNamesToInitials)}
          onChange={hanldeChangeOption}
          isFetching={isFetching}
          isFetchError={isFetchError}
        />
      </MapContainer>
    </div>
  );
};

export default LeafletMap;
