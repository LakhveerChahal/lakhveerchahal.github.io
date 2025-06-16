import { AfterViewInit, Component, ElementRef, viewChild } from '@angular/core';
import { animate, stagger, svg } from 'animejs';

@Component({
  selector: 'sj-cutename',
  imports: [],
  templateUrl: './cutename.html',
  styleUrl: './cutename.less'
})
export class Cutename implements AfterViewInit {
  path = viewChild<ElementRef>('line');

  ngAfterViewInit(): void {
    const path = this.path();
    if (!path) {
      console.error('Path element not found');
      return;
    }

    this.animatePath(path);
  }

  animatePath(path: ElementRef): void {
    animate([svg.createDrawable(path.nativeElement)], {
      draw: ['0 0', '0 1', '1 1'],
      ease: 'inOutQuad',
      duration: 1000,
      delay: stagger(100),
      loop: true,
      alternate: true,
    });
  }
}
