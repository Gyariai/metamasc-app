export const swap = (index_1 = null, index_2) => {
    if(index_1 !== null) {
        const price = window.price
        let arr = []

        let i = 0
        price.forEach(v => {
            if(v.active) {
                v.active = false
                arr.push(v)
            } else {
                if(index_1 === i) {
                    v.active = true
                }
                arr.push(v)
            }

          

            i++
        });

        window.price = arr
    } else {

        let arr = []

        window.price.forEach(v => {
            if(v.active) {
                let arr_2 = []
                v.swap.forEach(j => {
                   j.active = false

                   if(j.label === index_2) {
                        j.active = true
                        arr_2.push(j)
                   } else {
                    arr_2.push(j)
                   }

                })

                v.swap = arr_2
                arr.push(v)
            } else {
                arr.push(v) 
            }
        })

        window.price = arr
    }

}