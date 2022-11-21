const Product = require("../models/product");
const Image = require("../models/image");

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

    exports.updateProduct =  (req, res, next) => {
          let container;
          let  Data = JSON.parse( req.body.Data);
          console.log(Data)
      let  check = new Promise((resolve,reject)=>{
          if(Object.keys(Data).includes("images")){
              Image.insertMany(
                  {
                      image: req.file.path,
                  },
                  { new: true },
                  (err, doc) => {
                      console.log(doc);
                      if (err) throw err;
                      else {
                          // res.json(doc);
                          container =doc[0]
                          Data.images =doc[0].image
                          console.log(Data.images)
                          resolve(true)
                      }
                  }
              );
          }
        }) 
          check.then((result)=>{
              if(result){
                  console.log(result)
                Product.findByIdAndUpdate(req.body.Id,Data,{new:true})
              .then((response2) => {
                if (response2) {
                  res.status(200).send([response2,container]);
                }
              })
              .catch((err) => {
                res.status(500).json({
                  errors: [{ error: "Something went wrong" }],
                });
                console.log(err);
              })
      }})
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
