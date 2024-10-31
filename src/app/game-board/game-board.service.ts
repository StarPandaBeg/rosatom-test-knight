import { computed, Injectable, signal } from '@angular/core';

export interface GameBoardServiceConfig {
  width: number;
  height: number;
}
export type Point = [number, number];
export type GameState = 'running' | 'win' | 'gameover';

/** The direction is specified as two numbers:
 * the first defines the cardinal direction (0 for North, 1 for East, 2 for South, 3 for West),
 * and the second, either -1 or 1, sets the "L" shape orientation for the knight's move.
 */
type Direction = [number, number];

@Injectable({
  providedIn: 'root',
})
export class GameBoardService {
  private state = signal<GameState>('running');
  private boardSize: Point;
  private knightPosition = signal<Point>([0, 0]);
  private possiblePositions = computed(() => this.calculatePossiblePositions());
  private visitedCells: Point[] = [];

  constructor() {
    this.boardSize = [5, 5];
  }

  get size() {
    return this.boardSize;
  }

  get knight() {
    return this.knightPosition.asReadonly();
  }

  get possibleTurns() {
    return this.possiblePositions;
  }

  get visited() {
    return this.visitedCells;
  }

  get gameState() {
    return this.state.asReadonly();
  }

  positionToString(position: Point) {
    const letterOffset = this.boardSize[0] - position[0] - 1;
    const letter = String.fromCharCode(65 + letterOffset);
    return `${letter}${position[1] + 1}`;
  }

  initialize(config: GameBoardServiceConfig) {
    this.boardSize = [config.width, config.height];
    this.knightPosition.set([0, 0]);
    this.visitedCells = [];
    this.updateState();
  }

  canMoveTo(point: Point) {
    const positions = this.possiblePositions();
    return positions.some((value) => {
      return value[0] === point[0] && value[1] === point[1];
    });
  }

  isVisited(point: Point) {
    return this.visited.some((value) => {
      return value[0] === point[0] && value[1] === point[1];
    });
  }

  move(point: Point) {
    if (!this.canMoveTo(point)) throw Error('Invalid position');
    this.visitedCells.push(this.knightPosition());
    this.knightPosition.set(point);
    this.updateState();
  }

  private calculatePossiblePositions() {
    const positions = [];
    for (let i = 0; i < 4; i++) {
      for (let j = -1; j < 2; j += 2) {
        const newPosition = this.getNextPositionIn([i, j]);
        if (this.canVisit(newPosition)) {
          positions.push(newPosition);
        }
      }
    }
    return positions;
  }

  private getNextPositionIn(direction: Direction): Point {
    const current = this.knightPosition();

    const isHorizontal = direction[0] % 2 === 0;
    const lineDirection = direction[0] == 0 || direction[0] == 3 ? -1 : 1;
    const lineOffset = 2 * lineDirection;

    const targetLine = [
      current[0] + lineOffset * +isHorizontal,
      current[1] + lineOffset * +!isHorizontal,
    ];
    return [
      targetLine[0] + direction[1] * +!isHorizontal,
      targetLine[1] + direction[1] * +isHorizontal,
    ];
  }

  private canVisit(position: Point) {
    if (position[0] < 0 || position[1] < 0) return false;
    if (position[0] >= this.boardSize[0] || position[1] >= this.boardSize[1])
      return false;
    return !this.isVisited(position);
  }

  private updateState() {
    const totalCells = this.boardSize[0] * this.boardSize[1];
    if (this.possiblePositions().length != 0) {
      this.state.set('running');
      return;
    }
    if (totalCells - this.visited.length - 1 === 0) {
      this.state.set('win');
      return;
    }
    this.state.set('gameover');
  }
}
