import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appStopPropogation]',
  standalone: true,
})
export class StopPropogationDirective {
  @HostListener('click', ['$event'])
  private onClick(event: MouseEvent) {
    event.stopPropagation();
  }
}
