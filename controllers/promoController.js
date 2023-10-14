import promoModel from "../models/promoModel.js";
import { promises as fsPromises } from "fs";

/**********************Create Promo || POST***************** */
export const createPromoController = async (req, res) => {
  try {
    const { image_1, image_2, image_3, image_4, image_5, image_6, image_7 } =
      req.files;

    const { brand, category, promo_heading } = req.body;

    //validation
    if (!promo_heading) {
      return res
        .status(400)
        .json({ success: false, message: "Promo Heading Is Required" });
    }

    if (!category && !brand) {
      return res.status(400).json({
        success: false,
        message: "One of brand & category Is Required",
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

    if (!image_5) {
      return res.status(400).json({
        success: false,
        message:
          "image_5 is required. You can repeat the same image for each image",
      });
    }

    if (!image_6) {
      return res.status(400).json({
        success: false,
        message:
          "image_6 is required. You can repeat the same image for each image",
      });
    }

    if (!image_7) {
      return res.status(400).json({
        success: false,
        message:
          "image_7 is required. You can repeat the same image for each image",
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
      {
        location: image_5[0]?.path,
        contentType: image_5[0]?.mimetype,
        originalname: image_5[0]?.originalname,
        size: image_5[0]?.size,
      },
      {
        location: image_6[0]?.path,
        contentType: image_6[0]?.mimetype,
        originalname: image_6[0]?.originalname,
        size: image_6[0]?.size,
      },
      {
        location: image_7[0]?.path,
        contentType: image_7[0]?.mimetype,
        originalname: image_7[0]?.originalname,
        size: image_7[0]?.size,
      },
    ];

    const promo = await promoModel.find();

    if (!promo || !promo.length) {
      const newPromo = new promoModel({
        promo_heading,
        category,
        brand,
        images,
      });

      const savePromo = await newPromo.save();

      return res.status(201).json({
        success: true,
        message: "Promo Created Successfully",
        promo: savePromo,
      });
    }

    try {
      const imagesToDelete = promo[0]?.images || [];

      for (const image of imagesToDelete) {
        if (image?.location) {
          await fsPromises.unlink(image.location);
        }
      }
    } catch (err) {
      console.error(`Error deleting file: ${err.message}`);
    }

    promo[0].promo_heading = promo_heading;
    promo[0].category = category;
    promo[0].brand = brand;
    promo[0].images = images;

    const savePromo = await promo[0].save();

    return res.status(201).json({
      success: true,
      message: "Promo Created Successfully",
      promo: savePromo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong while Creating the Promo",
      error: error.message,
    });
  }
};

/**********************Fetch Promo || GET***************** */
export const getPromoController = async (req, res) => {
  try {
    const promo = await promoModel
      .find()
      .populate("category")
      .populate("brand");

    if (!promo || !promo.length) {
      return res
        .status(404)
        .json({ success: false, message: "Promo Not Found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Promo Fetched Successfully", promo });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong while fetching the Promo",
      error: error.message,
    });
  }
};

/**********************Update Promo Image || PUT***************** */
export const updatePromoImageController = async (req, res) => {
  try {
    const image = req.file;
    const { imageIndex } = req.params;

    if (!image) {
      return res
        .status(400)
        .json({ success: false, message: "Image is Required" });
    }

    const promo = await promoModel.find();

    if (!promo || !promo.length) {
      return res
        .status(404)
        .json({ success: false, message: "Promo Not Found" });
    }

    try {
      const imageToDelete = promo[0]?.images[imageIndex].location;
      await fsPromises.unlink(imageToDelete);
    } catch (err) {
      console.error(`Error deleting file: ${err.message}`);
    }

    promo[0].images[imageIndex] = {
      location: image?.path,
      contentType: image?.mimetype,
      originalname: image?.originalname,
      size: image?.size,
    };

    const savePromo = await promo[0].save();

    return res.status(200).json({
      success: true,
      message: "Promo Image Updated Successfully",
      promo: savePromo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong while updating the Promo image",
      error: error.message,
    });
  }
};

/**********************Update Promo || PUT***************** */
export const updatePromoController = async (req, res) => {
  try {
    const { category, brand, promo_heading } = req.body;

    if (!promo_heading) {
      return res
        .status(400)
        .json({ success: false, message: "Promo heading is Required" });
    }
    
    if (!category && !brand) {
      return res.status(400).json({
        success: false,
        message: "One of category & brand is Required",
      });
    }

    const promo = await promoModel.find();

    if (!promo || !promo.length) {
      return res
        .status(404)
        .json({ success: false, message: "Promo Not Found" });
    }

    promo[0].category = category;
    promo[0].brand = brand;
    promo[0].promo_heading = promo_heading;

    const savePromo = await promo[0].save();

    return res.status(200).json({
      success: true,
      message: "Promo Updated Successfully",
      promo: savePromo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong while updating the Promo",
      error: error.message,
    });
  }
};
