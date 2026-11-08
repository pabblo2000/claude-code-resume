import {CommandDefinition} from './types';
export const commands: CommandDefinition[] = [
  {
    "name": "/help",
    "aliases": [
      "/h",
      "/?"
    ],
    "description": "List available commands",
    "category": "content"
  },
  {
    "name": "/about",
    "aliases": [
      "/summary",
      "/whoami"
    ],
    "description": "Profile & current role",
    "category": "content"
  },
  {
    "name": "/experience",
    "aliases": [
      "/work",
      "/exp"
    ],
    "description": "Work experience",
    "category": "content"
  },
  {
    "name": "/skills",
    "aliases": [
      "/tech",
      "/stack"
    ],
    "description": "Technical skills",
    "category": "content"
  },
  {
    "name": "/projects",
    "aliases": [
      "/code"
    ],
    "description": "Projects & repositories",
    "category": "content"
  },
  {
    "name": "/education",
    "aliases": [
      "/edu"
    ],
    "description": "Education",
    "category": "content"
  },
  {
    "name": "/certs",
    "aliases": [
      "/certifications"
    ],
    "description": "Certifications & training",
    "category": "content"
  },
  {
    "name": "/contact",
    "aliases": [
      "/links",
      "/socials"
    ],
    "description": "Email & professional links",
    "category": "content"
  },
  {
    "name": "/languages",
    "aliases": [
      "/lang"
    ],
    "description": "Languages",
    "category": "content"
  },
  {
    "name": "/resume",
    "aliases": [
      "/pdf",
      "/download"
    ],
    "description": "Download original resume",
    "category": "content"
  },
  {
    "name": "/clear",
    "aliases": [],
    "description": "Clear the terminal",
    "category": "system"
  }
];

export function findCommand(input: string): CommandDefinition | null {
  const normalized = input.toLowerCase().trim();
  for (const cmd of commands) {
    if (cmd.name === normalized || cmd.aliases.includes(normalized)) {
      return cmd;
    }
  }
  return null;
}

export function fuzzyMatch(input: string): string | null {
  const normalized = input.toLowerCase().replace('/', '');
  if (!normalized) return null;

  let bestMatch: string | null = null;
  let bestScore = Infinity;

  for (const cmd of commands) {
    const cmdName = cmd.name.replace('/', '');
    // Simple: check if the input is a prefix or close enough
    if (cmdName.startsWith(normalized)) {
      const score = cmdName.length - normalized.length;
      if (score < bestScore) {
        bestScore = score;
        bestMatch = cmd.name;
      }
    }
    // Levenshtein-like: check edit distance for short inputs
    const dist = levenshtein(normalized, cmdName);
    if (dist <= 2 && dist < bestScore) {
      bestScore = dist;
      bestMatch = cmd.name;
    }
  }

  return bestMatch;
}

function levenshtein(a: string, b: string): number {
  const m = a.length, n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
    }
  }
  return dp[m][n];
}

export function filterCommands(prefix: string): CommandDefinition[] {
  const normalized = prefix.toLowerCase();
  return commands.filter(
    (cmd) =>
      cmd.name.startsWith(normalized) ||
      cmd.aliases.some((a) => a.startsWith(normalized)),
  );
}
