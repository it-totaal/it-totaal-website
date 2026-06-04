import { MapPin } from 'lucide-react';
import customerLocations from '../data/customer-locations.json';

interface StaticMapProps {
  className?: string;
}

export default function StaticMap({ className = '' }: StaticMapProps) {
  const dutchLocations = customerLocations.filter(
    loc => loc.country === 'Netherlands'
  );

  const zoom = 7;
  const centerLat = 52.1;
  const centerLng = 5.2;

  const lat2tile = (lat: number, zoom: number) => {
    return Math.floor((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, zoom));
  };

  const lon2tile = (lon: number, zoom: number) => {
    return Math.floor((lon + 180) / 360 * Math.pow(2, zoom));
  };

  const tile2lat = (y: number, zoom: number) => {
    const n = Math.PI - 2 * Math.PI * y / Math.pow(2, zoom);
    return 180 / Math.PI * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)));
  };

  const tile2lon = (x: number, zoom: number) => {
    return x / Math.pow(2, zoom) * 360 - 180;
  };

  const centerTileX = lon2tile(centerLng, zoom);
  const centerTileY = lat2tile(centerLat, zoom);

  const tileBounds = {
    north: tile2lat(centerTileY, zoom),
    south: tile2lat(centerTileY + 1, zoom),
    west: tile2lon(centerTileX, zoom),
    east: tile2lon(centerTileX + 1, zoom)
  };

  const latToY = (lat: number) => {
    const latRange = tileBounds.north - tileBounds.south;
    return ((tileBounds.north - lat) / latRange) * 100;
  };

  const lngToX = (lng: number) => {
    const lngRange = tileBounds.east - tileBounds.west;
    return ((lng - tileBounds.west) / lngRange) * 100;
  };

  return (
    <div className={`relative w-full h-full rounded-2xl overflow-hidden bg-slate-100 ${className}`}>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(https://a.basemaps.cartocdn.com/light_all/${zoom}/${centerTileX}/${centerTileY}.png)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />

      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        {dutchLocations.map((location) => {
          const x = lngToX(location.longitude);
          const y = latToY(location.latitude);

          return (
            <g key={location.id}>
              <circle
                cx={x}
                cy={y}
                r="2.5"
                fill="#46f0a4"
                opacity="0.2"
                className="animate-pulse"
                style={{
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: '3s'
                }}
              />
              <circle
                cx={x}
                cy={y}
                r="0.6"
                fill="#46f0a4"
              />
            </g>
          );
        })}
      </svg>

      <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg border border-slate-200">
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="w-4 h-4 text-green-600" />
          <span className="font-semibold text-slate-700">158</span>
          <span className="text-slate-600">klanten in Nederland</span>
        </div>
      </div>
    </div>
  );
}
