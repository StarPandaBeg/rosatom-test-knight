import { DecimalPipe } from '@angular/common';
import { Component, effect, OnDestroy } from '@angular/core';
import { GameBoardService } from '../game-board.service';

@Component({
  selector: 'app-game-timer',
  standalone: true,
  imports: [DecimalPipe],
  templateUrl: './game-timer.component.html',
})
export class GameTimerComponent implements OnDestroy {
  minutes = 0;
  seconds = 0;

  private timerInterval: ReturnType<typeof setInterval> | null = null;

  constructor(private board: GameBoardService) {
    effect(() => {
      const state = this.board.gameState();
      if (state === 'running') this.start();
      else this.stop();
    });
  }

  ngOnDestroy(): void {
    this.stop();
  }

  private start() {
    if (this.timerInterval) return;
    this.timerInterval = setInterval(() => {
      this.seconds++;
      if (this.seconds >= 60) {
        this.seconds = 0;
        this.minutes++;
      }
    }, 1000);
  }

  private stop() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }
}
