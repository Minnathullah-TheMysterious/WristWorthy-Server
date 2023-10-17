import slugify from "slugify";
import productModel from "../models/productModel.js";
import mongoose, { Types, isValidObjectId } from "mongoose";
import { promises as fsPromises, constants as fsConstants } from "fs";

/****************Create Product || POST**************** */
export const createProductController = async (req, res) => {
  try {
    const { thumbnail, image_1, image_2, image_3, image_4 } = req.files;

    const {
      product_name,
      description,
      highlight_1,
      highlight_2,
      highlight_3,
      highlight_4,
      highlight_5,
      price,
      discountPercentage,
      stock,
      rating,
    } = req.body;

    let { brand, category } = req.body;

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

    const highlights = [
      highlight_1,
      highlight_2,
      highlight_3,
      highlight_4,
      highlight_5,
    ];

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
    }

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
      highlights,
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
    return res.status(201).json({
      success: true,
      message: "Product Created Successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong while Creating the product",
      error: error.message,
    });
  }
};

/*******************Update Product || PUT******************* */
export const updateProductController = async (req, res) => {
  try {
    const {
      product_name,
      description,
      price,
      discountPercentage,
      stock,
      rating,
      brand,
      category,
      highlight_1,
      highlight_2,
      highlight_3,
      highlight_4,
      highlight_5,
    } = req.body;

    const { productId } = req.params;

    const highlights = [
      highlight_1,
      highlight_2,
      highlight_3,
      highlight_4,
      highlight_5,
    ];

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
      highlights,
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
    }

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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong while updating the product thumbnail",
      error: error.message,
    });
  }
};

/******************Update Product image_1 || PUT***************** */
export const updateProductImageController = async (req, res) => {
  try {
    const { productId, imageIndex } = req.params;
    const image = req.file;

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
    }

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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong while updating the image",
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

    const pageNum = _page || 1;
    const limit = _limit || 8;
    const skip = (pageNum - 1) * limit;

    let findQueryObject = {};

    if (brand) {
      findQueryObject.brand = brand;
    }

    if (category) {
      findQueryObject.category = category;
    }

    if (lowerPriceLimit && higherPriceLimit) {
      findQueryObject.price = {
        $gte: parseFloat(+lowerPriceLimit),
        $lte: parseFloat(+higherPriceLimit),
      };
    }

    let sortQueryObject = {};

    if (_sort && _order && _sort === "price") {
      sortQueryObject.price = _order;
    }

    if (_sort && _order && _sort === "rating") {
      sortQueryObject.rating = _order; //It will always be in the descending order (sort({rating:-1}))
    }

    const nonDeletedFindQueryObject = { ...findQueryObject, deleted: false };

    const filteredNonDeletedProductsCount = await productModel
      .find(nonDeletedFindQueryObject)
      .sort(sortQueryObject);

    const filteredProductsCount = await productModel
      .find(findQueryObject)
      .sort(sortQueryObject);

    const filteredNonDeletedProducts = await productModel
      .find(nonDeletedFindQueryObject)
      .sort(sortQueryObject)
      .sort({ createdAt: -1 })
      .populate("category")
      .populate("brand")
      .limit(limit)
      .skip(skip);

    const filteredProducts = await productModel
      .find(findQueryObject)
      .sort(sortQueryObject)
      .sort({ createdAt: -1 })
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
      filteredNonDeletedProducts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong While Fetching products",
      error: error.message,
    });
  }
};

/****************Get Product By Id || GET*********** */
export const getSelectedProductController = async (req, res) => {
  try {
    const { productId } = req.params;
    const selectedProduct = await productModel.findById(productId);

    if (!selectedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product Not Found" });
    }

    return res.status(200).json({
      success: true,
      message: "Selected Product Fetched Successfully",
      selectedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong While Fetching the selected product",
      error: error.message,
    });
  }
};

/****************Get Related Products By category ID || GET*********** */
export const getRelatedProductController = async (req, res) => {
  try {
    const { categoryId, productId } = req.params;

    const categoryObjectId = new Types.ObjectId(categoryId);

    const products = await productModel.find({
      category: categoryObjectId,
    });

    if (!products) {
      return res
        .status(404)
        .json({ success: false, message: "Related Products Not Found" });
    }

    const relatedProducts = products?.filter(
      (product) => product._id.toString() !== productId
    );

    return res.status(200).json({
      success: true,
      message: "Related Products Fetched Successfully",
      relatedProducts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong While Fetching the Related products",
      error: error.message,
    });
  }
};

/****************Search Product By Name || GET*********** */
export const SearchProductController = async (req, res) => {
  try {
    const { productName } = req.params;

    const products = await productModel.find({
      product_name: { $regex: productName, $options: "i" },
    });

    if (!products || !products.length) {
      return res
        .status(404)
        .json({ success: false, message: "No Products Found" });
    }

    const nonDeletedProducts = products?.filter(
      (product) => product?.deleted === false
    );

    const nonDeletedProductsCount = nonDeletedProducts?.length
    const productsCount = products?.length

    return res.status(200).json({
      success: true,
      message: "Product Found",
      productsCount,
      nonDeletedProductsCount,
      products,
      nonDeletedProducts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong While searching for products",
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
    }

    product.deleted = true;
    await product.save();

    return res
      .status(200)
      .json({ success: true, message: "Product Deleted Successfully" });
  } catch (error) {
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
    }

    product.deleted = false;
    await product.save();

    return res
      .status(200)
      .json({ success: true, message: "Product Restored Successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong While restoring the product",
      error: error.message,
    });
  }
};

/******************Update Product Stock|| PUT****************** */
export const updateProductStockController = async (req, res) => {
  try {
    const { productId, productQuantity } = req.params;

    let product = await productModel.findById(productId);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const stock = product.stock;
    product.stock = stock - +productQuantity;
    await product.save();

    return res.status(200).json({
      success: true,
      message: "Product Stock Updated Successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong While updating the product stock",
      error: error.message,
    });
  }
};

/*************Test Route || GET********** */
export const testProductRouteController = (req, res) => {
  res.send("success");
};
