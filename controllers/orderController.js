import { Types } from "mongoose";
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

    const user = await orderModel
      .findOne({ user: userId })
      .populate("orders.products.product_id");
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
export const getAllFilteredOrdersController = async (req, res) => {
  try {
    const { order_id, order_status, _page, _limit } = req.query;
    console.log(
      `order_id: ${order_id}; order_status: ${order_status}; _page: ${_page}; _limit: ${_limit}`
    );

    const pageNum = _page || 1;
    const limit = _limit || 8;
    const skip = (pageNum - 1) * limit;
    const orderIdAsObjectId = new Types.ObjectId(order_id);

    let matchQueryObject = {};

    if (order_status) {
      matchQueryObject = { "orders.status": order_status };
    }
    if (order_id) {
      matchQueryObject = { "orders._id": orderIdAsObjectId };
    }
    if (order_id && order_status) {
      matchQueryObject = {
        "orders._id": orderIdAsObjectId,
        "orders.status": order_status,
      };
    }

    console.log(matchQueryObject);

    // const ordersAfterLookup = await orderModel.aggregate([
    //   { $unwind: "$orders" },
    //   { $match: matchQueryObject },
    //   {
    //     $addFields: { "orders.product_id": "$orders.products.product_id" },
    //   },
    //   {
    //     $lookup: {
    //       from: "products",
    //       localField: "orders.product_id",
    //       foreignField: "_id",
    //       as: "orders.populatedProducts",
    //     },
    //   },
    //   {
    //     $addFields: {
    //       "orders.populatedProducts": {
    //         $map: {
    //           input: "$orders.populatedProducts",
    //           as: "populatedProduct",
    //           in: {
    //             $mergeObjects: [
    //               "$$populatedProduct",
    //               {
    //                 productsOverview: {
    //                   $arrayElemAt: [
    //                     {
    //                       $filter: {
    //                         input: "$orders.products",
    //                         as: "product",
    //                         cond: {
    //                           $eq: [
    //                             "$$product.product_id",
    //                             "$$populatedProduct._id",
    //                           ],
    //                         },
    //                       },
    //                     },
    //                     0,
    //                   ],
    //                 },
    //               },
    //             ],
    //           },
    //         },
    //       },
    //     },
    //   },
    // ]);
    // console.log(
    //   "Orders After $lookup",
    //   JSON.stringify(ordersAfterLookup, null, 2)
    // );

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
