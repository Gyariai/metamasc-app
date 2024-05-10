import { Coin } from '../wallets/coin/setting'
import { set_new } from './set'
import { set_new_2 } from './set_2'

const Select_comp = async (id, coin, index, img) => {
    const img_1 = document.getElementById(img)
    img_1.src = coin[index].img

    const select = document.getElementById(id)
    select.innerHTML = ''
    const value = document.createElement("p")
    value.innerHTML = coin[index].label
    value.className = coin.length <= 1 ? "" : "dropdown-toggle"
 
    ///////////////////////////////////////////////////////////////////

    const layout = document.createElement("div")
    const content = document.createElement("div")
    layout.className = "display_none"
    content.className = "menu_select_content"

    if(coin.length > 1) {
        select.style = "cursor: pointer; position: relative"

        let i = 0
        coin.forEach(v => {
            if(i !== Number(index)) {
                const option = document.createElement("div")
                option.innerHTML = v.label
     
                option.addEventListener('click', e => {
                    const sel = document.getElementById(id).children[0].innerHTML
                    const opt = e.target.innerHTML
    
                    e.target.innerHTML = sel
                    document.getElementById(id).children[0].innerHTML = opt

                   
                    if(id === "select_value_1") {
                        set_new(opt, Select_comp)
                    } else {
                        set_new_2(opt, Select_comp)
                    }
                })
    
                content.append(option)
            }
            i++
        });
    }

    select.append(value)
    layout.append(content)
    select.append(layout)

    if(coin.length > 1) {
        select.addEventListener("click", e => {
            const s = document.getElementById(id).children[1]
            if(s?.className === "display_none") {
                s.className = "menu_select"
            } else {
                s.className = "display_none"
            }
        })
    }
}

(async function SELECT() {
    const index_1 = localStorage.getItem("index_1_price") ? localStorage.getItem("index_1_price") : 0
    Select_comp("select_value_1", Coin, index_1, "img_1")
    Select_comp("select_value_2", Coin[index_1].swap, 0, "img_2")
})()

export const Set_Select = (id, coin) => {
    Select_comp(id, coin)
}

