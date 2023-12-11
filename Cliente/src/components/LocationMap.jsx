import { GoogleMap, useLoadScript, MarkerF } from '@react-google-maps/api';

const LocationMap = ({ center }) => {

  const mapContainerStyle = {
    width: '400px',
    height: '200px',
  };


  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY
  });

  if (loadError) return 'Error al cargar el mapa';
  if (!isLoaded) return 'Cargando el mapa...';

  const handleMapClick = () => {
    const [lat, lng] = center;
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${lng},${lat}`;

    // Abre una nueva pestaña con Google Maps
    window.open(mapsUrl, '_blank');
  };

  return (
    <div>
    <GoogleMap mapContainerStyle={mapContainerStyle} center={{ lat: center[1], lng: center[0] }} zoom={15}>
      {/* Utiliza la posición del usuario como posición del marcador */}
      <MarkerF position={{ lat: center[1], lng: center[0] }} />
    </GoogleMap>
    <div style={{ textAlign: 'center', marginTop: '10px' }}>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${center[1]},${center[0]}`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline cursor-pointer"
        >
          Abrir en Google Maps
        </a>
      </div>
    </div>
  );
};

export default LocationMap;