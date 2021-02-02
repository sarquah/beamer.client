import { EStatus } from '../models/enums/EStatus';
import { EnumPipe } from './enum.pipe';

describe('EnumPipe', () => {
    const sut = new EnumPipe();
    const status = EStatus[1];

    it('transforms EStatus[1] to "Not started"', () => {
        const transformedStatus = 'Not started';
        expect(sut.transform(status)).toEqual(transformedStatus);
    });

    it('returns empty string', () => {
        expect(sut.transform('')).toEqual('');
    });
});