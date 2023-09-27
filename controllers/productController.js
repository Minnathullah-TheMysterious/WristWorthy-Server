import slugify from "slugify";
import productModel from "../models/productModel.js";
import mongoose, { isValidObjectId } from "mongoose";
import { promises as fsPromises, constants as fsConstants } from "fs";

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
    if (!image_1) {
      return res.status(400).json({
        success: false,
        message:
          "image_1 is required. You can repeat the same image for each image",
      });
    }
    if (!image_2) {
      return res.status(400).json({
        success: false,
        message:
          "image_2 is required. You can repeat the same image for each image",
      });
    }
    if (!image_3) {
      return res.status(400).json({
        success: false,
        message:
          "image_3 is required. You can repeat the same image for each image",
      });
    }
    if (!image_4) {
      return res.status(400).json({
        success: false,
        message:
          "image_4 is required. You can repeat the same image for each image",
      });
    }

    const images = [
      {
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
      },
    ];

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
        images,
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
      message: "Something Went Wrong while Creating the product",
      error: error.message,
    });
    console.error(
      "Something Went Wrong while Creating the product".bgRed.white,
      error
    );
  }
};

/*******************Update Product || PUT******************* */
export const updateProductController = async (req, res) => {
  const {
    product_name,
    description,
    price,
    discountPercentage,
    stock,
    rating,
    brand,
    category,
  } = req.body;
  const { productId } = req.params;

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

    const updatedProductData = {
      product_name,
      slug: slugify(product_name),
      brand,
      category,
      description,
      stock,
      price,
      discountPercentage,
      rating,
    };

    const updatedProduct = await productModel.findByIdAndUpdate(
      productId,
      updatedProductData,
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Product Updates Successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong while updating the product",
      error: error.message,
    });
    console.error(
      "Something Went Wrong while updating the product".bgRed.white,
      error
    );
  }
};

/******************Update Product Thumbnail || PUT************* */
export const updateProductThumbnailController = async (req, res) => {
  try {
    const { productId } = req.params;
    const thumbnail = req.file;

    //validation
    if (!thumbnail) {
      return res
        .status(400)
        .json({ success: false, message: "Product thumbnail is required" });
    }

    const product = await productModel.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "product not found" });
    } else {
      if (product.thumbnail && product.thumbnail.location) {
        try {
          await fsPromises.access(
            product.thumbnail.location,
            fsConstants.F_OK | fsConstants.R
          );
          await fsPromises.unlink(product.thumbnail.location);
        } catch (fsError) {
          console.error("File Not Found \n".bgRed.white, fsError.message);
        }
      }

      product.thumbnail = {
        location: thumbnail?.path,
        contentType: thumbnail?.mimetype,
        originalname: thumbnail?.originalname,
        size: thumbnail?.size,
      };
      const updatedProduct = await product.save();
      return res.status(200).json({
        success: true,
        message: "Thumbnail Updated Successfully",
        product: updatedProduct,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong while updating the product thumbnail",
      error: error.message,
    });
    console.error(
      "Something Went Wrong while updating the product thumbnail".bgRed.white,
      error
    );
  }
};

/******************Update Product image_1 || PUT***************** */
export const updateProductImageController = async (req, res) => {
  try {
    const { productId, imageIndex } = req.params;
    const image = req.file;
    console.log(image);

    //validation
    if (!image) {
      return res
        .status(400)
        .json({ success: false, message: "Product image is required" });
    }

    const product = await productModel.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "product not found" });
    } else {
      if (
        product.images &&
        product.images[imageIndex] &&
        product.images[imageIndex].location
      ) {
        try {
          await fsPromises.access(
            product.images[imageIndex].location,
            fsConstants.F_OK | fsConstants.R_OK
          );
          await fsPromises.unlink(product.images[imageIndex].location);
        } catch (error) {
          console.error("File Not Found \n".bgRed.white, error.message);
        }
      }

      product.images[imageIndex] = {
        location: image?.path,
        contentType: image?.mimetype,
        originalname: image?.originalname,
        size: image?.size,
      };
      const updatedProduct = await product.save();
      return res.status(200).json({
        success: true,
        message: "Image updated Successfully",
        product: updatedProduct,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong while updating the image",
      error: error.message,
    });
    console.error(
      "Something Went Wrong while updating the image".bgRed.white,
      error
    );
  }
};

/*****************Get All Products || GET****************** */
export const getAllProductsController = async (req, res) => {
  try {
    const products = await productModel.find();
    res.status(200).json({
      success: true,
      message: "All Products fetched successfully",
      totalCount: products?.length,
      products,
    });
  } catch (error) {
    console.error("Something Went Wrong While Fetching products", error);
    res.status(500).json({
      success: false,
      message: "Something Went Wrong While Fetching products",
      error: error.message,
    });
  }
};

/************************Get Filtered Products || GET************* */
export const getFilteredAndSortedProductsController = async (req, res) => {
  try {
    const {
      brand,
      category,
      lowerPriceLimit,
      higherPriceLimit,
      _order,
      _sort,
      _page,
      _limit,
    } = req.query;

    let findQueryObject = {};
    let sortQueryObject = {};
    const pageNum = _page || 1;
    const limit = _limit || 8;
    const skip = (pageNum - 1) * limit;

    //Check For Query Params
    if (brand) {
      findQueryObject = { brand };
      console.log(findQueryObject);
    }
    if (category) {
      findQueryObject = { category };
    }
    if (
      lowerPriceLimit &&
      higherPriceLimit &&
      !isNaN(lowerPriceLimit) &&
      !isNaN(higherPriceLimit)
    ) {
      findQueryObject = {
        price: {
          $gte: parseFloat(lowerPriceLimit),
          $lte: parseFloat(higherPriceLimit),
        },
      };
    }
    if (brand && category) {
      findQueryObject = { brand, category };
    }
    if (
      brand &&
      lowerPriceLimit &&
      higherPriceLimit &&
      !isNaN(lowerPriceLimit) &&
      !isNaN(higherPriceLimit)
    ) {
      findQueryObject = {
        brand,
        price: {
          $gte: parseFloat(lowerPriceLimit),
          $lte: parseFloat(higherPriceLimit),
        },
      };
    }
    if (
      category &&
      lowerPriceLimit &&
      higherPriceLimit &&
      !isNaN(lowerPriceLimit) &&
      !isNaN(higherPriceLimit)
    ) {
      findQueryObject = {
        category,
        price: {
          $gte: parseFloat(lowerPriceLimit),
          $lte: parseFloat(higherPriceLimit),
        },
      };
    }
    if (
      brand &&
      category &&
      lowerPriceLimit &&
      higherPriceLimit &&
      !isNaN(lowerPriceLimit) &&
      !isNaN(higherPriceLimit)
    ) {
      findQueryObject = {
        brand,
        category,
        price: {
          $gte: parseFloat(lowerPriceLimit),
          $lte: parseFloat(higherPriceLimit),
        },
      };
    }
    ///////////////
    if (_sort && _order && _sort === "price") {
      //_order should be 1(asc) or -1(desc)
      console.log(_order);
      sortQueryObject.price = _order;
    }
    if (_sort && _order && _sort === "rating") {
      console.log(_order);
      sortQueryObject.rating = _order; //It will always be in the descending order (sort({rating:-1}))
    }

    const nonDeletedFindQueryObject = { ...findQueryObject, deleted: false };

    const filteredNonDeletedProductsCount = await productModel
      .find(nonDeletedFindQueryObject)
      .sort(sortQueryObject)

    const filteredProductsCount = await productModel
      .find(findQueryObject)
      .sort(sortQueryObject)

    const filteredNonDeletedProducts = await productModel
      .find(nonDeletedFindQueryObject)
      .sort(sortQueryObject)
      .populate("category")
      .populate("brand")
      .limit(limit)
      .skip(skip);

    const filteredProducts = await productModel
      .find(findQueryObject)
      .sort(sortQueryObject)
      .populate("category")
      .populate("brand")
      .limit(limit)
      .skip(skip);

    res.status(200).json({
      success: true,
      message: "Filtered Products fetched successfully",
      totalNonDeletedProductsCount: filteredNonDeletedProductsCount?.length,
      totalProductsCount: filteredProductsCount?.length,
      filteredProducts,
      filteredNonDeletedProducts
    });
  } catch (error) {
    console.error("Something Went Wrong While Fetching products", error);
    res.status(500).json({
      success: false,
      message: "Something Went Wrong While Fetching products",
      error: error.message,
    });
  }
};

/****************Get Selected Product || GET*********** */
export const getSelectedProductController = async (req, res) => {
  try {
    const { productId } = req.params;
    const selectedProduct = await productModel.findById(productId);
    if (!selectedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product Not Found" });
    } else {
      return res.status(200).json({
        success: true,
        message: "Selected Product Fetched Successfully",
        selectedProduct,
      });
    }
  } catch (error) {
    console.error(
      "Something Went Wrong While Fetching the selected product",
      error
    );
    res.status(500).json({
      success: false,
      message: "Something Went Wrong While Fetching the selected product",
      error: error.message,
    });
  }
};

/******************Delete Product || DELETE****************** */
export const deleteProductController = async (req, res) => {
  try {
    const { productId } = req.params;

    let product = await productModel.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    } else {
      product.deleted = true;
      await product.save();
      return res
        .status(200)
        .json({ success: true, message: "Product Deleted Successfully" });
    }
  } catch (error) {
    console.error("Something Went Wrong While deleting the product", error);
    res.status(500).json({
      success: false,
      message: "Something Went Wrong While deleting the product",
      error: error.message,
    });
  }
};

/******************Restore Product || PUT****************** */
export const restoreProductController = async (req, res) => {
  try {
    const { productId } = req.params;

    let product = await productModel.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    } else {
      product.deleted = false;
      await product.save();
      return res
        .status(200)
        .json({ success: true, message: "Product Restored Successfully" });
    }
  } catch (error) {
    console.error("Something Went Wrong While restoring the product", error);
    res.status(500).json({
      success: false,
      message: "Something Went Wrong While restoring the product",
      error: error.message,
    });
  }
};

/*************Test Route || GET********** */
export const testProductRouteController = (req, res) => {
  res.send("success");
};
