import { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import customerLocationsData from '../data/customer-locations.json';

interface CustomerLocation {
  id: string;
  company_name: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  website_url: string | null;
  logo_path: string | null;
}

const createCustomIcon = () => {
  const svg = `
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="20" fill="#46f0a4" opacity="0.2"/>
      <circle cx="24" cy="24" r="5" fill="#46f0a4"/>
    </svg>
  `;
  return new L.Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(svg)}`,
    iconSize: [48, 48],
    iconAnchor: [24, 24],
    popupAnchor: [0, -24],
    className: 'custom-marker-icon',
  });
};

const customIcon = createCustomIcon();

interface CityGroup {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  count: number;
}

export function CustomerMap() {
  const [locations, setLocations] = useState<CustomerLocation[]>([]);
  const [cityGroups, setCityGroups] = useState<CityGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    function loadLocations() {
      const data = customerLocationsData as CustomerLocation[];
      setLocations(data);

      // Group locations by city
      const grouped = data.reduce((acc: Record<string, CityGroup>, loc) => {
        const key = `${loc.city}-${loc.country}`;
        if (!acc[key]) {
          acc[key] = {
            city: loc.city,
            country: loc.country,
            latitude: loc.latitude,
            longitude: loc.longitude,
            count: 0
          };
        }
        acc[key].count += 1;
        return acc;
      }, {});

      setCityGroups(Object.values(grouped));
      setLoading(false);
    }

    loadLocations();
  }, []);


  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-slate-100 rounded-2xl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-green mx-auto mb-4"></div>
          <p className="text-slate-600">Kaart laden...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="hidden lg:block w-full h-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white relative z-0 transform -rotate-1 hover:rotate-0 transition-transform duration-500 ease-out">
        <MapContainer
          center={[52.05, 4.5]}
          zoom={10}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={false}
          ref={mapRef}
          zoomControl={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />
          {cityGroups.map((group, index) => (
            <Marker
              key={index}
              position={[Number(group.latitude), Number(group.longitude)]}
              icon={customIcon}
              eventHandlers={{
                click: (e) => {
                  L.DomEvent.stopPropagation(e);
                }
              }}
            />
          ))}
        </MapContainer>
      </div>
      <div className="lg:hidden w-full h-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white relative z-0 transform -rotate-1 hover:rotate-0 transition-transform duration-500 ease-out bg-slate-100 flex items-center justify-center">
        <p className="text-slate-600">Kaart beschikbaar op desktop</p>
      </div>
    </>
  );
}
