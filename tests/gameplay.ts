import Game from "../src/models/Game";
import { Stages } from "../src/models/enums/Stages";

import { generatePlayer, generateCardList } from "./randomGenerator";

function newRound(stage: number, newGame: Game) {
    newGame.players.forEach(player => console.log(player.score));
    if (newGame.stage >= Stages.end) {
        return;
    }
    if (stage >= Stages.sentence) {
        const storytellerCard = Array.from(newGame.storyteller.hand)[0];
        newGame.setSentenceAndCard('My sentence', storytellerCard);
    }
    if (stage >= Stages.roundCards) {
        newGame.playersNotStoryteller.forEach(player => {
            const playerRoundCard = Array.from(player.hand)[0];
            newGame.chooseRoundCard(player.id, playerRoundCard);
        });
    }
    if (stage >= Stages.roundVote) {
        newGame.playersNotStoryteller.forEach(player => {
            const roundCards = newGame.roundCards.filter(cards => cards !== player.roundCard);
            const voteCard = roundCards[0];
            newGame.vote(player.id, voteCard);
        });
    }
    if (stage >= Stages.scoring) {
        newGame.computeScores();
        newRound(Stages.scoring, newGame);
    }
}

export default function gameplay(stage?: number, numPlayers?: number, numCards?: number, score?: number) {
    const players = Array.from({ length: numPlayers || 4 }, () => generatePlayer());
    const newGame = new Game(players, generateCardList(numCards || 84), score || 30);

    stage = stage || Stages.unset;

    if (stage >= Stages.init) {
        newGame.init();
    }
    if (stage >= Stages.storyteller) {
        newGame.setStoryteller(players[0].id);
    }
    if (stage >= Stages.sentence) {
        const storytellerCard = Array.from(newGame.storyteller.hand)[0];
        newGame.setSentenceAndCard('My sentence', storytellerCard);
    }
    if (stage >= Stages.roundCards) {
        newGame.playersNotStoryteller.forEach(player => {
            const playerRoundCard = Array.from(player.hand)[0];
            newGame.chooseRoundCard(player.id, playerRoundCard);
        });
    }
    if (stage >= Stages.roundVote) {
        newGame.playersNotStoryteller.forEach(player => {
            const roundCards = newGame.roundCards.filter(cards => cards !== player.roundCard);
            const voteCard = roundCards[0];
            newGame.vote(player.id, voteCard);
        });
    }
    if (stage >= Stages.scoring) {
        newGame.computeScores();
    }
    if (stage >= Stages.newRound) {
        console.log('Here');
        newRound(Stages.scoring, newGame);
        console.log('Here1');
    }

    return newGame;
}