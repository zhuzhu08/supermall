export default {
    addCart(context, payload) {
        return new Promise((resolve, reject) => {
            let oldProduct = context.state.cartlist.find(item => item.iid === payload.iid)
            if (oldProduct) {
                //这里是数量+1
                context.commit('addCounter', oldProduct)
                resolve('当前的商品数量+1')
            } else {
                //这里是添加商品
                payload.count = 1
                context.commit('addToCart', payload)
                resolve('这里是添加新商品')
            }
        })
    }
}