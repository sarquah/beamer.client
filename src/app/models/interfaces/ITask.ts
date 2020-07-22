import { IProject } from './IProject';

export interface ITask {
  id?: number;
  name?: string;
  ownerName?: string;
  description?: string;
  status?: string;
  startDate?: Date;
  endDate?: Date;
  project?: IProject;
}
