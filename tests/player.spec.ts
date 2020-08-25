import Player from '../src/models/Player';
import { generatePlayer, generateCardList } from './randomGenerator';

const playerData = generatePlayer('Player name', generateCardList(3));

describe('A - Player', function () {

    it('01 - Should be able to create a new player', () => {
        const newPlayer = new Player(playerData);

        expect(newPlayer instanceof Player);
    });

    it('02 - Should be able to access properties', () => {
        const newPlayer = new Player(playerData);

        expect(newPlayer.id).toBe(playerData.id);
        expect(newPlayer.name).toBe(playerData.name);
        expect(newPlayer.hand).toBe(playerData.hand);
        expect(newPlayer.score).toBe(playerData.score);
        expect(newPlayer.isStoryteller).toBe(playerData.isStoryteller);
        expect(newPlayer.vote).toBe(playerData.vote);
        expect(newPlayer.roundCard).toBe(playerData.roundCard);
    });

    it('03 - Should be able to remove cards', () => {
        const newPlayer = new Player(playerData);
        newPlayer.removeCard('0');

        expect(newPlayer.hand).not.toContain('0');
    });

    it('04 - Should be able to include cards', () => {
        const newPlayer = new Player(playerData);
        newPlayer.includeCard('3');

        expect(newPlayer.hand).toContain('3');
    });

    it('05 - Should be able to earn score', () => {
        const newPlayer = new Player(playerData);
        newPlayer.earnScore(10);

        expect(newPlayer.score).toBe(10);
    });
});