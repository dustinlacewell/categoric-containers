import { item } from "../decorators";
import { IItem } from "./IItem";


@item(IItem)
export class SwordItem implements IItem {
    // ...
}