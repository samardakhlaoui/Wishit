module.exports.uploadError = (err) =>{
    let errors={format: '', maxSize: ''};
    if(err.message.includes('Invalid File Type!'))
        errors.format='Invalid File Type!';
    if(err.message.includes("Size Unsupported!"))
        errors.maxSize=">500ko, Unsupported Size!";
    return errors
};