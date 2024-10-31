import { AnimationEvent } from '@angular/animations';
import {
  Component,
  HostBinding,
  Input,
  OnChanges,
  output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { ModalTitleDirective } from './modal-title.directive';
import { contentAnimation, overlayAnimation } from './modal.animation';

type AnimationState = 'open' | 'close';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [ModalTitleDirective],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  animations: [overlayAnimation, contentAnimation],
  encapsulation: ViewEncapsulation.None,
})
export class ModalComponent implements OnChanges {
  @Input() showModal = false;
  @HostBinding('@overlayAnimation') animationState: AnimationState = 'close';
  toggleModal = output<boolean>();

  modalVisible = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['showModal']) {
      this.modalVisible = this.showModal;
    }
  }

  onAnimationDone(event: AnimationEvent) {
    if (event.toState === 'void') {
      this.toggleModal.emit(false);
    }
  }

  open() {
    this.toggleModal.emit(true);
  }

  close() {
    this.modalVisible = false;
  }
}
