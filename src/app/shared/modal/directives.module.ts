import { NgModule } from '@angular/core';
import { ModalTitleDirective } from './modal-title.directive';

@NgModule({
  imports: [ModalTitleDirective],
  exports: [ModalTitleDirective],
})
export class ModalDirectivesModule {}
