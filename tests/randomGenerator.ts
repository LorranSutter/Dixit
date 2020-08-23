import IPlayer from '../src/models/interfaces/IPlayer';

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

export function generatePlayer(name?: string, hand?: Set<string>, score?: number) {
    return {
        id: mongoObjectId(),
        name: name || randomString(10),
        hand: hand || new Set([]),
        score: score || 0
    }
}

export function generateCardList(size: number): Set<string> {
    const cardArrNumber = Array.from(Array(size).keys());
    const cardArrString = cardArrNumber.map((card: number) => card.toString());

    return new Set(cardArrString);
}