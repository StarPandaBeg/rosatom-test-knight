import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';
import { GameBoardService } from './game-board.service';

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
  private cellSize = 0;

  constructor(private board: GameBoardService) {}

  ngAfterViewInit(): void {
    const canvasEl = this.canvas.nativeElement;
    this.ctx = canvasEl.getContext('2d')!;
    this.updateCanvasSize();
    this.drawGrid();
  }

  @HostListener('window:resize')
  onResize() {
    this.updateCanvasSize();
    this.drawGrid();
  }

  private updateCanvasSize() {
    const gridSize = this.board.size;
    const canvasEl = this.canvas.nativeElement;
    const rect = canvasEl.getBoundingClientRect();
    const size = Math.min(rect.width, rect.height);

    canvasEl.width = size;
    canvasEl.height = size;
    this.cellSize = size / gridSize[0];

    // Antialiasing
    this.ctx.translate(0.5, 0.5);
  }

  private drawGrid() {
    const size = this.board.size;
    const gap = GameBoardComponent.gap;

    for (let i = 0; i < size[1]; i++) {
      for (let j = 0; j < size[0]; j++) {
        const color = (i + j) % 2 === 0 ? '#B8B285' : '#39793B';
        this.ctx.fillStyle = color;
        this.ctx.fillRect(
          j * this.cellSize + gap,
          i * this.cellSize + gap,
          this.cellSize - gap * 2,
          this.cellSize - gap * 2,
        );
      }
    }
  }
}
