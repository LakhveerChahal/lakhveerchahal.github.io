import { AfterViewInit, Component, ElementRef, viewChild } from '@angular/core';
import { createAnimatable, utils } from 'animejs';

@Component({
  selector: 'sj-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.less'
})
export class Footer implements AfterViewInit {
  cat = viewChild<ElementRef<HTMLImageElement>>('cat');
  catContainer = viewChild<ElementRef<HTMLDivElement>>('catContainer');

  ngAfterViewInit(): void {
    const cat = this.cat();
    const catContainer = this.catContainer();

    if (!cat || !catContainer) {
      console.error('Cat or Cat Container element not found');
      return;
    }

    this.animateCat(cat.nativeElement, catContainer.nativeElement);
  }

  animateCat(cat: HTMLImageElement, catContainer: HTMLDivElement): void {
    const animatableCat = createAnimatable(cat, {
      x: 500,
      y: 500,
      ease: 'out(3)',
    });
    let bounds = catContainer.getBoundingClientRect();

    const refreshBounds = () => bounds = catContainer.getBoundingClientRect();

    const onMouseMove = (e: MouseEvent) => {
      const { width, height, left, top } = bounds;
      const hw = width - 30;
      const hh = (height / 2) - 24;

      const x = utils.clamp(e.clientX - left, -24, hw);
      const y = utils.clamp(e.clientY - top - hh, -hh, hh);
      animatableCat['x'](x);
      animatableCat['y'](y);
    }

    window.addEventListener('mousemove', onMouseMove);
    catContainer.addEventListener('scroll', refreshBounds);
  }
}
