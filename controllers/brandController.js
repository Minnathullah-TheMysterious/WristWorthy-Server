import slugify from "slugify";
import brandModel from "../models/brandModel.js";
import { promises as fsPromises, constants as fsConstants } from "fs";

/***************Create Brand || POST******** */
export const createBrandController = async (req, res) => {
  const { brand_name } = req.body;
  const image = req.file;

  try {
    //validation
    if (!brand_name) {
      return res
        .status(400)
        .json({ success: false, message: "Brand Name is Required" });
    }
    if (!image) {
      return res.status(400).json({
        success: false,
        message: "Brand Image is Required",
      });
    }

    const existingBrand = await brandModel.findOne({ brand_name });

    //Check for existing Brand
    if (existingBrand) {
      return res.status(409).json({
        success: false,
        message: "Brand Already Exists",
        existingBrand,
      });
    } else {
      const data = new brandModel({
        brand_name,
        slug: slugify(brand_name),
        image: {
          location: image?.path,
          contentType: image?.mimetype,
          originalname: image?.originalname,
          size: image?.size,
        },
      });

      const brand = await data.save();
      res
        .status(201)
        .json({ success: true, message: "Brand Created Successfully", brand });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong While Creating The Brand",
      error: error.message,
    });
    console.error(
      "Something Went Wrong While Creating The Brand".bgRed.white,
      error
    );
  }
};

/***************Update Brand Image|| PUT******** */
export const updateBrandImageController = async (req, res) => {
  try {
    const image = req.file;
    const { brandId } = req.params;
    //validation
    if (!image) {
      return res
        .status(400)
        .json({ success: false, message: "Brand Image is Required" });
    }

    const brand = await brandModel.findById(brandId);
    if (!brand) {
      return res.status(404).json({
        success: false,
        message: "Brand Not Found",
      });
    } else {
      try {
        await fsPromises.access(
          brand.image.location,
          fsConstants.F_OK | fsConstants.R_OK
        );
        await fsPromises.unlink(brand.image.location);
      } catch (error) {
        console.error("File Not Found");
      }
      brand.image = {
        location: image?.path,
        contentType: image?.mimetype,
        originalname: image?.originalname,
        size: image?.size,
      };
      const updatedBrand = await brand.save();
      return res.status(200).json({
        success: true,
        message: "Brand Imaged Updated Successfully",
        brand: updatedBrand,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong While Updating The Brand Image",
      error: error.message,
    });
    console.error(
      "Something Went Wrong While Updating The Brand Image".bgRed.white,
      error
    );
  }
};

/***************Update Brand || PUT******** */
export const updateBrandController = async (req, res) => {
  try {
    const { brand_name } = req.body;
    const { brandId } = req.params;
    //validation
    if (!brand_name) {
      return res
        .status(400)
        .json({ success: false, message: "Brand Name is Required" });
    }

    const brand = await brandModel.findById(brandId);
    if (!brand) {
      return res.status(404).json({
        success: false,
        message: "Brand Not Found",
      });
    } else {
      const slug = slugify(brand_name);
      brand.brand_name = brand_name;
      brand.slug = slug;
      const updatedBrand = await brand.save();
      return res.status(200).json({
        success: true,
        message: "Brand Updated Successfully",
        brand: updatedBrand,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong While Updating The Brand",
      error: error.message,
    });
    console.error(
      "Something Went Wrong While Updating The Brand".bgRed.white,
      error
    );
  }
};

/*****************Delete Brand || DELETE************* */
export const deleteBranController = async (req, res) => {
  try {
    const { brandId } = req.params;
    const brand = await brandModel.findById(brandId);
    if (!brand) {
      return res
        .status(404)
        .json({ success: false, message: "Brand Not Found" });
    } else {
      brand.deleted = true;
      await brand.save();
      return res
        .status(200)
        .json({ success: true, message: "Brand Deleted Successfully" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong While Deleting The Brand",
      error: error.message,
    });
    console.error(
      "Something Went Wrong While Deleting The Brand".bgRed.white,
      error
    );
  }
};

/*****************Restore Brand || PUT************* */
export const restoreBrandsController = async (req, res) => {
  try {
    const { brandId } = req.params;
    const brand = await brandModel.findById(brandId);
    if (!brand) {
      return res
        .status(404)
        .json({ success: false, message: "Brand Not Found" });
    } else {
      brand.deleted = false;
      await brand.save();
      return res
        .status(200)
        .json({ success: true, message: "Brand Restored Successfully" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong While restoring The Brand",
      error: error.message,
    });
    console.error(
      "Something Went Wrong While restoring The Brand".bgRed.white,
      error
    );
  }
};

/**************Get All Brands || GET********** */
export const getAllBrandsController = async (req, res) => {
  try {
    const brands = await brandModel.find().sort({createdAt:-1});

    res.status(200).json({
      success: true,
      message: "All The Brands Fetched Successfully",
      brands,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong while fetching all the brans".bgRed.white,
      error: error.message,
    });
    console.error(error);
  }
};
