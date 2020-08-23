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

export function generatePlayer(name?: string, hand?: Set<string>, score?: number) {
    return {
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