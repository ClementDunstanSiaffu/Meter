
class Helpers{
    threshold_for_meterA = -1;
    threshold_for_meterB = -1;

    arr_for_meterA = ()=>{
        const tokens = [
            "1324 3310 2120",
            "4343 2132 3010",
            "2132 4334 0001"
        ]
        const n = Math.floor(Math.random()*3)
        return tokens[n]
    }

    arr_for_meterB = ()=>{
        const tokens = [
            "6575 8797 5555",
            "9787 8889 7566",
            "9876 5676 9997"
        ]
        const n = Math.floor(Math.random()*3)
        return tokens[n]
    }

    set_threshold_for_meterA = (val)=>{
        this.threshold_for_meterA = val;
    }

    set_threshold_for_meterB = (val)=>{
        this.threshold_for_meterB = val;
    }

    get_threshold_for_meterA  = ()=>{
        return this.threshold_for_meterA
    }

    get_threshold_for_meterB  = ()=>{
        return this.threshold_for_meterB
    }


}

const helper = new Helpers()
module.exports = {helper}