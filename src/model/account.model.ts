import { Base64 } from "../providers/utility";

export class AccountInfo {
    id:number;
    account:string;
    account_name:string;
    phone:string;
    gender:number;
    avatar:string;
    accountType:string;

    public static getLocalAccount(): AccountInfo {
        let base64Account = localStorage.getItem("account");
        if (base64Account) {
            return JSON.parse(Base64.decode(base64Account));
        }
    }

    public static saveLocalAccount(accountInfo:AccountInfo): void{
        if(accountInfo){
            let infoString = JSON.stringify(accountInfo);
            localStorage.setItem("account", Base64.encode(infoString));
        }
    }

    public static removeLocalAccount():void{
        localStorage.removeItem("account");
    }

}

export class TokenInfo{
    token_type:string;
    access_token: string;
    expires_in: number;
    refresh_token: string;

    public static getLocalToken(): TokenInfo{
        let tokenString = localStorage.getItem("token");
        if(tokenString){
            return JSON.parse(tokenString);
        }
    }

    public static saveLocalToken(tokenInfo: TokenInfo): void{
        if(tokenInfo){
            let infoString = JSON.stringify(tokenInfo);
            localStorage.setItem("token", infoString);
        };
    }

    public static removeLocalToken():void{
        localStorage.removeItem("token");
    }
}
