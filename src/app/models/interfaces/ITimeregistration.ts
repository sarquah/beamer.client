import { IUser } from "./IUser";

export interface ITimeregistration {
    id?: number;
	startDate?: Date;
	endDate?: Date;
	ownerId?: number;
	owner?: IUser
	taskId?: number;
	tenantId?: string;
}