import { CommonModule } from '@angular/common';
import { Component, output } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { IsActiveMatchOptions, RouterModule } from '@angular/router';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'sj-sidenav',
  imports: [
    RouterModule,
    CommonModule,
    MatSlideToggleModule,
  ],
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.less'
})
export class Sidenav {
  toggleSideNavEvent = output<void>();

  linkActiveOptions: IsActiveMatchOptions = {
    matrixParams: 'exact',
    queryParams: 'exact',
    paths: 'exact',
    fragment: 'exact',
  };

  isDarkMode: boolean = true;

  constructor(private themeService: ThemeService) {
  }

  toggleTheme(): void {
    this.themeService.setTheme(this.isDarkMode ? 'light' : 'dark');
    this.isDarkMode = !this.isDarkMode;
  }

  emitToggleSideNav(): void {
    this.toggleSideNavEvent.emit();
  }
}
