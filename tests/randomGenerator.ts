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

export function generatePlayer() {
    return {
        name: randomString(10),
        hand: new Set([]),
        score: 0
    }
}