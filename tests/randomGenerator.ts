import IPlayer from '../src/models/interfaces/IPlayer';
import Player from '../src/models/Player';

function randomString(size: number) {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < size; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function randomNumber(size: number) {
    let number = "";
    const possible = "0123456789";

    for (let i = 0; i < size; i++)
        number += possible.charAt(Math.floor(Math.random() * possible.length));

    return number;
}

// Thanks to https://gist.github.com/solenoid/1372386
function mongoObjectId() {
    const timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    return timestamp + randomString(16).toLowerCase();
};

export function generatePlayer(_playerData?: IPlayer): Player {
    return new Player({
        id: _playerData &&_playerData.id || mongoObjectId(),
        name: _playerData &&_playerData.name || randomString(10),
        hand: _playerData &&_playerData.hand || new Set([]),
        score: _playerData &&_playerData.score || 0,
        isStoryteller: _playerData &&_playerData.isStoryteller || false,
        vote: _playerData &&_playerData.vote || -1,
        roundCard: _playerData &&_playerData.roundCard || '',
    });
}

export function generateCardList(size: number): Set<string> {
    const cardArrNumber = Array.from(Array(size).keys());
    const cardArrString = cardArrNumber.map((card: number) => card.toString());

    return new Set(cardArrString);
}