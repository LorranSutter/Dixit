export default interface IPlayer {
    readonly name: string,
    hand: Set<number>,
    score: number
}