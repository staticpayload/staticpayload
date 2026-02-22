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

	const W = 380;
	const pad = 24;
	const cw = W - pad * 2;

	const login = esc(user.login);
	const cursorX = pad + (user.login.length + 7) * 8.1;

	const sep = `<tspan fill="${c.text}"> · </tspan>`;
	const row1 = langs.slice(0, 4);
	const row2 = langs.slice(4);

	const colorSpan = ([lang]: [string, number]) => {
		const color = LANG_COLORS[lang] || c.cursor;
		return `<tspan fill="${color}">${esc(lang.toLowerCase())}</tspan>`;
	};

	const line1 = row1.map(colorSpan).join(sep);
	const line2 = row2.length ? row2.map(colorSpan).join(sep) : '';

	const H = line2 ? 86 : 68;

	return `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
<style>@keyframes b{0%,100%{opacity:1}50%{opacity:0}}.c{animation:b 1.2s step-end infinite}</style>
<rect width="${W}" height="${H}" rx="6" fill="${c.bg}" stroke="${c.border}" stroke-width="1"/>
<text x="${pad}" y="26" fill="${c.title}" font-family="${FONT}" font-size="13.5" font-weight="600">${login}@github</text>
<rect class="c" x="${cursorX}" y="14" width="7" height="14" rx="1" fill="${c.cursor}"/>
<line x1="${pad}" y1="38" x2="${cw + pad}" y2="38" stroke="${c.line}"/>
<text x="${pad}" y="56" font-family="${FONT}" font-size="12.5">${line1}</text>
${line2 ? `<text x="${pad}" y="74" font-family="${FONT}" font-size="12.5">${line2}</text>` : ''}
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
