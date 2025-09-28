import { executeSassJob } from './utils.ts';

export function watchThemes(): void {
  console.log('Starting theme watch process...');

  executeSassJob('watch');

  console.log('Theme theme watch completed.');
}
