import { EStatus } from '../models/enums/EStatus';
import { EnumToArrayPipe } from './enum-to-array.pipe';

describe('EnumToArrayPipe', () => {
    const sut = new EnumToArrayPipe();
    const status = EStatus;

    it('transforms EStatus to indexed values', () => {
        const transformedStatus = [
            { index: 1, name: 'NotStarted' },
            { index: 2, name: 'InProgress' },
            { index: 3, name: 'OnHold' },
            { index: 4, name: 'Completed' },
            { index: 5, name: 'Terminated' }
        ];
        expect(sut.transform(status)).toEqual(transformedStatus);
    });
});