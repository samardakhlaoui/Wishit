const { promisify } = require('util');
const fs = require('fs');
const { uploadError } = require('../utils/uploadErrors');
const pipeline = promisify(require('stream').pipeline);

// Upload profile photo controller
exports.uploadProfile = async (req, res) => {
  try {

    if (
      req.file.mimetype !== 'image/jpg' &&
      req.file.mimetype !== 'image/png' &&
      req.file.mimetype !== 'image/jpeg'
    ) {
      throw new Error('Invalid File Type');
    }
    if (req.file.size > 500000) {
      throw new Error('Size Unsupported');
    }
    const fileName = Date.now() + file.originalname + '.jpg';
    await pipeline(
      req.file.stream,
      fs.createWriteStream(`${__dirname}/../client/public/uploads/profile/${fileName}`)
    );
    res.status(200).json({ success: true, message: 'File uploaded successfully' });
  } catch (err) {
    const errors = uploadError(err);
    return res.status(201).json({ errors });
  }
};