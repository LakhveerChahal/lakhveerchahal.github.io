import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { IsActiveMatchOptions, RouterModule } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { Cutename } from '../cutename/cutename';

@Component({
  selector: 'sj-header',
  imports: [
    RouterModule,
    CommonModule,
    MatSlideToggleModule,
    Cutename
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.less'
})
export class Header {

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
}
