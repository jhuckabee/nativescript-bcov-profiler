import { Injectable } from "@angular/core";

import { Item } from "./item";

@Injectable()
export class ItemService {
    private items = new Array<Item>(
        { id: "1", title: "Video 1"},
        { id: "2", title: "Video 2"},
        { id: "3", title: "Video 3"},
        { id: "4", title: "Video 4"},
    );

    getItems(): Item[] {
        return this.items;
    }

    getItem(id: string): Item {
        return this.items.filter(item => item.id === id)[0];
    }
}
