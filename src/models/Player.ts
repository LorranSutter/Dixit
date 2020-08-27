import IPlayer from './interfaces/IPlayer';

class Player {
    constructor(private player: IPlayer) { }

    set hand(_hand: Set<string>) {
        this.player.hand = _hand;
    }

    set isStoryteller(_isStoryteller: boolean | undefined) {
        this.player.isStoryteller = _isStoryteller;
    }

    set vote(_vote: string | undefined) {
        this.player.vote = _vote;
    }

    set roundCard(_roundCard: string | undefined) {
        this.player.roundCard = _roundCard;
    }

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

    get isStoryteller(): boolean | undefined {
        return this.player.isStoryteller;
    }

    get vote(): string | undefined {
        return this.player.vote;
    }

    get roundCard(): string | undefined {
        return this.player.roundCard;
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