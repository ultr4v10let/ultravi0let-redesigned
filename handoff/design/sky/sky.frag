#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
/* A sky that can grow a 22-degree ice halo.
   All lengths arrive in buffer pixels; uScale is buffer pixels per CSS pixel. */
uniform vec2 uRes;
uniform float uTime, uScale;
uniform vec2 uSun;
uniform float uR, uSunR;
uniform vec3 uTop, uMid, uLow, uHaze, uGlare, uPaper;
uniform float uMidPos, uHazeAmt, uGlareAmt;
uniform float uVeil, uRing, uRingAmt, uHead, uDogL, uDogR, uLine, uLineW, uArc;
uniform float uNight, uGhost, uPaperMix, uDisc, uVig;
uniform float uSkyH, uGroundOn;
uniform vec3 uGround;

float hash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}
float vnoise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash12(i), b = hash12(i + vec2(1.0, 0.0)), c = hash12(i + vec2(0.0, 1.0)), d = hash12(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}
float fbm(vec2 p) {
  float s = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) { s += a * vnoise(p); p = p * 2.03 + vec2(17.1, 9.2); a *= 0.5; }
  return s;
}
float fbm3(vec2 p) {
  float s = 0.0, a = 0.5;
  for (int i = 0; i < 3; i++) { s += a * vnoise(p); p = p * 2.01 + vec2(5.3, 1.7); a *= 0.5; }
  return s;
}
vec3 screen(vec3 a, vec3 b) { return 1.0 - (1.0 - a) * (1.0 - clamp(b, 0.0, 1.0)); }
float hexd(vec2 v) { v = abs(v); return max(dot(v, vec2(0.8660254, 0.5)), v.y); }

void main() {
  vec2 p = vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y);
  float y = p.y / uSkyH;

  /* sky */
  vec3 col = y < uMidPos ? mix(uTop, uMid, smoothstep(0.0, uMidPos, y)) : mix(uMid, uLow, smoothstep(uMidPos, 1.0, y));
  col = mix(col, uHaze, smoothstep(0.55, 1.0, y) * uHazeAmt);
  vec2 d = p - uSun;
  float r = length(d);
  float rn = r / uR;
  float glare = exp(-rn * 4.2) * 0.85 + exp(-rn * 1.25) * 0.28;
  col = screen(col, uGlare * glare * uGlareAmt);

  /* stars, at night */
  if (uNight > 0.01) {
    float cell = 26.0 * uScale;
    vec2 g = p / cell;
    vec2 id = floor(g);
    vec2 f = fract(g);
    float h = hash12(id + 11.0);
    vec2 o = vec2(hash12(id + 3.7), hash12(id + 9.1)) * 0.7 + 0.15;
    float sd = length(f - o) * cell / uScale;
    float sz = mix(0.55, 1.35, hash12(id + 5.3));
    float tw = 0.6 + 0.4 * sin(uTime * (0.8 + 2.5 * hash12(id + 2.1)) + h * 50.0);
    float star = step(0.86, h) * (1.0 - smoothstep(sz * 0.35, sz, sd)) * tw;
    star *= 1.0 - smoothstep(0.62, 0.95, y);
    star *= smoothstep(0.5, 1.6, rn);
    col = screen(col, vec3(0.92, 0.94, 1.0) * star * uNight);
  }

  /* a thin veil of cirrostratus, drifting, lit near the sun */
  if (uVeil > 0.001) {
    vec2 q = vec2(p.x / uRes.y * 1.3 + uTime * 0.006, y * 6.5);
    float w = fbm3(q * 0.7 + vec2(3.1, 7.7));
    float n = fbm(q + vec2(w * 1.2, w * 0.35));
    float wisp = smoothstep(0.48, 0.82, n);
    float lit = 0.3 + 0.7 * exp(-rn * 0.8);
    vec3 vc = mix(vec3(1.0, 0.99, 1.0), vec3(0.8, 0.84, 1.0), uNight);
    col = screen(col, vc * wisp * uVeil * lit * mix(0.62, 0.34, uNight));
  }

  /* the 22-degree ring, drawn clockwise from the top; the sky inside it darkens as it closes */
  float a01 = fract(atan(d.x, -d.y) / 6.28318530718 + 1.0);
  /* uRing runs 0..1.04: past 1.0 the drawing front overtakes its own start and the loop closes without a seam */
  float closing = smoothstep(0.9, 1.035, uRing);
  float startW = mix(0.04, 0.0005, closing);
  float sweep = uRing >= 1.035 ? 1.0 : smoothstep(uRing + 0.003, uRing - 0.03, a01) * mix(smoothstep(0.0, startW, a01), 1.0, smoothstep(1.0, 1.03, uRing));
  float follow = uRing >= 1.035 ? 1.0 : mix(smoothstep(uRing + 0.02, uRing - 0.16, a01) * smoothstep(0.0, 0.14, a01), 1.0, smoothstep(0.95, 1.035, uRing)) * smoothstep(0.0, 0.08, uRing);
  float inside = uRingAmt * follow * (1.0 - smoothstep(0.88, 1.0, rn)) * (0.45 + 0.55 * smoothstep(0.25, 0.95, rn));
  col *= mix(vec3(1.0), vec3(0.85, 0.85, 0.97), inside);
  float t = (rn - 1.0) / 0.034;
  float prof = smoothstep(-1.6, 0.0, t) * exp(-max(t, 0.0) * 0.28);
  vec3 rc = mix(vec3(1.0, 0.33, 0.30), vec3(1.0, 0.63, 0.30), smoothstep(-1.0, 0.1, t));
  rc = mix(rc, vec3(1.0, 0.95, 0.84), smoothstep(0.1, 1.1, t));
  rc = mix(rc, vec3(0.88, 0.93, 1.0), smoothstep(1.6, 7.0, t));
  rc = mix(rc, vec3(0.9, 0.93, 1.0), uNight * 0.55);
  col = screen(col, rc * prof * sweep * uRingAmt * 0.9);
  if (uHead > 0.001) {
    float dl = a01 - uRing;
    float dw = fract(dl + 0.5) - 0.5;
    float comet = dw >= 0.0 ? exp(-pow(dw * 160.0, 2.0)) : (dl <= 0.0 ? exp(dl * 22.0) : 0.0);
    col = screen(col, vec3(1.0, 0.97, 0.92) * comet * exp(-t * t / 3.0) * uHead * 0.85);
  }

  /* sundogs: red towards the sun, then gold, white and a blue-white tail */
  for (int k = 0; k < 2; k++) {
    float side = k == 0 ? -1.0 : 1.0;
    float amt = k == 0 ? uDogL : uDogR;
    if (amt > 0.001) {
      vec2 e = (p - uSun - vec2(side * 1.14 * uR, 0.0)) / uR;
      float u = e.x * side;
      float body = exp(-(e.x * e.x) / 0.0056 - (e.y * e.y) / 0.0180);
      float edge = smoothstep(-0.10, -0.035, u);
      vec3 dc = mix(vec3(1.0, 0.22, 0.30), vec3(1.0, 0.55, 0.22), smoothstep(-0.07, -0.025, u));
      dc = mix(dc, vec3(1.0, 0.85, 0.40), smoothstep(-0.03, 0.0, u));
      dc = mix(dc, vec3(1.0, 0.97, 0.90), smoothstep(-0.005, 0.035, u));
      dc = mix(dc, vec3(0.84, 0.91, 1.0), smoothstep(0.04, 0.1, u));
      dc = mix(dc, vec3(0.93, 0.95, 1.0), uNight * 0.7);
      float tail = exp(-(e.y * e.y) / 0.0006) * smoothstep(-0.01, 0.05, u) * exp(-max(u, 0.0) / 0.45);
      float glow = exp(-dot(e, e) / 0.05) * 0.25;
      col = screen(col, dc * body * edge * amt * mix(1.1, 0.7, uNight) + vec3(1.0) * (tail * 0.32 + glow) * amt * mix(1.0, 0.6, uNight));
    }
  }

  /* the parhelic circle: the flat signal through the sun */
  if (uLine > 0.001) {
    float dy = p.y - uSun.y;
    float lw = max(0.0055 * uR, 0.7 * uScale);
    float core = exp(-dy * dy / (2.0 * lw * lw));
    float soft = exp(-dy * dy / (32.0 * lw * lw)) * 0.22;
    float dx = abs(p.x - uSun.x);
    float ext = uLine * uLineW;
    float mask = 1.0 - smoothstep(ext * 0.7, ext + 1.0, dx);
    float bright = 0.28 + 0.72 * exp(-pow((dx - 1.14 * uR) / (0.7 * uR), 2.0));
    col = screen(col, mix(vec3(1.0), vec3(0.9, 0.93, 1.0), uNight) * (core + soft) * mask * bright * 0.8 * mix(1.0, 0.6, uNight));
  }

  /* upper tangent arc, a gull wing touching the top of the ring */
  if (uArc > 0.001) {
    vec2 a = d / uR;
    float ax = abs(a.x);
    float slope = 0.52 * ax;
    float dist = (a.y - (-1.0 - 0.26 * ax * ax)) / sqrt(1.0 + slope * slope);
    float fade = 1.0 - smoothstep(0.9, 1.6, ax);
    float arcW = exp(-(dist * dist) / 0.00032) * 0.34 + exp(-(dist * dist) / 0.0025) * 0.1;
    float arcR = exp(-((dist - 0.016) * (dist - 0.016)) / 0.00022);
    col = screen(col, (vec3(1.0) * arcW + vec3(1.0, 0.48, 0.42) * arcR * 0.22 * (1.0 - uNight * 0.7)) * fade * uArc);
  }

  /* two faint lens ghosts */
  if (uGhost > 0.001) {
    vec2 gdir = normalize(vec2(0.86, 0.3));
    float r1 = length(p - (uSun + gdir * 1.9 * uR)) / uR;
    float r2 = hexd((p - (uSun + gdir * 2.5 * uR)) / uR);
    float g1 = (1.0 - smoothstep(0.075, 0.1, r1)) * 0.12;
    float g2 = (1.0 - smoothstep(0.125, 0.155, r2)) * 0.08;
    col = screen(col, (vec3(0.73, 0.65, 1.0) * g1 + vec3(1.0, 0.85, 0.72) * g2) * uGhost);
  }

  /* the sun, or the moon */
  float th = atan(d.y, d.x);
  float bloom = exp(-r / (uSunR * 2.2)) * 0.9 + exp(-r / (0.14 * uR)) * 0.35;
  float spikes = pow(abs(cos(3.0 * th)), 220.0) * exp(-r / (0.4 * uR)) * 0.4 * (1.0 - 0.7 * uNight);
  vec3 sunC = mix(vec3(1.0, 0.98, 0.94), vec3(0.88, 0.9, 0.98), uNight);
  col = screen(col, sunC * (bloom + spikes) * mix(1.0, 0.55, uNight));
  float coreM = 1.0 - smoothstep(uSunR * 0.75, uSunR, r);
  vec3 disc = sunC;
  if (uNight > 0.01) {
    float m = fbm3(d / uSunR * 1.6 + 4.0);
    disc *= 1.0 - uNight * 0.1 * smoothstep(0.5, 0.75, m);
  }
  col = mix(col, disc, coreM);

  /* vignette, then fade to paper everywhere but a small round of sky */
  col *= 1.0 - uVig * 0.1 * pow(length((p / uRes - 0.5) * vec2(1.0, 0.9)) * 1.3, 2.2);
  float keep = 1.0 - smoothstep(uDisc * 0.62, uDisc, rn);
  col = mix(uPaper, col, mix(1.0, keep, uPaperMix));

  /* the ground: the page itself, below the horizon */
  if (uGroundOn > 0.5) col = mix(col, uGround, smoothstep(-0.7 * uScale, 0.7 * uScale, p.y - uSkyH));

  col += (hash12(p) - 0.5) / 255.0 * 1.2;
  gl_FragColor = vec4(col, 1.0);
}
