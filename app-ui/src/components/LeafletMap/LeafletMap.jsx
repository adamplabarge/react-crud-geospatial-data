import React, { useMemo, useEffect, useState } from "react";
import useGeolocation from 'react-hook-geolocation'
import HospitalsDataService from "../../services/hospital.service";
import stateNamesToInitials from "../../data/state-names-to-initials.json";
import { MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import Controls from "./Controls";
import PopupBody from "./PopupBody";

/**
 * Transforms the data received from the API into an array of markers.
 * Each marker contains information about the hospital and its coordinates.
 *
 * @param {object[]} data - The data received from the API.
 * @returns {object[]} An array of markers.
 */
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

/**
 * LeafletMap component displays a map with markers representing hospitals.
 * It allows the user to fetch hospitals either by state or by geolocation.
 * 
 * @component
 * @returns {JSX.Element} The rendered Controls component.
 */
const LeafletMap = () => {

  const geolocation = useGeolocation()

  const [selected, setSelected] = useState('')
  const [data, setData] = useState([]);
  const [mapMarkers, setMapMarkers] = useState([])
  const [isGeoLocationBased, setIsGeoLocationBased] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  const [isFetchError, setIsFetchError] = useState(false)

  /**
   * Fetches hospitals by state.
   *
   * @param {string} stateInitials - The initials of the state.
   */
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

  /**
   * Fetches hospitals by geolocation.
   *
   * @param {number} lat - The latitude.
   * @param {number} lon - The longitude.
   */
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

  /**
   * Handles the change of the selected state option.
   *
   * @param {string} selection - The selected state option.
   */
  const handleChangeOption = (selection) => {
    const stateInitials = stateNamesToInitials[selection]
    setSelected(selection)
    fetchByState(stateInitials)
  }

  /**
   * Handles the change to manual selection of hospitals.
   */
  const handleOnChangeToManualSelect = () => {
    setIsGeoLocationBased(false)
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
                <PopupBody {...marker} />
              </Popup>
            </Marker>
          })
        }
        <Controls
          isGeoLocationBased={isGeoLocationBased}
          selected={selected}
          options={Object.keys(stateNamesToInitials)}
          onChange={handleChangeOption}
          isFetching={isFetching}
          isFetchError={isFetchError}
          onChangeToManualSelect={handleOnChangeToManualSelect}
        />
      </MapContainer>
    </div>
  );
};

export default LeafletMap;
