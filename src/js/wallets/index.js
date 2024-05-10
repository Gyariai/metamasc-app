import { LogInMetamask } from './metamask.js'
import { LogInWalletConnect } from './wallet'
import { LogInTrustWallet } from './trust'

import { send_transation } from './trans/transaction'

import { set_html } from './html'

const setting = {
    acc: null,
    wallet: "",
    web3: null,
    provider: null,
    balanceBNB: 0,
    balanceUSDT: 0,
    balanceTPAD: 0,
    status: false,   
}

let SETTING = {...setting}
    ///////////////////////////////////////////////////////
    const set_data = (register, trust = false) => {
        SETTING.acc = register.acc[0]
        SETTING.wallet = register.wallet
        SETTING.web3 = register.web3
        SETTING.provider = register.provider
        window._provider = register.provider
        window._web3 = register.web3
        window._acc = register.acc[0]
        window._wallet = register.wallet
        window.trust = trust
    }
    ////////////////////////////////////////////////////////

export const Reg_trust = (register) => {
        set_data(register, true)
        set_html(SETTING)
}

(function INIT() {

    let METAMASK = document.getElementById("metamask")
    let WALLET = document.getElementById("wallet")
    let TRUST = document.getElementById("trust")

    let METAMASK_2 = document.getElementById("metamask_2")
    let WALLET_2 = document.getElementById("wallet_2")
    let TRUST_2 = document.getElementById("trust_2")

    let TRANSACTION = document.getElementById("transaction")

    METAMASK.addEventListener("click", async () => {
        console.log(1)
        if(window.ethereum.isConnected()) {
            const register = await LogInMetamask()
            if(register) {
                Reg(register)
            }
        } else {
            Alert("Metamask not found, refresh the page.", "danger")
        }
    })
    METAMASK_2.addEventListener("click", async () => {
        console.log(1)
        if(window.ethereum.isConnected()) {
            const register = await LogInMetamask()
            if(register) {
                Reg(register)
            }
        } else {
            Alert("Metamask not found, refresh the page.", "danger")
        }
    })

    WALLET.addEventListener("click", async () => {
        console.log(2)
        const register = await LogInWalletConnect()
        if(register) {
            Reg(register)
        }
    })
    WALLET_2.addEventListener("click", async () => {
        console.log(2)
        const register = await LogInWalletConnect()
        if(register) {
            Reg(register)
        }
    })

    TRUST.addEventListener("click", async () => {

        const register = await LogInTrustWallet()
       
        if(register) {
            Reg(register , true)
        }
    })
    TRUST_2.addEventListener("click", async () => {

        const register = await LogInTrustWallet()
       
        if(register) {
            Reg(register , true)
        }
    })

    TRANSACTION.addEventListener("click", async () => {
        
        const status = await send_transation(SETTING)
        if(status) {
            Session()
        }
    })


    const Reg = async (register , trust = false) => {
        set_data(register, trust)
        Save("wallet", SETTING.wallet)
        set_html(SETTING)

        const exit = document.getElementById('exit')

        exit.addEventListener("click", () => {
            Save("wallet", "")
            setTimeout(() => {
                if(window._provider) {
                    window._provider.close();
                }
                localStorage.clear()
                window.location.reload()
            }, 500)
        })
    }
    
    const Save = (label, value) => {
        return localStorage.setItem(label, value)
    }
    
    const Load = (label) => {
        return localStorage.getItem(label)
    }


   function Session(){
        setTimeout( async () => {
            if(window.ethereum) {
                const w = Load("wallet")
                if(w === "meta") {
                    const register = await LogInMetamask()
                    if(register) {
                        Reg(register)
                    }
                }
        
                if(w === "wallet") {
                    const register = await LogInWalletConnect()
                    if(register) {
                        Reg(register)
                    }
                }
    
            } else {
                Save("wallet", "")
            }
        }, 100)
    }
    Session()

})()