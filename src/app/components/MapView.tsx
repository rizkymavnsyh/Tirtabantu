import { useEffect, useRef } from "react";
import L from "leaflet";

// Fix default marker icon
const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const redIcon = L.icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const greenIcon = L.icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = defaultIcon;

const TILE_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const TILE_ATTR = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';

// ========== Map Picker (click to pick location) ==========
interface MapPickerProps {
  lat: number;
  lng: number;
  onPick: (lat: number, lng: number) => void;
  height?: string;
}

export function MapPicker({ lat, lng, onPick, height = "300px" }: MapPickerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  // Initialize map
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const map = L.map(containerRef.current, {
      center: [lat || -6.8, lng || 107.0],
      zoom: 13,
      scrollWheelZoom: true,
    });
    L.tileLayer(TILE_URL, { attribution: TILE_ATTR }).addTo(map);

    map.on("click", (e: L.LeafletMouseEvent) => {
      onPick(e.latlng.lat, e.latlng.lng);
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update marker when lat/lng changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (lat && lng) {
      if (markerRef.current) {
        markerRef.current.setLatLng([lat, lng]);
      } else {
        markerRef.current = L.marker([lat, lng], { icon: redIcon })
          .addTo(map)
          .bindPopup("Lokasi Anda");
      }
      map.setView([lat, lng], map.getZoom());
    }
  }, [lat, lng]);

  // Keep onPick callback fresh
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const handler = (e: L.LeafletMouseEvent) => {
      onPick(e.latlng.lat, e.latlng.lng);
    };
    map.off("click");
    map.on("click", handler);
  }, [onPick]);

  return (
    <div
      ref={containerRef}
      style={{ height, width: "100%" }}
      className="rounded-xl overflow-hidden border border-sky-200"
    />
  );
}

// ========== Map Display (read-only, single marker) ==========
interface MapDisplayProps {
  lat: number;
  lng: number;
  label?: string;
  height?: string;
}

export function MapDisplay({ lat, lng, label, height = "200px" }: MapDisplayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || !lat || !lng) return;
    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }

    const map = L.map(containerRef.current, {
      center: [lat, lng],
      zoom: 15,
      scrollWheelZoom: false,
      dragging: true,
      zoomControl: true,
    });
    L.tileLayer(TILE_URL, { attribution: TILE_ATTR }).addTo(map);

    const marker = L.marker([lat, lng], { icon: redIcon }).addTo(map);
    if (label) marker.bindPopup(label);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [lat, lng, label]);

  if (!lat || !lng) return null;

  return (
    <div
      ref={containerRef}
      style={{ height, width: "100%" }}
      className="rounded-xl overflow-hidden border border-sky-200"
    />
  );
}

// ========== Map Overview (multiple markers) ==========
export interface MapMarker {
  id: number;
  lat: number;
  lng: number;
  label: string;
  status: string;
}

interface MapOverviewProps {
  markers: MapMarker[];
  height?: string;
}

export function MapOverview({ markers, height = "400px" }: MapOverviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }

    const center: [number, number] =
      markers.length > 0
        ? [
            markers.reduce((s, m) => s + m.lat, 0) / markers.length,
            markers.reduce((s, m) => s + m.lng, 0) / markers.length,
          ]
        : [-6.8, 107.0];

    const map = L.map(containerRef.current, {
      center,
      zoom: 10,
      scrollWheelZoom: true,
    });
    L.tileLayer(TILE_URL, { attribution: TILE_ATTR }).addTo(map);

    markers.forEach((m) => {
      const icon =
        m.status === "Selesai" ? greenIcon : m.status === "Ditolak" ? defaultIcon : redIcon;
      L.marker([m.lat, m.lng], { icon })
        .addTo(map)
        .bindPopup(`<strong>#${m.id}</strong><br/>${m.label}<br/><em>${m.status}</em>`);
    });

    if (markers.length > 1) {
      const bounds = L.latLngBounds(markers.map((m) => [m.lat, m.lng] as [number, number]));
      map.fitBounds(bounds, { padding: [30, 30] });
    }

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [markers]);

  return (
    <div
      ref={containerRef}
      style={{ height, width: "100%" }}
      className="rounded-xl overflow-hidden border border-sky-200"
    />
  );
}
