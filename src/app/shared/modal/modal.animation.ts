import {
  animateChild,
  group,
  query,
  transition,
  trigger,
  useAnimation,
} from '@angular/animations';
import {
  fadeInAnimation,
  fadeOutAnimation,
  zoomInAnimation,
  zoomOutAnimation,
} from '../animations';

export const overlayAnimation = trigger('overlayAnimation', [
  transition(':enter', [
    group([
      useAnimation(fadeInAnimation, {
        params: { opacity: 0, time: '0.3s' },
      }),
      query('@contentAnimation', [animateChild()], { optional: true }),
    ]),
  ]),
  transition(':leave', [
    group([
      useAnimation(fadeOutAnimation, {
        params: { opacity: 0, time: '0.3s' },
      }),
      query('@contentAnimation', [animateChild()], { optional: true }),
    ]),
  ]),
]);

export const contentAnimation = trigger('contentAnimation', [
  transition(':enter', [
    useAnimation(zoomInAnimation, {
      params: { scale: 0.4, time: '0.3s' },
    }),
  ]),
  transition(':leave', [
    useAnimation(zoomOutAnimation, {
      params: { scale: 0.4, time: '0.3s' },
    }),
  ]),
]);
