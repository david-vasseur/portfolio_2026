'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { usePageIndexStore } from '@/lib/store/pageIndexStore';

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const ESTEZARGUES_COORDINATES: [number, number] = [43.967, 4.575];
const INITIAL_ZOOM = 4;
const TARGET_ZOOM = 12;

function MapZoomAnimator({ targetIndex }: { targetIndex: number }) {
    const map = useMap();
    const currentIndex = usePageIndexStore((state) => state.currentIndex);

    useEffect(() => {
        let timerId: NodeJS.Timeout | null = null;

        if (currentIndex === 2) {
            // 1. Déclenchement du zoom 500ms après l'arrivée sur la section
            timerId = setTimeout(() => {
                map.flyTo(ESTEZARGUES_COORDINATES, TARGET_ZOOM, {
                    duration: 4,
                    easeLinearity: 1.25,
                });
            }, 500);
        } else {
            // 2. Réinitialisation instantanée si on quitte la section
            map.stop(); // Interrompt le flyTo en cours si l'utilisateur scrolle rapidement
            map.setView(ESTEZARGUES_COORDINATES, INITIAL_ZOOM, { animate: false });
        }

        return () => {
            if (timerId) clearTimeout(timerId);
        };
    }, [currentIndex, targetIndex, map]);

    return null;
}

interface MapContainerProps {
    sectionIndex?: number; // L'index de la section contenant la carte
}

export default function MapContainerComponent({ sectionIndex = 3 }: MapContainerProps) {

    const [isMounted, setIsMounted] = useState(false);

        useEffect(() => {
            setIsMounted(true);
        }, []);

    if (!isMounted) return null;

    return (
        <MapContainer
            key="leaflet-map-estezargues"
            center={ESTEZARGUES_COORDINATES}
            zoom={INITIAL_ZOOM}
            zoomSnap={0}
            zoomControl={false}
            className="
                h-full
                w-full
                opacity-70
                pointer-events-none
                [&_.leaflet-control-attribution]:hidden
            "
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                className="brightness-75 contrast-125 hue-rotate-180 invert"
            />

            <Marker position={ESTEZARGUES_COORDINATES} />

            <MapZoomAnimator targetIndex={sectionIndex} />
        </MapContainer>
    );
}