import * as inquirer from "inquirer";
import {Player} from "./Player";
import {Map} from "./Map";
import {readFileSync, writeFileSync} from "fs";
import {SaveObject} from "./save-object";
import path from "path";
import {Item} from "./Item";
import {Sword} from "./Sword";

export class Game {

    save: string = readFileSync(path.resolve(__dirname, '../game.json'), 'utf8');
    saveObject: SaveObject = JSON.parse(this.save);

    public player: Player = new Player(0, 0);
    public map: Map = new Map();

    constructor() {
        if (this.saveObject.firstStart) {
            console.log('Hello adventurer!');
            this.saveObject.firstStart = false;
        } else {
            console.log('Welcome back adventurer');
            this.player.posX = this.saveObject.player.posX;
            this.player.posY = this.saveObject.player.posY;
            for (const itemString of this.saveObject.inventory) {
                switch (itemString) {
                    case 'Sword':
                        this.player.inventory.push(new Sword());
                }
            }
        }
    }

    run() {
        inquirer.prompt([
            {
                type: 'list',
                name: 'test',
                message: 'What do you want to do next?',
                choices: ['Walk', 'Show the map', 'Show the inventory', 'End the game']
            }
        ]).then((answers) => {
            switch (answers.test) {
                case 'Show the map':
                    console.log(this.map.show(this.player));
                    this.run();
                    break;
                case 'Walk':
                    inquirer.prompt([
                        {
                            type: 'list',
                            name: 'walk',
                            message: 'Where do you want to walk?',
                            choices: ['North', 'East', 'South', 'West']
                        }
                    ]).then((answers) => {
                        switch (answers.walk) {
                            case 'North':
                                this.player.posY = this.player.posY - 1;
                                if (this.player.posY < 0) {
                                    this.player.posY = this.map.height;
                                }
                                break;
                            case 'East':
                                this.player.posX = this.player.posX + 1;
                                if (this.player.posX > this.map.width) {
                                    this.player.posX = 0;
                                }
                                break;
                            case 'South':
                                this.player.posY = this.player.posY + 1;
                                if (this.player.posY > this.map.height) {
                                    this.player.posY = 0;
                                }
                                break;
                            case 'West':
                                this.player.posX = this.player.posX - 1;
                                if (this.player.posX < 0) {
                                    this.player.posX = this.map.width;
                                }
                                break;
                        }
                        this.run();
                    });
                    break;
                case 'Show the inventory':
                    console.log('Your inventory contains:');
                    for (const item of this.player.inventory) {
                        console.log(item.name);
                    }
                    this.run();
                    break;
                case 'Save and end the game':
                    Object.assign(this.saveObject, {player: {posX: this.player.posX, posY: this.player.posY}});
                    for (const item of this.player.inventory) {
                        this.saveObject.inventory.push(item.name);
                    }
                    const saveString = JSON.stringify(this.saveObject);
                    writeFileSync(path.resolve(__dirname, '../game.json'), saveString);
                    break;
            }
        });
    }
}
