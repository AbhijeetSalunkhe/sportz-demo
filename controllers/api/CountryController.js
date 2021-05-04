const filename = './../../data/data.json'
let countries = require(filename)
const helper = require('./../../helper/helper')
const path = require('path');

function createCountry(req,res) {
    console.log(req.body);
    return new Promise(() => {
        const id = { id: helper.getNewId(countries) }
        // const rank = { rank: helper.getNewId(countries) }
        const flag = req.file.path;
        const date = { 
            createdAt: helper.newDate(),
            updatedAt: helper.newDate()
        }
        console.log(req.body);
        req = { ...id, ...req.body, flag , ...date}
        countries.push(req)
        helper.writeJSONFile(path.join(__dirname, filename), countries)
        helper.sendResponce(req,'Country Created Successfully','200',function (result) {
            return res.json(result);
        });
    })
}

function getCountry(req,res) {
    return new Promise(() => {
        helper.findId(countries, req.params.id)
        .then(country => {
            helper.sendResponce(country,'Country fetch Successfully','200',function (result) {
                return res.json(result);
            });
        })
        .catch(err => {
            helper.sendError('',err.message,'500',function (result) {
                return res.json(result);
            });
        })
    })
}

function getCountries(req,res) {
    return new Promise(() => {
        if (countries.length === 0) {
            helper.sendError('','Countries not found!','404',function (result) {
                return res.json(result);
            });
        }
        helper.sendResponce(countries,'Countries fetch Successfully','200',function (result) {
            return res.json(result);
        });
    })
}

module.exports = {
    createCountry,
    getCountry,
    getCountries
}