import Game from '../src/models/Game';
import { generatePlayer } from './randomGenerator';

describe('B - Game', function () {

    it('01 - Should be able to create a new game', () => {
        const players = Array.from({ length: 3 }, generatePlayer)
        const newGame = new Game(players);

        expect(newGame instanceof Game);
    });

    it('02 - Should be not be able to create a new game with less than 3 players', () => {
        const players = Array.from({ length: 2 }, generatePlayer)

        expect(() => new Game(players)).toThrow('Ooopps... Minimum number of players is 3');
    });

    it('03 - Should be not be able to create a new game with more than 6 players', () => {
        const players = Array.from({ length: 7 }, generatePlayer)

        expect(() => new Game(players)).toThrow('Ooopps... Maximum number of players is 6');
    });

});