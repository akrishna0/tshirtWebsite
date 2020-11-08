const Product = require('../models/product');
const formidable = require('formidable');
const fs = require('fs');
var _ = require('lodash');

exports.getProductById = (req, res,next,id) => {
    Product.findById(id)
    .populate("category")
    .exec((err, product) => {
        if(err) {
            return res.status(400).json({
                error: "Product not found",
            });
        }
        req.product = product;
        next();
    });
};

exports.createProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req,(err,fields,file)=>{
        if(err) {
            return res.status(400).json({
                error: "IMAGE NOT VALID",
            });
        }
        // destructuring fields
        const {name,description,price,category,stock,} = fields;

        if(!name || !description ||!price || !category || !stock){
            return res.status(400).json({
                error: "Please include all fields",
            })
        }
       
        let product = new Product(fields);

        // handling file upload
        if(file.photo){
            if(file.photo.length > 3000000){
                return res.status(400).json({
                    error: "File Size is greater than Expected!"
                });
            }
            // see from model the types in photo 
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;
        }

        // To save in DATABASE
        product.save((err, product)=>{
            if(err) {
                return res.status(400).json({
                    error: "Saving Product in DATABASE failed",
                });
            }
            res.json(product);
        })
    })
}