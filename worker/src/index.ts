interface Env {
	GITHUB_TOKEN?: string;
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url);

		if (url.pathname !== '/omen.svg') {
			return new Response('not found', { status: 404 });
		}

		const width = 800;
		const height = 400;

		const svg = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Background Gradient -->
    <radialGradient id="bg" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
      <stop offset="0%" stop-color="#111111"/>
      <stop offset="100%" stop-color="#000000"/>
    </radialGradient>

    <!-- Radar Sweep Gradient -->
    <conicGradient id="radar" cx="50%" cy="50%" angle="0">
      <stop offset="0%" stop-color="rgba(255,255,255,0)"/>
      <stop offset="25%" stop-color="rgba(255,255,255,0.02)"/>
      <stop offset="99%" stop-color="rgba(255,255,255,0.3)"/>
      <stop offset="100%" stop-color="rgba(255,255,255,0.8)"/>
    </conicGradient>

    <!-- Glowing Node Filters -->
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="2" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
    <filter id="glow-intense" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="4" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>

    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
    </pattern>

    <!-- Glitch Displacement -->
    <filter id="glitch">
      <feTurbulence type="fractalNoise" baseFrequency="0.05 0.95" numOctaves="1" result="noise" />
      <feColorMatrix type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 3 -1" in="noise" result="coloredNoise" />
      <feDisplacementMap xChannelSelector="R" yChannelSelector="A" in="SourceGraphic" in2="coloredNoise" scale="10" />
    </filter>

    <style>
      @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&amp;display=swap');
      
      text { font-family: 'JetBrains Mono', monospace; }
      
      /* Animations */
      @keyframes spin { 100% { transform: rotate(360deg); } }
      @keyframes pulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }
      @keyframes blink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
      @keyframes drift1 { 0% { transform: translate(0, 0); } 50% { transform: translate(15px, -15px); } 100% { transform: translate(0, 0); } }
      @keyframes drift2 { 0% { transform: translate(0, 0); } 50% { transform: translate(-20px, 10px); } 100% { transform: translate(0, 0); } }
      @keyframes drift3 { 0% { transform: translate(0, 0); } 50% { transform: translate(10px, 20px); } 100% { transform: translate(0, 0); } }
      @keyframes dash { to { stroke-dashoffset: -100; } }
      @keyframes typing { from { width: 0; } to { width: 100%; } }
      @keyframes scan { 0% { transform: translateY(-100%); } 100% { transform: translateY(100%); } }
      @keyframes glitch-anim {
        0% { transform: translate(0) }
        20% { transform: translate(-2px, 1px) }
        40% { transform: translate(-1px, -1px) }
        60% { transform: translate(2px, 1px) }
        80% { transform: translate(1px, -1px) }
        100% { transform: translate(0) }
      }

      /* Classes */
      .radar { transform-origin: 400px 200px; animation: spin 4s linear infinite; }
      .node { filter: url(#glow); animation: pulse 3s infinite ease-in-out; }
      .node-core { filter: url(#glow-intense); animation: pulse 2s infinite ease-in-out; }
      .text-glitch { animation: glitch-anim 5s infinite; }
      .cursor { animation: blink 1s step-end infinite; }
      .line-anim { stroke-dasharray: 5 10; animation: dash 20s linear infinite; }
      .scanner { animation: scan 3s linear infinite; opacity: 0.1; }
      
      .d1 { animation: drift1 20s ease-in-out infinite; }
      .d2 { animation: drift2 25s ease-in-out infinite; }
      .d3 { animation: drift3 22s ease-in-out infinite; }
    </style>
  </defs>

  <!-- Background -->
  <rect width="100%" height="100%" fill="url(#bg)"/>
  <rect width="100%" height="100%" fill="url(#grid)"/>

  <!-- Scanning Line -->
  <g clip-path="url(#clip-screen)">
    <rect class="scanner" width="100%" height="20%" fill="rgba(255,255,255,0.5)"/>
  </g>

  <!-- Topology Network -->
  <!-- Connections -->
  <g stroke="rgba(255,255,255,0.15)" stroke-width="1" class="line-anim">
    <path d="M 400 200 L 250 120" />
    <path d="M 400 200 L 580 150" />
    <path d="M 400 200 L 300 320" />
    <path d="M 400 200 L 520 280" />
    
    <path d="M 250 120 L 150 180" />
    <path d="M 580 150 L 680 120" />
    <path d="M 300 320 L 200 280" />
    <path d="M 520 280 L 650 300" />
    
    <!-- Crosslinks -->
    <path d="M 250 120 L 300 320" />
    <path d="M 580 150 L 520 280" />
  </g>

  <!-- Radar Sweep -->
  <circle cx="400" cy="200" r="180" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
  <circle cx="400" cy="200" r="120" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1" stroke-dasharray="2 4"/>
  <circle cx="400" cy="200" r="60" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
  
  <path d="M 400 20 L 400 380 M 220 200 L 580 200" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
  
  <circle cx="400" cy="200" r="180" fill="url(#radar)" class="radar" />

  <!-- Nodes -->
  <g fill="#fff">
    <!-- Core -->
    <circle cx="400" cy="200" r="6" class="node-core" />
    <circle cx="400" cy="200" r="12" fill="none" stroke="#fff" stroke-width="1" opacity="0.5"/>
    
    <!-- Primary Nodes -->
    <g class="d1"><circle cx="250" cy="120" r="4" class="node" /><text x="240" y="105" font-size="10" fill="rgba(255,255,255,0.6)">SYS.01</text></g>
    <g class="d2"><circle cx="580" cy="150" r="4" class="node" /><text x="590" y="145" font-size="10" fill="rgba(255,255,255,0.6)">ORACLE</text></g>
    <g class="d3"><circle cx="300" cy="320" r="4" class="node" /><text x="270" y="340" font-size="10" fill="rgba(255,255,255,0.6)">FABRIC</text></g>
    <g class="d1"><circle cx="520" cy="280" r="4" class="node" /><text x="535" y="295" font-size="10" fill="rgba(255,255,255,0.6)">LATTICE</text></g>
    
    <!-- Secondary Nodes -->
    <g class="d2"><circle cx="150" cy="180" r="2" class="node" style="animation-delay: -1s;"/></g>
    <g class="d3"><circle cx="680" cy="120" r="2" class="node" style="animation-delay: -2s;"/></g>
    <g class="d1"><circle cx="200" cy="280" r="2" class="node" style="animation-delay: -0.5s;"/></g>
    <g class="d2"><circle cx="650" cy="300" r="2" class="node" style="animation-delay: -1.5s;"/></g>
  </g>

  <!-- Data Stream Overlay (Left) -->
  <g font-size="9" fill="rgba(255,255,255,0.4)" transform="translate(20, 30)">
    <text y="0">INITIALIZING SECURE UPLINK...</text>
    <text y="15">ESTABLISHING HERMETIC BOUNDARY [OK]</text>
    <text y="30">VERIFYING CAPABILITY TOKENS [OK]</text>
    <text y="45">SYNCING EVENT LOG (CRDT) [OK]</text>
    <text y="60" fill="rgba(255,255,255,0.8)">AWAITING DIRECTIVE...</text>
  </g>

  <!-- Metrics Overlay (Right) -->
  <g font-size="9" fill="rgba(255,255,255,0.4)" transform="translate(680, 30)" text-anchor="end">
    <text y="0">LATENCY: 1.02ms</text>
    <text y="15">UPTIME: 99.999%</text>
    <text y="30">MEM: 12MB / 128MB</text>
    <text y="45">STATE: DETERMINISTIC</text>
  </g>

  <!-- Bottom Terminal/Prompt -->
  <rect x="20" y="350" width="760" height="30" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.1)"/>
  <text x="35" y="370" font-size="12" fill="#fff" font-weight="700">
    <tspan fill="rgba(255,255,255,0.5)">root@mainframe:~# </tspan>
    <tspan class="text-glitch">execute_payload --target nyzhi</tspan>
    <tspan class="cursor" fill="#fff">█</tspan>
  </text>
  
  <!-- Identity/Signature (Top Right) -->
  <text x="780" y="380" font-size="10" fill="rgba(255,255,255,0.2)" text-anchor="end" font-weight="bold" letter-spacing="2">STATICPAYLOAD</text>

  <!-- Framing / Borders -->
  <path d="M 0 20 L 20 0 L 780 0 L 800 20 L 800 380 L 780 400 L 20 400 L 0 380 Z" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
  
  <!-- Corner Accents -->
  <path d="M 0 30 L 0 0 L 30 0" fill="none" stroke="#fff" stroke-width="2"/>
  <path d="M 770 0 L 800 0 L 800 30" fill="none" stroke="#fff" stroke-width="2"/>
  <path d="M 800 370 L 800 400 L 770 400" fill="none" stroke="#fff" stroke-width="2"/>
  <path d="M 30 400 L 0 400 L 0 370" fill="none" stroke="#fff" stroke-width="2"/>

</svg>
`;

		return new Response(svg.trim(), {
			headers: {
				'Content-Type': 'image/svg+xml',
				'Cache-Control': 'no-cache, no-store, must-revalidate',
				'Access-Control-Allow-Origin': '*',
			},
		});
	},
};
