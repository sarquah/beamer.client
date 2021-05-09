import { IUser } from './IUser';

export interface ITimeregistration {
    id?: number;
	date?: Date;
	ownerId?: number;
	owner?: IUser
	taskId?: number;
	tenantId?: string;
	hours?: number;
}