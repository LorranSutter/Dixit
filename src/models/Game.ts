import Player from "./Player";
import shuffleArray from '../functions/shuffleArray';
import { Stages } from "./enums/Stages";

// interface IPlayerInfo extends IPlayer {
//     storyteller?: boolean,
//     vote?: number,
//     card?: string
// }

interface IPlayerVote {
    playerId: string,
    vote: number
}

// TODO Allow to remove a player
class Game {

    // private playerList: PlayerInfo[];
    private _stage: Stages;
    private _library: string[];
    // private _storyteller: string;
    private _sentence: string;
    private _storytellerCard: string;
    private _roundCards: string[];
    // private _votes: IPlayerVote[];
    // private discarded: string[];

    constructor(private _players: Player[], private _cards: Set<string>, private _maxScore: number = 30) {
        if (this._players.length < 3) {
            throw Error('Ooopps... Minimum number of players is 3');
        }
        else if (this._players.length > 6) {
            throw Error('Ooopps... Maximum number of players is 6');
        }

        if (this._cards.size <= 0) {
            throw Error('Ooopps... Number of cards must be greater than 0');
        }
        else if (this._cards.size > 84) {
            throw Error('Ooopps... Number of cards must be up to 84');
        }

        if (this._maxScore <= 0) {
            throw Error('Ooopps... Max score must be greater than 0');
        }
        else if (this._maxScore > 100) {
            throw Error('Ooopps... Max score must be up to 100');
        }

        this._stage = Stages.unset;
        this._library = Array.from(_cards);
        // this._storyteller = '';
        this._sentence = '';
        this._storytellerCard = '';
        this._roundCards = [];
        // this._votes = [];
        // this.playerList = players.map(_player => {
        //     return {
        //         player: _player,
        //         position: 0
        //     }
        // })
    }

    // set storyteller(playerId: string) {
    //     this._storyteller = playerId;
    // }

    get stage() {
        return this._stage;
    }

    get players() {
        return this._players;
    }

    get playersNotStoryteller() {
        return this._players.filter(player => !player.isStoryteller);
    }

    get library() {
        return this._library;
    }

    get maxScore() {
        return this._maxScore;
    }

    get storyteller(): Player {
        return this._players.filter(player => player.isStoryteller)[0];
    }

    get sentence() {
        return this._sentence;
    }

    get roundCards() {
        return this._roundCards;
    }

    get storytellerCard() {
        return this._storytellerCard;
    }

    // get roundCards() {
    //     return this._roundCards;
    // }

    // get votes() {
    //     return this._votes;
    // }

    private shuffleLibrary() {
        shuffleArray(this._library);
    }

    private giveCards(numOfCards: number) {
        this._players =
            this._players.map(player => {
                const cardsDrawn = new Set(this._library.splice(0, numOfCards));
                player.hand = cardsDrawn;
                return player;
            });
    }

    private allPlayersChoseRoundCard() {
        if (this.playersNotStoryteller.every(player => player.roundCard)) {
            this._stage = Stages.roundVote;
        }
    }

    private allPlayersVoted() {
        if (this.playersNotStoryteller.every(player => player.vote)) {
            this._stage = Stages.scoring;
        }
    }

    private checkWinner() {
        const reachedMaxScore = this.players.filter(player => player.score >= this._maxScore);

        if (reachedMaxScore.length === 0) {
            return;
        }

        if (reachedMaxScore.length === 1) {
            return reachedMaxScore[0];
        }

        reachedMaxScore.sort((a: Player, b: Player) => b.score - a.score);

        // No tie
        if (reachedMaxScore[0].score > reachedMaxScore[1].score) {
            return reachedMaxScore[0];
        }
    }

    init() {
        this._stage = Stages.init;
        this.shuffleLibrary();
        this.giveCards(6);
        this._stage = Stages.storyteller;
    }

    setStoryteller(playerId: string) {
        if (!(this._stage === Stages.storyteller)) {
            throw Error('Ooopps... It is not time to set a storyteller');
        }
        for (const player of this._players) {
            if (player.id === playerId) {
                player.isStoryteller = true;
            } else {
                player.isStoryteller = false;
            }
        }
        this._stage = Stages.sentence;
    }

    setSentenceAndCard(sentence: string, cardId: string) {
        if (!(this._stage === Stages.sentence)) {
            throw Error('Ooopps... It is not time to set a sentence');
        }
        if (sentence.length === 0) {
            throw Error('Ooopps... Sentence must be greater than 0');
        }
        if (!this.storyteller.hand.has(cardId)) {
            throw Error('Ooopps... Storyteller does not have chosen card');
        }
        this._sentence = sentence
        this._storytellerCard = cardId;
        this._roundCards.push(cardId);
        this._stage = Stages.roundCards;
    }

    chooseRoundCard(playerId: string, cardId: string) {
        if (!(this._stage === Stages.roundCards)) {
            throw Error('Ooopps... It is not time to choose round card');
        }
        for (const player of this._players) {
            if (player.id === playerId) {
                if (!player.hand.has(cardId)) {
                    throw Error('Ooopps... Invalid chosen card');
                }
                if (!player.roundCard) {
                    this._roundCards.push(cardId);
                    player.hand.delete(cardId);
                    player.roundCard = cardId;
                    this.allPlayersChoseRoundCard();
                    return;
                } else {
                    throw Error('Ooopps... Cannot change players chosen card');
                }
            }
        }
        throw Error('Ooopps... Invalid player');
    }

    vote(playerId: string, cardId: string) {
        if (!(this._stage === Stages.roundVote)) {
            throw Error('Ooopps... It is not time to vote round');
        }
        for (const player of this._players) {
            if (player.id === playerId) {
                if (!this._roundCards.includes(cardId)) {
                    throw Error('Ooopps... Invalid chosen card');
                }
                if (player.roundCard === cardId) {
                    throw Error('Ooopps... Cannot vote in your own card');
                }
                if (!player.vote) {
                    player.vote = cardId;
                    this.allPlayersVoted();
                    return;
                } else {
                    throw Error('Ooopps... Cannot change players vote');
                }
            }
        }
        throw Error('Ooopps... Invalid player');
    }

    computeScores() {
        if (!(this._stage === Stages.scoring)) {
            throw Error('Ooopps... It is not time to compute the scores');
        }

        const playersNotStoryteller = this.playersNotStoryteller;

        // All players found storyteller card
        if (playersNotStoryteller.every(player => player.vote === this._storytellerCard)) {
            playersNotStoryteller.forEach(player => player.earnScore(2));
        }
        else { // Compute individual scores
            const votes = playersNotStoryteller.map(player => player.vote);

            playersNotStoryteller.forEach(player => {
                // Player who found storyteller card
                if (player.vote === this._storytellerCard) {
                    player.earnScore(3);
                }
                // Player who received votes
                votes.forEach(vote => {
                    if (player.roundCard === vote) {
                        player.earnScore(1);
                    }
                });
            });

            // No player found storyteller card
            if (playersNotStoryteller.every(player => player.vote !== this._storytellerCard)) {
                playersNotStoryteller.forEach(player => player.earnScore(2));
            }
            else { // Some players found storyteller card
                this.storyteller.earnScore(3);
            }
        }

        const winner = this.checkWinner();

        if (winner) {
            this._stage = Stages.end;
        } else {
            this._stage = Stages.storyteller;
        }
    }
}

export default Game;
