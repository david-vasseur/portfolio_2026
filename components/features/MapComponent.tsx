import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix pour les icônes manquantes par défaut dans Leaflet avec React
const customIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

const MapComponent = ({ position = [48.8566, 2.3522] }) => {
    return (
        <MapContainer 
            center={[48.8566, 2.3522]}
            zoom={11} 
            scrollWheelZoom={false}
            zoomControl={false}
            className="w-full h-full rounded-2xl z-0"
        >
            {/* Tiles CartoDB Dark Matter : Fond sombre natif gratuit et fluide */}
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            <Marker position={[48.8566, 2.3522]} icon={customIcon}>
                <Popup>
                    <span className="text-xs font-sans font-bold">David Vasseur — Développeur Full Stack</span>
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default MapComponent;