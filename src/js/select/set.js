import { Coin } from '../wallets/coin/setting'
import { SetPrice } from '../inputs'
import { countZeros } from '../func.js'

import { SwitchNetwork } from '../swith_net/switch'

import { swap } from './swap'


import { SET_BALANCE } from '../balance/setBalance'

export const set_new = (coin, Select_comp) => {
    let index = 0
    let i = 0
    Coin.forEach(v => {
        if(v.label === coin) {
            index = i
            localStorage.setItem("index_1", index)
        }
        i++
    })
    localStorage.setItem("index_1_price", index)

    const input_1 = document.getElementById("input_1")
    const input_2 = document.getElementById("input_2")

    const img_1 = document.getElementById("img_1")
    const img_2 = document.getElementById("img_2")
    img_1.src = Coin[index].img
    img_2.src = Coin[index].swap[0].img


    input_1.value = 1
    const value_2_sum = (Coin[index].value$ / Coin[index].swap[0].value$)
    const null_2 = countZeros(value_2_sum)
    input_2.value = value_2_sum.toFixed(null_2)

    let el = document.getElementById('select_value_2'),
    elClone = el.cloneNode(true);

    el.parentNode.replaceChild(elClone, el);

    Select_comp("select_value_2", Coin[index].swap, 0, "img_2")
    SetPrice(Coin[index], Coin[index].swap[0]) /// под инпутами

    swap(index)
    SwitchNetwork()
    SET_BALANCE()
}