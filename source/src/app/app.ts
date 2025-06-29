import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, viewChild } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { createAnimatable, utils } from 'animejs';
import { Subscription } from 'rxjs';
import { About } from './components/about/about';
import { Education } from './components/education/education';
import { Follow } from './components/follow/follow';
import { Footer } from './components/footer/footer';
import { Header } from './components/header/header.component';
import { Home } from './components/home/home';
import { Sidenav } from './components/sidenav/sidenav';
import { Skills } from './components/skills/skills';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'sj-root',
  imports: [
    Header,
    Sidenav,
    Home,
    About,
    Education,
    Skills,
    Follow,
    Footer,
    MatSidenavModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.less'
})
export class App implements OnInit, AfterViewInit, OnDestroy {
  cat = viewChild<ElementRef<HTMLImageElement>>('cat');
  catContainer = viewChild<ElementRef<HTMLDivElement>>('catContainer');
  footerContainer = viewChild<ElementRef<HTMLDivElement>>('footerContainer');

  catResting = false;

  subscription = new Subscription();

  constructor(
    private themeService: ThemeService
  ) { }

  ngOnInit(): void {
     this.subscription.add(this.themeService.getTheme().subscribe(theme => {
       document.body.classList.toggle('dark', theme === 'dark');
     }));
  }

  ngAfterViewInit(): void {
    const cat = this.cat();
    const catContainer = this.footerContainer();

    if (!cat || !catContainer) {
      console.error('Cat or Cat Container element not found');
      return;
    }

    this.animateCat(cat.nativeElement, catContainer.nativeElement);
  }

  animateCat(cat: HTMLImageElement, catContainer: HTMLDivElement): void {
    const animatableCat = createAnimatable(cat, {
      x: 3000,
      y: 3000,
      ease: 'out(3)',
    });
    let bounds = catContainer.getBoundingClientRect();

    const refreshBounds = () => bounds = catContainer.getBoundingClientRect();

    const onMouseMove = (e: MouseEvent) => {
      let x = 0;
      let y = 0;
      if (this.catResting) {
        const { width, height } = bounds;
        const hw = width - 48;
        const hh = height - 24;
        const top = catContainer.offsetTop;

        x = utils.clamp(e.clientX, 0, hw);
        y = utils.clamp(e.pageY, top, top + hh);

      } else {
        const { left, top } = {
          left: window.scrollX,
          top: window.scrollY
        };

        x = utils.clamp(e.clientX, 0, bounds.width - 48);
        y = e.clientY + top;
      }
      animatableCat['x'](x);
      animatableCat['y'](y);
    }

    window.addEventListener('mousemove', onMouseMove);
    catContainer.addEventListener('scroll', refreshBounds);
  }

  toggleResting(): void {
    this.catResting = !this.catResting;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
