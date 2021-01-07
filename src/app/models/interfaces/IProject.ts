import { EStatus } from '../enums/EStatus';
import { ITask } from './ITask';

export interface IProject {
  id?: number;
  name?: string;
  ownerId?: number;
  description?: string;
  status?: EStatus;
  startDate?: Date;
  endDate?: Date;
  tasks?: ITask[];
}
