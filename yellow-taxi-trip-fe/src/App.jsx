import { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'

import 'mapbox-gl/dist/mapbox-gl.css';

import "./App.css";

function App() {
  const mapRef = useRef()
  const mapContainerRef = useRef()

  const [lng, setLng] = useState(106.81);
  const [lat, setLat] = useState(-6.20);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESSTOKEN
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: [lng, lat],
      zoom: zoom,
      projection: {
        name:"mercator"
      }
    });

    return () => {
      mapRef.current.remove()
    }
  }, [])

  return (
    <>
      <div ref={mapContainerRef} id="map-container" />
    </>
  );
}

export default App;
