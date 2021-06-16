const {helper} = require('../helpers/')
const mongoose = require('mongoose')
const Meter = mongoose.model("METER")

exports.get_tokens = (req,res)=>{
    if (req.params == 12345){
        const tokens = helper.arr_for_meterA()
        res.send(tokens)
    }else{
        const tokens = helper.arr_for_meterB()
        res.send(tokens)
    }
}

exports.get_amount = async (req,res)=>{
    const passcode = req.params
    const thatMeter = await Meter.findOne(passcode)
    const amount = thatMeter.amount
    res.status(200).json(amount)

}

exports.get_unit = async (req,res)=>{
    const passcode = req.params
    const thatMeter = await Meter.findOne(passcode)
    const unit = thatMeter.unit
    res.json(unit)
}

exports.post_unit = async(req,res)=>{
    const obj = req.params
    const meter = await Meter.findOne({passcode:obj.passcode})
    const docs = await Meter.find((err,docs)=>{return docs})
    const index = docs.findIndex((docs)=>docs.passcode == obj.passcode)
    meter.unit = parseInt(obj.unit)
    await Meter.replaceOne(docs[index],meter)
    res.send("SUCCESS")
}

exports.post_amount = async(req,res)=>{
    const obj = req.params
    const meter = await Meter.findOne({passcode:obj.passcode})
    const docs = await Meter.find((err,docs)=>{return docs})
    const index = docs.findIndex((docs)=>docs.passcode == obj.passcode)
    meter.amount = parseInt(obj.amount)
    await Meter.replaceOne(docs[index],meter)
    res.send("SUCCESS")
}

exports.calculating_unit = async(req,res)=>{
    const obj = req.params
    const meter = await Meter.findOne({passcode:obj.passcode})
    const docs = await Meter.find((err,docs)=>{return docs})
    const index = docs.findIndex((docs)=>docs.passcode == obj.passcode)
    if (meter.amount > parseInt(obj.amount)){
        meter.amount -= obj.amount
        const unit = parseInt(obj.amount/300)
        meter.unit = unit
        let str_unit
        if (unit >= 100 && unit <= 999){
            str_unit = `0${unit}`
        }else{
            if (unit >= 1000){
                str_unit = `${unit}`
            }else{
                if (unit >=10 && unit <= 99){
                    str_unit = `00${unit}`
                }else{
                    str_unit = `000${unit}`
                }
               
            }
           
        }
        if (obj.passcode == 12345){
            const tokens = helper.arr_for_meterA()
            const data = {
                "tokens":tokens + " " + str_unit,
                "unit":`${unit}`,
                "status":"okay"
            }
            await Meter.replaceOne(docs[index],meter)
            res.send(`${data.tokens}`)
        }else{
            const tokens = helper.arr_for_meterB()
            const data = {
                "tokens":tokens,
                "unit":`${unit}`,
                "status":"okay"
            }
            await Meter.replaceOne(docs[index],meter)
            res.send(`${data.tokens}`)
        }
    }else{
        res.send(
            "failed")
    }
    

    
}
