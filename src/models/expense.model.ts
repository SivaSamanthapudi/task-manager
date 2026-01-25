export interface Expense {
  title: string;
  description: string;
  type: string;
  amount: number;
  currency: string;
  createdOn: Date;
  creator: string;
}
