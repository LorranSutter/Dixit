export default interface IPlayer {
    readonly name: string,
    hand: Set<string>,
    score: number
}