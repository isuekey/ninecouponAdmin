import { Component } from '@angular/core';

import { Resource } from '../../providers/resource';
import { AreaInfo } from "../../model/shop.model";

@Component({
    templateUrl:"area.html",
    selector:"page-areas"
})
export class AreaComponent{
    newArea:AreaInfo = new AreaInfo();
    beginToAddNewArea:boolean = false;
    areaList: AreaInfo[] = [];
    constructor(private resource: Resource){

    };
    wantToAddNewArea(){
        this.beginToAddNewArea = !this.beginToAddNewArea;
        this.newArea.randomId = Math.floor(Math.random() * 900000);
    };

    addNew(){
        this.resource.addNewArea(this.newArea, (success)=>{
            console.log(success);
            this.loadAreaList();
        });
    };

    ionViewDidEnter() {
        this.loadAreaList();
    }

    loadAreaList(){
        this.resource.queryAreaList((success)=>{
            this.areaList.length = 0;
            Array.prototype.push.apply(this.areaList, success);
        });
    }
}
