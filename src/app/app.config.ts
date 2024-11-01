import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideAnimations } from '@angular/platform-browser/animations';
import {
  Dice1,
  Dice2,
  Dice3,
  House,
  LUCIDE_ICONS,
  LucideIconProvider,
  RefreshCcw,
  Undo,
} from 'lucide-angular';
import { routes } from './app.routes';

const usedIcons = { RefreshCcw, House, Dice1, Dice2, Dice3, Undo };

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider(usedIcons),
    },
  ],
};
