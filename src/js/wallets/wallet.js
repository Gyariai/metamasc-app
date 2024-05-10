
export const LogInWalletConnect = async () => {

    const provider = new WalletConnectProvider.default({
        rpc: {
          1: "https://cloudflare-eth.com/",
          56: "https://bsc-dataseed.binance.org/",
        }
    });

    const res = await provider.enable()
    .then((res) => res)
    .catch(() => false)

   
    if(res) {
      const web3 = new Web3(provider);
        return {
            acc: res, web3: web3, wallet: "wallet", provider: provider
        }
    } else {
      return false
    }
    
}