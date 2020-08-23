import Game from '../src/models/Game';
import { generatePlayer, generateCardList } from './randomGenerator';

describe('B - Game', function () {

    it('01 - Should be able to create a new game', () => {
        const players = Array.from({ length: 3 }, () => generatePlayer())
        const newGame = new Game(players, generateCardList(10));

        expect(newGame instanceof Game);
    });

    it('02 - Should be not be able to create a new game with less than 3 players', () => {
        const players = Array.from({ length: 2 }, () => generatePlayer())

        expect(() => new Game(players, generateCardList(10))).toThrow('Ooopps... Minimum number of players is 3');
    });

    it('03 - Should be not be able to create a new game with more than 6 players', () => {
        const players = Array.from({ length: 7 }, () => generatePlayer())

        expect(() => new Game(players, generateCardList(10))).toThrow('Ooopps... Maximum number of players is 6');
    });

    it('04 - Should be not be able to create a new game with number of cards less than 0', () => {
        const players = Array.from({ length: 3 }, () => generatePlayer());

        expect(() => new Game(players, generateCardList(0), 30)).toThrow('Ooopps... Number of cards must be greater than 0');
    });

    it('05 - Should be not be able to create a new game with number of cards greater than 84', () => {
        const players = Array.from({ length: 3 }, () => generatePlayer());

        expect(() => new Game(players, generateCardList(85), 30)).toThrow('Ooopps... Number of cards must be up to 84');
    });

    it('06 - Should be not be able to create a new game with score less than 0', () => {
        const players = Array.from({ length: 3 }, () => generatePlayer());

        expect(() => new Game(players, generateCardList(10), -1)).toThrow('Ooopps... Max score must be greater than 0');
    });

    it('07 - Should be not be able to create a new game with score greater than 100', () => {
        const players = Array.from({ length: 3 }, () => generatePlayer());

        expect(() => new Game(players, generateCardList(10), 101)).toThrow('Ooopps... Max score must be up to 100');
    });

});