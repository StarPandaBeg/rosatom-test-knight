import { Component, Input, output, ViewChild } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { ButtonDirective } from '../../../shared/directives/app-button.directive';
import { ModalDirectivesModule } from '../../../shared/modal/directives.module';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { GameBoardService } from '../game-board/game-board.service';

@Component({
  selector: 'app-game-end-modal',
  standalone: true,
  imports: [
    ModalComponent,
    ModalDirectivesModule,
    LucideAngularModule,
    ButtonDirective,
  ],
  templateUrl: './game-end-modal.component.html',
  styleUrl: './game-end-modal.component.scss',
})
export class GameEndModalComponent {
  @ViewChild(ModalComponent)
  private modal!: ModalComponent;

  @Input() isWinner = false;
  @Input() isOpen = false;
  @Input() timeTotal = '00:00';
  @Input() turnsTotal = 0;
  home = output();
  reset = output();

  constructor(private board: GameBoardService) {}

  get modalTitle() {
    return `Вы ${this.isWinner ? 'выиграли' : 'проиграли'}!`;
  }

  close(force = false) {
    this.modal.close(force);
  }

  toggleOpen(state: boolean) {
    this.isOpen = state;
  }
}
