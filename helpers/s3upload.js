const fs = require('fs')
const aws = require('aws-sdk')

module.exports = () => {
  aws.config.setPromisesDependency()
  aws.config.update({
    accessKeyId: process.env.ACCESSKEY,
    secretAccessKey: process.env.SECRETACCESSKEY,
    region: process.env.REGION
  })

  const s3 = new aws.S3();
  const params = {
    ACL: 'public-read',
    Bucket: process.env.BUCKET,
    Body: fs.createReadStream(req.file.path),
    Key: `Betafox_E-Commerce/${req.file.originalname}`
  }

  s3.upload(params, (err, data) => {
    if (err) {
      console.log('errornya', err)
      console.log('Error occured while trying to upload to S3 bucket', err);
    } else if (data) {
      console.log('datanya', data)
      fs.unlinkSync(req.file.path)
      const imageUrl = data.Location
      console.log(imageUrl)
      return imageUrl
    }
  })
}