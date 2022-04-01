export enum Priority {
  Low = "Low",
  Normal = "Normal",
  Hight = "Hight",
}

export enum Status {
  Open = "Open",
  InProgress = "In Progress",
  Deferred = "Deferred",
  Completed = "Completed",
}

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
