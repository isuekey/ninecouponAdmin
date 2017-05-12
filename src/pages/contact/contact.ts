import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Resource } from "../../providers/resource"
import { AccountInfo, TokenInfo } from '../../model/account.model';

@Component({
    selector: 'page-contact',
    templateUrl: 'contact.html'
})
export class ContactPage implements OnInit{

    accountInfo: AccountInfo = AccountInfo.getLocalAccount();
    loginInfo = new LoginInfo();
    display:any = {};

    constructor(public navCtrl: NavController, private resource:Resource) {
    }

    ngOnInit(){
        if(this.accountInfo){
            this.display.accountInfo = this.accountInfo;
        }
    }

    logout() {
        TokenInfo.removeLocalToken();
        AccountInfo.removeLocalAccount();
        this.accountInfo = undefined;
    }

    signIn(){
        this.resource.loginAccount(this.loginInfo.account, this.loginInfo.password, (suc)=>{
            console.log(suc);
            this.display.suc = suc;
            this.getAccountInfo();
        }, (error)=>{
            console.log(error);
            this.display.error = error;
        });
    }

    getAccountInfo(){
        this.resource.getAccountInfo((success)=>{
            this.display.account = success;
            this.accountInfo = AccountInfo.getLocalAccount();
        });
    }
}


class LoginInfo {
    account:string;
    password: string;
}