const helper = require('./../helper/helper');

const country = (req, res, next) => {
    const validationRule = {
        "name": "required|alpha|min:3|max:20",
        "continent": "required|alpha"
    }
    helper.validator(req.body, validationRule, {}, (err, status) => {
        console.log(req.body);
        if (!status) {
            console.log(err);
            helper.sendError('validation error!',err,'500',function (result) {
                return res.json(result);
            });
        } else {
            next();
        }
    });
}

module.exports = { 
    country
}