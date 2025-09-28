import { motion } from "framer-motion"
import PageSwitcher, { pageIds } from "~/components/page-switcher"
import { useDictionary } from "~/lib/i18n"
import {useRef, useCallback} from 'react';
import Map, {MapRef, Marker} from 'react-map-gl/mapbox';

const MAPBOX_TOKEN = 'pk.eyJ1IjoibGF0ZXJhbGUiLCJhIjoiY21mOGc4a2FzMG96eDJqczY2bjZ2ZWJ3NiJ9.edTo59w8IaMW2MhiESU7gw';
const initialViewState = {
  latitude: 43.6666636,
  longitude: 5.77333,
  zoom: 0,
  bearing: 0,
  pitch: 0
};

const LAGOONS = [
  { lagoon: "Venice Lagoon", image: "/assets/maps/LagunaVenezia.jpg", latitude: 45.276667, longitude: 12.406667, zoom: 7 },
  { lagoon: "Mar Menor", image: "/assets/maps/MarMenorSatellite.jpg", latitude: 37.7066636, longitude: -0.77333, zoom: 8 },
  { lagoon: "Szczecin Lagoon", image: "/assets/maps/LagunaStettino.jpeg", latitude: 53.758543, longitude: 14.262812, zoom: 7 },
];

export default function ControlPanel(props: { onSelectLagoon: (arg0: { lagoon: string; image: string; latitude: number; longitude: number; zoom:number}) => void; }) {
  return (
    <motion.div
    className="pr-4 pl-4 bg-transparent flex gap-2 w-full"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    >
      {LAGOONS.map((lagoon) => (
        <motion.button
        key={lagoon.lagoon}
        onClick={() => props.onSelectLagoon(lagoon)}
        className="group relative overflow-hidden transition-all h-12 w-1/3"
        whileTap={{ scale: 0.97 }}
        >
          <div className="absolute inset-0 flex items-center p-2 rounded-t-sm bg-gradient-to-t from-white to-yellow-400">
          <p className="text-black text-center text-sm w-full">{lagoon.lagoon}</p>
          </div>
        </motion.button>
      ))}
    </motion.div>
  );
}

export const EuMapBackground = () => {
  return (
    <motion.div
    className="h-full w-full bg-[#3A9BD9]"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.7 }}
    >
    </motion.div>
  )
}

export const EuMapContent = () => {
  const { euMap: dictionary } = useDictionary()
  const mapRef = useRef<MapRef | null>(null);
  const onSelectLagoon = useCallback(
  ({ longitude, latitude, zoom }: { longitude: number; latitude: number; zoom:number }) => {
    mapRef.current?.getMap().flyTo({
      center: [longitude, latitude],
      zoom,
      duration: 10000
    });
  },
  []
);
  return (
  <div className="h-full w-full grid grid-rows-6 font-hand pointer-events-auto overflow-hidden p-1">
    <div className="row-span-3 text-transparent p-10 pb-20">
      <div className="h-full w-full rounded-full border-4 border-yellow-200 overflow-hidden">
      <Map
        ref={mapRef}
        dragPan={true}
        scrollZoom={true}
        initialViewState={initialViewState}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={MAPBOX_TOKEN}
        dragRotate={false}
        doubleClickZoom={false}
        touchZoomRotate={false}
        keyboard={false}
        style={{ width:'100%', height:'100%'}}
      />
      </div>
    </div>
    <div className="absolute-center-x bottom-10">
      <PageSwitcher
      currentPageId={pageIds.eu}
      className="max-w-[250px] min-w-[120px]"
      />
    </div>
  </div>
  )
}
