import { EStatus } from '../enums/EStatus';
import { IProject } from './IProject';

export interface ITask {
  id?: number;
  name?: string;
  ownerName?: string;
  description?: string;
  status?: EStatus;
  startDate?: Date;
  endDate?: Date;
  project?: IProject;
}
