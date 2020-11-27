import { ITask } from './ITask';

export interface IProject {
  id?: number;
  name?: string;
  ownerId?: number;
  description?: string;
  status?: string;
  startDate?: Date;
  endDate?: Date;
  tasks?: ITask[];
}
