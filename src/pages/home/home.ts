import { Component,OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Resource } from "../../providers/resource"
import { AccountInfo }  from "../../model/account.model";
import { AreaComponent } from '../area/area';
import { ShopareaComponent } from '../shoparea/shoparea';
import { TemplatelistComponent } from "../templatelist/templatelist";
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage implements OnInit {
    accountInfo:AccountInfo;
    constructor(public navCtrl: NavController, private resource: Resource) {

    }

    ngOnInit(){
    }

    ionViewDidEnter(){
        this.accountInfo = AccountInfo.getLocalAccount();
    };

    dealWithArea(){
        this.navCtrl.push(AreaComponent);
    }

    dealWithShop(){
        this.navCtrl.push(ShopareaComponent);
    }

    dealWithTemplate(){
        this.navCtrl.push(TemplatelistComponent);
    }
}
