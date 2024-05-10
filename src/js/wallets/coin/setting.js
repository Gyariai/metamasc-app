const Main =  {
    label: "ZKS", 
    value$: 0.1,
    img: "img/gtcoin.png",
    toWei: "picoether",
    token: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    abi: require("./main/usdt.json"),
}

const Bnb =  {
    label: "ZKS", 
    value$: 0.1, // цена
    img: "img/gtcoin.png",
    toWei: "picoether",
    token: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    abi: require("./main/usdt.json"),
}

export const Coin = [
    {
        label: "ETH", 
        value$: 1114.59, 
        net: "main",
        toWei: "ether",
        swap: [Main],
        img: "img/eth.png"
    },
    {
        label: "USDT", 
        value$: 1, 
        token: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
        abi: require("./main/usdt.json"),
        net: "main",
        toWei: "picoether",
        swap: [Main],
        img: "img/usdt.png"
    },
    {
        label: "BNB", 
        value$: 212.05,
        net: "bnb",
        toWei: "ether",
        swap: [Bnb],
        img: "img/b.png"
    },
    {
        label: "BUSD", 
        value$: 1,
        net: "bnb",
        token: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56", // токен контракта
        abi: require("./bnb/busd.json"), // аби контракта
        toWei: "ether", // множитель таблица вверху
        swap: [Bnb],
        img: "img/busd.png"
    },
]