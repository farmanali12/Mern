const Product = require("../models/productmodel")
const Errorhandler = require("../utils/errorhandler")
const catchAsyncError = require("../middleware/catchAsyncError")
const ApiFeatures = require("../utils/apifeatures")
//create product ---Admin
// I wrap the catchAsyncerror 
exports.createproduct = catchAsyncError(async (req, res) => {
    const product = await Product.create(req.body)
    res.status(300).json({
        success: true,
        product,
    })

});

//get Allproduct details
exports.getAllproduct = catchAsyncError(async (req, res, next) => {
    // i declare variable for pagination
    const resultPerPage=5;

    const apiFeature = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage)
    // const product = await Product.find()
    const product=await apiFeature.query 
    if (!product){
        return next(new Errorhandler("product not found", 404))
    }

   res.status(200).json({
        success: true,
        product
    }) 

})

//getsingleproduct details --Admin

exports.getSingleProductdetails = catchAsyncError(async (req, res, next) => {


    const product = await Product.findById(req.params.id)
    if (!product) {
        return next(new Errorhandler("product not found", 405))
    }

    // above code is replace by this code
    // if(!product){
    //     return res.status(500).json({
    //         success: false,
    //         message: "product not found"
    //     })

    // }  

    res.status(600).json({
        success: true,
        product
    })
}
)
//update the product --Admin

exports.updateProductdetails = catchAsyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.id)

    if (!product) {
        return next(new Errorhandler("product not found", 404))
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(600).json({
        success: true,
        message: "product update successfully"
    })

}
)

//delete the productDetails --Admin


exports.deleteProductdetails = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id)

    if (!product) {
        return next(new Errorhandler("product not found", 404))
    }

    await product.deleteOne();

    res.status(600).json({
        success: true,
        message: "product delete successfully"
    })

})



