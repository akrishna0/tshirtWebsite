const Category = require('../models/category');

exports.getCategoryById = (req, res,next, id) => {
    Category.findById(id).exec((err, category) => {
        if(err || !category) {
            return res.status(400).json({
                error: "Category not found"
            });
        }
        req.category = category;
        next();
    });
};

exports.createCategory = (req, res)=>{
    const category = new Category(req.body);
    category.save((err, category) => {
        if(err){
            return res.status(400).json({
                error: "Category not able to be created in DB"
            })
        }
        res.json({category});
    });
}

exports.getCategory = (req, res) => {
    return res.json(req.category);
}

exports.getAllCategory = (req, res)=>{
    Category.find().exec((err,categories) => {
        if(err){
            return res.status(400).json({
                error: "No category found",
            })
        }
        res.json(categories);

    });
};

exports.updateCategory =(req, res)=>{
    const category = req.category;
    category.name = req.body.name;

    category.save((err, updatedCategory)=>{
        if(err){
            return res.status(400).json({
                error: "Failed to update category",
            });
        }
        res.send(updatedCategory);
    });
}

exports.removeCategory = (req, res) =>{
    const category = req.category;

    category.remove((err, category)=>{
        if(err){
            return res.status(400).json({
                error: `Failed to delete this ${category.name} category`
            });
        }
        res.json({
            message:`Successfully Deleted ${category.name} category`
        })
    })
}