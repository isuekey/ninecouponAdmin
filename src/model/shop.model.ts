export class AreaInfo {
    name:string;
    areaIndex: string;
    status:string;
    latitude:number;
    longitude:number;
    randomId:number;
}

export class ShopInfo{
    id:number;
    name:string;
    owner:string;
    ownerId:number;
    area:number;
    areaIndex:string;
}

export class Strategy{
    id: number;
    strategyName: string;
    data: CouponData;
    status: string;
    origin: string;
}

export class CouponData{
    title:string;
    desc:string;
    offset: number;
    consumption: number;
}

export class StrategyAccess{
    id: number;
    strategyId: number;
    shopId: number;
    status: string;
    strategy: Strategy;
}