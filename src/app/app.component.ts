import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameBoardComponent } from './game-board/game-board.component';
import { GameTimerComponent } from './game-board/game-timer/game-timer.component';
import { TurnLabelComponent } from './game-board/turn-label/turn-label.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    GameBoardComponent,
    TurnLabelComponent,
    GameTimerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
