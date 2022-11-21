const AWS = require('aws-sdk')
const fs = require('fs')
exports.imageUpload= async (req)=>{
    console.log([req.file.path,req.file.originalname])
    const s3 = new AWS.S3({
        accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
      })
      
    const imagePath = req.file.path
    const blob = fs.readFileSync(imagePath)
    const uploadedImage = await s3.upload({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: req.file.originalname,
        Body: blob,
      }).promise()
      console.log(uploadedImage.Location)
      return uploadedImage.Location
}
