import { CommonModule } from '@angular/common';
import { Component, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { IsActiveMatchOptions, RouterModule } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { Cutename } from '../cutename/cutename';

@Component({
  selector: 'sj-header',
  imports: [
    RouterModule,
    CommonModule,
    MatSlideToggleModule,
    Cutename,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.less'
})
export class Header {
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

  toggleSideNav(): void {
    this.toggleSideNavEvent.emit();
  }
}
