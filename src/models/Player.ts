import IPlayer from './interfaces/IPlayer';

class Player {
    constructor(private player: IPlayer) { }

    get name(): string {
        return this.player.name;
    }

    get hand(): Set<number> {
        return this.player.hand;
    }

    get score(): number {
        return this.player.score;
    }

    removeCard(cardId: number) {
        this.player.hand.delete(cardId);
    }

    includeCard(cardId: number) {
        this.player.hand.add(cardId);
    }

    earnScore(score: number): void {
        this.player.score += score;
    }
}

export default Player;