import {Player} from "./Player";

export class Map {
    height: number = 10;
    width: number = 10;

    map: string = '';

    show(player: Player): string {
        this.map = '';
        for (let i = 0; i <= this.height; i++) {
            this.map = this.map.concat('+---+---+---+---+---+---+---+---+---+---+---+\n|');
            for (let j = 0; j <= this.width; j++) {
                if (player.posX === j && player.posY === i) {
                    this.map = this.map.concat(' X |')
                } else {
                    this.map = this.map.concat('   |')
                }
            }
            this.map = this.map.concat('\n')
        }
        this.map = this.map.concat('+---+---+---+---+---+---+---+---+---+---+---+\n');
        return this.map;
    }
}
