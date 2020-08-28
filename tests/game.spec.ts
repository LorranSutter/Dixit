import Game from '../src/models/Game';
import { Stages } from '../src/models/enums/Stages';
import { generatePlayer, generateCardList } from './randomGenerator';
import gameplay from './gameplay';

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

describe('B.02 - Game (stage init)', function () {

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

});

describe('B.03 - Game (stage storyteller)', function () {

    it('01 - Should be able to set the storyteller', () => {
        const players = Array.from({ length: 4 }, () => generatePlayer());
        const newGame = new Game(players, generateCardList(84), 30);

        newGame.init();
        newGame.setStoryteller(players[0].id);

        expect(newGame.stage).toBe(Stages.sentence);
        expect(newGame.storyteller.id).toBe(players[0].id);
    });

    it('02 - Should not be able to set the storyteller if it is not in the storyteller stage', () => {
        const players = Array.from({ length: 4 }, () => generatePlayer());
        const newGame = new Game(players, generateCardList(84), 30);

        expect(() => newGame.setStoryteller(players[0].id)).toThrow('Ooopps... It is not time to set a storyteller');
    });

});

describe('B.04 - Game (stage sentence)', function () {

    it('01 - Should be able to set a sentence', () => {
        const players = Array.from({ length: 4 }, () => generatePlayer());
        const newGame = new Game(players, generateCardList(84), 30);
        const sentence = 'My sentence';
        const storyteller = players[0];

        newGame.init();

        const storytellerCard = Array.from(storyteller.hand)[0];

        newGame.setStoryteller(storyteller.id);
        newGame.setSentenceAndCard(sentence, storytellerCard);

        expect(newGame.sentence).toContain(sentence);
        expect(newGame.stage).toBe(Stages.roundCards);
    });

    it('02 - Should not be able to set a sentence if it is not in the sentence stage', () => {
        const players = Array.from({ length: 4 }, () => generatePlayer());
        const newGame = new Game(players, generateCardList(84), 30);

        newGame.init();

        expect(() => newGame.setSentenceAndCard('My sentence', '123')).toThrow('Ooopps... It is not time to set a sentence');
    });

    it('03 - Should not be able to set a sentence of size 0', () => {
        const players = Array.from({ length: 4 }, () => generatePlayer());
        const newGame = new Game(players, generateCardList(84), 30);

        newGame.init();
        newGame.setStoryteller(players[0].id);

        expect(() => newGame.setSentenceAndCard('', '123')).toThrow('Ooopps... Sentence must be greater than 0');
    });

    it('04 - Should not be able to set a card which storyteller does not have', () => {
        const players = Array.from({ length: 4 }, () => generatePlayer());
        const newGame = new Game(players, generateCardList(84), 30);

        newGame.init();
        newGame.setStoryteller(players[0].id);

        expect(() => newGame.setSentenceAndCard('My sentence', '123')).toThrow('Ooopps... Storyteller does not have chosen card');
    });

});

describe('B.05 - Game (stage roundCard)', function () {

    it('01 - Should be able to choose player round card', () => {
        const newGame = gameplay(Stages.sentence);

        const playerTest = newGame.playersNotStoryteller[0];
        const playerRoundCard = Array.from(playerTest.hand)[0];

        newGame.chooseRoundCard(playerTest.id, playerRoundCard);

        expect(newGame.roundCards).toContain(playerRoundCard);
        expect(playerTest.roundCard).toBe(playerRoundCard);
        expect(playerTest.hand).not.toContain(playerRoundCard);
    });

    it('02 - Should not be able to choose player round card if it is not in the roundCard stage', () => {
        const newGame = gameplay(Stages.storyteller);

        const playerTest = newGame.playersNotStoryteller[0];
        const playerRoundCard = Array.from(playerTest.hand)[0];

        expect(() => newGame.chooseRoundCard(playerTest.id, playerRoundCard)).toThrow('Ooopps... It is not time to choose round card');
    });

    it('03 - Should not be able to change the player round card', () => {
        const newGame = gameplay(Stages.sentence);

        const playerTest = newGame.playersNotStoryteller[0];
        const playerRoundCard0 = Array.from(playerTest.hand)[0];
        const playerRoundCard1 = Array.from(playerTest.hand)[1];

        newGame.chooseRoundCard(playerTest.id, playerRoundCard0);

        expect(() => newGame.chooseRoundCard(playerTest.id, playerRoundCard1)).toThrow('Ooopps... Cannot change players chosen card');
    });

    it('04 - Should not be able to choose round card with an invalid player', () => {
        const newGame = gameplay(Stages.sentence);

        expect(() => newGame.chooseRoundCard('123', '123')).toThrow('Ooopps... Invalid player');
    });

    it('05 - Should not be able to choose an invalid round card', () => {
        const newGame = gameplay(Stages.sentence);

        const playerTest = newGame.playersNotStoryteller[0];

        expect(() => newGame.chooseRoundCard(playerTest.id, '123')).toThrow('Ooopps... Invalid chosen card');
    });

    it('06 - Should be able to change state after all players have chosen round card', () => {
        const newGame = gameplay(Stages.roundCards);

        expect(newGame.stage).toBe(Stages.roundVote);
    });

    it('07 - Should not be able to choose round card after round card stage', () => {
        const newGame = gameplay(Stages.roundCards);

        const playerTest = newGame.playersNotStoryteller[0];

        expect(() => newGame.chooseRoundCard(playerTest.id, '123')).toThrow('Ooopps... It is not time to choose round card');
    });

});

describe('B.06 - Game (stage roundVote)', function () {

    it('01 - Should be able to allow player to vote', () => {
        const newGame = gameplay(Stages.roundCards);

        const playerTest = newGame.playersNotStoryteller[0];
        const voteCard = newGame.roundCards[0];

        newGame.vote(playerTest.id, voteCard);

        expect(playerTest.vote).toBe(voteCard);
    });

    it('02 - Should not be able allow voting if it is not the roundVote stage', () => {
        const newGame = gameplay(Stages.sentence);

        const playerTest = newGame.playersNotStoryteller[0];
        const voteCard = newGame.roundCards[0];

        expect(() => newGame.vote(playerTest.id, voteCard)).toThrow('Ooopps... It is not time to vote round');
    });

    it('03 - Should not be able to change the vote', () => {
        const newGame = gameplay(Stages.roundCards);

        const playerTest = newGame.playersNotStoryteller[0];
        const voteCard0 = newGame.roundCards[0];
        const voteCard1 = newGame.roundCards[1];

        newGame.vote(playerTest.id, voteCard0);

        expect(() => newGame.vote(playerTest.id, voteCard1)).toThrow('Ooopps... Cannot change players vote');
    });

    it('04 - Should not be able to vote with an invalid player', () => {
        const newGame = gameplay(Stages.roundCards);

        expect(() => newGame.vote('123', '123')).toThrow('Ooopps... Invalid player');
    });

    it('05 - Should not be able to choose an invalid card to vote', () => {
        const newGame = gameplay(Stages.roundCards);

        const playerTest = newGame.playersNotStoryteller[0];

        expect(() => newGame.vote(playerTest.id, '123')).toThrow('Ooopps... Invalid chosen card');
    });

    it('06 - Should be able to change state after all players have voted', () => {
        const newGame = gameplay(Stages.roundVote);

        expect(newGame.stage).toBe(Stages.scoring);
    });

    it('07 - Should not be able to vote after roundVote stage', () => {
        const newGame = gameplay(Stages.roundVote);

        const playerTest = newGame.playersNotStoryteller[0];

        expect(() => newGame.vote(playerTest.id, '123')).toThrow('Ooopps... It is not time to vote round');
    });

});

describe('B.07 - Game (stage roundScore)', function () {

    it.todo('It is possible to compute scores - right scores');
    it.todo('Throws when it is not compute scores stage');
    it.todo('Change stage to storyteller');
    it.todo('We have a winner - end stage');

});