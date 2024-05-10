export const network = [
    {
        id: 1,
        net: "main",
        params: [{
            chainId: '0x1',
        }]
    },
    {
        id: 56,
        net: "bnb",
        params: [{
            chainId: "0x38",
            rpcUrls: ["https://bsc-dataseed.binance.org/"],
            chainName: "BNB",
            nativeCurrency: {
                name: "BNB",
                symbol: "BNB",
                decimals: 18
            },
            blockExplorerUrls: ['https://bscscan.com']
        }]
    }
]