import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { AreaInfo } from '../../model/shop.model';
import { Resource } from "../../providers/resource";

import { ShoplistComponent } from '../shoplist/shoplist';


@Component({
    selector: 'shoparea',
    templateUrl: 'shoparea.html'
})
export class ShopareaComponent {
    areaList:AreaInfo[] = [];
    constructor(private resource: Resource, private navController:NavController) {
        console.log('Hello Shop Component');
    }

    ionViewDidEnter(){
        this.queryAreaList();
    };

    queryAreaList(){
        this.resource.queryAreaList((success)=>{
            this.areaList.length = 0;
            console.log(success);
            Array.prototype.push.apply(this.areaList, success);
        })
    }

    showShopListOfTheArea(areaItem:AreaInfo){
        this.navController.push(ShoplistComponent, {
            areaIndex: areaItem.areaIndex,
            areaName: areaItem.name
        });
    }

}

