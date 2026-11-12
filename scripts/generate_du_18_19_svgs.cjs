const fs = require('fs');
const path = require('path');

const importedDir = path.join(__dirname, '../public/assets/imported');
if (!fs.existsSync(importedDir)) {
  fs.mkdirSync(importedDir, { recursive: true });
}

// 1. Q124 Circuit SVG (Physics Q8)
const phyQ8CircuitSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 180" width="320" height="180">
  <rect width="320" height="180" fill="#f8fafc" rx="10"/>
  <!-- Circuit Wires -->
  <path d="M 40 90 L 80 90 L 80 40 L 240 40 L 240 90 M 80 90 L 80 140 L 240 140 L 240 90 M 240 90 L 280 90" stroke="#1e293b" stroke-width="2.5" fill="none"/>
  <!-- Battery on left -->
  <line x1="40" y1="75" x2="40" y2="105" stroke="#1e293b" stroke-width="4"/>
  <line x1="48" y1="82" x2="48" y2="98" stroke="#1e293b" stroke-width="2"/>
  <text x="32" y="70" font-size="12" font-weight="bold" fill="#0f172a">+</text>
  <text x="52" y="70" font-size="12" font-weight="bold" fill="#0f172a">-</text>
  <!-- Top Resistor 4 Ohm -->
  <rect x="130" y="32" width="60" height="16" fill="#3b82f6" rx="4"/>
  <text x="160" y="24" font-size="12" font-weight="bold" fill="#1e3a8a" text-anchor="middle">4 Ω</text>
  <!-- Bottom Resistor -->
  <rect x="130" y="132" width="60" height="16" fill="#64748b" rx="4"/>
  <text x="160" y="124" font-size="12" font-weight="bold" fill="#334155" text-anchor="middle">6 Ω</text>
  <!-- Junction points -->
  <circle cx="80" cy="90" r="4" fill="#0f172a"/>
  <circle cx="240" cy="90" r="4" fill="#0f172a"/>
  <!-- Current Arrow -->
  <path d="M 90 35 L 115 35" stroke="#ef4444" stroke-width="2" marker-end="url(#arrow)"/>
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444"/>
    </marker>
  </defs>
  <text x="100" y="25" font-size="11" font-weight="bold" fill="#ef4444">I</text>
</svg>`;

// 2. Q135 Ring SVG (Physics Q19)
const phyQ19RingSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <rect width="200" height="200" fill="#f8fafc" rx="10"/>
  <!-- Outer Aluminum Ring -->
  <circle cx="100" cy="100" r="75" fill="#94a3b8" stroke="#475569" stroke-width="3"/>
  <!-- Inner Hole -->
  <circle cx="100" cy="100" r="35" fill="#f8fafc" stroke="#475569" stroke-width="3"/>
  <!-- Dimension arrows -->
  <line x1="100" y1="100" x2="175" y2="100" stroke="#2563eb" stroke-dasharray="3,3" stroke-width="1.5"/>
  <line x1="100" y1="100" x2="135" y2="100" stroke="#dc2626" stroke-linecap="round" stroke-width="2"/>
  <text x="118" y="93" font-size="10" font-weight="bold" fill="#dc2626">r</text>
  <text x="150" y="93" font-size="10" font-weight="bold" fill="#2563eb">R</text>
  <text x="100" y="190" font-size="11" font-weight="bold" fill="#334155" text-anchor="middle">অ্যালুমিনিয়াম রিং (Ring)</text>
</svg>`;

// 3. Q139 Motion Graphs A, B, C, D (Physics Q23)
const phyQ23GraphASvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 140" width="180" height="140">
  <rect width="180" height="140" fill="#f8fafc" rx="8"/>
  <line x1="30" y1="110" x2="160" y2="110" stroke="#334155" stroke-width="2"/>
  <line x1="30" y1="110" x2="30" y2="20" stroke="#334155" stroke-width="2"/>
  <text x="155" y="125" font-size="11" font-weight="bold" fill="#334155">t</text>
  <text x="15" y="25" font-size="11" font-weight="bold" fill="#334155">v</text>
  <path d="M 30 110 L 70 40 L 110 110" stroke="#2563eb" stroke-width="3" fill="none"/>
  <text x="90" y="132" font-size="11" font-weight="bold" fill="#1e293b" text-anchor="middle">(ক)</text>
</svg>`;

const phyQ23GraphBSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 140" width="180" height="140">
  <rect width="180" height="140" fill="#f8fafc" rx="8"/>
  <line x1="20" y1="70" x2="160" y2="70" stroke="#334155" stroke-width="2"/>
  <line x1="30" y1="120" x2="30" y2="15" stroke="#334155" stroke-width="2"/>
  <text x="155" y="85" font-size="11" font-weight="bold" fill="#334155">t</text>
  <text x="15" y="20" font-size="11" font-weight="bold" fill="#334155">v</text>
  <path d="M 30 70 L 60 25 L 90 70 L 120 115 L 150 70" stroke="#16a34a" stroke-width="3" fill="none"/>
  <text x="90" y="132" font-size="11" font-weight="bold" fill="#16a34a" text-anchor="middle">(খ - সঠিক)</text>
</svg>`;

const phyQ23GraphCSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 140" width="180" height="140">
  <rect width="180" height="140" fill="#f8fafc" rx="8"/>
  <line x1="30" y1="110" x2="160" y2="110" stroke="#334155" stroke-width="2"/>
  <line x1="30" y1="110" x2="30" y2="20" stroke="#334155" stroke-width="2"/>
  <text x="155" y="125" font-size="11" font-weight="bold" fill="#334155">t</text>
  <text x="15" y="25" font-size="11" font-weight="bold" fill="#334155">v</text>
  <line x1="30" y1="110" x2="140" y2="30" stroke="#2563eb" stroke-width="3"/>
  <text x="90" y="132" font-size="11" font-weight="bold" fill="#1e293b" text-anchor="middle">(গ)</text>
</svg>`;

const phyQ23GraphDSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 140" width="180" height="140">
  <rect width="180" height="140" fill="#f8fafc" rx="8"/>
  <line x1="30" y1="110" x2="160" y2="110" stroke="#334155" stroke-width="2"/>
  <line x1="30" y1="110" x2="30" y2="20" stroke="#334155" stroke-width="2"/>
  <text x="155" y="125" font-size="11" font-weight="bold" fill="#334155">t</text>
  <text x="15" y="25" font-size="11" font-weight="bold" fill="#334155">s</text>
  <path d="M 30 110 Q 70 30 110 30 Q 130 30 150 110" stroke="#2563eb" stroke-width="3" fill="none"/>
  <text x="90" y="132" font-size="11" font-weight="bold" fill="#1e293b" text-anchor="middle">(ঘ)</text>
</svg>`;

// 4. Q140 Acceleration vs Radius Graphs (Physics Q24) (a = v^2/r -> 1/r hyperbola)
const phyQ24GraphASvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 130" width="160" height="130">
  <rect width="160" height="130" fill="#f8fafc" rx="8"/>
  <line x1="25" y1="105" x2="145" y2="105" stroke="#334155" stroke-width="2"/>
  <line x1="25" y1="105" x2="25" y2="15" stroke="#334155" stroke-width="2"/>
  <text x="140" y="120" font-size="11" font-weight="bold" fill="#334155">r</text>
  <text x="12" y="20" font-size="11" font-weight="bold" fill="#334155">a</text>
  <line x1="25" y1="105" x2="135" y2="25" stroke="#2563eb" stroke-width="3"/>
  <text x="80" y="122" font-size="11" font-weight="bold" fill="#1e293b" text-anchor="middle">(ক)</text>
</svg>`;

const phyQ24GraphBSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 130" width="160" height="130">
  <rect width="160" height="130" fill="#f8fafc" rx="8"/>
  <line x1="25" y1="105" x2="145" y2="105" stroke="#334155" stroke-width="2"/>
  <line x1="25" y1="105" x2="25" y2="15" stroke="#334155" stroke-width="2"/>
  <text x="140" y="120" font-size="11" font-weight="bold" fill="#334155">r</text>
  <text x="12" y="20" font-size="11" font-weight="bold" fill="#334155">a</text>
  <path d="M 30 25 Q 45 80 135 100" stroke="#16a34a" stroke-width="3" fill="none"/>
  <text x="80" y="122" font-size="11" font-weight="bold" fill="#16a34a" text-anchor="middle">(খ - সঠিক: a ∝ 1/r)</text>
</svg>`;

const phyQ24GraphCSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 130" width="160" height="130">
  <rect width="160" height="130" fill="#f8fafc" rx="8"/>
  <line x1="25" y1="105" x2="145" y2="105" stroke="#334155" stroke-width="2"/>
  <line x1="25" y1="105" x2="25" y2="15" stroke="#334155" stroke-width="2"/>
  <text x="140" y="120" font-size="11" font-weight="bold" fill="#334155">r</text>
  <text x="12" y="20" font-size="11" font-weight="bold" fill="#334155">a</text>
  <line x1="25" y1="50" x2="135" y2="50" stroke="#2563eb" stroke-width="3"/>
  <text x="80" y="122" font-size="11" font-weight="bold" fill="#1e293b" text-anchor="middle">(গ)</text>
</svg>`;

const phyQ24GraphDSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 130" width="160" height="130">
  <rect width="160" height="130" fill="#f8fafc" rx="8"/>
  <line x1="25" y1="105" x2="145" y2="105" stroke="#334155" stroke-width="2"/>
  <line x1="25" y1="105" x2="25" y2="15" stroke="#334155" stroke-width="2"/>
  <text x="140" y="120" font-size="11" font-weight="bold" fill="#334155">r</text>
  <text x="12" y="20" font-size="11" font-weight="bold" fill="#334155">a</text>
  <path d="M 25 105 Q 80 100 135 25" stroke="#2563eb" stroke-width="3" fill="none"/>
  <text x="80" y="122" font-size="11" font-weight="bold" fill="#1e293b" text-anchor="middle">(ঘ)</text>
</svg>`;

// 5. Q143 Light Refraction 3 Media SVG (Physics Q27)
const phyQ27RefractionSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 180" width="280" height="180">
  <rect width="280" height="180" fill="#f8fafc" rx="10"/>
  <!-- Medium Boundaries -->
  <line x1="20" y1="60" x2="260" y2="60" stroke="#64748b" stroke-width="1.5" stroke-dasharray="4,4"/>
  <line x1="20" y1="120" x2="260" y2="120" stroke="#64748b" stroke-width="1.5" stroke-dasharray="4,4"/>
  <!-- Labels for Media -->
  <text x="35" y="35" font-size="12" font-weight="bold" fill="#1e293b">Medium 1 (v₁)</text>
  <text x="35" y="95" font-size="12" font-weight="bold" fill="#1e293b">Medium 2 (v₂)</text>
  <text x="35" y="155" font-size="12" font-weight="bold" fill="#1e293b">Medium 3 (v₃)</text>
  <!-- Light Ray -->
  <path d="M 80 15 L 120 60 L 140 120 L 220 165" stroke="#dc2626" stroke-width="3" fill="none"/>
  <!-- Normals -->
  <line x1="120" y1="40" x2="120" y2="80" stroke="#94a3b8" stroke-width="1"/>
  <line x1="140" y1="100" x2="140" y2="140" stroke="#94a3b8" stroke-width="1"/>
</svg>`;

// Write all SVGs
fs.writeFileSync(path.join(importedDir, 'du_18_19_phy_q8.svg'), phyQ8CircuitSvg, 'utf-8');
fs.writeFileSync(path.join(importedDir, 'du_18_19_phy_q19.svg'), phyQ19RingSvg, 'utf-8');

fs.writeFileSync(path.join(importedDir, 'du_18_19_phy_q23_a.svg'), phyQ23GraphASvg, 'utf-8');
fs.writeFileSync(path.join(importedDir, 'du_18_19_phy_q23_b.svg'), phyQ23GraphBSvg, 'utf-8');
fs.writeFileSync(path.join(importedDir, 'du_18_19_phy_q23_c.svg'), phyQ23GraphCSvg, 'utf-8');
fs.writeFileSync(path.join(importedDir, 'du_18_19_phy_q23_d.svg'), phyQ23GraphDSvg, 'utf-8');

fs.writeFileSync(path.join(importedDir, 'du_18_19_phy_q24_a.svg'), phyQ24GraphASvg, 'utf-8');
fs.writeFileSync(path.join(importedDir, 'du_18_19_phy_q24_b.svg'), phyQ24GraphBSvg, 'utf-8');
fs.writeFileSync(path.join(importedDir, 'du_18_19_phy_q24_c.svg'), phyQ24GraphCSvg, 'utf-8');
fs.writeFileSync(path.join(importedDir, 'du_18_19_phy_q24_d.svg'), phyQ24GraphDSvg, 'utf-8');

fs.writeFileSync(path.join(importedDir, 'du_18_19_phy_q27.svg'), phyQ27RefractionSvg, 'utf-8');

console.log("Successfully generated all local SVGs in /public/assets/imported/");

// Update DU 18-19 JSON file to replace external Chorcha URLs with local SVGs
const jsonPath = path.join(__dirname, '../public/assets/aistudio/DU_18-19_Questions_89aa927f.json');
let raw = fs.readFileSync(jsonPath, 'utf-8');

raw = raw.replace(/https:\/\/assets\.chorcha\.net\/DD4EgR5hz7AECvB7Jy-vR\.png/g, '/assets/imported/du_18_19_phy_q8.svg');
raw = raw.replace(/https:\/\/assets\.chorcha\.net\/uFMr3263xCiQI5Nx\.webp/g, '/assets/imported/du_18_19_phy_q19.svg');

raw = raw.replace(/https:\/\/assets\.chorcha\.net\/hfjYCDaZoI9lgV_kdFeFG\.png/g, '/assets/imported/du_18_19_phy_q23_a.svg');
raw = raw.replace(/https:\/\/assets\.chorcha\.net\/iB3TVW9hKdBkWuVrwZ5DU\.png/g, '/assets/imported/du_18_19_phy_q23_b.svg');
raw = raw.replace(/https:\/\/assets\.chorcha\.net\/ZmqmBM6KKNvSzjC14bJUL\.png/g, '/assets/imported/du_18_19_phy_q23_c.svg');
raw = raw.replace(/https:\/\/assets\.chorcha\.net\/lU-MSqscOZkZgoJMTxoLU\.png/g, '/assets/imported/du_18_19_phy_q23_d.svg');

raw = raw.replace(/https:\/\/assets\.chorcha\.net\/Yh1bvepK_bSAWLWMlUi-Q\.svg/g, '/assets/imported/du_18_19_phy_q24_a.svg');
raw = raw.replace(/https:\/\/assets\.chorcha\.net\/j7yglji3Ba-0QIbU49zVV\.svg/g, '/assets/imported/du_18_19_phy_q24_b.svg');
raw = raw.replace(/https:\/\/assets\.chorcha\.net\/0AFK-JcTTxij_Ik0Wzm_j\.svg/g, '/assets/imported/du_18_19_phy_q24_c.svg');
raw = raw.replace(/https:\/\/assets\.chorcha\.net\/bzcHBOQbxgH67t-G1bHep\.svg/g, '/assets/imported/du_18_19_phy_q24_d.svg');

raw = raw.replace(/https:\/\/assets\.chorcha\.net\/A7TZbvwI5ioMypGX\.webp/g, '/assets/imported/du_18_19_phy_q27.svg');

fs.writeFileSync(jsonPath, raw, 'utf-8');
console.log("Successfully updated DU 18-19 JSON with local SVG asset paths!");
