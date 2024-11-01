import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { ButtonDirective } from '../../shared/directives/app-button.directive';

type Difficulty = 'easy' | 'medium' | 'hard';

@Component({
  selector: 'app-level-select',
  standalone: true,
  imports: [RouterLink, ButtonDirective, LucideAngularModule, FormsModule],
  templateUrl: './level-select.component.html',
  styleUrl: './level-select.component.scss',
})
export class PageLevelSelectComponent {
  selectedDifficulty: Difficulty = 'easy';

  readonly deskSizes: Record<Difficulty, number> = {
    easy: 5,
    medium: 10,
    hard: 16,
  };

  constructor(private router: Router) {}

  play() {
    this.router.navigateByUrl('/game', {
      state: { level: this.deskSizes[this.selectedDifficulty] },
    });
  }
}
