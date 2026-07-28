import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card h-100 shadow-sm">
      <div *ngIf="title" class="card-header bg-transparent border-bottom-0">
        <h6 class="mb-0">{{ title }}</h6>
      </div>
      <div class="card-body d-flex flex-column">
        <ng-content></ng-content>
      </div>
      <div *ngIf="footer" class="card-footer bg-transparent border-top-0">
        <ng-content select="[card-footer]"></ng-content>
      </div>
    </div>
  `,
})
export class CardComponent {
  @Input() title?: string;
  @Input() footer?: string;
}
