import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'sj-skills',
  imports: [
    CommonModule,
  ],
  templateUrl: './skills.html',
  styleUrl: './skills.less'
})
export class Skills {
  isDarkMode: boolean = true;

  constructor(private themeService: ThemeService) {
    this.themeService.getTheme().pipe(
      takeUntilDestroyed()
    ).subscribe(theme => {
      this.isDarkMode = theme === 'dark';
    });
  }
}
