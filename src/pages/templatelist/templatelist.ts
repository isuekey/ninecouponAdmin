import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Resource } from "../../providers/resource";
import { Strategy, CouponData } from "../../model/shop.model";

@Component({
    selector: 'page-templatelist',
    templateUrl: 'templatelist.html',
})
export class TemplatelistComponent {
    strategyList: Strategy[] = [];
    beginToAddNewStrategy:boolean;
    newStrategy:Strategy;
    newCoupon:CouponData;

    constructor(public navCtrl: NavController, public navParams: NavParams, private resource:Resource) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad Templatelist');
    }

    ionViewDidEnter(){
        this.newStrategy = new Strategy();
        this.newCoupon = new CouponData;
        this.newStrategy.data = this.newCoupon;
        this.queryStrategyList();
    }

    queryStrategyList(){
        this.resource.queryStrategyList((success)=>{
            this.strategyList.length = 0;
            Array.prototype.push.apply(this.strategyList, success);
        });
    }

    wantToAddNewStrategy(){
        this.beginToAddNewStrategy = !this.beginToAddNewStrategy;
    }

    addNewStrategy(){
        this.newStrategy.origin = "suyuan";
        this.resource.addNewStrategy(this.newStrategy, (success)=>{
            this.queryStrategyList();
        });
    }
}
