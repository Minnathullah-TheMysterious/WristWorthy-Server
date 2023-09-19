import orderModel from "../models/orderModel.js";

/*****************placing an order || POST************** */
export const placeOrderController = async (req, res) => {
  try {
    const { userId } = req.params;
    const {
      products,
      totalItems,
      totalAmount,
      shippingAddress,
      paymentMethod,
    } = req.body;

    //validation
    if (!products) {
      return res
        .status(400)
        .json({ success: false, message: "Products are required" });
    }
    if (!totalItems) {
      return res
        .status(400)
        .json({ success: false, message: "Total Items is required" });
    }
    if (!totalAmount) {
      return res
        .status(400)
        .json({ success: false, message: "Total Amount is required" });
    }
    if (!shippingAddress) {
      return res
        .status(400)
        .json({ success: false, message: "Shipping Address is required" });
    }
    if (!paymentMethod) {
      return res
        .status(400)
        .json({ success: false, message: "Payment Method is required" });
    }

    const user = await orderModel.findOne({ user: userId }).populate('orders.products.product_id');
    //Check For User
    if (!user) {
      const newUserOrder = new orderModel({
        user: userId,
        orders: [
          {
            products,
            totalItems,
            totalAmount,
            shippingAddress,
            paymentMethod,
          },
        ],
      });
      const orders = await newUserOrder.save();
      return res
        .status(201)
        .json({ success: true, message: "Order Placed Successfully", orders });
    } else {
      user.orders = user.orders.concat({
        products,
        totalItems,
        totalAmount,
        shippingAddress,
        paymentMethod,
      });
      const orders = await user.save();
      return res
        .status(201)
        .json({ success: true, message: "Order Placed Successfully", orders });
    }
  } catch (error) {
    console.error("Something went wrong while placing an order", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while placing an order",
      error: error.message,
    });
  }
};

/*****************Fetch User Orders || GET************** */
export const getUserOrdersController = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await orderModel
      .findOne({ user: userId })
      .populate("orders.products.product_id");
    //Check For User
    if (!orders) {
      return res
        .status(404)
        .json({ success: false, message: "Orders Not Found" });
    } else {
      return res.status(200).json({
        success: true,
        message: "Orders Fetched Successfully",
        orders,
      });
    }
  } catch (error) {
    console.error("Something went wrong while fetching user orders", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching user orders",
      error: error.message,
    });
  }
};

/*****************Fetch All Orders || GET************** */
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel.find().populate("orders.products.product_id");
    if (!orders) {
      return res
        .status(404)
        .json({ success: false, message: "Orders Not Found" });
    } else {
      return res.status(200).json({
        success: true,
        message: "All Orders Fetched Successfully",
        orders,
      });
    }
  } catch (error) {
    console.error("Something went wrong while fetching all orders", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching all orders",
      error: error.message,
    });
  }
};

/******************Update Order Status || PUT*********** */
export const updateOrderStatusController = async (req, res) => {
  try {
    const { userId, orderId, orderStatus } = req.params;

    const user = await orderModel.findOne({ user: userId });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User Orders Not Found" });
    } else {
      const orderIndex = user.orders.findIndex(
        (order) => order._id.toString() === orderId
      );
      if (orderIndex === -1) {
        return res
          .status(404)
          .json({ success: false, message: "Order Not Found" });
      } else {
        //Directly mutating the data since in this case it is most simple way to do it
        user.orders[orderIndex].status = orderStatus;
        await user.save();

        const orders = await orderModel
          .findOne({ user: userId })
          .populate("orders.products.product_id");

        return res.status(200).json({
          success: true,
          message: "Order Status Updated Successfully",
          orders,
        });
      }
    }
  } catch (error) {
    console.error(
      "Something went wrong while updating the order status",
      error
    );
    res.status(500).json({
      success: false,
      message: "Something went wrong while updating the order status",
      error: error.message,
    });
  }
};
