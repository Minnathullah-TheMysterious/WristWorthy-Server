import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

export const createCategoryController = async (req, res) => {
  const { category_name } = req.body;
  //validation
  if (!category_name) {
    return res.status(400).json({
      success: false,
      message: "Category Name is Requird",
    });
  }

  //Check for the existing category
  const existingCategory = await categoryModel.findOne({ category_name });
  if (existingCategory) {
    return res
      .status(409)
      .json({
        success: false,
        message: "Category already exists",
        existingCategory,
      });
  } else {
    const slug = slugify(category_name);
    try {
      const data = new categoryModel({
        category_name,
        slug: slug,
      });
      const category = await data.save();
      console.log(category);
      res.status(201).json({
        success: true,
        message: "Category Created Successfully",
        category,
      });
    } catch (error) {
      console.error(
        "Something Went Wrong While Createing the Category".bgRed.white,
        error
      );
      res.status(500).json({
        success: false,
        message: "Something Went Wrong While Createing the Category",
        error,
      });
    }
  }
};
