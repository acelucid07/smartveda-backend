const Product = require("../models/product");
exports.getAllProduct = (req, res, next) => {
    Product.find()
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

exports.getProduct = (req, res, next) => {
  let { Id } = req.body;
  Product.findById(Id)
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

exports.updateProduct = (req, res, next) => {
  let { Id , Data} = req.body;
  console.log(Data)
  
        Product.findByIdAndUpdate(Id,Data,{new:true})
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
    
  

exports.deleteProduct = (req, res, next) => {
  let { Id } = req.body;
  Product.findByIdAndDelete(Id)
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
