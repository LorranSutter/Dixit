interface PlayerType {
    readonly name: string,
    hand: number[],
    score: number
}

class Player {
    constructor(private player: PlayerType) { }

    get name(): string {
        return this.player.name;
    }

    get hand(): number[] {
        return this.player.hand;
    }

    get score(): number {
        return this.player.score;
    }

    removeCard(cardId: number) {
        this.player.hand = this.player.hand.filter(card => card !== cardId);
    }

    includeCard(cardId: number) {
        this.player.hand.push(cardId);
    }

    earnScore(score: number): void {
        this.player.score += score;
    }
}