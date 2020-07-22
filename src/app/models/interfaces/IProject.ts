import { ITask } from './ITask';

export interface IProject {
  id?: number;
  name?: string;
  ownerName?: string;
  description?: string;
  status?: string;
  startDate?: Date;
  endDate?: Date;
  tasks?: ITask[];
}
