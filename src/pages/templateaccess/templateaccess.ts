import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Resource }  from "../../providers/resource";
import { Strategy, CouponData, StrategyAccess } from "../../model/shop.model";

@Component({
    selector: 'page-templateaccess',
    templateUrl: 'templateaccess.html',
})
export class TemplateaccessComponent {
    strategyList: Strategy[] = [];
    shopId:number;
    accessList: StrategyAccess[] = [];
    newAccess:StrategyAccess;
    wantToAddNewStrategyAccess:boolean;


    constructor(public navCtrl: NavController, public navParams: NavParams, private resource:Resource) {
        this.shopId = this.navParams.get("shopId");
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad Templateaccess');
        this.newAccess = new StrategyAccess();
        this.queryStrategyList();
    };

    ionViewDidEnter(){
        this.queryStrategyAccessOfTheShop();
    };

    queryStrategyAccessOfTheShop() {
        this.resource.queryStrategyAccessOfTheShop(this.shopId, (success)=>{
            this.accessList.length = 0;
            Array.prototype.push.apply(this.accessList, success);
        });
    };

    queryStrategyList(){
        this.resource.queryStrategyList((success)=>{
            this.strategyList.length = 0;
            Array.prototype.push.apply(this.strategyList, success);
        });
    };

    beginToAddNewStrategyAccess(){
        this.wantToAddNewStrategyAccess = !this.wantToAddNewStrategyAccess;
    };

    addNewStrategyAccess(){
        this.newAccess.shopId = this.shopId;
        this.resource.addNewStrategyAccess(this.newAccess, (success)=>{
            this.queryStrategyAccessOfTheShop();
        });
    }

}
