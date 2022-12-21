const Shipment = require("../models/shipment")
const Order = require("../models/order")

exports.getShipment = (req, res, next) =>{
    let  Id
    (req.query.id)?Id = req.query.id:next()
    console.log(Id)
// console.log(req.params)
//     let result = Shipment.findOne({"orderId":1458})
//     result.then((returned)=>{ console.log(returned)
//         let result2 = Order.find({"_id":returned["address"]});
//     result2.then((response)=>{
//         console.log(response)
//      res.status(200).send(response[0].address)   
//     })})
let result=Shipment.aggregate( [
    {
      $lookup:
        {
          from: "order",
          localField: "address",
          foreignField: "_id",
          as: "address"
        }
   }
 ] )
result.then((response)=>{
//    let filteredResponse
//    filteredResponse = response.filter((val)=>{
//         if(val._id== Id)
//         {
//             return val
//         }
//     })
    console.log(response)
    response.map((item)=>{
        item.address[0]=item.address[0].address
    })
    response = response.find((item)=>item._id==Id)
    res.status(200).send(response) 
})
} 

exports.getAllShipmentDetails = (req, res, next) =>{
// console.log(req.params)
//     let result = Shipment.findOne({"orderId":1458})
//     result.then((returned)=>{ console.log(returned)
//         let result2 = Order.find({"_id":returned["address"]});
//     result2.then((response)=>{
//         console.log(response)
//      res.status(200).send(response[0].address)   
//     })})
let result=Shipment.aggregate( [
    {
      $lookup:
        {
          from: "order",
          localField: "address",
          foreignField: "_id",
          as: "address"
        }
   }
 ] )
result.then((response)=>{
    console.log(response)
    response.map((item)=>{
        item.address[0]=item.address[0].address
    })
    res.status(200).send(response) 
})
} 




exports.createShipment = (req, res, next) => {
    let Data = JSON.parse(req.body.Data);
    // let amount = JSON.parse(req.body.product_quantity);
    // let changeAddress = JSON.parse(req.body.allowAddressChange);
    console.log(Data);
        Shipment.insertMany(Data, { new: true })
          .then((response2) => {
            if (response2) {
              res.status(200).send(response2);
            }
          })
          .catch((err) => {
            res.status(500).json({
              errors: [{ error: "Something went wrong while creating shipment details" }],
            });
            console.log(err);
          });
        }

exports.updateShipment = (req, res, next) =>{
    let  Id
    (req.query.id)?Id = req.query.id:next()
    let Data = JSON.parse(req.body.Data);
    // console.log(req.params)
    if(!!Data.address)
    {
        delete Data.address
    }
   Shipment.findByIdAndUpdate(Id, Data, { new: true }).then((response) => {
    if (response) {
      res.status(200).send(response);
    }
  }).catch((err) => {
    res.status(500).json({
      errors: [{ error: "Something went wrong" }],
    });
    console.log(err);
  });
} 

exports.deleteShipment = (req, res, next) => {
    let  Id
   (req.query.id)?Id = req.query.id:next()
    Shipment.findByIdAndDelete(Id)
      .then((response) => {
        if (response) {
              res.status(200).send(response);
        }
      })
      .catch((err) => {
        res.status(500).json({
          errors: [{ error: "Something went wrong" }],
        });
        console.log(err);
      });
  }