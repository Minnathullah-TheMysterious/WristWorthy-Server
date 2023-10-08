import { Types } from "mongoose";
import orderModel from "../models/orderModel.js";
import { invoiceHtmlTemplate, sendMail } from "../services/common.js";
import userModel from "./../models/userModel.js";

/*****************placing an order || POST************** */
export const placeOrderController = async (req, res) => {
  try {
    const { _id } = req.user;
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
        .json({ success: false, message: "Product is required" });
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

    const userOrders = await orderModel
      .findOne({ user: _id })
      .populate("orders.products.product_id");

    const userInfo = await userModel.findById(_id);

    const subject = "Order Placed Successfully";
    const text = `Dear ${userInfo?.user_name}! Thank You For Ordering. You Order Has Been Placed Successfully`;

    //Check For User orders
    if (!userOrders) {
      const newUserOrder = new orderModel({
        user: _id,
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

      await newUserOrder.save();

      const order = await orderModel
        .findOne({ user: _id })
        .populate("orders.products.product_id");

      const placedOrder = order?.orders[0];

      sendMail(
        userInfo?.email,
        subject,
        text,
        invoiceHtmlTemplate(placedOrder)
      );

      return res
        .status(201)
        .json({ success: true, message: "Order Placed Successfully", order, placedOrder });
    } else {
      userOrders.orders = userOrders.orders.concat({
        products,
        totalItems,
        totalAmount,
        shippingAddress,
        paymentMethod,
      });
      await userOrders.save();

      const orders = await orderModel
        .findOne({ user: _id })
        .populate("orders.products.product_id");

      const placedOrder = orders?.orders[orders?.orders?.length - 1];

      sendMail(
        userInfo?.email,
        subject,
        text,
        invoiceHtmlTemplate(placedOrder)
      );

      return res.status(201).json({
        success: true,
        message: "Order Placed Successfully",
        orders,
      });
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
    const { _id } = req.user;

    const orders = await orderModel
      .findOne({ user: _id })
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
export const getAllFilteredOrdersController = async (req, res) => {
  try {
    const {
      order_id,
      order_status,
      payment_status,
      _page,
      payment_method,
      _limit,
      createdAt,
      updatedAt,
      amount,
      item,
    } = req.query;

    const pageNum = _page || 1;
    const limit = _limit || 8;
    const skip = (pageNum - 1) * limit;
    const orderIdAsObjectId = new Types.ObjectId(order_id);

    let matchQueryObject = {};

    if (order_status) {
      matchQueryObject["orders.status"] = order_status;
    }

    if (order_id) {
      matchQueryObject["orders._id"] = orderIdAsObjectId;
    }

    if (payment_status) {
      matchQueryObject["orders.paymentStatus"] = payment_status;
    }

    if (payment_method) {
      matchQueryObject["orders.paymentMethod"] = payment_method;
    }

    console.log(matchQueryObject);

    let sortQueryObject = { "order.createdAt": -1 };

    if (createdAt) {
      sortQueryObject = { "order.createdAt": +createdAt };
    }
    if (updatedAt) {
      sortQueryObject = { "order.updatedAt": +updatedAt };
    }
    if (amount) {
      sortQueryObject = { "order.totalAmount": +amount };
    }
    if (item) {
      sortQueryObject = { "order.totalItems": +item };
    }

    console.log(sortQueryObject);

    const ordersPipeline = [
      { $unwind: "$orders" },
      { $match: matchQueryObject },
      {
        $addFields: { "orders.product_id": "$orders.products.product_id" },
      },
      {
        $lookup: {
          from: "products",
          localField: "orders.product_id",
          foreignField: "_id",
          as: "orders.populatedProducts",
        },
      },
      {
        $addFields: {
          "orders.populatedProducts": {
            $map: {
              input: "$orders.populatedProducts",
              as: "populatedProduct",
              in: {
                $mergeObjects: [
                  "$$populatedProduct",
                  {
                    productsOverview: {
                      $arrayElemAt: [
                        {
                          $filter: {
                            input: "$orders.products",
                            as: "product",
                            cond: {
                              $eq: [
                                "$$product.product_id",
                                "$$populatedProduct._id",
                              ],
                            },
                          },
                        },
                        0,
                      ],
                    },
                  },
                ],
              },
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          user: 1,
          order: {
            $map: {
              input: ["$orders"],
              as: "order",
              in: {
                _id: "$$order._id",
                totalItems: "$$order.totalItems",
                totalAmount: "$$order.totalAmount",
                paymentMethod: "$$order.paymentMethod",
                status: "$$order.status",
                paymentStatus: "$$order.paymentStatus",
                createdAt: "$$order.createdAt",
                updatedAt: "$$order.updatedAt",
                products: {
                  $map: {
                    input: "$$order.populatedProducts",
                    as: "populatedProduct",
                    in: {
                      product_id: "$$populatedProduct._id",
                      product_name: "$$populatedProduct.product_name",
                      price: "$$populatedProduct.price",
                      discountPercentage:
                        "$$populatedProduct.discountPercentage",
                      quantity: "$$populatedProduct.productsOverview.quantity",
                      thumbnail: "$$populatedProduct.thumbnail",
                      deleted: "$$populatedProduct.deleted",
                    },
                  },
                },
                shippingAddress: "$$order.shippingAddress",
              },
            },
          },
        },
      },
      {
        $skip: +skip,
      },
      {
        $limit: +limit,
      },
      {
        $sort: sortQueryObject,
      },
    ];

    const orders = await orderModel.aggregate(ordersPipeline);

    const ordersCountPipeline = [
      { $unwind: "$orders" },
      { $match: matchQueryObject },
      {
        $addFields: { "orders.product_id": "$orders.products.product_id" },
      },
      {
        $lookup: {
          from: "products",
          localField: "orders.product_id",
          foreignField: "_id",
          as: "orders.populatedProducts",
        },
      },
      {
        $addFields: {
          "orders.populatedProducts": {
            $map: {
              input: "$orders.populatedProducts",
              as: "populatedProduct",
              in: {
                $mergeObjects: [
                  "$$populatedProduct",
                  {
                    productsOverview: {
                      $arrayElemAt: [
                        {
                          $filter: {
                            input: "$orders.products",
                            as: "product",
                            cond: {
                              $eq: [
                                "$$product.product_id",
                                "$$populatedProduct._id",
                              ],
                            },
                          },
                        },
                        0,
                      ],
                    },
                  },
                ],
              },
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          user: 1,
          order: {
            $map: {
              input: ["$orders"],
              as: "order",
              in: {
                _id: "$$order._id",
                totalItems: "$$order.totalItems",
                totalAmount: "$$order.totalAmount",
                paymentMethod: "$$order.paymentMethod",
                status: "$$order.status",
                paymentStatus: "$$order.paymentStatus",
                createdAt: "$$order.createdAt",
                updatedAt: "$$order.updatedAt",
                products: {
                  $map: {
                    input: "$$order.populatedProducts",
                    as: "populatedProduct",
                    in: {
                      product_id: "$$populatedProduct._id",
                      product_name: "$$populatedProduct.product_name",
                      price: "$$populatedProduct.price",
                      discountPercentage:
                        "$$populatedProduct.discountPercentage",
                      quantity: "$$populatedProduct.productsOverview.quantity",
                      thumbnail: "$$populatedProduct.thumbnail",
                      deleted: "$$populatedProduct.deleted",
                    },
                  },
                },
                shippingAddress: "$$order.shippingAddress",
              },
            },
          },
        },
      },
    ];

    const totalOrders = await orderModel.aggregate(ordersCountPipeline);
    const ordersCount = totalOrders?.length;

    if (!orders || !orders.length) {
      return res
        .status(404)
        .json({ success: false, message: "Orders Not Found" });
    } else {
      return res.status(200).json({
        success: true,
        message: "All Orders Fetched Successfully",
        ordersCount,
        orders,
      });
    }
  } catch (error) {
    if (error.name === "BSONError") {
      return res.status(400).json({
        success: false,
        message: "Invalid Order Id",
        error: error.message,
      });
    }
    console.error("Something went wrong while fetching all orders", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching all orders",
      error: error.message,
    });
  }
};

/******************Cancel Order || PUT*********** */
export const cancelOrderController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { _id } = req.user;

    const user = await orderModel.findOne({ user: _id });
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
        user.orders[orderIndex].status = "cancelled";
        await user.save();

        const orders = await orderModel
          .findOne({ user: _id })
          .populate("orders.products.product_id");

        return res.status(200).json({
          success: true,
          message: "Order Cancelled Successfully",
          orders,
        });
      }
    }
  } catch (error) {
    console.error("Something went wrong while cancelling the order", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while cancelling the order",
      error: error.message,
    });
  }
};

/******************Get Order By Id || PUT*********** */
export const getOrderByIdController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const orderObjectId = new Types.ObjectId(orderId);

    const pipeline = [
      { $unwind: "$orders" },
      { $match: { "orders._id": orderObjectId } },
      { $addFields: { "orders.product_id": "$orders.products.product_id" } },
      {
        $lookup: {
          from: "products",
          localField: "orders.product_id",
          foreignField: "_id",
          as: "orders.populatedProducts",
        },
      },
      {
        $addFields: {
          "orders.populatedProducts": {
            $map: {
              input: "$orders.populatedProducts",
              as: "populatedProduct",
              in: {
                $mergeObjects: [
                  "$$populatedProduct",
                  {
                    productsOverview: {
                      $arrayElemAt: [
                        {
                          $filter: {
                            input: "$orders.products",
                            as: "product",
                            cond: {
                              $eq: [
                                "$$product.product_id",
                                "$$populatedProduct._id",
                              ],
                            },
                          },
                        },
                        0,
                      ],
                    },
                  },
                ],
              },
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          user: 1,
          createdAt: 1,
          updatedAt: 1,
          order: {
            $map: {
              input: ["$orders"],
              as: "order",
              in: {
                _id: "$$order._id",
                totalItems: "$$order.totalItems",
                totalAmount: "$$order.totalAmount",
                paymentMethod: "$$order.paymentMethod",
                status: "$$order.status",
                paymentStatus: "$$order.paymentStatus",
                createdAt: "$$order.createdAt",
                updatedAt: "$$order.updatedAt",
                products: {
                  $map: {
                    input: "$$order.populatedProducts",
                    as: "populatedProduct",
                    in: {
                      product_id: "$$populatedProduct._id",
                      product_name: "$$populatedProduct.product_name",
                      price: "$$populatedProduct.price",
                      discountPercentage:
                        "$$populatedProduct.discountPercentage",
                      quantity: "$$populatedProduct.productsOverview.quantity",
                      thumbnail: "$$populatedProduct.thumbnail",
                      deleted: "$$populatedProduct.deleted",
                    },
                  },
                },
                shippingAddress: "$$order.shippingAddress",
              },
            },
          },
        },
      },
    ];

    const order = await orderModel.aggregate(pipeline);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order Not Found" });
    } else {
      return res.status(200).json({
        success: true,
        message: "Order Fetched Successfully",
        order,
      });
    }
  } catch (error) {
    console.error("Something went wrong while fetching the order", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching the order",
      error: error.message,
    });
  }
};

/***********************Update Order Status || PUT***************** */
export const updateOrderStatusController = async (req, res) => {
  try {
    const { orderId, status } = req.params;

    // Validate that orderId is a valid ObjectId
    if (!Types.ObjectId.isValid(orderId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Order ID" });
    }

    if (!status || status.length <= 1) {
      return res
        .status(400)
        .json({ success: false, message: "Please Provide Status To Update" });
    }

    const orderObjectId = new Types.ObjectId(orderId);

    //Update The Order Status And Save It To The Database
    const updateStatus = await orderModel.findOneAndUpdate(
      { "orders._id": orderId },
      { $set: { "orders.$.status": status } }
    );

    if (!updateStatus) {
      return res
        .status(404)
        .json({ success: false, message: "Order Not Found" });
    }

    const pipeline = [
      { $unwind: "$orders" },
      { $match: { "orders._id": orderObjectId } },
      { $addFields: { "orders.product_id": "$orders.products.product_id" } },
      {
        $lookup: {
          from: "products",
          localField: "orders.product_id",
          foreignField: "_id",
          as: "orders.populatedProducts",
        },
      },
      {
        $addFields: {
          "orders.populatedProducts": {
            $map: {
              input: "$orders.populatedProducts",
              as: "populatedProduct",
              in: {
                $mergeObjects: [
                  "$$populatedProduct",
                  {
                    productsOverview: {
                      $arrayElemAt: [
                        {
                          $filter: {
                            input: "$orders.products",
                            as: "product",
                            cond: {
                              $eq: [
                                "$$product.product_id",
                                "$$populatedProduct._id",
                              ],
                            },
                          },
                        },
                        0,
                      ],
                    },
                  },
                ],
              },
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          user: 1,
          order: {
            $map: {
              input: ["$orders"],
              as: "order",
              in: {
                _id: "$$order._id",
                totalItems: "$$order.totalItems",
                totalAmount: "$$order.totalAmount",
                paymentMethod: "$$order.paymentMethod",
                status: "$$order.status",
                paymentStatus: "$$order.paymentStatus",
                createdAt: "$$order.createdAt",
                updatedAt: "$$order.updatedAt",
                products: {
                  $map: {
                    input: "$$order.populatedProducts",
                    as: "populatedProduct",
                    in: {
                      product_id: "$$populatedProduct._id",
                      product_name: "$$populatedProduct.product_name",
                      price: "$$populatedProduct.price",
                      discountPercentage:
                        "$$populatedProduct.discountPercentage",
                      quantity: "$$populatedProduct.productsOverview.quantity",
                      thumbnail: "$$populatedProduct.thumbnail",
                      deleted: "$$populatedProduct.deleted",
                    },
                  },
                },
                shippingAddress: "$$order.shippingAddress",
              },
            },
          },
        },
      },
    ];

    //Now Fetch the updated order
    const updatedOrder = await orderModel.aggregate(pipeline);

    if (!updatedOrder) {
      return res
        .status(404)
        .json({ success: false, message: "Order Not Found" });
    }

    return res.status(200).json({
      success: true,
      message: "Order Status Updated Successfully",
      updatedOrder,
    });
  } catch (error) {
    console.error("Something went wrong while updating order status", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while updating order status",
      error: error.message,
    });
  }
};

/***********************Update Payment Status || PUT***************** */
export const updatePaymentStatusController = async (req, res) => {
  try {
    const { orderId, status } = req.params;

    // Validate that orderId is a valid ObjectId
    if (!Types.ObjectId.isValid(orderId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Order ID" });
    }

    if (!status || status.length <= 1) {
      return res
        .status(400)
        .json({ success: false, message: "Please Provide Status To Update" });
    }

    const orderObjectId = new Types.ObjectId(orderId);

    //Update The Order Status And Save It To The Database
    const updateStatus = await orderModel.findOneAndUpdate(
      { "orders._id": orderId },
      { $set: { "orders.$.paymentStatus": status } }
    );

    if (!updateStatus) {
      return res
        .status(404)
        .json({ success: false, message: "Order Not Found" });
    }

    const pipeline = [
      { $unwind: "$orders" },
      { $match: { "orders._id": orderObjectId } },
      { $addFields: { "orders.product_id": "$orders.products.product_id" } },
      {
        $lookup: {
          from: "products",
          localField: "orders.product_id",
          foreignField: "_id",
          as: "orders.populatedProducts",
        },
      },
      {
        $addFields: {
          "orders.populatedProducts": {
            $map: {
              input: "$orders.populatedProducts",
              as: "populatedProduct",
              in: {
                $mergeObjects: [
                  "$$populatedProduct",
                  {
                    productsOverview: {
                      $arrayElemAt: [
                        {
                          $filter: {
                            input: "$orders.products",
                            as: "product",
                            cond: {
                              $eq: [
                                "$$product.product_id",
                                "$$populatedProduct._id",
                              ],
                            },
                          },
                        },
                        0,
                      ],
                    },
                  },
                ],
              },
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          user: 1,
          order: {
            $map: {
              input: ["$orders"],
              as: "order",
              in: {
                _id: "$$order._id",
                totalItems: "$$order.totalItems",
                totalAmount: "$$order.totalAmount",
                paymentMethod: "$$order.paymentMethod",
                status: "$$order.status",
                paymentStatus: "$$order.paymentStatus",
                createdAt: "$$order.createdAt",
                updatedAt: "$$order.updatedAt",
                products: {
                  $map: {
                    input: "$$order.populatedProducts",
                    as: "populatedProduct",
                    in: {
                      product_id: "$$populatedProduct._id",
                      product_name: "$$populatedProduct.product_name",
                      price: "$$populatedProduct.price",
                      discountPercentage:
                        "$$populatedProduct.discountPercentage",
                      quantity: "$$populatedProduct.productsOverview.quantity",
                      thumbnail: "$$populatedProduct.thumbnail",
                      deleted: "$$populatedProduct.deleted",
                    },
                  },
                },
                shippingAddress: "$$order.shippingAddress",
              },
            },
          },
        },
      },
    ];

    //Now Fetch the updated order
    const updatedOrder = await orderModel.aggregate(pipeline);

    if (!updatedOrder) {
      return res
        .status(404)
        .json({ success: false, message: "Order Not Found" });
    }

    return res.status(200).json({
      success: true,
      message: "Payment Status Updated Successfully",
      updatedOrder,
    });
  } catch (error) {
    console.error("Something went wrong while updating Payment status", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while updating Payment status",
      error: error.message,
    });
  }
};
