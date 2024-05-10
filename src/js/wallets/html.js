import { acc_split } from '../func'

export const set_html = (SETTING) => { // after reg
    //console.log(SETTING)
    //////////// upper menu //////////////////////////
    let user_data = document.getElementById("user_data")
    let button_1 = document.getElementById("show-1")
    let time = document.getElementById("show-1_time")

    button_1.className = "display_none"
    time.className = "display_none"
    user_data.className = "relative"

    let trans_reg = document.getElementById("trans_reg")
    let trans_input = document.getElementById("trans_input")

    trans_reg.className = "display_none"
    trans_input.className = ""
    ////////////////////// copy id account //////////////////////////
    
    let button_copy = document.getElementById("button_copy")
    button_copy.addEventListener('click', () => {
        navigator.clipboard.writeText(acc)
    })
    
    ////////////////////// 0x60Ed...09fE /////////////////////
  
    let acc_wallet = document.getElementById("acc_wallet")

    let acc = SETTING.acc
    acc_wallet.innerHTML = acc_split(acc)
}