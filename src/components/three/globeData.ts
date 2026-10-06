import { feature } from "topojson-client";
import type { Topology } from "topojson-specification";
import landTopo from "world-atlas/land-110m.json";

const DEG = Math.PI / 180;

export type LonLat = [number, number]; // [lon, lat]

/** Unit vector for a lon/lat. lon 0 / lat 0 faces +z (towards the camera). */
export function toVec(lon: number, lat: number, r = 1): [number, number, number] {
  const cl = Math.cos(lat * DEG);
  return [r * cl * Math.sin(lon * DEG), r * Math.sin(lat * DEG), r * cl * Math.cos(lon * DEG)];
}

/** Rasterise real coastlines (Natural Earth 110m) into a 1-channel equirectangular mask. */
function landMask(w = 720, h = 360) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d", { willReadFrequently: true })!;
  const topo = landTopo as unknown as Topology;
  const fc = feature(topo, topo.objects.land as never) as unknown as {
    features?: { geometry: { type: string; coordinates: number[][][][] | number[][][] } }[];
    geometry?: { type: string; coordinates: number[][][][] | number[][][] };
  };
  const geoms = fc.features ? fc.features.map((f) => f.geometry) : [fc.geometry!];
  ctx.fillStyle = "#fff";
  const draw = (rings: number[][][]) => {
    ctx.beginPath();
    for (const ring of rings) {
      ring.forEach(([lon, lat], i) => {
        const x = ((lon + 180) / 360) * w;
        const y = ((90 - lat) / 180) * h;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.closePath();
    }
    ctx.fill("evenodd");
  };
  for (const g of geoms) {
    if (g.type === "Polygon") draw(g.coordinates as number[][][]);
    else if (g.type === "MultiPolygon") (g.coordinates as number[][][][]).forEach(draw);
  }
  return { data: ctx.getImageData(0, 0, w, h).data, w, h };
}

/** Fibonacci sphere, keeping only points that fall on land. */
export function buildLandDots(total: number) {
  const { data, w, h } = landMask();
  const out: number[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < total; i++) {
    const y = 1 - (i / (total - 1)) * 2;
    const rad = Math.sqrt(1 - y * y);
    const th = golden * i;
    const x = Math.cos(th) * rad;
    const z = Math.sin(th) * rad;
    const lat = Math.asin(y) / DEG;
    const lon = Math.atan2(x, z) / DEG;
    const px = Math.min(w - 1, Math.floor(((lon + 180) / 360) * w));
    const py = Math.min(h - 1, Math.floor(((90 - lat) / 180) * h));
    if (data[(py * w + px) * 4 + 3] > 128) out.push(x, y, z);
  }
  return new Float32Array(out);
}

export const HOME_BASE: LonLat = [55.3, 25.2]; // Dubai
export const CITIES: LonLat[] = [
  [-0.1, 51.5], // London
  [103.8, 1.35], // Singapore
  [-74, 40.7], // New York
  [151.2, -33.9], // Sydney
  [28, -26.2], // Johannesburg
  [-46.6, -23.5], // Sao Paulo
];

/** Great-circle arc between two lon/lat points, lifted above the surface. */
export function arcPoints(a: LonLat, b: LonLat, steps = 72) {
  const va = toVec(a[0], a[1]);
  const vb = toVec(b[0], b[1]);
  const dot = Math.min(1, Math.max(-1, va[0] * vb[0] + va[1] * vb[1] + va[2] * vb[2]));
  const omega = Math.acos(dot);
  const out = new Float32Array((steps + 1) * 3);
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const s = Math.sin(omega) || 1;
    const k1 = Math.sin((1 - t) * omega) / s;
    const k2 = Math.sin(t * omega) / s;
    const lift = 1 + Math.sin(Math.PI * t) * 0.22 * (omega / Math.PI + 0.25);
    out[i * 3] = (va[0] * k1 + vb[0] * k2) * lift;
    out[i * 3 + 1] = (va[1] * k1 + vb[1] * k2) * lift;
    out[i * 3 + 2] = (va[2] * k1 + vb[2] * k2) * lift;
  }
  return out;
}
