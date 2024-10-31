import { animate, animation, style } from '@angular/animations';

export const fadeInAnimation = animation([
  style({ opacity: '{{ opacity }}' }),
  animate('{{ time }} ease', style({ opacity: 1 })),
]);

export const fadeOutAnimation = animation([
  style({ opacity: 1 }),
  animate('{{ time }} ease', style({ opacity: '{{ opacity }}' })),
]);

export const zoomInAnimation = animation([
  style({ transform: 'scale({{ scale }})' }),
  animate('{{ time }} ease', style({ transform: 'scale(1)' })),
]);

export const zoomOutAnimation = animation([
  style({ transform: 'scale(1)' }),
  animate('{{ time }} ease', style({ transform: 'scale({{ scale }})' })),
]);
