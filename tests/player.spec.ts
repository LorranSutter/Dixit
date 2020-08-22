import Player from '../src/models/Player';

const playerData = {
    name: 'Player name',
    hand: new Set([1, 2, 3]),
    score: 0
}

describe('A - Player', function () {

    it('01 - Should be able to create a new player', () => {
        const newPlayer = new Player(playerData);

        expect(newPlayer instanceof Player);
    });

    it('02 - Should be able to access properties', () => {
        const newPlayer = new Player(playerData);

        expect(newPlayer.name).toBe(playerData.name);
        expect(newPlayer.hand).toBe(playerData.hand);
        expect(newPlayer.score).toBe(playerData.score);
    });

    it('03 - Should be able to remove cards', () => {
        const newPlayer = new Player(playerData);
        newPlayer.removeCard(1);

        expect(newPlayer.hand).not.toContain(1);
    });

    it('04 - Should be able to include cards', () => {
        const newPlayer = new Player(playerData);
        newPlayer.includeCard(4);

        expect(newPlayer.hand).toContain(4);
    });

    it('05 - Should be able to earn score', () => {
        const newPlayer = new Player(playerData);
        newPlayer.earnScore(10);

        expect(newPlayer.score).toBe(10);
    });
});