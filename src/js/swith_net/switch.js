import { getActive } from "../active/getActive"
import { network } from '../wallets/coin/network'

import { SET_BALANCE } from '../balance/setBalance'

import { LogInTrustWallet } from "../wallets/trust"
import { Reg_trust } from '../wallets/index'



export const SwitchNetwork = async () => {
    while(true) {
        if(window._web3) break
        await new Promise((res) => { setTimeout(() => { res(true) }, 2000) })
    }

    const params = await CheckNetwork()
    console.log( window._provider)
    if(params !== true) {
        if(window._provider) {
            if(window._wallet === "trust") {
                let id = params[0].chainId === "0x1" ? 1 : 56
                const res = await LogInTrustWallet(id, window._provider)
                if(!!res) {
                    Reg_trust(res)
                    return true
                } else {
                    return false
                }
            } else {
                window._provider.request({
                    method: params[0].chainId === "0x1" ? "wallet_switchEthereumChain" : "wallet_addEthereumChain",
                    params: params
                })
                .then((e) => {
                    SET_BALANCE()
                    return true
                })
                .catch((e) => {

                    false
                })
            }
        } else {
            return await window.ethereum.request({
                method: params[0].chainId === "0x1" ? "wallet_switchEthereumChain" : "wallet_addEthereumChain",
                params: params
            })
            .then((e) => {
                SET_BALANCE()
                return true
            })
            .catch(() => false)
        }

    } else {
        return true
    }
}

const CheckNetwork = async () => {
    const id = await window._web3.eth.net.getId()
    .then(res => res)
    .catch(() => false)

    if(id) {
        return active_net(id)
    } else {
        return false
    }

}

const active_net = (id) => {
    let net = network[0]
    network.forEach(v => {
        if(v.id === id) {
            net = v
        }
    })

    const index_1 = localStorage.getItem("index_1_price") ? localStorage.getItem("index_1_price") : 0
    if(window.price[index_1].net === net.net) {
        return true
    } else {
        let res = false
        network.forEach(v => {
            if(window.price[index_1].net === v.net) {
                res = v.params
            }
        })

        return res
    }
}

(function INIT_SWITCH() {
    SwitchNetwork()
})()


export const CheckStatus = async () => {
    const { index_1 } = await getActive()
    const active_net = window.price[index_1].net
    return  await CheckNetwork(active_net, network)
}
