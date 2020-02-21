import {Item} from "./Item";
import {Sword} from "./Sword";

export class Player {
    posX: number;
    posY: number;
    inventory: Array<Item> = [new Sword()];

    constructor(posX: number, posY: number) {
        this.posX = posX;
        this.posY = posY;
    }
}
