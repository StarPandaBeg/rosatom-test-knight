import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, effect, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { ButtonDirective } from '../../shared/directives/app-button.directive';
import { GameBoardComponent } from './game-board/game-board.component';
import { GameBoardService, GameState } from './game-board/game-board.service';
import { GameTimerComponent } from './game-board/game-timer/game-timer.component';
import { TurnLabelComponent } from './game-board/turn-label/turn-label.component';
import { VisitedLabelComponent } from './game-board/visited-label/visited-label.component';
import { GameEndModalComponent } from './game-end-modal/game-end-modal.component';

@Component({
  selector: 'app-page-game',
  standalone: true,
  imports: [
    GameBoardComponent,
    TurnLabelComponent,
    GameTimerComponent,
    GameEndModalComponent,
    VisitedLabelComponent,
    LucideAngularModule,
    ButtonDirective,
  ],
  animations: [
    trigger('restartAnimation', [
      state('default', style({ transform: 'rotateZ(360deg) scale(1)' })),
      state('flipped', style({ transform: 'rotateZ(360deg) scale(1)' })),
      transition('default => flipped', [
        style({ transform: 'rotateZ(0)' }),
        animate('.6s ease-in-out'),
      ]),
      transition('flipped => default', [
        style({ transform: 'rotateZ(0)' }),
        animate('.6s ease-in-out'),
      ]),
    ]),
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class PageGameComponent implements OnInit {
  @ViewChild(GameTimerComponent)
  private timer!: GameTimerComponent;
  @ViewChild(GameEndModalComponent)
  private modal!: GameEndModalComponent;

  private isModalOpened = false;
  private time = '00:00';
  private flip = false;

  constructor(
    private board: GameBoardService,
    private router: Router,
  ) {
    effect(() => {
      const state = this.board.gameState();
      this.onStateUpdate(state);
    });
  }

  ngOnInit(): void {
    const deskSize = window.history.state.level as number | undefined;
    if (deskSize === undefined) {
      this.router.navigateByUrl('/level-select', { replaceUrl: true });
      return;
    }
    this.board.initialize({ width: deskSize, height: deskSize });
  }

  get isWinner() {
    const state = this.board.gameState();
    return state === 'win';
  }

  get isEndModalOpened() {
    return this.isModalOpened;
  }

  get timeTotal() {
    return this.time;
  }

  get turnsTotal() {
    return this.board.turns;
  }

  get flipOnRestart() {
    return this.flip;
  }

  get boardSize() {
    return `${this.board.size[0]}x${this.board.size[1]}`;
  }

  get canUndo() {
    return this.board.canUndo;
  }

  home() {
    this.modal.close(true);
    this.router.navigateByUrl('/');
  }

  restart() {
    this.flip = !this.flip;
    this.board.reset();
  }

  undo() {
    this.board.undo();
  }

  private onStateUpdate(state: GameState) {
    if (state !== 'gameover' && state !== 'win') {
      this.isModalOpened = false;
      return;
    }
    this.time = this.timer.value;
    this.isModalOpened = true;
  }
}
