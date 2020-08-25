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

    get stage(){
        return this._stage;
    }

    get players() {
        return this._players;
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

    init() {
        this.shuffleLibrary();
        this.giveCards(6);
        this._stage = Stages.init;
    }

    setStoryteller(playerId: string) {
        if (!(this._stage === Stages.init)) {
            throw Error('Ooopps... Game not started');
        }
        for (const player of this._players) {
            if (player.id === playerId) {
                player.isStoryteller = true;
            } else {
                player.isStoryteller = false;
            }
        }
        this._stage = Stages.storytellerChosen;
    }

    // chooseRoundCard(playerId: string, cardId: string) {
    //     if (!(this._stage === Stages.sentence)) {
    //         throw Error('Ooopps... No storyteller or sentence chosen');
    //     }
    //     for (const player of this._players) {
    //         if (player.id === playerId) {
    //             if (!player.card) {
    //                 this._roundCards.push(cardId);
    //                 player.card = cardId;
    //                 return;
    //             } else {
    //                 throw Error('Ooopps... Cannot change players chosen card');
    //             }
    //         }
    //     }
    //     throw Error('Ooopps... Invalid chosen card');
    // }

    // vote(playerId: string, vote: number) {
    //     if (!(this._stage === Stages.roundCards)) {
    //         throw Error('Ooopps... All players must have chosen a card');
    //     }
    //     for (const player of this._players) {
    //         if (player.id === playerId) {
    //             player.vote = vote;
    //             break;
    //         }
    //     }
    // }

    // addStorytellerCard(cardId: string) {
    //     this._roundCards.push(cardId);
    // }

    // addVote(vote: IPlayerVote) {
    //     this.votes.push(vote);
    // }

    // computeScores() {
    //     if (this._roundCards.length !== this._players.length) {
    //         throw Error(`Ooopps... The number of storyteller cards must be ${this._players.length}`);
    //     } else if (this._votes.length !== this._players.length - 1) {
    //         throw Error(`Ooopps... The number of votes must be ${this._players.length - 1}`);
    //     }
    // }
}

export default Game;
