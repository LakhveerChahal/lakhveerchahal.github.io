import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, viewChild, viewChildren } from '@angular/core';
import { animate, JSAnimation, stagger, utils } from 'animejs';

@Component({
  selector: 'sj-heart',
  imports: [
    CommonModule
  ],
  templateUrl: './heart.html',
  styleUrl: './heart.less'
})
export class Heart implements AfterViewInit{
  heartCell = viewChild<ElementRef<HTMLDivElement>>('heartCell');
  heartCircles = viewChildren<ElementRef>('heartCircle');
  animation: JSAnimation | null = null;
  static readonly NORMAL_HEART_BEAT = 150;
  static readonly RACING_HEART_BEAT = 50;

  ngAfterViewInit(): void {
    this.animateHeart(Heart.NORMAL_HEART_BEAT);

    const heartCell = this.heartCell();
    if (!heartCell) {
      console.warn('Heart cell not found');
      return;
    }

    heartCell.nativeElement.addEventListener('mouseenter', () => this.animateHeart(Heart.RACING_HEART_BEAT));
    heartCell.nativeElement.addEventListener('mouseleave', () => this.animateHeart(Heart.NORMAL_HEART_BEAT));
  }

  animateHeart(heartBeat: number): void {
    const heartCircles = this.heartCircles();
    if (!heartCircles) {
      console.warn('Heart circles not found');
      return;
    }
    if (this.animation) {
      this.animation.complete();
    }

    const hearts = utils.$(heartCircles.map((h) => h.nativeElement));

    this.animation = animate(hearts, {
      scale: [
        { to: [0.1, 1.25] },
        { to: 0.1 }
      ],
      boxShadow: [
        { to: '0 0 1rem 0 magenta' },
        { to: '0 0 0rem 0 magenta' }
      ],
      delay: stagger(heartBeat, {
        grid: [13, 13],
        from: 'center'
      }),
      loop: true,
    });

  }
}
