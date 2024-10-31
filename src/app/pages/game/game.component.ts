import { Component } from '@angular/core';
import { GameBoardComponent } from './game-board/game-board.component';
import { GameTimerComponent } from './game-board/game-timer/game-timer.component';
import { TurnLabelComponent } from './game-board/turn-label/turn-label.component';

@Component({
  selector: 'app-page-game',
  standalone: true,
  imports: [GameBoardComponent, TurnLabelComponent, GameTimerComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class PageGameComponent {}
