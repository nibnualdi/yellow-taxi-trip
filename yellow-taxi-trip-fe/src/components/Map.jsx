import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import { useSelector, useDispatch } from "react-redux";

import "mapbox-gl/dist/mapbox-gl.css";

import {
  setDropOffCoor,
  setIsDropOffCoorInputOnFocus,
  setIsPickupCoorInputOnFocus,
  setPickupCoor,
} from "../features/tripHandler/tripHandlerSlice";
import { useGetDirectionsQuery } from "../services/mapbox";
import { useGetTaxiTripByCoordinateQuery } from "../services/taxitrips";

function Map() {
  const mapRef = useRef();
  const mapContainerRef = useRef();
  const dispatch = useDispatch();

  const { pickupCoor, dropOffCoor, isPickupCoorInputOnFocus, isDropOffCoorInputOnFocus } =
    useSelector((state) => state.tripHandler);
  const { data, error, isLoading } = useGetDirectionsQuery(
    {
      profile: "mapbox/driving",
      coordinates: `${pickupCoor};${dropOffCoor}`,
    },
    { skip: !pickupCoor || !dropOffCoor }
  );
  const {
    data: taxitripsData,
    error: taxitripsError,
    isLoading: taxitripsIsLoading,
  } = useGetTaxiTripByCoordinateQuery(
    {
      pickup_longitude: pickupCoor.split(",")[0],
      pickup_latitude: pickupCoor.split(",")[1],
      dropoff_longitude: dropOffCoor.split(",")[0],
      dropoff_latitude: dropOffCoor.split(",")[1],
    },
    { skip: !data }
  );

  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESSTOKEN;
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: [-73.935242, 40.73061],
      zoom: 9,
      projection: {
        name: "mercator",
      },
    });

    return () => {
      mapRef.current.remove();
    };
  }, []);

  useEffect(() => {
    mapRef.current.on("dblclick", (e) => {
      const coor = `${e.lngLat.lng},${e.lngLat.lat}`;

      dispatch(setPickupCoor(coor));
      dispatch(setDropOffCoor(""));
      dispatch(setIsPickupCoorInputOnFocus(false));
      dispatch(setIsDropOffCoorInputOnFocus(true));
    });

    mapRef.current.on("click", (e) => {
      const coor = `${e.lngLat.lng},${e.lngLat.lat}`;

      if ((pickupCoor && !isPickupCoorInputOnFocus) || isDropOffCoorInputOnFocus) {
        dispatch(setDropOffCoor(coor));
        dispatch(setIsPickupCoorInputOnFocus(false));
        dispatch(setIsDropOffCoorInputOnFocus(false));
        return;
      }
    });
  }, [isPickupCoorInputOnFocus, isDropOffCoorInputOnFocus, pickupCoor]);

  useEffect(() => {
    if (!mapRef.current.isStyleLoaded()) return;

    if (pickupCoor) {
      if (mapRef.current.getSource("pickupCoorMarker")) {
        mapRef.current.removeLayer("pickupCoorMarker");
        mapRef.current.removeSource("pickupCoorMarker");
      }
      mapRef.current.addLayer({
        id: "pickupCoorMarker",
        type: "circle",
        source: {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "Point",
              coordinates: pickupCoor.split(","),
            },
          },
        },
        paint: { "circle-color": "black" },
      });
    }

    if (dropOffCoor) {
      if (mapRef.current.getSource("dropOffCoorMarker")) {
        mapRef.current.removeLayer("dropOffCoorMarker");
        mapRef.current.removeSource("dropOffCoorMarker");
      }
      mapRef.current.addLayer({
        id: "dropOffCoorMarker",
        type: "circle",
        source: {
          type: "geojson",
          data: {
            type: "Feature",
            properties: {},
            geometry: {
              type: "Point",
              coordinates: dropOffCoor.split(","),
            },
          },
        },
        paint: { "circle-color": "red" },
      });
    }
  }, [mapRef.current, pickupCoor, dropOffCoor]);

  useEffect(() => {
    const route = data?.routes[0]?.geometry?.coordinates;
    if (!route) return;
    if (!mapRef.current.isStyleLoaded()) return;
    if (!pickupCoor || !dropOffCoor || error) {
      if (mapRef.current.getSource("route")) {
        mapRef.current.removeLayer("route");
        mapRef.current.removeSource("route");
        return;
      }
      return;
    }

    const geojson = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: route,
      },
    };

    if (mapRef.current.getSource("route")) {
      mapRef.current.getSource("route").setData(geojson);
    } else {
      mapRef.current.addLayer({
        id: "route",
        type: "line",
        source: {
          type: "geojson",
          data: geojson,
        },
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#3887be",
          "line-width": 5,
          "line-opacity": 0.75,
        },
      });
    }
  }, [mapRef.current, data, pickupCoor, dropOffCoor, error]);

  useEffect(() => {
    if (!data) return;
    console.log(data, "asdasdasd");
  }, [data]);

  useEffect(() => {
    // if (!taxitripsData) return;
    console.log(taxitripsData, "asdasdasdtaxitripsData");
  }, [taxitripsData]);

  return (
    <div className="w-full h-full">
      <div className="absolute z-10 w-full h-full bg-gradient-to-t from-white/80 via-transparent to-transparent pointer-events-none" />
      <div ref={mapContainerRef} id="map-container" className="z-0 rounded-xl" />
    </div>
  );
}

export default Map;
