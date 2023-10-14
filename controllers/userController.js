import userModel from "../models/userModel.js";

/****************Get User Data || GET************** */
export const getUserDataController = async (req, res) => {
  try {
    const { _id } = req.user;

    const user = await userModel.findById(_id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });
    }

    return res.status(200).json({
      success: true,
      message: "User Data Fetched Successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong in getting the user data",
      error: error.message,
    });
  }
};

/*************************Add User Address By Id || POST***************** */
export const addUserAddressController = async (req, res) => {
  try {
    const { _id } = req.user;

    const {
      firstName,
      lastName,
      emailAddress,
      mobileNumber,
      altMobileNumber,
      country,
      street,
      city,
      village,
      mandal,
      pinCode,
      state,
      dist,
    } = req.body;

    //validation
    switch (true) {
      case !firstName:
        res
          .status(400)
          .json({ success: false, message: "Please Provide Your First Name" });
        return;

      case !lastName:
        res
          .status(400)
          .json({ success: false, message: "Please Provide Your Last Name" });
        return;

      case !emailAddress:
        res
          .status(400)
          .json({ success: false, message: "Please Provide Your Email" });
        return;

      case !mobileNumber:
        res.status(400).json({
          success: false,
          message: "Please Provide Your Mobile Number",
        });
        return;

      case !country:
        res
          .status(400)
          .json({ success: false, message: "Please Provide Your Country" });
        return;

      case !street:
        res.status(400).json({
          success: false,
          message: "Please Provide Your Street Address",
        });
        return;

      case !state:
        res
          .status(400)
          .json({ success: false, message: "Please Provide Your State" });
        return;

      case !pinCode:
        res
          .status(400)
          .json({ success: false, message: "Please Provide Your Pin Code" });
        return;

      case !dist:
        res
          .status(400)
          .json({ success: false, message: "Please Provide Your District" });
        return;

      case !mandal:
        res
          .status(400)
          .json({ success: false, message: "Please Provide Your Town/Mandal" });
        return;
    }

    const user = await userModel.findById(_id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });
    }

    const newAddress = {
      firstName,
      lastName,
      emailAddress,
      mobileNumber,
      altMobileNumber,
      country,
      state,
      city,
      dist,
      mandal,
      village,
      pinCode,
      street,
    };

    const updateUserAddress = [...user.addresses, newAddress];
    user.addresses = updateUserAddress;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "User Address Added Successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: "Something went wrong while updating user address",
      error: error.message,
    });
  }
};

/******************Get User Addresses By Id || GET*************** */
export const getUserAddressesController = async (req, res) => {
  try {
    const { _id } = req.user;

    const user = await userModel.findById(_id);

    if (!user) {
      return res.status(404).json({ success: true, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      message: "User Addresses Fetched Successfully",
      addresses: user?.addresses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong While Fetching User Addresses",
      error: error.message,
    });
  }
};

/******************Delete User Address By User Id and Address Id || DELETE********** */
export const deleteUserAddressController = async (req, res) => {
  try {
    const { addressId } = req.params;
    const { _id } = req.user;

    const user = await userModel.findById(_id);
    if (!user) {
      res.status(404).json({ success: false, message: "User Not Found" });
    } else {
      // const updatedAddressesPostDelete = user?.addresses?.filter(
      //   (address) => address._id.toString() !== addressId
      // );
      // user.addresses = updatedAddressesPostDelete;

      const addressesCopy = [...user?.addresses];

      const addressIndex = addressesCopy.findIndex(
        (address) => address._id.toString() === addressId
      );
      if (addressIndex === -1) {
        return res
          .status(404)
          .json({ success: false, message: "Address Not Found" });
      } else {
        addressesCopy.splice(addressIndex, 1);
        user.addresses = addressesCopy;
        const userPostDelete = await user.save();
        return res.status(200).json({
          success: true,
          message: "Address Deleted Successfully",
          userPostDelete,
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong While Deleting The Address",
      error,
    });
  }
};

/******************Update User Address By User Id and Address Id || PUT************** */
export const updateUserAddressController = async (req, res) => {
  try {
    const { addressId } = req.params;
    const { _id } = req.user;

    const {
      firstName,
      lastName,
      emailAddress,
      mobileNumber,
      altMobileNumber,
      country,
      street,
      city,
      village,
      mandal,
      pinCode,
      state,
      dist,
    } = req.body;

    //validation
    switch (true) {
      case !firstName:
        res
          .status(400)
          .json({ success: false, message: "Please Provide Your First Name" });
        return;

      case !lastName:
        res
          .status(400)
          .json({ success: false, message: "Please Provide Your Last Name" });
        return;

      case !emailAddress:
        res
          .status(400)
          .json({ success: false, message: "Please Provide Your Email" });
        return;

      case !mobileNumber:
        res.status(400).json({
          success: false,
          message: "Please Provide Your Mobile Number",
        });
        return;

      case !country:
        res
          .status(400)
          .json({ success: false, message: "Please Provide Your Country" });
        return;

      case !street:
        res.status(400).json({
          success: false,
          message: "Please Provide Your Street Address",
        });
        return;

      case !state:
        res
          .status(400)
          .json({ success: false, message: "Please Provide Your State" });
        return;

      case !pinCode:
        res
          .status(400)
          .json({ success: false, message: "Please Provide Your Pin Code" });
        return;

      case !dist:
        res
          .status(400)
          .json({ success: false, message: "Please Provide Your District" });
        return;

      case !mandal:
        res
          .status(400)
          .json({ success: false, message: "Please Provide Your Town/Mandal" });
        return;
    }

    const user = await userModel.findById(_id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });
    }

    const updatedAddress = {
      firstName,
      lastName,
      emailAddress,
      mobileNumber,
      altMobileNumber,
      country,
      state,
      city,
      dist,
      mandal,
      village,
      pinCode,
      street,
      _id: addressId,
    };

    const addressesCopy = [...user.addresses];

    const updateAddressIndex = addressesCopy.findIndex(
      (address) => address._id.toString() === addressId
    );

    if (updateAddressIndex === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Address To Be Updated Not Found" });
    }

    addressesCopy.splice(updateAddressIndex, 1, updatedAddress);
    user.addresses = addressesCopy;
    const updatedUser = await user.save();

    return res.status(200).json({
      success: true,
      message: "Address Updated Successfully",
      updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something Went Wrong while updating the User Address",
      error: error.message,
    });
  }
};
