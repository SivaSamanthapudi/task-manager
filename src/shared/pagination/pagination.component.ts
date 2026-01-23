import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent implements OnChanges {

  @Input() totalItems: number = 0;
  @Input() itemsPerPage: number = 5;
  @Input() currentPage: number = 1;

  @Output() pageChange = new EventEmitter<number>();
  @Output() pageCountChange = new EventEmitter<number>();

  pageNumbers: number[] = [];
  itemsPerPageArray = [5, 10, 15, 20];
  totalPages: number = 0;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['totalItems'] || changes['itemsPerPage']) {
      this.buildPageNumbers();
    }
  }

  buildPageNumbers() {
    if (this.itemsPerPage <= 0) return;

    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);

    this.pageNumbers = this.totalPages
      ? Array.from({ length: this.totalPages }, (_, i) => i + 1)
      : [];

    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }
  }

  onSelectPage(page: number) {
    if (page === this.currentPage) return;
    this.currentPage = page;
    this.pageChange.emit(page);
  }

  onNextPage() {
    if (this.currentPage < this.totalPages) {
      this.onSelectPage(this.currentPage + 1);
    }
  }

  onPreviousPage() {
    if (this.currentPage > 1) {
      this.onSelectPage(this.currentPage - 1);
    }
  }

   onPageCountChange(size: number) {
    this.itemsPerPage = size;
    this.currentPage = 1;
    this.pageCountChange.emit(size);
    this.buildPageNumbers();
  }
}