import { DecimalPipe } from '@angular/common';
import { Component, effect, OnDestroy } from '@angular/core';
import { GameBoardService } from '../game-board.service';

@Component({
  selector: 'app-game-timer',
  standalone: true,
  imports: [DecimalPipe],
  providers: [DecimalPipe],
  templateUrl: './game-timer.component.html',
})
export class GameTimerComponent implements OnDestroy {
  minutes = 0;
  seconds = 0;

  private timerInterval: ReturnType<typeof setInterval> | null = null;

  constructor(
    private board: GameBoardService,
    private decimalPipe: DecimalPipe,
  ) {
    effect(() => {
      const state = this.board.gameState();
      if (state === 'initial') this.reset();
      if (state === 'running') this.start();
      else this.stop();
    });
  }

  get value() {
    return `${this.minutes}:${this.decimalPipe.transform(this.seconds, '2.0')}`;
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

  private reset() {
    this.minutes = 0;
    this.seconds = 0;
  }
}
