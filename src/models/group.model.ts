import { Expense } from "./expense.model";

export interface Group {
  title: string;
  description: string;
  currency: string;
  createdOn: Date;
  creator: string;
  members?: string[];
  expenses?: Expense[];
}
