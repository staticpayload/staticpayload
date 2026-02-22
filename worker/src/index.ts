interface GitHubUser {
	login: string;
	name: string | null;
	public_repos: number;
	created_at: string;
}

interface GitHubRepo {
	language: string | null;
	stargazers_count: number;
	fork: boolean;
}

const THEMES = {
	dark: {
		bg: '#0d1117',
		border: '#30363d',
		title: '#e6edf3',
		text: '#7d8590',
		bar_bg: '#161b22',
		line: '#21262d',
		cursor: '#3fb950',
	},
	light: {
		bg: '#ffffff',
		border: '#d0d7de',
		title: '#1f2328',
		text: '#656d76',
		bar_bg: '#eaeef2',
		line: '#d0d7de',
		cursor: '#1a7f37',
	},
} as const;

type Theme = keyof typeof THEMES;

const LANG_COLORS: Record<string, string> = {
	Rust: '#dea584',
	TypeScript: '#3178c6',
	JavaScript: '#f1e05a',
	Python: '#3572A5',
	Go: '#00ADD8',
	'C++': '#f34b7d',
	C: '#555555',
	Ruby: '#701516',
	'Jupyter Notebook': '#DA5B0B',
	Shell: '#89e051',
};

const FONT = `'SFMono-Regular',Consolas,'Liberation Mono',Menlo,monospace`;

function esc(s: string): string {
	return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function svg(user: GitHubUser, repos: GitHubRepo[], theme: Theme): string {
	const c = THEMES[theme];

	const langMap: Record<string, number> = {};
	for (const r of repos) {
		if (r.language && !r.fork) {
			langMap[r.language] = (langMap[r.language] || 0) + 1;
		}
	}
	const langs = Object.entries(langMap)
		.sort(([, a], [, b]) => b - a)
		.slice(0, 7);

	const W = 495;
	const pad = 28;
	const dotR = 5;
	const dotTextGap = 10;
	const itemGap = 24;
	const charW = 7.6;

	const login = esc(user.login);
	const cursorX = pad + (user.login.length + 7) * 8.4;

	const gradStops = langs
		.map(([lang], i) => {
			const color = LANG_COLORS[lang] || c.cursor;
			const pct = langs.length > 1 ? (i / (langs.length - 1)) * 100 : 50;
			return `<stop offset="${pct}%" stop-color="${color}"/>`;
		})
		.join('');

	const row1 = langs.slice(0, 4);
	const row2 = langs.slice(4);

	let dots = '';
	let x = pad;
	for (const [lang] of row1) {
		const color = LANG_COLORS[lang] || c.cursor;
		const label = lang.toLowerCase();
		dots += `<circle cx="${x + dotR}" cy="${54}" r="${dotR}" fill="${color}"/>`;
		dots += `<text x="${x + dotR * 2 + dotTextGap}" y="58" fill="${c.text}" font-family="${FONT}" font-size="13">${esc(label)}</text>`;
		x += dotR * 2 + dotTextGap + label.length * charW + itemGap;
	}
	x = pad;
	for (const [lang] of row2) {
		const color = LANG_COLORS[lang] || c.cursor;
		const label = lang.toLowerCase();
		dots += `<circle cx="${x + dotR}" cy="${78}" r="${dotR}" fill="${color}"/>`;
		dots += `<text x="${x + dotR * 2 + dotTextGap}" y="82" fill="${c.text}" font-family="${FONT}" font-size="13">${esc(label)}</text>`;
		x += dotR * 2 + dotTextGap + label.length * charW + itemGap;
	}

	const H = row2.length > 0 ? 102 : 78;

	return `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
<style>@keyframes b{0%,100%{opacity:1}50%{opacity:0}}.c{animation:b 1.2s step-end infinite}</style>
<defs>
<linearGradient id="g" x1="0" y1="0" x2="1" y2="0">${gradStops}</linearGradient>
<clipPath id="r"><rect width="${W}" height="${H}" rx="6"/></clipPath>
</defs>
<g clip-path="url(#r)">
<rect width="${W}" height="${H}" fill="${c.bg}"/>
<rect width="${W}" height="3" fill="url(#g)"/>
</g>
<rect width="${W}" height="${H}" rx="6" fill="none" stroke="${c.border}" stroke-width="1"/>
<text x="${pad}" y="28" fill="${c.title}" font-family="${FONT}" font-size="14" font-weight="600">${login}@github</text>
<rect class="c" x="${cursorX}" y="16" width="8" height="15" rx="1" fill="${c.cursor}"/>
<line x1="${pad}" y1="40" x2="${W - pad}" y2="40" stroke="${c.line}"/>
${dots}
</svg>`;
}

interface Env {
	GITHUB_TOKEN?: string;
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url);

		if (url.pathname !== '/' && url.pathname !== '/card.svg') {
			return new Response('not found', { status: 404 });
		}

		const user = url.searchParams.get('user') || 'staticpayload';
		const theme: Theme = url.searchParams.get('theme') === 'light' ? 'light' : 'dark';

		const headers: Record<string, string> = {
			'User-Agent': 'sp-stats',
			Accept: 'application/vnd.github+json',
		};
		if (env.GITHUB_TOKEN) {
			headers['Authorization'] = `Bearer ${env.GITHUB_TOKEN}`;
		}

		const gh = (path: string) =>
			fetch(`https://api.github.com${path}`, { headers });

		const [uRes, rRes] = await Promise.all([gh(`/users/${user}`), gh(`/users/${user}/repos?per_page=100`)]);

		if (!uRes.ok) {
			return new Response(`github api: ${uRes.status}`, { status: 502 });
		}

		const ud = (await uRes.json()) as GitHubUser;
		const rd = (await rRes.json()) as GitHubRepo[];

		return new Response(svg(ud, rd, theme), {
			headers: {
				'Content-Type': 'image/svg+xml',
				'Cache-Control': 'public, max-age=3600, s-maxage=3600',
				'Access-Control-Allow-Origin': '*',
			},
		});
	},
};
