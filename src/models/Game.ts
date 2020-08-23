import IPlayer from "./interfaces/IPlayer";

// interface PlayerInfo {
//     player: IPlayer,
//     position: number
// }

class Game {

    // private playerList: PlayerInfo[];
    private library: Set<string>;
    // private discarded: Set<string>;

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

        this.library = _cards;
        // this.playerList = players.map(_player => {
        //     return {
        //         player: _player,
        //         position: 0
        //     }
        // })
    }

    // get players() {
    //     return this._players;
    // }

    // get maxScore() {
    //     return this._maxScore;
    // }
}

export default Game;

// const playerData1 = {
//     name: 'Player name 1',
//     hand: new Set([1, 2, 3]),
//     score: 0
// }

// const playerData2 = {
//     name: 'Player name 2',
//     hand: new Set([8, 6, 9]),
//     score: 5
// }

// const game = new Game([playerData1, playerData2]);
// console.log(game.maxScore);
