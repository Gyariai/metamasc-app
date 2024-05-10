export const LogInTrustWallet = async (id = 1, prov) => {
  if(prov) {
    await prov.close();
  }

  const provider = new WalletConnectProvider.default({
    rpc: {
        1: "https://cloudflare-eth.com/",
        56: "https://bsc-dataseed1.binance.org/",
    },
    chainId: id,
    qrcode: false,
    qrcodeModalOptions: {
      mobileLinks: [
        "trust",
      ],
    },
  });

  provider.connector.on("display_uri", (err, payload) => {
    const uri = payload.params[0];

    window.open(uri)
  })

const res = await provider.enable()
  .then((res) => res)
  .catch(() => false)

  if(res) {
    const web3 = new Web3(provider);

      return {
          acc: res, web3: web3, wallet: "trust", provider: provider
      }
  } else {
    return false
  }
}
