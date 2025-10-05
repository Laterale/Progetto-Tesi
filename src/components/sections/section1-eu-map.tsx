import { motion } from "framer-motion"
import PageSwitcher, { pageIds } from "~/components/page-switcher"
import { useDictionary } from "~/lib/i18n"
import {useRef, useCallback, useEffect} from 'react';
import Map, {MapRef, Marker} from 'react-map-gl/mapbox';
import { MapTextBox } from "../textboxes";

const MAPBOX_TOKEN = 'pk.eyJ1IjoibGF0ZXJhbGUiLCJhIjoiY21mOGc4a2FzMG96eDJqczY2bjZ2ZWJ3NiJ9.edTo59w8IaMW2MhiESU7gw';
const initialViewState = {
  latitude: 43.6666636,
  longitude: 5.77333,
  zoom: 0,
  bearing: 0,
  pitch: 0
};


const LAGOONS = [
  { lagoon: "Earth", image: "", latitude: 43.6666636, longitude: 5.77333, zoom: 0 },
  { lagoon: "Venice Lagoon", image: "/assets/maps/LagunaVenezia.jpg", latitude: 45.376667, longitude: 12.406667, zoom: 8 },
  { lagoon: "Mar Menor", image: "/assets/maps/MarMenorSatellite.jpg", latitude: 37.7066636, longitude: -0.77333, zoom: 9 },
  { lagoon: "Szczecin Lagoon", image: "/assets/maps/LagunaStettino.jpeg", latitude: 53.858543, longitude: 14.262812, zoom: 7 },
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

export const EuMapContent = () => {
  const { euMap: dictionary } = useDictionary();
  const mapRef = useRef<MapRef | null>(null);

  const handleMapStepChange = (step: number) => {
    const lagoon = LAGOONS[step - 1];
    // gli step partono da 1 nel tuo Stepper, quindi -1 per l’indice
    if (lagoon) {
      onSelectLagoon(lagoon);
    }
  };

  const animationFrame = useRef<number | null>(null);
  const stopped = useRef(false); 
  useEffect(() => {
    const speed = 0.1;

    const animate = () => {
      if (stopped.current) return; //se fermato, esci
      const map = mapRef.current?.getMap();
      if (map) {
        const center = map.getCenter();
        map.setCenter([center.lng + speed, center.lat]); //solo in orizzontale
      }
      animationFrame.current = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    };
  }, []);

  // quando seleziono una laguna ferma lo scroll automatico
  const onSelectLagoon = useCallback(
    ({ longitude, latitude, zoom }: { longitude: number; latitude: number; zoom:number }) => {
      // blocca per sempre l’animazione
      stopped.current = true;
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
      mapRef.current?.getMap().flyTo({
        center: [longitude, latitude],
        zoom,
        duration: 10000
      });
    },
    []
  );
  return (
  <div className="h-full w-full grid grid-cols-4 grid-rows-7 font-hand pointer-events-auto pr-5 pl-5">
    <div className="col-span-4 flex justify-center items-center">
      <h1 className="text-[clamp(1.5rem,7vw,3rem)] text-center tracking-wide break-words leading-snug animate-bounce-slight">
        {dictionary.title}
      </h1>
    </div>
    <div className="col-span-4">
      <MapTextBox updateMap={handleMapStepChange}/>    
    </div>
    <div className="absolute-center-x bottom-20 text-transparent flex items-center justify-center p-5 z-10">
      <div className="aspect-square w-[250px] rounded-full border-4 border-[#584313] overflow-hidden -translate-y-10">
      <Map
        ref={mapRef}
        dragPan={false}
        scrollZoom={false}
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
    <div className="absolute-center-x bottom-10 z-20">
      <PageSwitcher
      currentPageId={pageIds.eu}
      className="max-w-[200px] min-w-[120px] "
      />
    </div>
    <img 
    src="/assets/piedistallo.png" 
    alt="" 
    className="absolute-center-x bottom-0 size-[160px] z-0" 
    />
  </div>
  )
}
