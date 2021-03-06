export default interface IPlayer {
    readonly id: string,
    readonly name: string,
    hand: Set<string>,
    score: number,
    isStoryteller?: boolean,
    vote?: string,
    roundCard?: string
}