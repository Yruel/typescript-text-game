export interface SaveObject {
    firstStart: boolean;
    player: {
        posX: number;
        posY: number;
    };
    inventory: Array<string>
}
