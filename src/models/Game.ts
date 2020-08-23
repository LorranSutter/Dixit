import IPlayer from "./interfaces/IPlayer";
import shuffleArray from '../functions/shuffleArray';

// interface PlayerInfo {
//     player: IPlayer,
//     position: number
// }

class Game {

    // private playerList: PlayerInfo[];
    private _library: string[];
    // private placedOnTheTable: string[];
    // private discarded: string[];

    constructor(private _players: IPlayer[], private _cards: Set<string>, private _maxScore: number = 30) {
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

        this._library = Array.from(_cards);
        // this.playerList = players.map(_player => {
        //     return {
        //         player: _player,
        //         position: 0
        //     }
        // })
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
    }
}

export default Game;
