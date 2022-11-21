const Category = require("../models/category");
const Image = require("../models/image");
exports.getAllCategory = (req, res, next) => {
  Category.find()
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

exports.getCategoryById = (req, res, next) => {
  let { Id } = req.body;
  Category.findOne({ Id: Id })
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

exports.updateCategory =  (req, res, next) => {
      let container;
      let  Data = JSON.parse( req.body.Data);
      console.log(req.body.Id)
      let  check = new Promise((resolve,reject)=>{
      if(Object.keys(Data).includes("image")){
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
                      Data.image =doc[0].image
                      console.log(Data.image)
                      resolve(true)
                  }
              }
          );
      }
    }) 
      check.then((result)=>{
          if(result){
              console.log(result)
            Category.findOneAndUpdate(req.body.Id,Data,{new:true})
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

exports.deleteCategory = (req, res, next) => {
  let { Id } = req.body;
  Category.findOneAndRemove({ Id: Id })
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
