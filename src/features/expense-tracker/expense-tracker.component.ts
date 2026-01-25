import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-groups',
  imports: [RouterOutlet],
  templateUrl: './expense-tracker.component.html',
  styleUrl: './expense-tracker.component.scss',
})
export class ExpenseTrackerComponent {
  router = inject(Router);
  private route = inject(ActivatedRoute);
  ngOnInit() {
    this.router.navigate(['groups'], { relativeTo: this.route });
  }
}
