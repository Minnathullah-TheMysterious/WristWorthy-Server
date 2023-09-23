import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";
import {promises as fsPromises, constants as fsConstants} from 'fs'

/************Create Category || POST*********** */
export const createCategoryController = async (req, res) => {
  try {
    const { category_name } = req.body;
    const image = req.file;
    //validation
    if (!category_name) {
      return res.status(400).json({
        success: false,
        message: "Category Name is Required",
      });
    }
    if (!image) {
      return res.status(400).json({
        success: false,
        message: "Category Image is Required",
      });
    }

    //Check for the existing category
    const existingCategory = await categoryModel.findOne({ category_name });
    if (existingCategory) {
      return res.status(409).json({
        success: false,
        message: "Category already exists",
        existingCategory,
      });
    } else {
      const slug = slugify(category_name);
      const data = new categoryModel({
        category_name,
        slug,
        image: {
          location: image?.path,
          contentType: image?.mimetype,
          originalname: image?.originalname,
          size: image?.size,
        },
      });
      const category = await data.save();
      console.log(category);
      res.status(201).json({
        success: true,
        message: "Category Created Successfully",
        category,
      });
    }
  } catch (error) {
    console.error(
      "Something Went Wrong While Creating the Category".bgRed.white,
      error
    );
    res.status(500).json({
      success: false,
      message: "Something Went Wrong While Creating the Category",
      error: error.message,
    });
  }
};

/************Update Category || PUT*********** */
export const updateCategoryImageController = async (req, res) => {
  try {
    const image = req.file;
    const { categoryId } = req.params;

    //validation
    if (!image) {
      return res.status(400).json({
        success: false,
        message: "Image is Required",
      });
    }

    const category = await categoryModel.findById(categoryId);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category Not Found",
      });
    } else {
      try {
        await fsPromises.access(category.image.location, fsConstants.F_OK | fsConstants.R_OK)
        await fsPromises.unlink(category.image.location)
      } catch (error) {
        console.error('File Not Found')
      }
      category.image = {
        location: image?.path,
        contentType: image?.mimetype,
        originalname: image?.originalname,
        size: image?.size,
      };
      const updatedCategory = await category.save();
      return res.status(200).json({
        success: true,
        message: "Category Image Updated Successfully",
        category: updatedCategory,
      });
    }
  } catch (error) {
    console.error(
      "Something Went Wrong While updating the Category Image".bgRed.white,
      error
    );
    res.status(500).json({
      success: false,
      message: "Something Went Wrong While updating the Category Image",
      error: error.message,
    });
  }
};

/************Update Category || PUT*********** */
export const updateCategoryController = async (req, res) => {
  try {
    const { category_name } = req.body;
    const { categoryId } = req.params;

    //validation
    if (!category_name) {
      return res.status(400).json({
        success: false,
        message: "Category Name is Required",
      });
    }

    const category = await categoryModel.findById(categoryId);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category Not Found",
      });
    } else {
      const slug = slugify(category_name);
      category.category_name = category_name;
      category.slug = slug;

      const updatedCategory = await category.save();
      return res.status(200).json({
        success: true,
        message: "Category Updated Successfully",
        category: updatedCategory,
      });
    }
  } catch (error) {
    console.error(
      "Something Went Wrong While updating the Category".bgRed.white,
      error
    );
    res.status(500).json({
      success: false,
      message: "Something Went Wrong While updating the Category",
      error: error.message,
    });
  }
};

/*************Get All Categories || GET********** */
export const getAllCategoriesController = async (req, res) => {
  try {
    const categories = await categoryModel.find();

    res.status(200).json({
      success: true,
      message: "All The Categories Fetched Successfully",
      categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong while fetching all the categories",
      error: error.message,
    });
    console.error(
      "Something Went Wrong while fetching all the categories".bgRed.white,
      error
    );
  }
};

/*******************Delete Category || DELETE********** */
export const deleteCategoryController = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const category = await categoryModel.findById(categoryId);
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category Not Found" });
    } else {
      category.deleted = true;
      await category.save();
      return res
        .status(200)
        .json({ success: true, message: "Category Deleted Successfully" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong while deleting the category",
      error: error.message,
    });
    console.error(
      "Something Went Wrong while deleting the category".bgRed.white,
      error
    );
  }
};

/*******************Restore Category || PUT********** */
export const restoreCategoryController = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const category = await categoryModel.findById(categoryId);
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category Not Found" });
    } else {
      category.deleted = false;
      await category.save();
      return res
        .status(200)
        .json({ success: true, message: "Category Restored Successfully" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong while restoring the category",
      error: error.message,
    });
    console.error(
      "Something Went Wrong while restoring the category".bgRed.white,
      error
    );
  }
};
