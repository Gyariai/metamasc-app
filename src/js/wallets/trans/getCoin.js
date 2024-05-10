import { getActive } from '../../active/getActive'

export const getCoins = async () => {
    const price = window.price
    const { index_1, index_2 } = await getActive()
    
    const coin_1 = price[index_1]
    const coin_2 = price[index_1].swap[index_2]

    const token_1 = coin_1.token
    const abi_1 = coin_1.abi

    const token_2 = coin_2.token
    const abi_2 = coin_2.abi

    coin_1.contract = token_1 ? await new window._web3.eth.Contract(abi_1, token_1) : false
    coin_2.contract = token_1 ? await new window._web3.eth.Contract(abi_2, token_2) : false

    return {
        coin_1, coin_2
    }
}

export const getransferContract = async (token) => {
    return await new window._web3.eth.Contract(abi, token)
}