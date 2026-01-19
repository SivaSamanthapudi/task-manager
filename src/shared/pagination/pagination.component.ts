import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  @Input() totalItems: number;
  @Input() itemsPerPage: number = 5;
  @Input() currentPage: number;
  pageNumbers: number[] = [];
  totalPages: number;

  @Output() pageChange = new EventEmitter<number>();

  constructor() {}

  ngOnInit() {
    this.buildPageNumbers();
    this.currentPage = 1;
  }

  onSelectPage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.pageChange.emit(this.currentPage);
  }

  buildPageNumbers() {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.pageNumbers= Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  onNextPage() {
    this.currentPage += 1;
    this.pageChange.emit(this.currentPage);
  }

  onPreviousPage() {
    this.currentPage -= 1;
    this.pageChange.emit(this.currentPage);
  }

}
