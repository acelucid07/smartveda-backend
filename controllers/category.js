const Category = require("../models/category");
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

exports.updateCategory = (req, res, next) => {
  let { Id , Data} = req.body;
  console.log(Data)
  Category.findOneAndUpdate({ Id: Id },Data,{new:true})
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
