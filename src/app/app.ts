import { Component, signal } from '@angular/core';
import { HeaderComponent } from '../features/header/header';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true,
})
export class App {
  protected readonly title = signal('User');
}
