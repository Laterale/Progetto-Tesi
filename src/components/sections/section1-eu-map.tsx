import { motion } from "framer-motion"
import PageSwitcher, { pageIds } from "~/components/page-switcher"
import { useDictionary } from "~/lib/i18n"
import {useRef, useCallback} from 'react';
import Map, {MapRef} from 'react-map-gl/mapbox';

const MAPBOX_TOKEN = 'pk.eyJ1IjoibGF0ZXJhbGUiLCJhIjoiY21mOGc4a2FzMG96eDJqczY2bjZ2ZWJ3NiJ9.edTo59w8IaMW2MhiESU7gw';
const initialViewState = {
  latitude: 40.7666636,
  longitude: 8.83333,
  zoom: 5,
  bearing: 0,
  pitch: 0
};

const LAGOONS = [
  {"lagoon":"Mar Menor","image":"public/assets/maps/MarMenorSatellite.jpg","state":"New York","latitude":37.6666636,"longitude":-0.77333,"zoom":10},
  {"lagoon":"Venice Lagoon","image":"public/assets/maps/LagunaVenezia.jpg","state":"California","latitude":45.276667,"longitude":12.406667,"zoom":9},
  {"lagoon":"Szczecin Lagoon","image":"public/assets/maps/LagunaStettino.jpeg","state":"Illinois","latitude":53.758543,"longitude":14.262812,"zoom":8.5},
  {"lagoon":"Berre Lagoon","image":"public/assets/maps/LagunaBerre.jpg","state":"Texas","latitude":43.40083157,"longitude":5.1083329,"zoom":10},
]

function ControlPanel(props: { onSelectLagoon: (arg0: { lagoon: string; image: string; state: string; latitude: number; longitude: number; }) => void; }) {
  return (
    <div className="control-panel">
      {LAGOONS.filter(lagoon => lagoon.state != 'Kazakistan').map((lagoon, index) => (
        <div key={`btn-${index}`} className="input">
          <input
            type="radio"
            name="city"
            id={`lagoon-${index}`}
            onClick={() => props.onSelectLagoon(lagoon)}
          />
          <label htmlFor={`lagoon-${index}`}>{lagoon.lagoon}</label>
        </div>
      ))}
    </div>
  );
}

const BG = () => {
  const mapRef = useRef<MapRef | null>(null);
  const onSelectLagoon = useCallback(
    ({ longitude, latitude, zoom}: { longitude: number; latitude: number; zoom:number}) => {
    mapRef.current?.flyTo({ center: [longitude, latitude], zoom: zoom, curve: 1.5, duration: 6000 });
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
  <div className='absolute top-5 right-5'>
    <ControlPanel onSelectLagoon={onSelectLagoon} />
  </div>
  </>
)
}

export const EuMapBackground = () => {
  return (
    <motion.div
    className="h-full w-full bg-sky-200"
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
  <div className="h-full w-full font-hand pointer-events-auto overflow-hidden">
    <BG/>
    <div className="absolute-center-x bottom-20">
      <PageSwitcher
      currentPageId={pageIds.eu}
      className="max-w-[250px] min-w-[120px]"
      />
    </div>
  </div>
  )
}
