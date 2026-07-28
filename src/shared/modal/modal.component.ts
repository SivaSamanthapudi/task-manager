import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  AfterViewInit,
  Output,
  ElementRef,
  ViewChild,
  HostListener,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [CommonModule],
  template: `
    <div class="modal-backdrop fade show"></div>
    <div class="modal fade show d-block" tabindex="-1" role="dialog" aria-modal="true" #modalRoot>
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ title }}</h5>
            <button type="button" class="btn-close" (click)="closeModal()" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <ng-content></ng-content>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [``],
})
export class ModalComponent implements AfterViewInit, OnDestroy {
  @Input() title = '';
  @Output() close = new EventEmitter<void>();
  @ViewChild('modalRoot', { static: true }) modalRoot!: ElementRef<HTMLElement>;

  private lastFocusedElement: HTMLElement | null = null;
  private focusableElements: HTMLElement[] = [];
  private keydownListener = (e: KeyboardEvent) => this.onKeydown(e);

  constructor(private hostRef: ElementRef) {}

  ngAfterViewInit() {
    // store last focused element
    this.lastFocusedElement = document.activeElement as HTMLElement | null;

    // find focusable elements inside modal
    const root = this.modalRoot?.nativeElement as HTMLElement;
    if (root) {
      this.focusableElements = Array.from(
        root.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => el.offsetWidth > 0 || el.offsetHeight > 0);

      // focus first focusable element or modal itself
      const toFocus = this.focusableElements[0] ?? (root.querySelector('.btn-close') as HTMLElement) ?? root;
      toFocus?.focus();

      // attach keydown listener
      root.addEventListener('keydown', this.keydownListener);
    }

    // ensure body has aria-hidden to background (optional)
    document.body.classList.add('modal-open');
  }

  ngOnDestroy() {
    this.removeListenersAndRestore();
  }

  closeModal() {
    this.removeListenersAndRestore();
    this.close.emit();
  }

  private removeListenersAndRestore() {
    try {
      const root = this.modalRoot?.nativeElement as HTMLElement;
      if (root) {
        root.removeEventListener('keydown', this.keydownListener);
      }
    } catch (e) {
      /* ignore */
    }

    document.body.classList.remove('modal-open');
    // restore focus
    if (this.lastFocusedElement) {
      try {
        this.lastFocusedElement.focus();
      } catch (e) {
        // ignore
      }
    }
  }

  private onKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.closeModal();
      return;
    }

    if (event.key !== 'Tab') {
      return;
    }

    if (!this.focusableElements.length) {
      event.preventDefault();
      return;
    }

    const active = document.activeElement as HTMLElement;
    const first = this.focusableElements[0];
    const last = this.focusableElements[this.focusableElements.length - 1];

    if (event.shiftKey) {
      if (active === first || active === this.modalRoot?.nativeElement) {
        event.preventDefault();
        last.focus();
      }
    } else {
      if (active === last) {
        event.preventDefault();
        first.focus();
      }
    }
  }
}
