import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

export const __dirname = import.meta.dirname;

export const SASS_CMD = 'npx sass';

export const SRC_ROOT = path.join(__dirname, '..', 'src', 'apps');
export const OUT_ROOT = path.join(__dirname, '..', 'public');

export type ThemeEntry = {
  app: string;
  theme: string;
  entry: string;
};

export function findThemeEntries(): ThemeEntry[] {
  const entries: ThemeEntry[] = [];

  if (!fs.existsSync(SRC_ROOT)) return entries;

  for (const app of fs.readdirSync(SRC_ROOT)) {
    const appPath = path.join(SRC_ROOT, app);

    if (!fs.statSync(appPath).isDirectory()) continue;

    for (const theme of fs.readdirSync(appPath)) {
      const themePath = path.join(appPath, theme);

      if (!fs.statSync(themePath).isDirectory()) continue;

      const entry = path.join(themePath, 'index.scss');

      if (!fs.existsSync(entry)) continue;

      entries.push({ app, theme, entry });
    }
  }

  return entries;
}

export function generateSassDestinations(entries: ThemeEntry[]): string[] {
  const commands: string[] = [];

  for (const { app, theme, entry } of entries) {
    const outDir = path.join(OUT_ROOT, app, theme);

    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

    const outFile = path.join(outDir, 'style.css');

    const command = `${entry}:${outFile}`;

    commands.push(command);
  }

  return commands;
}

type SassJobType = 'build' | 'watch';

export function executeSassJob(jobType: SassJobType): void {
  const entries = findThemeEntries();

  if (!entries.length) {
    console.log('No themes found.');
    return;
  }

  const parsedCommands = generateSassDestinations(entries).join(' ');

  let finalCommands = `${SASS_CMD} ${parsedCommands}`;

  if (jobType === 'watch') {
    finalCommands = `${SASS_CMD} --watch ${parsedCommands}`;
  }

  console.log(`Running (${jobType}):`, finalCommands);

  try {
    execSync(finalCommands);
  } catch (err) {
    console.error(`Error during theme ${jobType}:`, err);
  }
}
