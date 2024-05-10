export const getActive = async () => {
    while(true) {
        if(window._web3 && window.price) break
        await new Promise((res) => { setTimeout(() => { res(true) }, 2000) })
    }

    let index_1 = 0
    let index_2 = 0

    let i = 0
    let i_2 = 0
    
    window.price.forEach(v => {
        if(v.active) {
            index_1 = i
            v.swap.forEach(j => {

                if(j.active) {
                    index_2 = i_2
                }
                i_2++
            })
        }
        i++
    });

    return { index_1, index_2 }
}