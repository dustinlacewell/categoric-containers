
import "./enemies"

import { installEnemies, installItems } from "./decorators"
import { Container } from "inversify"

import { IEnemy } from "./enemies"
import { IItem } from "./items"

const main = () => {
    const enemyContainer = new Container()
    installEnemies(enemyContainer)
    console.log(`Locating enemies...`)
    const enemies = enemyContainer.getAll(IEnemy)
    console.log(enemies)

    const itemContainer = new Container()
    installItems(itemContainer)
    console.log(`Locating items...`)
    const items = itemContainer.getAll(IItem)
    console.log(items)
}

main()