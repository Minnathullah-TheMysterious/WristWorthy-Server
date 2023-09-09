import slugify from "slugify";
import productModel from "../models/productModel.js";
import mongoose, { isValidObjectId } from "mongoose";

/****************Create Product || POST**************** */
export const createProductController = async (req, res) => {
  const { thumbnail, image_1, image_2, image_3, image_4 } = req.files;
  console.log(req.files);
  const {
    product_name,
    description,
    price,
    discountPercentage,
    stock,
    rating,
  } = req.body;

  let { brand, category } = req.body;

  try {
    //validation
    if (!product_name) {
      return res
        .status(400)
        .json({ success: false, message: "Product Name Is Required" });
    }
    if (!description) {
      return res
        .status(400)
        .json({ success: false, message: "Product Description Is Required" });
    }
    if (!price) {
      return res
        .status(400)
        .json({ success: false, message: "Product Price Is Required" });
    }
    if (!category) {
      return res
        .status(400)
        .json({ success: false, message: "Product Category Is Required" });
    }
    if (!brand) {
      return res
        .status(400)
        .json({ success: false, message: "Product Brand Is Required" });
    }
    if (!thumbnail) {
      return res.status(400).json({
        success: false,
        message: "Product Image For Thumbnail Is Required",
      });
    }
    if (!isValidObjectId(brand)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Brand Type",
      });
    }
    if (!isValidObjectId(category)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Category Type",
      });
    }

    //Check For Images
    const images = image_1
      ? {
          location: image_1[0]?.path,
          contentType: image_1[0]?.mimetype,
          originalname: image_1[0]?.originalname,
          size: image_1[0]?.size,
        }
      : image_1 && image_2
      ? ({
          location: image_1[0]?.path,
          contentType: image_1[0]?.mimetype,
          originalname: image_1[0]?.originalname,
          size: image_1[0]?.size,
        },
        {
          location: image_2[0]?.path,
          contentType: image_2[0]?.mimetype,
          originalname: image_2[0]?.originalname,
          size: image_2[0]?.size,
        })
      : image_1 && image_2 && image_3
      ? ({
          location: image_1[0]?.path,
          contentType: image_1[0]?.mimetype,
          originalname: image_1[0]?.originalname,
          size: image_1[0]?.size,
        },
        {
          location: image_2[0]?.path,
          contentType: image_2[0]?.mimetype,
          originalname: image_2[0]?.originalname,
          size: image_2[0]?.size,
        },
        {
          location: image_3[0]?.path,
          contentType: image_3[0]?.mimetype,
          originalname: image_3[0]?.originalname,
          size: image_3[0]?.size,
        })
      : image_1 && image_2 && image_3 && image_4
      ? ({
          location: image_1[0]?.path,
          contentType: image_1[0]?.mimetype,
          originalname: image_1[0]?.originalname,
          size: image_1[0]?.size,
        },
        {
          location: image_2[0]?.path,
          contentType: image_2[0]?.mimetype,
          originalname: image_2[0]?.originalname,
          size: image_2[0]?.size,
        },
        {
          location: image_3[0]?.path,
          contentType: image_3[0]?.mimetype,
          originalname: image_3[0]?.originalname,
          size: image_3[0]?.size,
        },
        {
          location: image_4[0]?.path,
          contentType: image_4[0]?.mimetype,
          originalname: image_4[0]?.originalname,
          size: image_4[0]?.size,
        })
      : {
          location: thumbnail[0]?.path,
          contentType: thumbnail[0]?.mimetype,
          originalname: thumbnail[0]?.originalname,
          size: thumbnail[0]?.size,
        };

    //In frontend I need to put checks for all the image fields. user must provide image_1 first and go on upto image_4

    const existingProduct = await productModel.findOne({ product_name });
    if (existingProduct) {
      return res.status(409).json({
        success: false,
        message: "Product With The Same Name Already exists",
      });
    } else {
      if (isValidObjectId(brand)) {
        let brandId = mongoose.Types.ObjectId.createFromHexString(brand);
        brand = brandId;
      }
      if (isValidObjectId(category)) {
        let categoryId = mongoose.Types.ObjectId.createFromHexString(category);
        category = categoryId;
      }
      const data = new productModel({
        product_name,
        slug: slugify(product_name),
        brand,
        category,
        description,
        stock,
        price,
        discountPercentage,
        rating,
        thumbnail: {
          location: thumbnail[0]?.path,
          contentType: thumbnail[0]?.mimetype,
          originalname: thumbnail[0]?.originalname,
          size: thumbnail[0]?.size,
        },
        images: [images],
      });

      const product = await data.save();
      res.status(201).json({
        success: true,
        message: "Product Created Successfully",
        product,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong while Creating the product".bgRed.white,
      error: error.message,
    });
    console.error(error);
  }
};

/*************Test Route || GET********** */
export const testProductRouteController = (req, res) => {
  res.send("success");
};
