import { isValidObjectId } from "mongoose";
import cartModel from "../models/cartModel.js";

/*******************Add To Cart || POST***************** */
export const addToCartController = async (req, res) => {
  try {
    const { productId } = req.params;
    const { _id } = req.user;

    //validation for valid objectId
    const validUserId = isValidObjectId(_id);
    const validProductId = isValidObjectId(productId);

    if (!validUserId) {
      return res
        .status(400)
        .json({ success: false, message: "Not a valid user Id" });
    }

    if (!validProductId) {
      return res
        .status(400)
        .json({ success: false, message: "Not a valid product Id" });
    }

    const user = await cartModel.findOne({ user: _id });

    if (!user) {
      const newCart = new cartModel({
        user: _id,
        items: [{ product: productId }],
      });
      await newCart.save();
      const cart = await cartModel
        .findOne({ user: _id })
        .populate("items.product");
      return res.status(201).json({
        success: true,
        message: "Item Added To Cart",
        cart,
      });
    }

    const isProductPresentInCart = user.items.some(
      (item) => item.product.toString() === productId
    );

    //Check for product in the cart
    if (isProductPresentInCart) {
      return res.status(409).json({
        success: false,
        message: "Item is already present in your cart",
      });
    }

    user.items = user.items.concat({ product: productId });
    await user.save();

    const cart = await cartModel
      .findOne({ user: _id })
      .populate("items.product");

    return res
      .status(200)
      .json({ success: true, message: "Item Added To Cart", cart });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong While Adding To Cart",
      error: error.message,
    });
  }
};

/****************Get Cart Items || GET**************** */
export const getCartItemsController = async (req, res) => {
  try {
    const { _id } = req.user;

    //validation for valid objectId
    const validUserId = isValidObjectId(_id);
    if (!validUserId) {
      return res
        .status(400)
        .json({ success: false, message: "Not a valid user Id" });
    }

    const cart = await cartModel
      .findOne({ user: _id })
      .populate("items.product");

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart Not Found" });
    }

    return res.status(200).json({
      success: true,
      message: "Cart Items Fetched Successfully",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong While Fetching Cart Items",
      error: error.message,
    });
  }
};

/*******************Delete Cart Item || DELETE********** */
export const deleteCartItemController = async (req, res) => {
  try {
    const { productId } = req.params;
    const { _id } = req.user;

    //validation for valid objectId
    const validUserId = isValidObjectId(_id);
    const validProductId = isValidObjectId(productId);

    if (!validUserId) {
      return res
        .status(400)
        .json({ success: false, message: "Not a valid user Id" });
    }

    if (!validProductId) {
      return res
        .status(400)
        .json({ success: false, message: "Not a valid product Id" });
    }

    const user = await cartModel
      .findOne({ user: _id })
      .populate("items.product");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });
    }

    const isProductPresentInCart = user.items.some(
      (item) => item?.product?._id?.toString() === productId
    );

    if (!isProductPresentInCart) {
      return res
        .status(404)
        .json({ success: false, message: "Product Not Found In The Cart" });
    }

    user.items = user.items.filter(
      (item) => item?.product?._id?.toString() !== productId
    );

    const cart = await user.save();

    return res.status(200).json({
      success: true,
      message: "Item Removed From Cart",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong While Deleting Cart Item",
      error: error.message,
    });
  }
};

/*******************Delete Cart || DELETE********** */
export const deleteCartController = async (req, res) => {
  try {
    const { _id } = req.user;

    //validation for valid objectId
    const validUserId = isValidObjectId(_id);
    if (!validUserId) {
      return res
        .status(400)
        .json({ success: false, message: "Not a valid user Id" });
    }

    const deletedCart = await cartModel.deleteOne({ user: _id });

    if (deletedCart.acknowledged && deletedCart.deletedCount >= 1) {
      return res.status(200).json({
        success: true,
        message: "Cart Has Been Reset",
      });
    }

    return res.status(404).json({ success: false, message: "Cart not found" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong While Deleting The Cart ",
      error: error.message,
    });
  }
};

/*****************Update Product Quantity || PUT********** */
export const updateProductQuantityController = async (req, res) => {
  try {
    const { productId, productQuantity } = req.params;
    const { _id } = req.user;

    //validation for valid objectId
    const validUserId = isValidObjectId(_id);
    const validProductId = isValidObjectId(productId);

    if (!validUserId) {
      return res
        .status(400)
        .json({ success: false, message: "Not a valid user Id" });
    }

    if (!validProductId) {
      return res
        .status(400)
        .json({ success: false, message: "Not a valid product Id" });
    }

    const cart = await cartModel.findOne({ user: _id });

    if (!cart) {
      return res.status(404).json({ success: true, message: "Cart Not Found" });
    }

    const productIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (productIndex === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Product Not Found" });
    }
    const cartProductsCopy = [...cart.items];
    const updatedProduct = {
      product: productId,
      quantity: productQuantity,
      _id: cartProductsCopy[productIndex]._id,
    };
    cartProductsCopy.splice(productIndex, 1, updatedProduct);
    cart.items = cartProductsCopy;

    await cart.save();

    const updatedCart = await cartModel
      .findOne({ user: _id })
      .populate("items.product");
      
    return res.status(200).json({
      success: true,
      message: "Quantity Updated Successfully",
      cart: updatedCart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong While Updating the product quantity",
      error: error.message,
    });
  }
};
