import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[appModalTitle]',
  standalone: true,
})
export class ModalTitleDirective {
  @HostBinding('class') class = 'modal__title';
}
