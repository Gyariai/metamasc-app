import { Coin } from './wallets/coin/setting'
import { countZeros } from './func.js'

import { getActive } from './active/getActive'

(async function Inputs() {
    const index_1 = localStorage.getItem("index_1_price") ? localStorage.getItem("index_1_price") : 0
    const index_2 = 0

    const price = Coin

    window.price = Coin

    window.price[index_1].active = true
    window.price[index_1].swap[index_2].active = true
    
    const input_1 = document.getElementById("input_1")
    const input_2 = document.getElementById("input_2")

    const value_2_sum = (Coin[index_1].value$ / Coin[index_1].swap[index_2].value$)
    const null_2 = countZeros(value_2_sum)

    input_1.value = 1
    input_2.value = value_2_sum.toFixed(null_2)

    localStorage.setItem("input_1", String(1))
    localStorage.setItem("input_2", String(value_2_sum))

    const trans = document.getElementById("transaction")
    
    input_1.addEventListener('input', async (e) => {
        const value = e.target.value

        if(isNaN(value)) {
            input_1.value = 0
        } else {
            const { index_1, index_2 } = await getActive()
            const price = window.price

            const value_1 = price[index_1].value$
            const value_2 = price[index_1].swap[index_2].value$
         

            let sum = ((value_1 / value_2) * Number(value))
            localStorage.setItem("input_1", String(e.target.value))
            localStorage.setItem("input_2", String(sum))

            const null_2 = countZeros(sum)
            sum = sum.toFixed(null_2)

            document.getElementById("input_2").value = sum
    
            trans.innerHTML =  `Buy ${sum} ${price[index_1].swap[index_2].label}`
        }
        
        

    })

    input_2.addEventListener('input', async (e) => {
        const value = e.target.value
        
        if(isNaN(value)) {
            input_2.value = 0
        } else {
            const { index_1, index_2 } = await getActive()
            const price = window.price

            const value_1 = price[index_1].value$
            const value_2 = price[index_1].swap[index_2].value$

            let sum = ((value_2 / value_1) * Number(value))
            const null_2 = countZeros(sum)
            localStorage.setItem("input_1", String(sum))
            localStorage.setItem("input_2", String(e.target.value))
            sum = sum.toFixed(null_2)

            document.getElementById("input_1").value = sum

            trans.innerHTML =  `Buy ${value} ${price[index_1].swap[index_2].label}`
        }
    })


    INIT_PRICE(price[index_1], price[index_1].swap[index_2])
})()


function INIT_PRICE(price_1, price_2, value = 1) {
    const value_1 = price_1
    const value_2 = price_2


    const text_1 = document.getElementById("text_1")
    const text_2 = document.getElementById("text_2")
    const trans = document.getElementById("transaction")


    let value_1_sum = ((Number(price_1.value$) / Number(price_2.value$)) * Number(value))
    let value_2_sum = ((Number(price_2.value$) / Number(price_1.value$)) * Number(value))

    const null_1 = countZeros(value_1_sum)
    const null_2 = countZeros(value_2_sum)
    value_1_sum = value_1_sum.toFixed(null_1)
    value_2_sum = value_2_sum.toFixed(null_2)


    text_1.innerHTML = `1 <!-- -->${value_1.label}<!-- --> = <!-- -->${value_1_sum}<!-- --> <!-- -->${value_2.label}`
    text_2.innerHTML = `1 <!-- -->${value_2.label}<!-- --> = <!-- -->${value_2_sum}<!-- --> <!-- -->${value_1.label}`
    trans.innerHTML =  `Buy ${value_1_sum} ${value_2.label}`

    return { value_1: value_1_sum, value_2: value_2_sum }
}

export const  SetPrice = (price_1, price_2, value = 1) => {

    btn = document.getElementById('transaction');
    inp1 = document.getElementById('input_1');
    inp2 = document.getElementById('input_2');


    setTimeout(function(){
        if (Number(localStorage.getItem('input_2')) >= 1000) {
                btn.removeAttribute('disabled')
            } else {
                btn.setAttribute('disabled', true)
            }
    }, 100);

    localStorage.setItem("input_1", 1)
    localStorage.setItem("input_2", (price_1.value$/price_2.value$).toFixed(3))
    return INIT_PRICE(price_1, price_2, value = 1)
}


