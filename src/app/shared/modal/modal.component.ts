import { AnimationEvent } from '@angular/animations';
import {
  Component,
  Input,
  OnChanges,
  output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { StopPropogationDirective } from '../directives/stop-propogation.directive';
import { ModalTitleDirective } from './modal-title.directive';
import { contentAnimation, overlayAnimation } from './modal.animation';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [ModalTitleDirective, StopPropogationDirective],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  animations: [overlayAnimation, contentAnimation],
  encapsulation: ViewEncapsulation.None,
})
export class ModalComponent implements OnChanges {
  @Input() showModal = false;
  @Input() closeOnClick = true;

  toggleModal = output<boolean>();

  modalVisible = false;
  skipAnimation = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['showModal']) {
      this.modalVisible = this.showModal;
    }
  }

  onAnimationDone(event: AnimationEvent) {
    if (this.skipAnimation) {
      this.skipAnimation = false;
      return;
    }
    if (event.toState === 'void') {
      this.toggleModal.emit(false);
    }
  }

  open() {
    this.toggleModal.emit(true);
  }

  close(force = false) {
    this.skipAnimation = force;
    if (force) this.toggleModal.emit(false);
  }

  tryClose() {
    if (!this.closeOnClick) return;
    this.close();
  }
}
