import { Status } from './statuses';
import { Priority } from './priorety';

export type TaskType = {
  id: number
  name: string,
  description: string,
  company: string,
  priority: Priority,
  startDate: Date,
  dueDate: Date,
  owner: string,
  status: Status
}
