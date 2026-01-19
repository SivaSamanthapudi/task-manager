export interface Task {
  id?: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedOn: Date | null;
  dueBy: Date | null | string;
  creator?: string;

  // creator?: {email:string, userId: string};
}
