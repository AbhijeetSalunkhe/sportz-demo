const fs = require('fs')
const multer = require('multer');
const Validator = require('validatorjs');

const helper = {};

module.exports.getNewId = (array) => {
    if (array.length > 0) {
        return array[array.length - 1].id + 1
    } else {
        return 1
    }
}

module.exports.newDate = () => new Date().toString()

module.exports.sendError = (details,message,status,cb) => {
   const data = {
    flag: false,
    data: details,
    message: message,
    status: status
   }
   cb(data);
};

module.exports.sendResponce = (details,message,status,cb) => {
    const data = {
     flag: true,
     data: details,
     message: message,
     status: status
    }
    cb(data);
};

module.exports.writeJSONFile = (filename, content) => {
    fs.writeFileSync(filename, JSON.stringify(content), 'utf8', (err) => {
        if (err) {
            console.log(err)
        }
    })
}

module.exports.findId = (array, id) => {
    return new Promise((resolve, reject) => {
        const row = array.find(r => r.id == id)
        if (!row) {
            reject({
                message: 'ID is not good',
                status: 404
            })
        }
        resolve(row)
    })
}

helper.storage = multer.diskStorage({
    destination: function(req,res,cb){
      cb(null,'./frontend/src/assets/images');
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg") {
          cb(null, true);
        } else {
          cb(null, false);
          return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
      },
      filename: function(req,file,cb){
        cb(null, new Date().getTime()+'_'+file.originalname);
      }
  });

module.exports.upload = multer({storage:helper.storage});

module.exports.validator = (body, rules, customMessages, callback) => {
    const validation = new Validator(body, rules, customMessages);
    // Validator.register('telephone', function(value, requirement, attribute) {
    //     return value.match(/^\d{3}-\d{3}-\d{4}$/);
    //   }, 'The :attribute phone number is not in the format XXX-XXX-XXXX.');
    validation.passes(() => callback(null, true));
    validation.fails(() => callback(validation.errors, false));
};