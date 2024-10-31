import {
  AfterViewInit,
  Component,
  computed,
  effect,
  ElementRef,
  HostListener,
  signal,
  untracked,
  ViewChild,
} from '@angular/core';
import { GameBoardService, Point } from './game-board.service';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.scss',
})
export class GameBoardComponent implements AfterViewInit {
  private static readonly gap = 1;

  @ViewChild('canvas')
  private readonly canvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private cellSize = signal(0);
  private knightSize = computed(() => Math.max(0, this.cellSize() - 8));
  private knightImage = new Image();

  constructor(private board: GameBoardService) {
    this.knightImage.src = '/images/knight.png';
    this.knightImage.onload = () => this.drawKnight();

    board.initialize({ width: 5, height: 5 });

    effect(() => {
      this.board.knight();
      untracked(() => this.draw());
    });
  }

  get gameState() {
    return this.board.gameState();
  }

  ngAfterViewInit(): void {
    const canvasEl = this.canvas.nativeElement;
    this.ctx = canvasEl.getContext('2d')!;
    this.updateCanvasSize();
    this.draw();
  }

  @HostListener('window:resize')
  onResize() {
    this.updateCanvasSize();
    this.draw();
  }

  onCanvasClick(event: MouseEvent) {
    const canvasEl = this.canvas.nativeElement;
    const rect = canvasEl.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const col = Math.floor(x / this.cellSize());
    const row = Math.floor(y / this.cellSize());
    const position = [col - 1, row - 1] as Point;

    if (this.board.canMoveTo(position)) {
      this.board.move(position);
    }
  }

  private updateCanvasSize() {
    const gridSize = this.board.size;
    const canvasEl = this.canvas.nativeElement;
    const rect = canvasEl.getBoundingClientRect();
    const size = Math.min(rect.width, rect.height);

    canvasEl.width = size;
    canvasEl.height = size;
    this.cellSize.set(size / (gridSize[0] + 2));

    // Antialiasing
    this.ctx.translate(0.5, 0.5);
  }

  private draw() {
    const canvasEl = this.canvas.nativeElement;
    this.ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);

    this.drawGrid();
    this.drawKnight();
    this.drawVisited();
    this.drawOverlay();
  }

  private drawGrid() {
    const size = this.board.size;
    const gap = GameBoardComponent.gap;

    for (let i = 0; i < size[1]; i++) {
      for (let j = 0; j < size[0]; j++) {
        const color = (i + j) % 2 === 0 ? '#B8B285' : '#39793B';
        this.ctx.fillStyle = color;
        this.ctx.fillRect(
          this.cellSize() + j * this.cellSize() + gap,
          this.cellSize() + i * this.cellSize() + gap,
          this.cellSize() - gap * 2,
          this.cellSize() - gap * 2,
        );
      }
    }
  }

  private drawKnight() {
    const gridPosition = this.board.knight();
    const offset =
      this.cellSize() + this.cellSize() / 2 - this.knightSize() / 2;
    const position = [
      gridPosition[0] * this.cellSize() + offset,
      gridPosition[1] * this.cellSize() + offset,
    ];

    this.ctx.drawImage(
      this.knightImage,
      position[0],
      position[1],
      this.knightSize(),
      this.knightSize(),
    );
  }

  private drawOverlay() {
    const possiblePositions = this.board.possibleTurns();

    for (const position of possiblePositions) {
      this.ctx.strokeStyle = '#007FFF';
      this.ctx.lineWidth = 3;

      this.ctx.strokeRect(
        this.cellSize() + position[0] * this.cellSize(),
        this.cellSize() + position[1] * this.cellSize(),
        this.cellSize(),
        this.cellSize(),
      );
    }
  }

  private drawVisited() {
    const visited = this.board.visited;

    this.ctx.font = `bold ${this.cellSize() / 2}pt Geologica`;
    this.ctx.fillStyle = 'white';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';

    let counter = 1;
    for (const gridPosition of visited) {
      const position = [
        gridPosition[0] * this.cellSize() + this.cellSize() / 2,
        gridPosition[1] * this.cellSize() + this.cellSize() / 2,
      ];

      this.ctx.fillText(
        counter.toString(),
        this.cellSize() + position[0],
        this.cellSize() + position[1],
      );
      counter++;
    }
  }
}
