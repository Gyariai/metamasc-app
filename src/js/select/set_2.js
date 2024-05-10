import { countZeros } from '../func.js'
import { SetPrice } from '../inputs'

import { swap } from './swap'

import { SET_BALANCE } from '../balance/setBalance'

export const set_new_2 = (coin, Select_comp) => {

    let index = 0

    let i = 0
    window.price.forEach(v => {
        if(v.active) index = i
        i++
    });


    let swap_p = null

    let index_2 = 0
    let net = window.price[index]
    net.swap.forEach(v => {
        if(v.label === coin) {
            swap_p = v
            localStorage.setItem("index_2", index_2)
        }
        index_2++
    })



    const img_1 = document.getElementById("img_1")
    const img_2 = document.getElementById("img_2")
    img_1.src = net.img
    img_2.src = swap_p.swap[0].img

    const input_1 = document.getElementById("input_1")
    const input_2 = document.getElementById("input_2")

    const value_2_sum = (net.value$ / swap_p.value$)

    const null_2 = countZeros(value_2_sum)
    input_2.value = value_2_sum.toFixed(null_2)
    input_1.value = 1

    SetPrice(net, swap_p) /// под инпутами
    swap(null , swap_p.label)
    SET_BALANCE()
}