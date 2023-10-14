import wishlistModel from "../models/wishlistModel.js";

/*****************Add To Wishlist || POST********* */
export const addToWishlistController = async (req, res) => {
  try {
    const { productId } = req.params;
    const { _id } = req.user;

    //check if user wishlist is created or not. create one if not created
    let hasWishlist = await wishlistModel.findOne({ user: _id });

    if (!hasWishlist) {
      const newWishlist = new wishlistModel({
        user: _id,
        products: [productId],
      });

      const wishlist = await newWishlist.save();

      return res.status(201).json({
        success: true,
        message: "Wishlist Created & Added Item To It Successfully",
        wishlist,
      });
    }

    const isProductIsInWishlist = hasWishlist?.products?.some(
      (product) => product.toString() === productId
    );

    if (isProductIsInWishlist) {
      return res.status(409).json({
        success: false,
        message: "Item is already present in your Wishlist",
      });
    }

    // hasWishlist.products = hasWishlist?.products?.concat(productId)
    hasWishlist.products = [...hasWishlist.products, productId];
    const wishlist = await hasWishlist.save();

    return res.status(200).json({
      success: true,
      message: "Item Added To Wishlist",
      wishlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong While Adding To Wishlist",
      error: error.message,
    });
  }
};

/*****************Get Wishlist || GET********* */
export const getWishlistController = async (req, res) => {
  try {
    const { _id } = req.user;

    const wishlist = await wishlistModel
      .findOne({ user: _id })
      .populate("products");

    if (!wishlist) {
      return res
        .status(404)
        .json({ success: false, message: "Wishlist Not Found" });
    }

    return res.status(200).json({
      success: true,
      message: "Wishlist Items fetched successfully",
      wishlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong While Fetching the Wishlist",
      error: error.message,
    });
  }
};

/*****************Delete Wishlist Item || DELETE********* */
export const deleteWishlistItemController = async (req, res) => {
  try {
    const { productId } = req.params;
    const { _id } = req.user;

    const wishlist = await wishlistModel
      .findOne({ user: _id })
      .populate("products");

    if (!wishlist) {
      return res
        .status(404)
        .json({ success: false, message: "Wishlist Not Found" });
    }

    const isProductIsInWishlist = wishlist?.products?.some(
      (product) => product._id.toString() === productId
    );

    if (!isProductIsInWishlist) {
      return res.status(409).json({
        success: false,
        message: "Item Not Found",
      });
    }
    
    wishlist.products = wishlist?.products?.filter(
      (product) => product._id.toString() !== productId
    );
    const updatedWishlist = await wishlist.save();

    return res.status(200).json({
      success: true,
      message: "Item Deleted Successfully",
      wishlist: updatedWishlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong While Deleting the Wishlist Item",
      error: error.message,
    });
  }
};
