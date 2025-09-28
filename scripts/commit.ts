import { execSync } from 'child_process';
import { executeSassJob, OUT_ROOT } from './utils.ts';

function main(): void {
  console.log('Starting theme build process...');

  executeSassJob('build');

  console.log('Theme build process completed.');

  execSyncWithOutput(`npx prettier --write . ${OUT_ROOT}`);

  const skipCommit = process.argv.includes('--skip-commit');

  if (skipCommit) {
    console.log(
      'Skipping commit due to --no-commit flag. Please commit manually.'
    );

    return;
  }

  try {
    execSyncWithOutput(`git diff --quiet --exit-code ${OUT_ROOT}`);

    console.log('No changes to commit.');

    return;
  } catch (err) {
    console.log('Changes detected. Committing...');
  }

  execSyncWithOutput(`git add ${OUT_ROOT}`);

  console.log('Committing changes...');

  execSyncWithOutput('git commit -m "chore: build themes"');

  console.log('Successfully committed changes.');
}

function execSyncWithOutput(command: string): void {
  execSync(command, { stdio: 'inherit' });
}

main();
