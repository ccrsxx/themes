import { executeSassJob } from './utils.ts';

function main(): void {
  console.log('Starting theme build process...');

  executeSassJob('build');

  console.log('Theme build process completed.');
}

main();
