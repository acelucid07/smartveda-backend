const Reward = require("../models/rewardRedemption")

exports.getRewardRedeemedById = (req,res,next) => {
    let  Id
    if (req.query.id) { Id = req.query.id }
    else { return next() }
      Reward.findById(Id)
        .then((response) => {
          if (response) {
            res.status(200).send(response);
          }
        }).catch((err) => {
          res.status(500).json({
            errors: [{ error: "Something went wrong while fetching reward Redeemed detail" }],
          });
          console.log(err);
        });
}

exports.getAllRewardsRedeemed = (req,res,next) => {
    Reward.find().then((response)=>{
        if(response)
        {
            res.status(200).send(response)
        }
    }).catch((error)=>{
        res.status(500).json({
         errors:[{error:"Something went wrong while finding rewards redeemed"}]   
        })
    })
}

exports.createRewardRedeemedDetails = (req,res,next) => {
    let Data = JSON.parse(req.body.Data);
    console.log(Data)
    Reward.insertMany(Data, { new: true })
    .then((response2) => {
      if (response2) {
        res.status(200).send(response2);
      }
    })
    .catch((err) => {
      res.status(500).json({
        errors: [{ error: "Something went wrong while creating Reward Redeemed details" }],
      });
      console.log(err);
    });
}


