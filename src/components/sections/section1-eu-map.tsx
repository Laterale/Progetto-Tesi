import { motion } from "framer-motion"
import PageSwitcher, { pageIds } from "~/components/page-switcher"
import { useDictionary } from "~/lib/i18n"
import {useRef, useCallback} from 'react';
import Map, {MapRef} from 'react-map-gl/mapbox';

const MAPBOX_TOKEN = 'pk.eyJ1IjoibGF0ZXJhbGUiLCJhIjoiY21mOGc4a2FzMG96eDJqczY2bjZ2ZWJ3NiJ9.edTo59w8IaMW2MhiESU7gw';
const initialViewState = {
  latitude: 37.6666636,
  longitude: -0.77333,
  zoom: 1,
  bearing: 0,
  pitch: 0
};

const LAGOONS = [
  { lagoon: "Mar Menor", image: "/assets/maps/MarMenorSatellite.jpg", latitude: 37.7066636, longitude: -0.77333, zoom: 10 },
  { lagoon: "Venice Lagoon", image: "/assets/maps/LagunaVenezia.jpg", latitude: 45.276667, longitude: 12.406667, zoom: 8 },
  { lagoon: "Szczecin Lagoon", image: "/assets/maps/LagunaStettino.jpeg", latitude: 53.758543, longitude: 14.262812, zoom: 8 },
  { lagoon: "Berre Lagoon", image: "/assets/maps/LagunaBerre.jpg", latitude: 43.40083157, longitude: 4.7083329, zoom: 9 },
];

export default function ControlPanel(props: { onSelectLagoon: (arg0: { lagoon: string; image: string; latitude: number; longitude: number; zoom:number}) => void; }) {
  return (
    <motion.div
      className="p-2 border-4 rounded-l-xl border-r-0 bg-white border-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid gap-3">
        {LAGOONS.map((lagoon) => (
          <motion.button
            key={lagoon.lagoon}
            onClick={() => props.onSelectLagoon(lagoon)}
            className="group relative overflow-hidden rounded-md transition-all"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <img
              src={lagoon.image}
              alt={lagoon.lagoon}
              className="h-16 w-full object-cover"
            />
            <div className="absolute inset-0 flex items-end p-3">
              <p className="text-white text-sm">{lagoon.lagoon}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

const LagoonMap = () => {
  const mapRef = useRef<MapRef | null>(null);
  const onSelectLagoon = useCallback(
    ({ longitude, latitude, zoom}: { longitude: number; latitude: number; zoom:number}) => {
    mapRef.current?.flyTo({ center: [longitude, latitude], zoom: zoom,  duration: 10000 });
  },
  []
);
return(
  <>
  <Map
    ref={mapRef}
    initialViewState={initialViewState}
    mapStyle="mapbox://styles/laterale/cmfbg0o7t005601quciskd6r5"
    mapboxAccessToken={MAPBOX_TOKEN}
    dragPan={false}
    dragRotate={false}
    scrollZoom={false}
    doubleClickZoom={false}
    touchZoomRotate={false}
    keyboard={false} 
  />
  <div className='absolute top-52 right-0'>
    <ControlPanel onSelectLagoon={onSelectLagoon} />
  </div>
  </>
)
}

export const EuMapBackground = () => {
  return (
    <motion.div
    className="h-full w-full bg-[#46b1e2]"
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
  return (
  <div className="h-full w-full grid grid-rows-5 font-hand pointer-events-auto overflow-hidden">
    <div className="row-start-3 row-span-3 border-t-4 border-white">
      <LagoonMap/>
    </div>
    <div className="absolute-center-x bottom-20">
      <PageSwitcher
      currentPageId={pageIds.eu}
      className="max-w-[250px] min-w-[120px]"
      />
    </div>
  </div>
  )
}
