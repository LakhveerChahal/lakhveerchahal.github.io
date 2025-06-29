import { Component, output } from '@angular/core';
import { IsActiveMatchOptions, RouterModule } from '@angular/router';

@Component({
  selector: 'sj-sidenav',
  imports: [
    RouterModule,
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

  emitToggleSideNav(): void {
    this.toggleSideNavEvent.emit();
  }
}
