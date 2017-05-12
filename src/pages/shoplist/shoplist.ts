import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


import { ShopInfo } from '../../model/shop.model';
import { Resource } from "../../providers/resource";

import { TemplateaccessComponent } from "../templateaccess/templateaccess";

@Component({
    selector: 'page-shoplist',
    templateUrl: 'shoplist.html',
})
export class ShoplistComponent {
    shopList:ShopInfo[] = [];
    areaIndex:string;
    areaName:string;
    beginToAddNewShop:boolean;
    newShop:ShopInfo = new ShopInfo();

    constructor(public navCtrl: NavController, public navParams: NavParams, private resource:Resource) {
        this.areaIndex = this.navParams.get("areaIndex");
        this.areaName = this.navParams.get("areaName");
        this.newShop.areaIndex = this.areaIndex;
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad Shoplist');
    }

    ionViewDidEnter(){
        this.queryShopOfTheArea();
    }

    queryShopOfTheArea(){
        this.resource.queryShopOfTheArea(this.areaIndex, (suc)=>{
            this.shopList.length = 0;
            console.log(suc);
            Array.prototype.push.apply(this.shopList, suc);
        });
    }
    wantToAddNewShop(){
        this.beginToAddNewShop = !this.beginToAddNewShop;
    }
    addNewShop(){
        this.resource.addNewShop(this.newShop, (suc)=>{
            this.queryShopOfTheArea();
        });
    };

    manageStrategyAccess(shopItem:ShopInfo){
        this.navCtrl.push(TemplateaccessComponent, {
            shopId: shopItem.id
        });
    }
}
