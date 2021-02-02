import { EStatus } from '../models/enums/EStatus';
import { EnumToArrayPipe } from './enum-to-array.pipe';
import { EnumPipe } from './enum.pipe';

describe('EnumPipe', () => {
    const sut = new EnumPipe();
    const status = EStatus[1];

    it('transforms EStatus[1] to "Not started"', () => {
        const transformedStatus = 'Not started';
        expect(sut.transform(status)).toEqual(transformedStatus);
    });
});