# Categoric Containers

Decorate things. Bind them at runtime.

This is a simple library that lets you create your own decorators. You can use these decorators to tag classes such that you can easily bind them all to a specific [Inversify](https://inverisfy.io/) container.

## Example

In this example, we have two categories of types, enemy related and item related. 

We'll define two of each, and show how we can bind them independently from each other.

### Enemies

```ts
// decorators/enemy.ts
import { createCategoricContainer } from "categoric-decorators"

export const { 
    install: installEnemies,
    singleton: enemy,
} = createClassCategoric()
```

```ts
// enemies/IEnemy.ts
export abstract class IEnemy { 
    // ...
}
```

```ts
// enemies/SnakeEnemy.ts
@enemy(IEnemy)
export class SnakeEnemy implements IEnemy {
    // ...
}
```

```ts
// enemies/SpiderEnemy.ts
@enemy(IEnemy)
class SpiderEnemy implements IEnemy {
    // ...
}
```

### Items

```ts
// decorators/item.ts
import { createCategoricContainer } from "categoric-decorators"

export const { 
    install: installItems,
    singleton: enemy,
} = createClassCategoric()
```

```ts
// enemies/IItem.ts
export abstract class IItem { 
    // ...
}
```

```ts
// enemies/SwordItem.ts
@item(IItem)
export class SwordItem implements IItem {
    // ...
}
```

```ts
// enemies/PotionItem.ts
@item(IItem)
class PotionItem implements IItem {
    // ...
}
```

### Binding

Now if we need to, we can bind these two groups of classes independently:

```ts
const enemyContainer = new Container()
installEnemies(enemyContainer)
const enemies = enemyContainer.getAll<IEnemy>()

const itemContainer = new Container()
installItems(itemContainer)
const items = itemContainer.getAll<IItem>()
```

Now at runtime you could use `locateEnemies()` to get a collection containing `SnakeEnemy` and `SpiderEnemy` classes.


# Installation

```
npm i @ldlework/categoric-containers
```

# Creating Categories

To create a category, use `createCategoricContainer()`:

```ts
export const { install, makeChild, singleton, transient, request } = createClassCategoric()
```

This creates a number of functions and decorators:

- `install(container: Container)` - binds all classes in the category to the container
- `makeChild(container: Container)` - creates a child container and binds all classes in the category to it
- `singleton(target: Constructable)` - decorator for singleton classes
- `transient(target: Constructable)` - decorator for transient classes
- `request(target: Constructable)` - decorator for request classes

Read more about inversify scopes [here](https://github.com/inversify/InversifyJS/blob/master/wiki/scope.md).

