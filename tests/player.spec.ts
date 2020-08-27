import Player from '../src/models/Player';
import { generatePlayer, generateCardList } from './randomGenerator';

const playerData = {
    id: '123',
    name: 'Player name',
    hand: generateCardList(3),
    score: 0,
    isStoryteller: false,
    vote: '',
    roundCard: ''
}

describe('A - Player', function () {

    it('01 - Should be able to create a new player', () => {
        const newPlayer = generatePlayer(playerData);

        expect(newPlayer instanceof Player);
    });

    it('02 - Should be able to access properties', () => {
        const newPlayer = generatePlayer(playerData);

        expect(newPlayer.id).toBe(playerData.id);
        expect(newPlayer.name).toBe(playerData.name);
        expect(newPlayer.hand).toBe(playerData.hand);
        expect(newPlayer.score).toBe(playerData.score);
        expect(newPlayer.isStoryteller).toBe(playerData.isStoryteller);
        expect(newPlayer.vote).toBe(playerData.vote);
        expect(newPlayer.roundCard).toBe(playerData.roundCard);
    });

    it('03 - Should be able to remove cards', () => {
        const newPlayer = generatePlayer(playerData);
        newPlayer.removeCard('0');

        expect(newPlayer.hand).not.toContain('0');
    });

    it('04 - Should be able to include cards', () => {
        const newPlayer = generatePlayer(playerData);
        newPlayer.includeCard('3');

        expect(newPlayer.hand).toContain('3');
    });

    it('05 - Should be able to earn score', () => {
        const newPlayer = generatePlayer(playerData);
        newPlayer.earnScore(10);

        expect(newPlayer.score).toBe(10);
    });

    it('06 - Should be able to set player as storyteller', () => {
        const newPlayer = generatePlayer(playerData);
        newPlayer.isStoryteller = true;

        expect(newPlayer.isStoryteller).toBe(true);
    });

    it('07 - Should be able to set a vote', () => {
        const newPlayer = generatePlayer(playerData);
        newPlayer.vote = '1';

        expect(newPlayer.vote).toBe('1');
    });

    it('08 - Should be able to set a round card', () => {
        const newPlayer = generatePlayer(playerData);
        newPlayer.roundCard = '1';

        expect(newPlayer.roundCard).toBe('1');
    });
});