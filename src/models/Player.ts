import IPlayer from './interfaces/IPlayer';

class Player {
    constructor(private player: IPlayer) { }

    get id(): string {
        return this.player.id;
    }

    get name(): string {
        return this.player.name;
    }

    get hand(): Set<string> {
        return this.player.hand;
    }

    get score(): number {
        return this.player.score;
    }

    removeCard(cardId: string) {
        this.player.hand.delete(cardId);
    }

    includeCard(cardId: string) {
        this.player.hand.add(cardId);
    }

    earnScore(score: number): void {
        this.player.score += score;
    }
}

export default Player;