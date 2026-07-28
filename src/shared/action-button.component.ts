import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-action-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [ngClass]="buttonClass"
      type="button"
      class="btn"
      [attr.aria-label]="ariaLabel"
    >
      <ng-content></ng-content>
    </button>
  `,
})
export class ActionButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'outline' | 'danger' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() ariaLabel: string | null = null;

  get buttonClass() {
    const sizeCls = this.size === 'sm' ? ' btn-sm' : '';
    switch (this.variant) {
      case 'secondary':
        return 'btn-secondary' + sizeCls;
      case 'outline':
        return 'btn-outline-primary' + sizeCls;
      case 'danger':
        return 'btn-outline-danger' + sizeCls;
      default:
        return 'btn-primary' + sizeCls;
    }
  }
}
