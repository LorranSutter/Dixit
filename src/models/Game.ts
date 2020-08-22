import IPlayer from "./interfaces/IPlayer";

// interface PlayerInfo {
//     player: IPlayer,
//     position: number
// }

class Game {

    // private playerList: PlayerInfo[];

    constructor(private _players: IPlayer[]) {
        if(this._players.length < 3){
            throw Error('Ooopps... Minimum number of players is 3');
        }else if(this._players.length > 6){
            throw Error('Ooopps... Maximum number of players is 6');
        }
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
// console.log(game.players);
