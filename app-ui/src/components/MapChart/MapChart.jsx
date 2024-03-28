import React, { useMemo, useEffect, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup
} from "react-simple-maps";
import HospitalsDataService from "../../services/hospital.service";
import allStates from "../../data/us-state-topo-data.json";
import stateNamesToInitials from "../../data/state-names-to-initials.json";

const MapChart = () => {
  const [stateData, setStateData] = useState([]);
  const [markers, setMarkers] = useState([]);

  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });

  const handleZoomIn = () => {
    if (position.zoom >= 4) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom * 2 }));
  }

  const handleZoomOut = () => {
    if (position.zoom <= 1) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom / 2 }));
  }

  const handleMoveEnd = (position) => {
    setPosition(position);
  }

  const fetchStateData = async (stateInitials) => {
    const res = await HospitalsDataService.findByState(stateInitials);

    if (res.status === 200) setStateData(res.data);
  };

  const handleOnClick = (name) => {
    const stateInitials = stateNamesToInitials[name];

    fetchStateData(stateInitials);
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
          coordinates: [curr.lon, curr.lat],
          ...curr,
          rating: [...acc[curr.Facility_ID]?.rating || [], curr.Hospital_overall_rating]
        }
      }
    }, {});
    return Object.values(markers);
  }, [stateData]);

  useEffect(() => {
    if (stateData.length) {
      setMarkers(createMarkers);
    }
  }, [markers, setMarkers, stateData, createMarkers]);

  return (
    <ComposableMap projection="geoAlbersUsa">
      <ZoomableGroup 
        zoom={position.zoom}
        center={position.coordinates}
        onMoveEnd={handleMoveEnd}
      >
        <Geographies geography={allStates}>
          {({ geographies, borders }) =>
            geographies.map((geo) => (
              <>
                <Geography geography={borders} fill="none" stroke="#FFF" />
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => {
                    handleOnClick(geo.properties.name);
                  }}
                  style={{
                    default: {
                      fill: "#D6D6DA",
                      outline: "none",
                    },
                    hover: {
                      fill: "#F53",
                      outline: "none",
                    },
                    pressed: {
                      fill: "#f539",
                      outline: "none",
                    },
                  }}
                />
              </>
            ))
          }
        </Geographies>
      </ZoomableGroup>
      {markers.map(({ Facility_Name, Facility_ID, coordinates, markerOffset }) => (
        <Marker
          key={Facility_ID}
          coordinates={coordinates}
          id={Facility_Name}
          onClick={() => {
            console.log(Facility_ID);
          }}
        >
          <circle r={15} fill="#E42A1D" stroke="#fff" strokeWidth={2} />
          <text
            textAnchor="middle"
            y={markerOffset}
            style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
          >
            {Facility_Name}
          </text>
        </Marker>
      ))}
      <div className="controls">
        <button onClick={handleZoomIn}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
        <button onClick={handleZoomOut}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </div>
    </ComposableMap>
  );
};

export default MapChart;
