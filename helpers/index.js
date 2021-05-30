
class Helpers{

    arr_for_meterA = ()=>{
        const tokens = [
            "1324 3310 2120 3330",
            "4343 2132 3010 4321",
            "2132 4334 0001 2123"
        ]
        const n = Math.floor(Math.random()*3)
        return tokens[n]
    }

    arr_for_meterB = ()=>{
        const tokens = [
            "6575 8797 5555 9987",
            "9787 8889 7566 7558",
            "9876 5676 9997 7766"
        ]
        const n = Math.floor(Math.random()*3)
        return tokens[n]
    }
}

const helper = new Helpers()
module.exports = {helper}