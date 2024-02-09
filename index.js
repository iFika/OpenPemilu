const dptpemilu = require("./lib/DPTPemilu")
const rl = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
})


;(async () => {
console.log(`Get A Data from NIK`)
rl.question(`NIK > `, async(nik) => {
let result = await dptpemilu.GetPemilu(Number(nik))
console.log(result)
})
})()