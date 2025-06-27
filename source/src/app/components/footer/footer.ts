import { CommonModule } from '@angular/common';
import { Component, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'sj-footer',
  imports: [MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './footer.html',
  styleUrl: './footer.less'
})
export class Footer {
  catResting = false;
  catRestingEvent = output<boolean>();

  toggleResting(): void {
    this.catResting = !this.catResting;
    this.catRestingEvent.emit(this.catResting);
  }

}
