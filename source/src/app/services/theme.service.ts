import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private theme$ = new BehaviorSubject<'light' | 'dark'>('dark');

  getTheme(): BehaviorSubject<'light' | 'dark'> {
    return this.theme$;
  }

  setTheme(theme: 'light' | 'dark'): void {
    this.theme$.next(theme);
  }
}
