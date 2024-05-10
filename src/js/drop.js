(function DROP(){
    const drop_1 = document.getElementById("show-1")
    const drop_2 = document.getElementById("show-2")

    drop_1.addEventListener("click", () => {
        openclose(document.getElementById("show-11"))
    })

    drop_2.addEventListener("click", () => {
        openclose(document.getElementById("show-22"))
    })
})()

const openclose = (drop, className = "") => {

    if(drop.className === "display_none") {
        drop.className = className
    } else {
        drop.className = "display_none"
    }
}
