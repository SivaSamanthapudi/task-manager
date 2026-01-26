import { Expense } from './expense.model';

export interface Group {
  title: string;
  description: string;
  currency: string;
  createdOn: Date;
  createdBy: { firstName: string; lastName: string };
  members?: string[];
  expenses?: Expense[];
}
