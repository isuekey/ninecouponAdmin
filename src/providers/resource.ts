import { Injectable } from '@angular/core';
import { Http,BaseRequestOptions, Headers, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/map';

import { AccountInfo, TokenInfo } from "../model/account.model";

import { ShopInfo, Strategy, CouponData, StrategyAccess } from "../model/shop.model";

// export const hostBase = 'http://192.168.31.104:10010';
/**
HMSET clients:ninecouponAdmin clientId ninecouponAdmin secret c9654199366985d008d279a3a9f41452
SADD clients:ninecouponAdmin:grant_types password refresh_token
HMSET clients:ninecouponAdmin clientId ninecouponAdmin clientSecret c9654199366985
ninecouponAdmin:c9654199366985
**/
// export const hostBase = 'http://192.168.31.104:10010';
// export const hostBase = 'http://192.168.1.102:10010';
export const hostBase = 'http://192.168.2.105:10010';
export const token = "d819c1b1b73e64f53e0375d0503fa89c5a5d9101";
@Injectable()
export class Resource {

    constructor(public http: Http) {
        console.log('Hello Resource Provider');
    }

    errorHandler = function errorHandler(error, errorFunc?:(error)=>void){
        console.log(error);
        errorFunc && errorFunc(error.json());
    };

    loginAccount(accountName:string, accountPassword:string, successFunc?:((success) => void), errorFunc?:((error)=>void)){
        let url = `${hostBase}/oauth/token`;
        var headers = new Headers();
        headers.append("Content-Type", "application/x-www-form-urlencoded");
        headers.append("Authorization", "Basic bmluZWNvdXBvbkFkbWluOmM5NjU0MTk5MzY2OTg1");
        let login = [["grant_type","password"],["username", accountName],["password", accountPassword]].map(ele=>ele.join("=")).join("&");
        console.log(login);
        return this.http.post(url, login, {
            method: RequestMethod.Post,
            headers: headers
        }).subscribe((success) => {
            let tokenInfo:TokenInfo = success.json();
            TokenInfo.saveLocalToken(tokenInfo);
            successFunc && successFunc(tokenInfo);
        }, (error) => {
            this.errorHandler(error, errorFunc);
        })
    };

    refreshToken(successFunc?:((suc)=>void), errorFunc?:((err)=>void)){
        let url = `${hostBase}/oauth/token`;
        let tokenInfo = TokenInfo.getLocalToken();
        let refresh = {
            "grant_type":"refresh_token",
            "refresh_token": tokenInfo.refresh_token,
        };
        let options = new BaseRequestOptions();
        options.headers.set("Authorization", "Basice bmluZWNvdXBvbkFkbWluOmM5NjU0MTk5MzY2OTg1");
        options.headers.set("Accept", "application/json");
        options.headers.set("Content-Type", "application/x-www-form-urlencoded");

        return this.http.post(url, refresh, options).subscribe((suc)=>{
            successFunc && successFunc(suc);
        }, (err)=>{
            this.errorHandler(err, errorFunc);
        })
    }

    getAccountInfo(successFunc?:((success)=> void),errorFunc?:((error)=>void) ){
        let url = `${hostBase}/ninecoupon/account`;
        let headers = new Headers();
        let tokenInfo = TokenInfo.getLocalToken();
        headers.append("Authorization", `Bearer ${tokenInfo && tokenInfo.access_token || token}`);
        return this.http.get(url,{headers}).subscribe((suc)=>{
            let accountInfo: AccountInfo = suc.json();
            console.log(accountInfo);
            AccountInfo.saveLocalAccount(accountInfo);
            successFunc && successFunc(accountInfo);
        }, (error)=>{
            this.errorHandler(error, errorFunc);            
        });
    }

    queryAreaList(successFunc?:((success)=> void),errorFunc?:((error)=>void)){
        let url = `${hostBase}/ninecoupon/area/list`;
        let headers = new Headers();
        let tokenInfo = TokenInfo.getLocalToken();
        headers.append("Authorization", `Bearer ${tokenInfo && tokenInfo.access_token || token}`);
        return this.http.get(url, {headers}).subscribe((suc)=>{
            successFunc && successFunc(suc.json())
        }, (error)=>{
            this.errorHandler(error, errorFunc);
        });
    }

    addNewArea(areaInfo, successFunc?:((success)=> void),errorFunc?:((error)=>void)){
        let url = `${hostBase}/ninecoupon/area`;
        let headers = new Headers();
        let tokenInfo = TokenInfo.getLocalToken();
        headers.append("Authorization", `Bearer ${tokenInfo && tokenInfo.access_token || token}`);
        return this.http.post(url, areaInfo, { headers}).subscribe((suc)=>{
            successFunc && successFunc(suc.json());
        }, (error)=>{
            this.errorHandler(error, errorFunc);
        });
    }

    queryShopOfTheArea(areaIndex, successFunc?:((success)=> void),errorFunc?:((error)=>void)){
        let url = `${hostBase}/ninecoupon/area/${areaIndex}/shop/list`;
        let headers = new Headers();
        let tokenInfo = TokenInfo.getLocalToken();
        headers.append("Authorization", `Bearer ${tokenInfo && tokenInfo.access_token || token}`);
        return this.http.get(url, {headers}).subscribe((suc)=>{
            successFunc && successFunc(suc.json());
        }, (error)=>{
            this.errorHandler(error, errorFunc);
        });
    }

    addNewShop(shopInfo:ShopInfo , successFunc?:((success)=> void),errorFunc?:((error)=>void)){
        let url = `${hostBase}/ninecoupon/area/${shopInfo.areaIndex}/shop`;
        let headers = new Headers();
        let tokenInfo = TokenInfo.getLocalToken();
        headers.append("Authorization", `Bearer ${tokenInfo && tokenInfo.access_token || token}`);
        return this.http.post(url, shopInfo, {headers}).subscribe((suc)=>{
            successFunc && successFunc(suc.json());
        }, (error)=>{
            this.errorHandler(error, errorFunc);
        });
    };

    queryStrategyList(successFunc?:((success)=> void),errorFunc?:((error)=>void)){
        let url = `${hostBase}/ninecoupon/strategy/list`;
        let headers = new Headers();
        let tokenInfo = TokenInfo.getLocalToken();
        headers.append("Authorization", `Bearer ${tokenInfo && tokenInfo.access_token || token}`);
        return this.http.get(url, {headers}).subscribe((suc)=>{
            successFunc && successFunc(suc.json());
        }, (error)=>{
            this.errorHandler(error, errorFunc);
        });
    };

    addNewStrategy(strategy:Strategy, successFunc?:((success)=> void),errorFunc?:((error)=>void)){
        let url = `${hostBase}/ninecoupon/strategy`;
        let headers = new Headers();
        let tokenInfo = TokenInfo.getLocalToken();
        headers.append("Authorization", `Bearer ${tokenInfo && tokenInfo.access_token || token}`);
        return this.http.post(url, strategy, {headers}).subscribe((suc)=>{
            successFunc && successFunc(suc.json());
        }, (error)=>{
            this.errorHandler(error, errorFunc);
        });
    };

    queryStrategyAccessOfTheShop(shopId:number, successFunc?:((success)=> void),errorFunc?:((error)=>void)){
        let url = `${hostBase}/ninecoupon/shop/${shopId}/strategy/list`;
        let headers = new Headers();
        let tokenInfo = TokenInfo.getLocalToken();
        headers.append("Authorization", `Bearer ${tokenInfo && tokenInfo.access_token || token}`);
        return this.http.get(url, {headers}).subscribe((suc)=>{
            let accessList = suc.json().map((ele)=>{
                let accessItem = new StrategyAccess();
                accessItem.id = ele.access_id;
                accessItem.strategyId = ele.strategy_id;
                accessItem.shopId = ele.shop_id;
                accessItem.status = ele.access_status;
                let strategy = new Strategy();
                accessItem.strategy = strategy;
                strategy.id = ele.strategy_id;
                strategy.strategyName = ele.strategy_name;
                strategy.status = ele.strategy_status;
                strategy.origin = ele.origin;
                let data = ele.data as CouponData;
                strategy.data = data;
                return accessItem;
            });
            successFunc && successFunc(accessList);
        }, (error)=>{
            this.errorHandler(error, errorFunc);
        });
    };

    addNewStrategyAccess(newAccess:StrategyAccess, successFunc?:((success)=> void),errorFunc?:((error)=>void)){
        let url = `${hostBase}/ninecoupon/strategy/access`;
        let headers = new Headers();
        let tokenInfo = TokenInfo.getLocalToken();
        headers.append("Authorization", `Bearer ${tokenInfo && tokenInfo.access_token || token}`);
        return this.http.post(url, {
            strategyId: newAccess.strategyId,
            shopId: newAccess.shopId
        }, {headers}).subscribe((suc)=>{
            successFunc && successFunc(suc.json());
        }, (error)=>{
            this.errorHandler(error, errorFunc);
        });
    };
}
