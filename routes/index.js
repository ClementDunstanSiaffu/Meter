const {helper} = require('../helpers/')
const mongoose = require('mongoose')
const Meter = mongoose.model("METER")

let token = null

exports.get_tokens = (req,res)=>{
    if (req.params == "A"){
        const tokens = helper.arr_for_meterA()
        res.send(tokens)
    }else{
        const tokens = helper.arr_for_meterB()
        res.send(tokens)
    }
}

exports.get_amount = async (req,res)=>{
    const passcode = req.params
    if (passcode == "A" || passcode == "B"){
        const thatMeter = await Meter.findOne(passcode)
        const amount = thatMeter.amount
        res.status(200).json(amount)
    }else{
        res.status(200).json(0)
    }
  

}

exports.get_unit = async (req,res)=>{
    if (passcode == "A" || passcode == "B"){
        const passcode = req.params
        const thatMeter = await Meter.findOne(passcode)
        const unit = thatMeter.unit
        res.json(unit)
    }else{
        res.json(0)
    }
   
}

exports.post_unit = async(req,res)=>{
    const obj = req.params
    if (obj.passcode == "A" || obj.passcode == "B"){
        const meter = await Meter.findOne({passcode:obj.passcode})
        const docs = await Meter.find((err,docs)=>{return docs})
        const index = docs.findIndex((docs)=>docs.passcode == obj.passcode)
        meter.unit = parseInt(obj.unit)
        await Meter.replaceOne(docs[index],meter)
        res.send("SUCCESS")
    }else{
        res.send("FAILED")
    }
   
}

exports.post_amount = async(req,res)=>{
    const obj = req.params
    if(obj.passcode == "A" || obj.passcode == "B"){
        const meter = await Meter.findOne({passcode:obj.passcode})
        const docs = await Meter.find((err,docs)=>{return docs})
        const index = docs.findIndex((docs)=>docs.passcode == obj.passcode)
        meter.amount = parseInt(obj.amount)
        await Meter.replaceOne(docs[index],meter)
        res.send("SUCCESS") 
    }else{
        res.send("FAILED") 
    }
    
}

exports.calculating_unit = async(req,res)=>{
    const obj = req.params
    if (obj.passcode == "A" || obj.passcode == "B"){
        const meter = await Meter.findOne({passcode:obj.passcode})
        const docs = await Meter.find((err,docs)=>{return docs})
        const index = docs.findIndex((docs)=>docs.passcode == obj.passcode)
        if (index !== -1){
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
                if (obj.passcode == "A"){
                    const tokens = helper.arr_for_meterA()
                    const data = {
                        "tokens":tokens + " " + str_unit,
                        "unit":`${unit}`,
                        "status":"okay"
                    }
                    await Meter.replaceOne(docs[index],meter)
                    if (data.tokens !== null){
                        token = data.tokens
                        data.tokens = null
                    }else{
                        token = "0"
                    }
                    res.json({"tokens":token})
                }else{
                    const tokens = helper.arr_for_meterB()
                    const data = {
                        "tokens":tokens + " " + str_unit,
                        "unit":`${unit}`,
                        "status":"okay"
                    }
                    await Meter.replaceOne(docs[index],meter)
                    if (data.tokens !== null){
                        token = data.tokens
                        data.tokens = null
                    }else{
                        token = "0"
                    }
                    res.json({"tokens":token})
                }
            }else{
                res.json({"status":"insufficient balance"})
            }
        }
       
    }else{
        res.json({"status":"unmatch password"})
    }
    
}

exports.set_threshold = async(req,res)=>{
    const obj = req.params
    if(obj.passcode == "A" || obj.passcode == "B"){
        const meter = await Meter.findOne({passcode:obj.passcode})
        const docs = await Meter.find((err,docs)=>{return docs})
        const index = docs.findIndex((docs)=>docs.passcode == obj.passcode)
        meter.threshold = obj.threshold
        await Meter.replaceOne(docs[index],meter)
        res.json({"status":"SUCCESS"})
    }else{
        res.send({"status":"SUCCESS"})
    }
   
    // if (obj.passcode == "A"){
    //     helper.set_threshold_for_meterA(obj.threshold)
    // }else{
    //     if (obj.passcode == "B"){
    //         helper.set_threshold_for_meterB(obj.threshold)
    //     }else{
    //         helper.set_threshold_for_meterB(-1)
    //         helper.set_threshold_for_meterA(-1)
    //     }
    // }
}

exports.get_threshold = async(req,res)=>{
    const obj = req.params
    if(obj.passcode == "A" || obj.passcode == "B"){
        const meter = await Meter.findOne({passcode:obj.passcode})
        const threshold = meter.threshold
        res.json({"tokens":`${threshold}`})
    }else{
        res.json({"tokens":"0"})
    }
   
    // if (obj.passcode == "A"){
    //     const threshold = helper.get_threshold_for_meterA()
    //     res.send(`${threshold}`)
    // }else{
    //     if (obj.passcode == "B"){
    //         const threshold = helper.get_threshold_for_meterB()
    //         res.send(`${threshold}`)
    //     }else{
    //         res.send("0")
            
    //     }
    // }
}

