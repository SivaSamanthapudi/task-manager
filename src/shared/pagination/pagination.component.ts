import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
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
  imports: [CommonModule, FormsModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent implements OnChanges, AfterViewInit {
  @Input() totalItems: number = 0;
  @Input() itemsPerPage: number = 5;
  @Input() currentPage: number = 1;
  pageNumbers: number[] = [];
  itemsPerPageArray = [5,10,20];
  totalPages: number;
  
  @Output() pageCountChange = new EventEmitter<number>();
  @Output() pageChange = new EventEmitter<number>();

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (
      (changes['totalItems'] && this.totalItems > 0) ||
      (changes['itemsPerPage'] && this.itemsPerPage > 0)
    ) {
      this.buildPageNumbers();
    }
  }

  ngAfterViewInit(): void {
    this.buildPageNumbers();
  }

  buildPageNumbers() {
    const total = Number(this.totalItems);
    const perPage = Number(this.itemsPerPage);

    if (perPage <= 0) return;

    this.totalPages = Math.ceil(total / perPage);

    this.pageNumbers =
      this.totalPages > 0 ? Array.from({ length: this.totalPages }, (_, i) => i + 1) : [];
  }

  onSelectPage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.pageChange.emit(this.currentPage);
  }

  onNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.pageChange.emit(this.currentPage);
    }
  }

  onPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.pageChange.emit(this.currentPage);
    }
  }

  onPageCountChange(event: any){
    this.itemsPerPage = event;
    this.pageCountChange.emit(event);
    this.buildPageNumbers();
  }
}
