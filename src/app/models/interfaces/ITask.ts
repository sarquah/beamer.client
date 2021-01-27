import { EStatus } from '../enums/EStatus';

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
}
