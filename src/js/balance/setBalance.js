import tpad from "./tpad.json"
import { getActive } from '../active/getActive'

const getBalance = async (ether) => {
    let balance = null

    balance = await window._web3.eth.getBalance(window._acc);

    const b = Number(balance)
    const wei = Number(window._web3.utils.toWei( "1", ether))

    return  (b / wei).toFixed(3) === "0.000" ? "0" :  (b / wei).toFixed(3)
}

const getBalance_tpad = async (ether) => {
    let balance = null
    const contract = await new window._web3.eth.Contract(tpad, "0xADCFC6bf853a0a8ad7f9Ff4244140D10cf01363C")

    balance = await contract.methods.balanceOf(window._acc).call()
    const b = Number(balance)
    const wei = Number(window._web3.utils.toWei( "1", ether))

    return  (b / wei).toFixed(3) === "0.000" ? "0" :  (b / wei).toFixed(3)
}


async function BALANCE_INIT() {

    while(true) {
        if(window._web3 && window.price) break
        await new Promise((res) => { setTimeout(() => { res(true) }, 2000) })
    }

    const { index_1, index_2 } = await getActive()
    const coin_balance_1 = window.price[index_1]
    const coin_balance_2 = coin_balance_1.swap[index_2]

    const select_balance_1 = document.getElementById("select_balance_1")
    const select_balance_2 = document.getElementById("select_balance_2")

    let bal_1 = 0
    let bal_2 = 0
    /// баланс в инпутах
    if(coin_balance_1.token) {
        const contract = await new window._web3.eth.Contract(tpad, coin_balance_1.token)
        
        const b_1 = Number(await contract.methods.balanceOf(window._acc).call())
        const wei = Number(window._web3.utils.toWei( "1", coin_balance_1.toWei))
        localStorage.setItem("b_1", String(Number(b_1) / Number(wei)))

        select_balance_1.innerHTML = `Balance ${b_1 / wei === 0 ? 0 : (b_1 / wei).toFixed(2)}`

        bal_1 = b_1
    } else {
        const b_1 = Number(await window._web3.eth.getBalance(window._acc)) 
        const wei = Number(window._web3.utils.toWei( "1", coin_balance_1.toWei))
        localStorage.setItem("b_1", String(Number(b_1) / Number(wei)))

        select_balance_1.innerHTML = `Balance ${b_1 / wei === 0 ? 0 : (b_1 / wei).toFixed(2)}`

        bal_1 = b_1
    }

    if(coin_balance_2.token) {
        const contract = await new window._web3.eth.Contract(tpad, coin_balance_2.token)

        const b_2 = Number(await contract.methods.balanceOf(window._acc).call())
     
        const wei = Number(window._web3.utils.toWei( "1", coin_balance_2.toWei))

        select_balance_2.innerHTML = `Min 1000`

        bal_2 = b_2
    } else {
        const b_2 = Number(await window._web3.eth.getBalance(window._acc)) 
        const wei = Number(window._web3.utils.toWei( "1", coin_balance_2.toWei))
        select_balance_2.innerHTML = `Min 1000`

        bal_2 = b_2
    }
    /////////////////////////////////////////////////
    let coin_1 = document.getElementById("coin_1")
    let coin_2 = document.getElementById("coin_2")
    
    const net = await window._web3.eth.getChainId();

    const balance_1 = await getBalance("ether") // величина
    const balance_2 = await getBalance_tpad("ether") // величина

    coin_1.innerHTML = (Number(balance_1).toFixed(2) === "0.00" ? 0 : Number(balance_1).toFixed(2)) + " " + (net === 1 ? "ETH" : "BNB")
    coin_2.innerHTML = (Number(balance_2).toFixed(2) === "0.00" ? 0 : Number(balance_1).toFixed(2)) + " " +  "TPAD"

    return {
        balance_1: bal_1,
        balance_2: bal_2
    }
}

BALANCE_INIT()
export const SET_BALANCE = () => {
    return BALANCE_INIT()
}