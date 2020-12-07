import { verifyUrl } from '../js/utils';

test('test url', () => {
    expect(verifyUrl('https://www.google.com')).toEqual(false);
});