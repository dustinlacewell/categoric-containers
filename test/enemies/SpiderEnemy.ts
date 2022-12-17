import { enemy } from "../decorators";
import { IEnemy } from "./IEnemy";


@enemy(IEnemy)
export class SpiderEnemy implements IEnemy {
    // ...
}