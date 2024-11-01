import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonDirective } from '../../shared/directives/app-button.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonDirective, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class PageHomeComponent {}
