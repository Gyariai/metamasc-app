export const LogInMetamask = async () => {
    const web3 = new Web3(window.ethereum);

    return await window.ethereum.request({ method: "eth_requestAccounts" })
    .then((res) => {
        return {
            acc: res, web3: web3, wallet: "meta"
        }
    })
    .catch(() => false)
}