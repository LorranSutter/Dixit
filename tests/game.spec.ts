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

        expect(newGame.stage).toBe(Stages.storyteller);
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

        expect(newGame.stage).toBe(Stages.sentence);
        expect(newGame.storyteller.id).toBe(players[0].id);
    });

    it('03 - Should not be able to set the storyteller before starting the game', () => {
        const players = Array.from({ length: 4 }, () => generatePlayer());
        const newGame = new Game(players, generateCardList(84), 30);

        expect(() => newGame.setStoryteller(players[0].id)).toThrow('Ooopps... It is not time to set a storyteller');
    });

    it('04 - Should be able to set a sentence', () => {
        const players = Array.from({ length: 4 }, () => generatePlayer());
        const newGame = new Game(players, generateCardList(84), 30);
        const sentence = 'My sentence';

        newGame.init();
        newGame.setStoryteller(players[0].id);
        newGame.setSentence(sentence);

        expect(newGame.sentence).toContain(sentence);
        expect(newGame.stage).toBe(Stages.roundCards);
    });

    it('05 - Should not be able to set a sentence before choosing a storyteller', () => {
        const players = Array.from({ length: 4 }, () => generatePlayer());
        const newGame = new Game(players, generateCardList(84), 30);

        newGame.init();
        expect(() => newGame.setSentence('My sentence')).toThrow('Ooopps... It is not time to set a sentence');
    });

    it('06 - Should not be able to set a sentence of size 0', () => {
        const players = Array.from({ length: 4 }, () => generatePlayer());
        const newGame = new Game(players, generateCardList(84), 30);

        newGame.init();
        newGame.setStoryteller(players[0].id);
        expect(() => newGame.setSentence('')).toThrow('Ooopps... Sentence must be greater than 0');
    });

    it('07 - Should be able to choose player round card', () => {
        const players = Array.from({ length: 4 }, () => generatePlayer());
        const newGame = new Game(players, generateCardList(84), 30);

        newGame.init();
        newGame.setStoryteller(players[0].id);
        newGame.setSentence('My sentence');

        const playerTest = newGame.playersNotStoryteller[0];
        const playerRoundCard = Array.from(playerTest.hand)[0];

        newGame.chooseRoundCard(players[1].id, playerRoundCard);

        expect(newGame.roundCards).toContain(playerRoundCard);
        expect(playerTest.roundCard).toBe(playerRoundCard);
        expect(playerTest.hand).not.toContain(playerRoundCard);
    });

    it('08 - Should not be able to choose player round card before setting a sentence', () => {
        const players = Array.from({ length: 4 }, () => generatePlayer());
        const newGame = new Game(players, generateCardList(84), 30);

        newGame.init();
        newGame.setStoryteller(players[0].id);

        const playerTest = newGame.playersNotStoryteller[0];
        const playerRoundCard = Array.from(playerTest.hand)[0];

        expect(() => newGame.chooseRoundCard(players[1].id, playerRoundCard)).toThrow('Ooopps... It is not time to chose round card');
    });

    it('09 - Should not be able to change the player round card', () => {
        const players = Array.from({ length: 4 }, () => generatePlayer());
        const newGame = new Game(players, generateCardList(84), 30);

        newGame.init();
        newGame.setStoryteller(players[0].id);
        newGame.setSentence('My sentence');

        const playerTest = newGame.playersNotStoryteller[0];
        const playerRoundCard0 = Array.from(playerTest.hand)[0];
        const playerRoundCard1 = Array.from(playerTest.hand)[1];

        newGame.chooseRoundCard(players[1].id, playerRoundCard0);

        expect(() => newGame.chooseRoundCard(players[1].id, playerRoundCard1)).toThrow('Ooopps... Cannot change players chosen card');
    });

    it('10 - Should not be able to choose round card with an invalid player', () => {
        const players = Array.from({ length: 4 }, () => generatePlayer());
        const newGame = new Game(players, generateCardList(84), 30);

        newGame.init();
        newGame.setStoryteller(players[0].id);
        newGame.setSentence('My sentence');

        expect(() => newGame.chooseRoundCard('123', '123')).toThrow('Ooopps... Invalid player');
    });

    it('11 - Should not be able to choose an invalid round card', () => {
        const players = Array.from({ length: 4 }, () => generatePlayer());
        const newGame = new Game(players, generateCardList(84), 30);

        newGame.init();
        newGame.setStoryteller(players[0].id);
        newGame.setSentence('My sentence');

        expect(() => newGame.chooseRoundCard(players[1].id, '123')).toThrow('Ooopps... Invalid chosen card');
    });

    it('12 - Should be able to change state after all players chose round card', () => {
        const players = Array.from({ length: 4 }, () => generatePlayer());
        const newGame = new Game(players, generateCardList(84), 30);

        newGame.init();
        newGame.setStoryteller(players[0].id);
        newGame.setSentence('My sentence');

        newGame.playersNotStoryteller.forEach(player => {
            const playerRoundCard = Array.from(player.hand)[0];
            newGame.chooseRoundCard(player.id, playerRoundCard);
        });

        expect(newGame.stage).toBe(Stages.roundVote);
    });

    it('13 - Should be able to change state after all players chose round card', () => {
        const players = Array.from({ length: 4 }, () => generatePlayer());
        const newGame = new Game(players, generateCardList(84), 30);

        newGame.init();
        newGame.setStoryteller(players[0].id);
        newGame.setSentence('My sentence');

        newGame.playersNotStoryteller.forEach(player => {
            const playerRoundCard = Array.from(player.hand)[0];
            newGame.chooseRoundCard(player.id, playerRoundCard);
        });

        expect(() => newGame.chooseRoundCard(players[1].id, '123')).toThrow('Ooopps... It is not time to chose round card');
    });

    it.todo('round card exceptions');
    it.todo('vote');
    it.todo('vote exception');

});