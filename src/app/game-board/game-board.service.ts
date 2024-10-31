import { Injectable } from '@angular/core';

export interface GameBoardServiceConfig {
  width: number;
  height: number;
}

@Injectable({
  providedIn: 'root',
})
export class GameBoardService {
  private boardSize: [number, number];
  private knightPosition: [number, number];

  constructor() {
    this.boardSize = [5, 5];
    this.knightPosition = [0, 0];
  }

  initialize(config: GameBoardServiceConfig) {
    this.boardSize = [config.width, config.height];
    this.knightPosition = [0, 0];
  }

  get size() {
    return this.boardSize;
  }

  get knight() {
    return this.knightPosition;
  }
}
