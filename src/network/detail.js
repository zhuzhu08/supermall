import { request } from "./request";


export function getDetail(iid) {
    return request({
        url: '/detail',
        params: {
            iid
        }
    })
}

export function getRecommend() {
    return request({
        url: '/recommend'
    })

}


export class Goods {
    constructor(itemInfo, columns, services) {
        this.title = itemInfo.title
        this.desc = itemInfo.desc
        this.newPrice = itemInfo.price
        this.oldPrice = itemInfo.oldPrice
        this.discount = itemInfo.discountDesc
        this.realPrice = itemInfo.lowNowPrice
        this.columns = columns
        this.services = services

    }
}

export class Shop {
    constructor(shopInfo) {
        this.logo = shopInfo.shopLogo;
        this.name = shopInfo.name
        this.fans = shopInfo.cFans;
        this.sells = shopInfo.cSells
        this.score = shopInfo.score
        this.GoodsCount = shopInfo.cGoods
    }
}

export class GoodsParam {
    constructor(info, relu) {
        this.image = info.image ? info.image[0] : ''
        this.info = info.set
        this.sizes = relu.tables
    }
}