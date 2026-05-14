import {
  BlurMask,
  Canvas,
  Circle,
  Fill,
  useCanvasSize,
  useClock,
} from "@shopify/react-native-skia";
import { StyleSheet } from "react-native";
import { useDerivedValue, type SharedValue } from "react-native-reanimated";

const SPACE_BLACK = "#05050a";
const NEBULA_INDIGO = "#1a1a4a";
const NEBULA_PURPLE = "#3a1255";
const NEBULA_MAGENTA = "#5a1a44";
const NEBULA_TEAL = "#0a2e3a";
const NEBULA_VIOLET = "#241845";

type Blob = {
  color: string;
  periodX: number;
  periodY: number;
  phaseX: number;
  phaseY: number;
  ax: number;
  ay: number;
  baseX: number;
  baseY: number;
  opacity: number;
};

const BLOBS: Blob[] = [
  {
    color: NEBULA_INDIGO,
    periodX: 22000,
    periodY: 27000,
    phaseX: 0,
    phaseY: 0.3,
    ax: 0.3,
    ay: 0.25,
    baseX: 0.3,
    baseY: 0.35,
    opacity: 0.55,
  },
  {
    color: NEBULA_PURPLE,
    periodX: 26000,
    periodY: 19000,
    phaseX: 0.5,
    phaseY: 0.7,
    ax: 0.35,
    ay: 0.3,
    baseX: 0.7,
    baseY: 0.55,
    opacity: 0.5,
  },
  {
    color: NEBULA_MAGENTA,
    periodX: 31000,
    periodY: 24000,
    phaseX: 0.2,
    phaseY: 0.9,
    ax: 0.4,
    ay: 0.35,
    baseX: 0.55,
    baseY: 0.75,
    opacity: 0.4,
  },
  {
    color: NEBULA_TEAL,
    periodX: 29000,
    periodY: 33000,
    phaseX: 0.8,
    phaseY: 0.2,
    ax: 0.3,
    ay: 0.3,
    baseX: 0.2,
    baseY: 0.7,
    opacity: 0.45,
  },
  {
    color: NEBULA_VIOLET,
    periodX: 35000,
    periodY: 21000,
    phaseX: 0.4,
    phaseY: 0.6,
    ax: 0.25,
    ay: 0.2,
    baseX: 0.8,
    baseY: 0.2,
    opacity: 0.5,
  },
];

const TWO_PI = Math.PI * 2;

function AuroraBlob({
  width,
  height,
  clock,
  blob,
  radius,
}: {
  width: number;
  height: number;
  clock: SharedValue<number>;
  blob: Blob;
  radius: number;
}) {
  const cx = useDerivedValue(() => {
    const t = (clock.value / blob.periodX) * TWO_PI + blob.phaseX * TWO_PI;
    return width * (blob.baseX + blob.ax * Math.sin(t));
  });
  const cy = useDerivedValue(() => {
    const t = (clock.value / blob.periodY) * TWO_PI + blob.phaseY * TWO_PI;
    return height * (blob.baseY + blob.ay * Math.cos(t));
  });

  return (
    <Circle
      cx={cx}
      cy={cy}
      r={radius}
      color={blob.color}
      opacity={blob.opacity}
    >
      <BlurMask blur={80} style="normal" />
    </Circle>
  );
}

export function AuroraBackground() {
  const {
    ref,
    size: { width, height },
  } = useCanvasSize();
  const clock = useClock();
  const radius = Math.max(width, height) * 0.45;

  return (
    <Canvas style={StyleSheet.absoluteFill} ref={ref}>
      <Fill color={SPACE_BLACK} />
      {BLOBS.map((blob, i) => (
        <AuroraBlob
          key={i}
          width={width}
          height={height}
          clock={clock}
          blob={blob}
          radius={radius}
        />
      ))}
    </Canvas>
  );
}
