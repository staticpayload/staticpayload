interface Env {
	GITHUB_TOKEN?: string;
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url);

		if (url.pathname !== '/omen.svg' && url.pathname !== '/nexus.svg') {
			return new Response('not found', { status: 404 });
		}

		const svg = `
<svg width="1000" height="550" viewBox="0 0 1000 550" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Modern Typography -->
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&amp;display=swap');
      @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&amp;display=swap');
      
      * { box-sizing: border-box; }
      .font-sans { font-family: 'Inter', -apple-system, sans-serif; }
      .font-mono { font-family: 'JetBrains Mono', monospace; }
      
      /* Colors */
      .bg-base { fill: #030303; }
      .border-subtle { stroke: rgba(255, 255, 255, 0.08); }
      .border-glow { stroke: rgba(255, 255, 255, 0.2); }
      .text-primary { fill: #ffffff; }
      .text-muted { fill: #888888; }
      .text-subtle { fill: #444444; }
      
      /* Smooth Animations */
      @keyframes float-1 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
      @keyframes float-2 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
      @keyframes float-3 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
      @keyframes float-4 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
      
      @keyframes pulse-opacity { 0%, 100% { opacity: 0.2; } 50% { opacity: 1; } }
      @keyframes rotate-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      @keyframes dash-move { from { stroke-dashoffset: 200; } to { stroke-dashoffset: 0; } }
      @keyframes dash-move-rev { from { stroke-dashoffset: 0; } to { stroke-dashoffset: 200; } }
      
      @keyframes beam-flow { from { stroke-dashoffset: 150; } to { stroke-dashoffset: 0; } }
      @keyframes progress { 0% { width: 0; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { width: 292px; opacity: 0; } }

      /* Element Classes */
      .animate-float-1 { animation: float-1 7s ease-in-out infinite; }
      .animate-float-2 { animation: float-2 6s ease-in-out infinite; }
      .animate-float-3 { animation: float-3 8s ease-in-out infinite; }
      .animate-float-4 { animation: float-4 5s ease-in-out infinite; }
      
      .animate-pulse { animation: pulse-opacity 3s ease-in-out infinite; }
      .animate-rotate { transform-origin: center; animation: rotate-slow 40s linear infinite; }
      .animate-rotate-rev { transform-origin: center; animation: rotate-slow 50s linear infinite reverse; }
      
      .data-line { stroke-dasharray: 4 8; animation: dash-move 30s linear infinite; }
      .data-line-rev { stroke-dasharray: 4 8; animation: dash-move-rev 25s linear infinite; }
      
      .beam { stroke-dasharray: 30 120; animation: beam-flow 3s linear infinite; stroke-linecap: round; }
      .progress-bar { animation: progress 4s ease-in-out infinite; }

      .card-bg {
        fill: rgba(8, 8, 8, 0.7);
        backdrop-filter: blur(10px);
      }
    </style>
    
    <!-- Gradients & Patterns -->
    <radialGradient id="mesh" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="rgba(255,255,255,0.04)"/>
      <stop offset="50%" stop-color="rgba(255,255,255,0.01)"/>
      <stop offset="100%" stop-color="transparent"/>
    </radialGradient>
    
    <pattern id="dot-grid" width="30" height="30" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1" fill="rgba(255,255,255,0.03)" />
    </pattern>

    <linearGradient id="fade-h" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="rgba(255,255,255,0)" />
      <stop offset="20%" stop-color="rgba(255,255,255,0.08)" />
      <stop offset="80%" stop-color="rgba(255,255,255,0.08)" />
      <stop offset="100%" stop-color="rgba(255,255,255,0)" />
    </linearGradient>

    <linearGradient id="fade-v" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgba(255,255,255,0)" />
      <stop offset="20%" stop-color="rgba(255,255,255,0.08)" />
      <stop offset="80%" stop-color="rgba(255,255,255,0.08)" />
      <stop offset="100%" stop-color="rgba(255,255,255,0)" />
    </linearGradient>
    
    <!-- Glow Filters -->
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Background Layer -->
  <rect width="100%" height="100%" class="bg-base" />
  <rect width="100%" height="100%" fill="url(#dot-grid)" />
  <circle cx="500" cy="275" r="450" fill="url(#mesh)" />

  <!-- Animated Structural Grid -->
  <g>
    <!-- Horizontals -->
    <rect x="0" y="80" width="1000" height="1" fill="url(#fade-h)" />
    <rect x="0" y="275" width="1000" height="1" fill="url(#fade-h)" />
    <rect x="0" y="470" width="1000" height="1" fill="url(#fade-h)" />
    <!-- Verticals -->
    <rect x="180" y="0" width="1" height="550" fill="url(#fade-v)" />
    <rect x="500" y="0" width="1" height="550" fill="url(#fade-v)" />
    <rect x="820" y="0" width="1" height="550" fill="url(#fade-v)" />
  </g>

  <!-- The Nexus (Central Core) -->
  <g transform="translate(500, 275)">
    <!-- Core dot -->
    <circle cx="0" cy="0" r="2" fill="#fff" filter="url(#glow)" class="animate-pulse"/>
    
    <!-- Complex rotating rings -->
    <circle cx="0" cy="0" r="30" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1" class="animate-rotate data-line" />
    <circle cx="0" cy="0" r="50" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1" class="animate-rotate-rev" stroke-dasharray="1 4" />
    <circle cx="0" cy="0" r="90" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1" class="animate-rotate data-line-rev" />
    <circle cx="0" cy="0" r="140" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1" />
    <circle cx="0" cy="0" r="220" fill="none" stroke="rgba(255,255,255,0.02)" stroke-width="1" />
    
    <!-- Satellite Nodes -->
    <g class="animate-rotate">
      <circle cx="140" cy="0" r="3" fill="#fff" filter="url(#glow)"/>
      <line x1="130" y1="0" x2="150" y2="0" stroke="rgba(255,255,255,0.5)" stroke-width="1" />
    </g>
    <g class="animate-rotate-rev">
      <circle cx="0" cy="-220" r="2" fill="#fff" />
      <line x1="0" y1="-210" x2="0" y2="-230" stroke="rgba(255,255,255,0.3)" stroke-width="1" />
    </g>
  </g>

  <!-- Connecting Data Lines (Cards to Nexus) -->
  <!-- Paths -->
  <path id="path1" d="M 370 120 C 420 120, 450 275, 500 275" fill="none" class="border-subtle data-line" stroke-width="1" />
  <path id="path2" d="M 630 150 C 580 150, 550 275, 500 275" fill="none" class="border-subtle data-line-rev" stroke-width="1" />
  <path id="path3" d="M 390 410 C 440 410, 460 275, 500 275" fill="none" class="border-subtle data-line" stroke-width="1" />
  <path id="path4" d="M 630 390 C 580 390, 550 275, 500 275" fill="none" class="border-subtle data-line-rev" stroke-width="1" />

  <!-- Beams shooting along paths -->
  <path d="M 370 120 C 420 120, 450 275, 500 275" fill="none" stroke="#fff" stroke-width="1.5" class="beam" filter="url(#glow)" />
  <path d="M 630 150 C 580 150, 550 275, 500 275" fill="none" stroke="#fff" stroke-width="1.5" class="beam" style="animation-delay: 1s;" filter="url(#glow)" />
  <path d="M 390 410 C 440 410, 460 275, 500 275" fill="none" stroke="#fff" stroke-width="1.5" class="beam" style="animation-delay: 2s;" filter="url(#glow)" />
  <path d="M 630 390 C 580 390, 550 275, 500 275" fill="none" stroke="#fff" stroke-width="1.5" class="beam" style="animation-delay: 1.5s;" filter="url(#glow)" />

  <!-- SHADCN STYLE GLASS CARDS -->

  <!-- TOP LEFT: Identity -->
  <g transform="translate(50, 50)" class="animate-float-1">
    <rect x="0" y="0" width="320" height="140" rx="12" class="card-bg border-subtle" stroke-width="1" />
    <!-- Top accent line -->
    <rect x="0" y="0" width="320" height="12" rx="12" fill="none" class="border-glow" stroke-width="1" clip-path="inset(0 0 128px 0)" />
    
    <text x="28" y="44" class="text-primary font-sans" font-size="18" font-weight="600" letter-spacing="-0.5">STATICPAYLOAD</text>
    <circle cx="175" cy="38" r="4" fill="#fff" filter="url(#glow)" class="animate-pulse" />
    
    <text x="28" y="74" class="text-muted font-sans" font-size="14">I like nothing.</text>
    <text x="28" y="94" class="text-muted font-sans" font-size="14">I patch the kernel.</text>
    
    <line x1="28" y1="110" x2="292" y2="110" class="border-subtle" />
    <text x="28" y="128" class="text-subtle font-mono" font-size="10" font-weight="700">STATE: DETERMINISTIC</text>
  </g>

  <!-- BOTTOM LEFT: Nyzhi -->
  <g transform="translate(50, 340)" class="animate-float-2">
    <rect x="0" y="0" width="340" height="160" rx="12" class="card-bg border-subtle" stroke-width="1" />
    
    <!-- Code block aesthetic header -->
    <rect x="0" y="0" width="340" height="36" rx="12" fill="rgba(255,255,255,0.02)" clip-path="inset(0 0 124px 0)" />
    <circle cx="20" cy="18" r="4" fill="rgba(255,255,255,0.1)" />
    <circle cx="34" cy="18" r="4" fill="rgba(255,255,255,0.1)" />
    <circle cx="48" cy="18" r="4" fill="rgba(255,255,255,0.1)" />
    <text x="68" y="22" class="text-primary font-mono" font-size="12" font-weight="500">nyzhi_core.rs</text>
    
    <line x1="0" y1="36" x2="340" y2="36" class="border-subtle" />
    
    <text x="24" y="68" class="text-primary font-sans" font-size="16" font-weight="600" letter-spacing="-0.5">Nyzhi</text>
    <text x="24" y="92" class="text-muted font-sans" font-size="13">Single binary AI coding agent.</text>
    <text x="24" y="112" class="text-muted font-sans" font-size="13">50+ tools, 6 rust crates, zero deps.</text>
    
    <g transform="translate(24, 134)">
      <rect x="0" y="0" width="292" height="4" rx="2" fill="rgba(255,255,255,0.05)" />
      <rect x="0" y="0" width="0" height="4" rx="2" fill="#fff" class="progress-bar" filter="url(#glow)" />
    </g>
  </g>

  <!-- TOP RIGHT: Google / DeepMind -->
  <g transform="translate(630, 60)" class="animate-float-3">
    <rect x="0" y="0" width="320" height="190" rx="12" class="card-bg border-subtle" stroke-width="1" />
    <rect x="0" y="0" width="320" height="12" rx="12" fill="none" class="border-glow" stroke-width="1" clip-path="inset(0 0 178px 0)" />
    
    <text x="28" y="44" class="text-primary font-sans" font-size="15" font-weight="600" letter-spacing="-0.5">UPSTREAM // GOOGLE &amp; DEEPMIND</text>
    <line x1="28" y1="60" x2="292" y2="60" class="border-subtle" />
    
    <!-- Item 1 -->
    <circle cx="32" cy="84" r="3" fill="rgba(255,255,255,0.2)" />
    <text x="46" y="88" class="text-primary font-mono" font-size="13">jax_privacy</text>
    <text x="160" y="88" class="text-muted font-sans" font-size="13">DP-SGD core</text>

    <!-- Item 2 -->
    <circle cx="32" cy="114" r="3" fill="rgba(255,255,255,0.2)" />
    <text x="46" y="118" class="text-primary font-mono" font-size="13">optax</text>
    <text x="160" y="118" class="text-muted font-sans" font-size="13">gradient optimization</text>

    <!-- Item 3 -->
    <circle cx="32" cy="144" r="3" fill="rgba(255,255,255,0.2)" />
    <text x="46" y="148" class="text-primary font-mono" font-size="13">gemma</text>
    <text x="160" y="148" class="text-muted font-sans" font-size="13">open-weight LLM</text>

    <!-- Item 4 -->
    <circle cx="32" cy="174" r="3" fill="rgba(255,255,255,0.2)" />
    <text x="46" y="178" class="text-primary font-mono" font-size="13">timesfm</text>
    <text x="160" y="178" class="text-muted font-sans" font-size="13">time-series FM</text>
  </g>

  <!-- BOTTOM RIGHT: Kernel & Infra -->
  <g transform="translate(630, 290)" class="animate-float-4">
    <rect x="0" y="0" width="320" height="200" rx="12" class="card-bg border-subtle" stroke-width="1" />
    
    <text x="28" y="44" class="text-primary font-sans" font-size="15" font-weight="600" letter-spacing="-0.5">UPSTREAM // FOUNDATION</text>
    <line x1="28" y1="60" x2="292" y2="60" class="border-subtle" />

    <!-- Item 1 -->
    <text x="28" y="88" class="text-primary font-mono" font-size="13">linux</text>
    <text x="140" y="88" class="text-muted font-sans" font-size="13">kernel patches</text>

    <!-- Item 2 -->
    <text x="28" y="118" class="text-primary font-mono" font-size="13">brax &amp; etils</text>
    <text x="140" y="118" class="text-muted font-sans" font-size="13">research infra</text>

    <!-- Item 3 -->
    <text x="28" y="148" class="text-primary font-mono" font-size="13">langchain</text>
    <text x="140" y="148" class="text-muted font-sans" font-size="13">core schema</text>

    <!-- Item 4 -->
    <text x="28" y="178" class="text-primary font-mono" font-size="13">cloudflare</text>
    <text x="140" y="178" class="text-muted font-sans" font-size="13">workers-sdk</text>
  </g>

  <!-- Center Footer ID -->
  <text x="500" y="530" class="text-subtle font-mono" font-size="10" text-anchor="middle" letter-spacing="4">CAPABILITY_SAFE // EVENT_SOURCED // VERIFIABLE_REPLAY</text>

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
