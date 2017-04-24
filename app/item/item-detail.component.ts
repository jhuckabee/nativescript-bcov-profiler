import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BrightcovePlayer } from "../brightcove-player";
import { registerElement } from "nativescript-angular";

import { Item } from "./item";
import { ItemService } from "./item.service";

registerElement("BrightcovePlayer", () => BrightcovePlayer);

@Component({
    selector: "ns-details",
    moduleId: module.id,
    templateUrl: "./item-detail.component.html",
})
export class ItemDetailComponent implements OnInit {
    item: Item;

    constructor(
        private itemService: ItemService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        const id = this.route.snapshot.params["id"];
        this.item = this.itemService.getItem(id);
    }
}
