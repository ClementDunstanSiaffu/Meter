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
    meter.unit = obj.unit
    await Meter.replaceOne(docs[index],meter)
    res.send("SUCCESS")
}

exports.post_amount = async(req,res)=>{
    const obj = req.params
    const meter = await Meter.findOne({passcode:obj.passcode})
    const docs = await Meter.find((err,docs)=>{return docs})
    const index = docs.findIndex((docs)=>docs.passcode == obj.passcode)
    meter.amount = obj.amount
    await Meter.replaceOne(docs[index],meter)
    res.send("SUCCESS")
}