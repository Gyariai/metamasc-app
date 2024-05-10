export const acc_split = (acc) => {
    const f = acc.slice(0, 6)
    const l = acc.slice(acc.length - 4, acc.length)

    return f + "..." + l
}

export const countZeros = (num) => {

    let split = String(num).split(".")
    if(split[1]) {

        const float = split[1]
        let sum = 3

        let i = 0

        while (i < float.length) {
            if(float[i] === "0") {
                sum = sum + 1
            } else {
                break
            }
            i++;
        }
       
        return sum
    } else {
        return 0
    }
}