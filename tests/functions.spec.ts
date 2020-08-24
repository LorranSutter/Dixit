import shuffleArray from '../src/functions/shuffleArray';
import { generateCardList } from './randomGenerator';

describe('C - Functions', function () {

    it('01 - Should be able shuffle an array', () => {
        const arrayLength = 10;
        const array = Array.from(generateCardList(arrayLength));
        const arrayOriginal = [...array];

        shuffleArray(array);

        expect(array.length).toBe(arrayLength);
        expect(arrayOriginal).not.toMatchObject(array);
    });
});