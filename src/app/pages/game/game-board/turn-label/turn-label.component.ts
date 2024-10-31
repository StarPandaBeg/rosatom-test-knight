import { Component, effect } from '@angular/core';
import { GameBoardService } from '../game-board.service';

@Component({
  selector: 'app-turn-label',
  standalone: true,
  imports: [],
  templateUrl: './turn-label.component.html',
})
export class TurnLabelComponent {
  turn = 0;

  constructor(private board: GameBoardService) {
    effect(() => {
      this.board.knight();
      this.turn = this.board.turns;
    });
  }
}
