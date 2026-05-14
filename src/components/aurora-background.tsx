import {
  BlurMask,
  Canvas,
  Circle,
  Fill,
  useClock,
} from "@shopify/react-native-skia";
import { StyleSheet, useWindowDimensions } from "react-native";
import { useDerivedValue, type SharedValue } from "react-native-reanimated";

const BASE_COLOR = "#1a1a2e";

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
};

const BLOBS: Blob[] = [
  {
    color: "#3a2d5c",
    periodX: 14000,
    periodY: 17000,
    phaseX: 0,
    phaseY: 0.3,
    ax: 0.35,
    ay: 0.25,
    baseX: 0.3,
    baseY: 0.3,
  },
  {
    color: "#1e3a5f",
    periodX: 19000,
    periodY: 13000,
    phaseX: 0.5,
    phaseY: 0.7,
    ax: 0.3,
    ay: 0.3,
    baseX: 0.7,
    baseY: 0.4,
  },
  {
    color: "#2d4a3e",
    periodX: 16000,
    periodY: 21000,
    phaseX: 0.2,
    phaseY: 0.9,
    ax: 0.4,
    ay: 0.35,
    baseX: 0.5,
    baseY: 0.7,
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
    <Circle cx={cx} cy={cy} r={radius} color={blob.color} opacity={0.75}>
      <BlurMask blur={80} style="normal" />
    </Circle>
  );
}

export function AuroraBackground() {
  const { width, height } = useWindowDimensions();
  const clock = useClock();
  const radius = Math.max(width, height) * 0.45;

  return (
    <Canvas style={StyleSheet.absoluteFill}>
      <Fill color={BASE_COLOR} />
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
