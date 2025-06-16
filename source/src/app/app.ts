import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { About } from './components/about/about';
import { Education } from './components/education/education';
import { Follow } from './components/follow/follow';
import { Footer } from './components/footer/footer';
import { Header } from './components/header/header.component';
import { Home } from './components/home/home';
import { Skills } from './components/skills/skills';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'sj-root',
  imports: [
    Header,
    Home,
    About,
    Education,
    Skills,
    Follow,
    Footer
  ],
  templateUrl: './app.html',
  styleUrl: './app.less'
})
export class App implements OnInit, OnDestroy {
  subscription = new Subscription();

  constructor(
    private themeService: ThemeService
  ) { }

  ngOnInit(): void {
     this.subscription.add(this.themeService.getTheme().subscribe(theme => {
       document.body.classList.toggle('dark', theme === 'dark');
     }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
