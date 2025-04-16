export interface CardCreateInput {
  name: string;
  description: string;
  estimate: number;
  status?: 'WAITING' | 'IN_PROGRESS' | 'COMPLETED';
  user_id: number;
  due_date: Date;
  labels?: string[];
}

export interface CardUpdateInput {
  name?: string;
  description?: string;
  estimate?: number;
  status?: 'WAITING' | 'IN_PROGRESS' | 'COMPLETED';
  due_date?: Date;
  labels?: string[];
}
