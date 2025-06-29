import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'sj-education',
  imports: [
    CommonModule,
  ],
  templateUrl: './education.html',
  styleUrl: './education.less'
})
export class Education {
  isDarkMode: boolean = true;

  constructor(private themeService: ThemeService) {
    this.themeService.getTheme().pipe(
      takeUntilDestroyed()
    ).subscribe(theme => {
      this.isDarkMode = theme === 'dark';
    });
  }
}
