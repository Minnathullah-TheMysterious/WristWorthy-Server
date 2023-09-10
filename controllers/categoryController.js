import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

/************Create Category || POST*********** */
export const createCategoryController = async (req, res) => {
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
    try {
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
      message: "Something Went Wrong while fetching all the categories".bgRed
        .white,
      error: error.message,
    });
    console.error(error);
  }
};
