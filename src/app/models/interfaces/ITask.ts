import { EStatus } from '../enums/EStatus';
import { ITimeregistration } from './ITimeregistration';

export interface ITask {
  id?: number;
  name?: string;
  ownerId?: number;
  ownerName?: string;
  description?: string;
  status?: EStatus;
  startDate?: Date;
  endDate?: Date;
  projectId?: number;
  tenantId?: string;
  timeRegistrations?: ITimeregistration[];
}
