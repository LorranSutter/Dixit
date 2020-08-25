import Game from '../src/models/Game';
import { Stages } from '../src/models/enums/Stages';
import { generatePlayer, generateCardList } from './randomGenerator';

describe('B.01 - Game setup', function () {

    it('01 - Should be able to create a new game', () => {
        const players = Array.from({ length: 3 }, () => generatePlayer())
        const newGame = new Game(players, generateCardList(10));

        expect(newGame instanceof Game);
    });

    it('02 - Should be able to access properties', () => {
        const players = Array.from({ length: 3 }, () => generatePlayer())
        const cardList = generateCardList(84);
        const maxScore = 30;
        const newGame = new Game(players, cardList, maxScore);

        expect(newGame.stage).toBe(Stages.unset);
        expect(newGame.players).toBe(players);
        expect(newGame.library).toStrictEqual(Array.from(cardList));
        expect(newGame.maxScore).toBe(maxScore);
    });

    it('03 - Should not be able to create a new game with less than 3 players', () => {
        const players = Array.from({ length: 2 }, () => generatePlayer())

        expect(() => new Game(players, generateCardList(10))).toThrow('Ooopps... Minimum number of players is 3');
    });

    it('04 - Should not be able to create a new game with more than 6 players', () => {
        const players = Array.from({ length: 7 }, () => generatePlayer())

        expect(() => new Game(players, generateCardList(10))).toThrow('Ooopps... Maximum number of players is 6');
    });

    it('05 - Should not be able to create a new game with number of cards less than 0', () => {
        const players = Array.from({ length: 3 }, () => generatePlayer());

        expect(() => new Game(players, generateCardList(0), 30)).toThrow('Ooopps... Number of cards must be greater than 0');
    });

    it('06 - Should not be able to create a new game with number of cards greater than 84', () => {
        const players = Array.from({ length: 3 }, () => generatePlayer());

        expect(() => new Game(players, generateCardList(85), 30)).toThrow('Ooopps... Number of cards must be up to 84');
    });

    it('07 - Should not be able to create a new game with score less than 0', () => {
        const players = Array.from({ length: 3 }, () => generatePlayer());

        expect(() => new Game(players, generateCardList(10), -1)).toThrow('Ooopps... Max score must be greater than 0');
    });

    it('08 - Should not be able to create a new game with score greater than 100', () => {
        const players = Array.from({ length: 3 }, () => generatePlayer());

        expect(() => new Game(players, generateCardList(10), 101)).toThrow('Ooopps... Max score must be up to 100');
    });

});

describe('B.02 - Game play', function () {

    it('01 - Should be able init the game', () => {
        const numOfCards = 84;
        const numOfCardsHand = 6;
        const numOfPlayers = 4;
        const players = Array.from({ length: numOfPlayers }, () => generatePlayer());
        const newGame = new Game(players, generateCardList(numOfCards), 30);

        newGame.init();

        expect(newGame.stage).toBe(Stages.init);
        expect(newGame.library.length).toBe(numOfCards - numOfCardsHand * numOfPlayers);
        newGame.players.forEach(player => {
            expect(player.hand.size).toBe(numOfCardsHand);
        });
    });

    it('02 - Should be able to set the storyteller', () => {
        const players = Array.from({ length: 4 }, () => generatePlayer());
        const newGame = new Game(players, generateCardList(84), 30);

        newGame.init();
        newGame.setStoryteller(players[0].id);

        expect(newGame.stage).toBe(Stages.storytellerChosen);
        expect(newGame.storyteller.id).toBe(players[0].id);
    });

    it('03 - Should not be able to set the storyteller before starting the game', () => {
        const players = Array.from({ length: 4 }, () => generatePlayer());
        const newGame = new Game(players, generateCardList(84), 30);

        expect(() => newGame.setStoryteller(players[0].id)).toThrow('Ooopps... Game not started');
    });

    it('04 - Should be able to set a sentence', () => {
        const players = Array.from({ length: 4 }, () => generatePlayer());
        const newGame = new Game(players, generateCardList(84), 30);
        const sentence = 'My sentence';

        newGame.init();
        newGame.setStoryteller(players[0].id);
        newGame.setSentence(sentence);

        expect(newGame.sentence).toContain(sentence);
        expect(newGame.stage).toBe(Stages.sentence);
    });

    it('05 - Should not be able to set a sentence before choosing a storyteller', () => {
        const players = Array.from({ length: 4 }, () => generatePlayer());
        const newGame = new Game(players, generateCardList(84), 30);

        newGame.init();
        expect(() => newGame.setSentence('My sentence')).toThrow('Ooopps... No storyteller chosen');
    });

    it('06 - Should not be able to set a sentence of size 0', () => {
        const players = Array.from({ length: 4 }, () => generatePlayer());
        const newGame = new Game(players, generateCardList(84), 30);

        newGame.init();
        newGame.setStoryteller(players[0].id);
        expect(() => newGame.setSentence('')).toThrow('Ooopps... Sentence must be greater than 0');
    });

    it.todo('round card');
    it.todo('round card exceptions');
    it.todo('vote');
    it.todo('vote exception');

});