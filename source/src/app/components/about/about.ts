import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'sj-about',
  imports: [
    CommonModule,
  ],
  templateUrl: './about.html',
  styleUrl: './about.less'
})
export class About {
  isDarkMode: boolean = true;

  constructor(private themeService: ThemeService) {
    this.themeService.getTheme().pipe(
      takeUntilDestroyed()
    ).subscribe(theme => {
      this.isDarkMode = theme === 'dark';
    });
  }
}
