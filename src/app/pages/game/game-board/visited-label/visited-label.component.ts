import { Component } from '@angular/core';
import { GameBoardService } from '../game-board.service';

@Component({
  selector: 'app-visited-label',
  standalone: true,
  imports: [],
  templateUrl: './visited-label.component.html',
  styleUrl: './visited-label.component.scss',
})
export class VisitedLabelComponent {
  constructor(private board: GameBoardService) {}

  get visitedAsLabels() {
    return [
      ...this.board.visited
        .slice(-4)
        .map((point) => this.board.positionToString(point)),
      this.board.positionToString(this.board.knight()),
    ];
  }

  get isEllipsis() {
    return this.board.visited.length > 4;
  }
}
