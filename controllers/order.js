const Order = require("../models/order");

exports.getAllOrders = (req, res, next) => {
  Order.find()
    .then((response) => {
        console.log(response)
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
};

exports.getOrder = (req, res, next) => {
    let { Id } = req.body;
    Order.findById(Id)
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
  };
  

  exports.updateOrder = (req, res, next) => {
    let Data = JSON.parse(req.body.Data);
    console.log(Data);
        Order.findByIdAndUpdate(req.body.Id, Data, { new: true })
          .then((response2) => {
            if (response2) {
              res.status(200).send(response2);
            }
          })
          .catch((err) => {
            res.status(500).json({
              errors: [{ error: "Something went wrong" }],
            });
            console.log(err);
          });
      }

exports.deleteOrder = (req, res, next) => {
  let { Id } = req.body;
  Order.findByIdAndDelete(Id)
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
};
      