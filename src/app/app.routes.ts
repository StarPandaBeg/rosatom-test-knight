import { Routes } from '@angular/router';
import { PageGameComponent } from './pages/game/game.component';
import { PageHomeComponent } from './pages/home/home.component';
import { PageLevelSelectComponent } from './pages/level-select/level-select.component';

export const routes: Routes = [
  { path: 'game', component: PageGameComponent },
  { path: 'level-select', component: PageLevelSelectComponent },
  { path: '', component: PageHomeComponent },
];
