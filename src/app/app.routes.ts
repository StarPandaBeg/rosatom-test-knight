import { Routes } from '@angular/router';
import { PageGameComponent } from './pages/game/game.component';
import { PageHomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: 'game', component: PageGameComponent },
  { path: '', component: PageHomeComponent },
];
