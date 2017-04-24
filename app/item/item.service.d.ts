import { Item } from "./item";
export declare class ItemService {
    private items;
    getItems(): Item[];
    getItem(id: string): Item;
}
