# WristWorthy
WristWorthy is a feature-rich eCommerce web application built using Node.js and Express. It offers a seamless shopping experience for users interested in purchasing a variety of wristwatches and other products. This repository contains the source code for the app, showcasing its functionalities and technologies used in development.
## Features
**User Authentication:**

Secure user registration and login powered by Passport.js for authentication.

**Product Listings:**

Browse through a wide selection of products from different categories, each with detailed descriptions and images.

**Shopping Cart:**

Add products to your cart and manage your selections before making a purchase.

**Wishlist:**

Add your favourite products to your wishlist and manage your selections before making a purchase.

**Payment Processing:**

Utilizes Stripe for secure and convenient payment processing.

**Order History:**

Keep track of your past orders for reference and record-keeping.

**User Profiles:**

Users can manage their profiles, view order history, and update personal information.

**Admin Dashboard:**

Admins have the authority to create, update, and delete products, brands, and categories. They can also manage and fulfill orders.
## Technologies Used
**Node.js and Express:**

The server-side of the application is built on Node.js and Express, providing a robust and scalable foundation.

**Passport.js:**

The Local Strategy of Passport.js is employed for user authentication, ensuring that user data is kept secure. And JWT Strategy of Passport.js is employed for API authentication.

**MongoDB:**

MongoDB is used as the database to store user information, product data, and order history.

**Stripe:**

Payment processing is handled via Stripe for secure and seamless transactions.

**Front-end Framework:**

The front-end of the application is built using React.js
## Installation and Usage
Clone the repository `git clone https://github.com/minnathullah-TheMysterious/books-server.git`

Install dependencies using `npm install`.

Configure your *MongoDB and Stripe API keys*

Run the application using `npm run server`.

Access the app in your web browser at `http://localhost:7070`.

Feel free to explore the code and contribute to the project to make WristWorthy even more 'wristworthy' for watch enthusiasts and other products.
## Admin Capabilities
**Admin Dashboard:**

Admins can access a dedicated dashboard for managing products, brands, categories, and orders.

**Product Management:**

Create, update, and delete products, including details like name, description, price, and images.

**Brand and Category Management:**

Admins can add, edit, or remove brands and categories for efficient product organization.

**Order Management:**

Admins have the ability to view and manage orders, including order status updates and order fulfillment.
## API Documentaion
### Admin APIs
**Create Product `/api/v1/product/admin/create-product`**

***Request***

FormData:
```javascript
{
  "product_name": "Rolex",
  "description":  "Watch from Rolex",
  "brand": "brand_id",
  "category": "category_id",
  "highlight_1": "Provide product feature",
  "highlight_2": "Provide product feature",
  "highlight_3": "Provide product feature",
  "highlight_4": "Provide product feature",
  "highlight_5": "Provide product feature",
  "price": 300,
  "discountPercentage": 4.2,
  "stock": 5,
  "thumbnail": upload image,
  "image_1": upload image,
  "image_2": upload image,
  "image_3": upload image,
  "image_4": upload image
}
```
***Responses***

*HTTP Status Code: 201 CREATED*
```javascript
{
    "success": true,
    "message": "Product Created Successfully",
    "product": {
        "product_name": "Rolex",
        "slug": "rolex",
        "brand": "65013a104f41af7936475a73",
        "category": "650138c14f41af7936475a64",
        "description": "Watch from Rolex",
        "stock": 89,
        "price": 189,
        "discountPercentage": 9.563,
        "thumbnail": {
            "location": "public\\images\\product\\thumbnail-1698924929715-121835449-watch26.jpg",
            "contentType": "image/jpeg",
            "originalname": "watch26.jpg",
            "size": 24774
        },
        "images": [
            {
                "location": "public\\images\\product\\image_1-1698924929711-78694487-watch26.jpg",
                "contentType": "image/jpeg",
                "originalname": "watch26.jpg",
                "size": 24774,
                "_id": "65438982d265803c74dafe81"
            },
            {
                "location": "public\\images\\product\\image_2-1698924929712-90785429-watch26.jpg",
                "contentType": "image/jpeg",
                "originalname": "watch26.jpg",
                "size": 24774,
                "_id": "65438982d265803c74dafe82"
            },
            {
                "location": "public\\images\\product\\image_3-1698924929713-372305317-watch26.jpg",
                "contentType": "image/jpeg",
                "originalname": "watch26.jpg",
                "size": 24774,
                "_id": "65438982d265803c74dafe83"
            },
            {
                "location": "public\\images\\product\\image_4-1698924929714-576035244-watch26.jpg",
                "contentType": "image/jpeg",
                "originalname": "watch26.jpg",
                "size": 24774,
                "_id": "65438982d265803c74dafe84"
            }
        ],
        "highlights": [
            "Provide product feature",
            "Provide product feature",
            "Provide product feature",
            "Provide product feature",
            "Provide product feature"
        ],
        "deleted": false,
        "_id": "65438982d265803c74dafe80",
        "createdAt": "2023-11-02T11:35:30.196Z",
        "updatedAt": "2023-11-02T11:35:30.196Z",
        "__v": 0
    }
}
```
***Error Responses***

*HTTP Status Code: 400 BAD REQUEST*
```javascript
{ success: false, message: "Validation error" }
```
*HTTP Status Code: 409 CONFLICT*
```javascript
{ success: false, message: "Product With The Same Name Already exists"}
```
**Update Product `/api/v1/product/admin/update-product/{productId}`**

***Request***

Path Parameter:

productId (string, required): The unique identifier for the product.

Request Body:
```javascript
{
     "product_name": "I Phone 9",
     "brand": "650139d14f41af7936475a6d",
     "category": "650138c14f41af7936475a64",
     "price": 549,
     "discountPercentage": 11.56,
     "stock": 21,
     "description": "An apple mobile which is nothing like apple",
     "highlight_1": "Provide product feature",
     "highlight_2": "Provide product feature",
     "highlight_3": "Provide product feature",
     "highlight_4": "Provide product feature",
     "highlight_5": "Provide product feature",
}
```
***Responses***

*HTTP Status Code: 200 OK*
```javascript
{
      success: true,
      message: "Product Updates Successfully",
      product: {
        "product_name": "Rolex",
        "slug": "rolex",
        "brand": "65013a104f41af7936475a73",
        "category": "650138c14f41af7936475a64",
        "description": "Watch from Rolex",
        "stock": 89,
        "price": 189,
        "discountPercentage": 9.563,
        "highlights": [
            "Provide product feature",
            "Provide product feature",
            "Provide product feature",
            "Provide product feature",
            "Provide product feature"
        ],
      }
}

```
***Error Responses***

*HTTP Status Code: 400 BAD REQUEST*
```javascript
{ success: false, message: "Validation error" }
```
**Update Product Thumbnail `/api/v1/product/admin/update-product-thumbnail/{productId}`**

***Request***

Path Parameter:

productId (string, required): The unique identifier for the product.

FormData:
```javascript
{"thumbnail": upload image}
```
***Responses***

*HTTP Status Code: 200 OK*
```javascript
{
    "success": true,
    "message": "Thumbnail Updated Successfully",
    "product": {
        "thumbnail": {
            "location": "public\\images\\product\\thumbnail-1698927462541-784499166-watch2.jpg",
            "contentType": "image/jpeg",
            "originalname": "watch2.jpg",
            "size": 147637
        },
        "_id": "65438982d265803c74dafe80",
        "product_name": "IPhone7",
        "slug": "iphone7",
        "brand": "65013a104f41af7936475a73",
        "category": "650138c14f41af7936475a64",
        "description": "IPhone7 is officially announced on April 2021. A High Quality Metal Body Product.",
        "stock": 89,
        "price": 189,
        "discountPercentage": 9.563,
        "images": [
            {
                "location": "public\\images\\product\\image_1-1698924929711-78694487-watch26.jpg",
                "contentType": "image/jpeg",
                "originalname": "watch26.jpg",
                "size": 24774,
                "_id": "65438982d265803c74dafe81"
            },
            {
                "location": "public\\images\\product\\image_2-1698924929712-90785429-watch26.jpg",
                "contentType": "image/jpeg",
                "originalname": "watch26.jpg",
                "size": 24774,
                "_id": "65438982d265803c74dafe82"
            },
            {
                "location": "public\\images\\product\\image_3-1698924929713-372305317-watch26.jpg",
                "contentType": "image/jpeg",
                "originalname": "watch26.jpg",
                "size": 24774,
                "_id": "65438982d265803c74dafe83"
            },
            {
                "location": "public\\images\\product\\image-1698926859019-173216298-watch1.jpg",
                "contentType": "image/jpeg",
                "originalname": "watch1.jpg",
                "size": 31332,
                "_id": "6543910bd265803c74dafeae"
            }
        ],
        "highlights": [
            "Provide product feature",
            "Provide product feature",
            "Provide product feature",
            "Provide product feature",
            "Provide product feature"
        ],
        "deleted": false,
        "createdAt": "2023-11-02T11:35:30.196Z",
        "updatedAt": "2023-11-02T12:17:42.637Z",
        "__v": 0
    }
}

```
***Error Responses***

*HTTP Status Code: 400 BAD REQUEST*
```javascript
{ success: false, message: "Product thumbnail is required" }
```
*HTTP Status Code: 404 NOT FOUND*
```javascript
{ success: false, message: "product not found" }
```
**Update Product Image `/api/v1/product/admin/update-product-image/{productId}/{imageIndex}`**

***Request***

Path Parameter:

productId (string, required): The unique identifier for the product.

imageIndex (number, required): The image index from the images array to be updated, The array consists of 4 images.

FormData:
```javascript
{"image": upload image}
```
***Responses***

*HTTP Status Code: 200 OK*
```javascript
{
    "success": true,
    "message": "Image updated Successfully",
    "product": {
        "thumbnail": {
            "location": "public\\images\\product\\thumbnail-1698924929715-121835449-watch26.jpg",
            "contentType": "image/jpeg",
            "originalname": "watch26.jpg",
            "size": 24774
        },
        "_id": "65438982d265803c74dafe80",
        "product_name": "IPhone7",
        "slug": "iphone7",
        "brand": "65013a104f41af7936475a73",
        "category": "650138c14f41af7936475a64",
        "description": "IPhone7 is officially announced on April 2021. A High Quality Metal Body Product.",
        "stock": 89,
        "price": 189,
        "discountPercentage": 9.563,
        "images": [
            {
                "location": "public\\images\\product\\image_1-1698924929711-78694487-watch26.jpg",
                "contentType": "image/jpeg",
                "originalname": "watch26.jpg",
                "size": 24774,
                "_id": "65438982d265803c74dafe81"
            },
            {
                "location": "public\\images\\product\\image_2-1698924929712-90785429-watch26.jpg",
                "contentType": "image/jpeg",
                "originalname": "watch26.jpg",
                "size": 24774,
                "_id": "65438982d265803c74dafe82"
            },
            {
                "location": "public\\images\\product\\image_3-1698924929713-372305317-watch26.jpg",
                "contentType": "image/jpeg",
                "originalname": "watch26.jpg",
                "size": 24774,
                "_id": "65438982d265803c74dafe83"
            },
            {
                "location": "public\\images\\product\\image-1698926859019-173216298-watch1.jpg",
                "contentType": "image/jpeg",
                "originalname": "watch1.jpg",
                "size": 31332,
                "_id": "6543910bd265803c74dafeae"
            }
        ],
        "highlights": [
            "Provide product feature",
            "Provide product feature",
            "Provide product feature",
            "Provide product feature",
            "Provide product feature"
        ],
        "deleted": false,
        "createdAt": "2023-11-02T11:35:30.196Z",
        "updatedAt": "2023-11-02T12:07:39.139Z",
        "__v": 0
    }
}

```
***Error Responses***

*HTTP Status Code: 400 BAD REQUEST*
```javascript
{ success: false, message: "Product image is required" }
```
*HTTP Status Code: 404 NOT FOUND*
```javascript
{ success: false, message: "product not found" }
```
**Delete Product `/api/v1/product/admin/delete-product/{productId}`**

***Request***

Path Parameter:

productId (string, required): The unique identifier for the product.

***Responses***

*HTTP Status Code: 200 OK*
```javascript
{
    "success": true,
    "message": "Product Deleted Successfully"
}
```
***Error Responses***

*HTTP Status Code: 404 NOT FOUND*
```javascript
{ success: false, message: "product not found" }
```
**Restore Product `/api/v1/product/admin/restore-product/{productId}`**

***Request***

Path Parameter:

productId (string, required): The unique identifier for the product.

***Responses***

*HTTP Status Code: 200 OK*
```javascript
{
    "success": true,
    "message": "Product Restored Successfully"
}
```
***Error Responses***

*HTTP Status Code: 404 NOT FOUND*
```javascript
{ success: false, message: "product not found" }
```
**Create Brand `/api/v1/brand/admin/create-brand`**

***Request***

FormData:
```javascript
{"brand_name": "Apple", "image": upload image}
```
***Responses***

*HTTP Status Code: 201 CREATED*
```javascript
{
    "success": true,
    "message": "Brand Created Successfully",
    "brand": {
        "brand_name": "Guava",
        "slug": "guava",
        "image": {
            "location": "public\\images\\brand\\image-1698929119286-56658615-watch17.jpeg",
            "contentType": "image/jpeg",
            "originalname": "watch17.jpeg",
            "size": 60195
        },
        "deleted": false,
        "_id": "654399dfd265803c74daff0b",
        "createdAt": "2023-11-02T12:45:19.409Z",
        "updatedAt": "2023-11-02T12:45:19.409Z",
        "__v": 0
    }
}
```
***Error Responses***

*HTTP Status Code: 400 BAD REQUEST*
```javascript
{ success: false, message: "Validation Error" }
```
*HTTP Status Code: 409 CONFLICT*
```javascript
{
    "success": false,
    "message": "Brand Already Exists",
    "existingBrand": {
        "image": {
            "location": "public\\images\\brand\\image-1698929119286-56658615-watch17.jpeg",
            "contentType": "image/jpeg",
            "originalname": "watch17.jpeg",
            "size": 60195
        },
        "_id": "654399dfd265803c74daff0b",
        "brand_name": "Guava",
        "slug": "guava",
        "deleted": false,
        "createdAt": "2023-11-02T12:45:19.409Z",
        "updatedAt": "2023-11-02T12:45:19.409Z",
        "__v": 0
    }
}
```
**Update Brand `/api/v1/brand/admin/update-brand/{brandId}`**

***Request***

Path Parameter:

brandId (string, required): The unique identifier for the brand.

Request Body:
```javascript
{"brand_name": "Apple"}
```
***Responses***

*HTTP Status Code: 200 OK*
```javascript
{
    "success": true,
    "message": "Brand Updated Successfully",
    "brand": {
        "image": {
            "location": "public\\images\\brand\\image-1698929119286-56658615-watch17.jpeg",
            "contentType": "image/jpeg",
            "originalname": "watch17.jpeg",
            "size": 60195
        },
        "_id": "654399dfd265803c74daff0b",
        "brand_name": "Updated Brand",
        "slug": "updated-brand",
        "deleted": false,
        "createdAt": "2023-11-02T12:45:19.409Z",
        "updatedAt": "2023-11-02T12:52:52.908Z",
        "__v": 0
    }
}
```
***Error Responses***

*HTTP Status Code: 400 BAD REQUEST*
```javascript
{ success: false, message: "Brand Name is Required" }
```
*HTTP Status Code: 404 NOT FOUND*
```javascript
{ success: false, message: "Brand Not Found" }
```
**Update Brand Image `/api/v1/brand/admin/update-brand-image/{brandId}`**

***Request***

Path Parameter:

brandId (string, required): The unique identifier for the brand.

FormData:
```javascript
{"image": upload image}
```
***Responses***

*HTTP Status Code: 200 OK*
```javascript
{
    "success": true,
    "message": "Brand Imaged Updated Successfully",
    "brand": {
        "image": {
            "location": "public\\images\\brand\\image-1698929824235-31604055-watch1.jpg",
            "contentType": "image/jpeg",
            "originalname": "watch1.jpg",
            "size": 31332
        },
        "_id": "654399dfd265803c74daff0b",
        "brand_name": "Updated Brand",
        "slug": "updated-brand",
        "deleted": false,
        "createdAt": "2023-11-02T12:45:19.409Z",
        "updatedAt": "2023-11-02T12:57:04.317Z",
        "__v": 0
    }
}
```
***Error Responses***

*HTTP Status Code: 400 BAD REQUEST*
```javascript
{ success: false, message: "Brand Image is Required" }
```
*HTTP Status Code: 404 NOT FOUND*
```javascript
{ success: false, message: "Brand Not Found" }
```
**Delete Brand `/api/v1/brand/admin/delete-brand/{brandId}`**

***Request***

Path Parameter:

brandId (string, required): The unique identifier for the brand.

***Responses***

*HTTP Status Code: 200 OK*
```javascript
{
    "success": true,
    "message": "Brand Deleted Successfully"
}
```
***Error Responses***

*HTTP Status Code: 404 NOT FOUND*
```javascript
{ success: false, message: "Brand Not Found" }
```
**Restore Brand `/api/v1/brand/admin/restore-brand/{brandId}`**

***Request***

Path Parameter:

brandId (string, required): The unique identifier for the brand.

***Responses***

*HTTP Status Code: 200 OK*
```javascript
{
    "success": true,
    "message": "Brand Restored Successfully"
}
```
***Error Responses***

*HTTP Status Code: 404 NOT FOUND*
```javascript
{ success: false, message: "Brand Not Found" }
```
**Create Category `/api/v1/category/admin/create-category`**

***Request***

FormData:
```javascript
{"category_name": "Smart Phone", "image": upload image}
```
***Responses***

*HTTP Status Code: 201 CREATED*
```javascript
{
    "success": true,
    "message": "Category Created Successfully",
    "brand": {
        "category_name": "Guava",
        "slug": "guava",
        "image": {
            "location": "public\\images\\brand\\image-1698929119286-56658615-watch17.jpeg",
            "contentType": "image/jpeg",
            "originalname": "watch17.jpeg",
            "size": 60195
        },
        "deleted": false,
        "_id": "654399dfd265803c74daff0b",
        "createdAt": "2023-11-02T12:45:19.409Z",
        "updatedAt": "2023-11-02T12:45:19.409Z",
        "__v": 0
    }
}
```
***Error Responses***

*HTTP Status Code: 400 BAD REQUEST*
```javascript
{ success: false, message: "Validation Error" }
```
*HTTP Status Code: 409 CONFLICT*
```javascript
{
    "success": false,
    "message": "Category already exists",
    "existingCategory": {
        "image": {
            "location": "public\\images\\category\\image-1698930366240-749852027-watch4.png",
            "contentType": "image/png",
            "originalname": "watch4.png",
            "size": 653333
        },
        "_id": "65439ebed265803c74daff69",
        "category_name": "Phones",
        "slug": "phones",
        "deleted": false,
        "createdAt": "2023-11-02T13:06:06.325Z",
        "updatedAt": "2023-11-02T13:07:10.652Z",
        "__v": 0
    }
}
```
**Update Brand `/api/v1/category/admin/update-category/{categoryId}`**

***Request***

Path Parameter:

categoryId (string, required): The unique identifier for the category.

Request Body:
```javascript
{"category_name": "Smart Phones"}
```
***Responses***

*HTTP Status Code: 200 OK*
```javascript
{
    "success": true,
    "message": "Category Updated Successfully",
    "category": {
        "image": {
            "location": "public\\images\\category\\image-1698930366240-749852027-watch4.png",
            "contentType": "image/png",
            "originalname": "watch4.png",
            "size": 653333
        },
        "_id": "65439ebed265803c74daff69",
        "category_name": "Phones",
        "slug": "phones",
        "deleted": false,
        "createdAt": "2023-11-02T13:06:06.325Z",
        "updatedAt": "2023-11-02T13:07:10.652Z",
        "__v": 0
    }
}
```
***Error Responses***

*HTTP Status Code: 400 BAD REQUEST*
```javascript
{ success: false, message: "Category Name is Required" }
```
*HTTP Status Code: 404 NOT FOUND*
```javascript
{ success: false, message: "Category Not Found" }
```
**Update Category Image `/api/v1/category/admin/update-category-image/{categoryId}`**

***Request***

Path Parameter:

categoryId (string, required): The unique identifier for the category.

FormData:
```javascript
{"image": upload image}
```
***Responses***

*HTTP Status Code: 200 OK*
```javascript
{
    "success": true,
    "message": "Category Image Updated Successfully",
    "category": {
        "image": {
            "location": "public\\images\\category\\image-1698930705257-560047109-watch4.png",
            "contentType": "image/png",
            "originalname": "watch4.png",
            "size": 653333
        },
        "_id": "65439ebed265803c74daff69",
        "category_name": "Phones",
        "slug": "phones",
        "deleted": false,
        "createdAt": "2023-11-02T13:06:06.325Z",
        "updatedAt": "2023-11-02T13:11:45.358Z",
        "__v": 0
    }
}
```
***Error Responses***

*HTTP Status Code: 400 BAD REQUEST*
```javascript
{ success: false, message: "Category Image is Required" }
```
*HTTP Status Code: 404 NOT FOUND*
```javascript
{ success: false, message: "Category Not Found" }
```
**Delete Brand `/api/v1/category/admin/delete-category/{categoryId}`**

***Request***

Path Parameter:

categoryId (string, required): The unique identifier for the category.

***Responses***

*HTTP Status Code: 200 OK*
```javascript
{
    "success": true,
    "message": "Category Deleted Successfully"
}
```
***Error Responses***

*HTTP Status Code: 404 NOT FOUND*
```javascript
{ success: false, message: "Category Not Found" }
```
**Restore Category `/api/v1/category/admin/restore-category/{categoryId}`**

***Request***

Path Parameter:

categoryId (string, required): The unique identifier for the category.

***Responses***

*HTTP Status Code: 200 OK*
```javascript
{
    "success": true,
    "message": "Category Restored Successfully"
}
```
***Error Responses***

*HTTP Status Code: 404 NOT FOUND*
```javascript
{ success: false, message: "Category Not Found" }
```
**Get All or Filtered Orders `/api/v1/order/admin/get-all-filtered-orders`**

***Request***

Query Parameters:

order_id | order_status | payment_status | _page | payment_method | _limit | createdAt | updatedAt | amount | item

Use _limit for the number of documents you want to fetch

Use _page for changing the page number

Use remaining of the above parameters to filtering the orders.

***Responses***

*HTTP Status Code: 200 OK*
```javascript
{
    "success": true,
    "message": "All Orders Fetched Successfully",
    "ordersCount": 1,
    "orders": [
        {
            "_id": "6519145d455006b5432841dc",
            "user": "64d9cca1fd210ef389e268a0",
            "order": [
                {
                    "_id": "6519386089b21895ff238bb3",
                    "totalItems": 2,
                    "totalAmount": 2001,
                    "paymentMethod": "cash",
                    "status": "delayed",
                    "paymentStatus": "received",
                    "createdAt": "2023-10-06T11:12:14.451Z",
                    "updatedAt": "2023-10-06T11:12:14.451Z",
                    "products": [
                        {
                            "product_id": "6501416e4f41af7936475ad8",
                            "product_name": "Huawei P30",
                            "price": 499,
                            "discountPercentage": 10.85,
                            "quantity": 1,
                            "thumbnail": {
                                "location": "public\\images\\product\\thumbnail-1694581102892-303692952-huawei_p30_thumbnail.jpg",
                                "contentType": "image/jpeg",
                                "originalname": "huawei_p30_thumbnail.jpg",
                                "size": 14627
                            },
                            "deleted": false
                        },
                        {
                            "product_id": "650142064f41af7936475adc",
                            "product_name": "MacBook Pro",
                            "price": 1749,
                            "discountPercentage": 11.02,
                            "quantity": 1,
                            "thumbnail": {
                                "location": "public\\images\\product\\thumbnail-1694581253954-477400433-macbook_pro_thumbnail.png",
                                "contentType": "image/png",
                                "originalname": "macbook_pro_thumbnail.png",
                                "size": 4457
                            },
                            "deleted": false
                        }
                    ],
                    "shippingAddress": {
                        "firstName": "Mohammed ",
                        "lastName": "Rehan",
                        "emailAddress": "rehan@zayd.com",
                        "mobileNumber": "+917337234824",
                        "altMobileNumber": "+919652336445",
                        "country": "india",
                        "street": "H-No: 5-16, Near royal function hall",
                        "city": "Hyderabad",
                        "state": "Telangana",
                        "pinCode": "506367",
                        "dist": "Siddipet",
                        "mandal": "Maddur",
                        "village": "Maddur",
                        "_id": "64f1579c2239b552d711a8b4"
                    }
                }
            ]
        },
        // Other Orders if any...
    ]
}
```
***Error Responses***

*HTTP Status Code: 404 NOT FOUND*
```javascript
{
    "success": false,
    "message": "Orders Not Found"
}
```
*HTTP Status Code: 400 BAD REQUEST*
```javascript
{
    "success": false,
    "message": "Invalid Order Id",
    "error": "Argument passed in must be a string of 12 bytes or a string of 24 hex characters or an integer"
}
```
**Fetch Order By Id `/api/v1/order/admin/get-order-details/{orderId}`**

***Request***

Path Parameter:

orderId (string, required): The unique identifier for the order.

***Responses***

*HTTP Status Code: 200 OK*
```javascript
{
    "success": true,
    "message": "Order Fetched Successfully",
    "order": [
        {
            "_id": "6519145d455006b5432841dc",
            "user": "64d9cca1fd210ef389e268a0",
            "createdAt": "2023-10-01T06:40:29.634Z",
            "updatedAt": "2023-10-20T04:23:45.321Z",
            "order": [
                {
                    "_id": "6519145d455006b5432841dd",
                    "totalItems": 2,
                    "totalAmount": 534,
                    "paymentMethod": "cash",
                    "status": "cancelled",
                    "paymentStatus": "received",
                    "createdAt": "2023-10-06T11:12:14.446Z",
                    "updatedAt": "2023-10-06T11:12:14.446Z",
                    "products": [
                        {
                            "product_id": "650140714f41af7936475ad0",
                            "product_name": "Samsung Universe 19",
                            "price": 401,
                            "discountPercentage": 9.36,
                            "quantity": 1,
                            "thumbnail": {
                                "location": "public\\images\\product\\thumbnail-1697105640977-721530433-samsung_universe_9_thumbnail.jpg",
                                "contentType": "image/jpeg",
                                "originalname": "samsung_universe_9_thumbnail.jpg",
                                "size": 3713166
                            },
                            "deleted": false
                        },
                        {
                            "product_id": "650140fb4f41af7936475ad4",
                            "product_name": "OPPOF19",
                            "price": 189,
                            "discountPercentage": 9.563,
                            "quantity": 1,
                            "thumbnail": {
                                "location": "public\\images\\product\\thumbnail-1695442558846-529302106-oppo_f19_thumbnail.jpg",
                                "contentType": "image/jpeg",
                                "originalname": "oppo_f19_thumbnail.jpg",
                                "size": 15815
                            },
                            "deleted": false
                        }
                    ],
                    "shippingAddress": {
                        "firstName": "Mohammed ",
                        "lastName": "Rehan",
                        "emailAddress": "rehan@zayd.com",
                        "mobileNumber": "+917337234824",
                        "altMobileNumber": "+919652336445",
                        "country": "india",
                        "street": "H-No: 5-16, Near royal function hall",
                        "city": "Hyderabad",
                        "state": "Telangana",
                        "pinCode": "506367",
                        "dist": "Siddipet",
                        "mandal": "Maddur",
                        "village": "Maddur",
                        "_id": "64f1579c2239b552d711a8b4"
                    }
                }
            ]
        }
    ]
}
```
***Error Responses***

*HTTP Status Code: 404 NOT FOUND*
```javascript
{
    "success": true,
    "message": "Order Fetched Successfully",
    "order": []
}
```
**Update Order Status `/api/v1/order/admin/update-order-status/{orderId}/{status}`**

***Request***

Path Parameter:

orderId (string, required): The unique identifier for the order.

status (string, required): The Updated Order Status.

***Responses***

*HTTP Status Code: 200 OK*
```javascript
{
    "success": true,
    "message": "Order Status Updated Successfully",
    "updatedOrder": [
        {
            "_id": "6519145d455006b5432841dc",
            "user": "64d9cca1fd210ef389e268a0",
            "order": [
                {
                    "_id": "65191474455006b543284379",
                    "totalItems": 1,
                    "totalAmount": 12,
                    "paymentMethod": "cash",
                    "status": "delivered",
                    "paymentStatus": "pending",
                    "createdAt": "2023-10-06T11:12:14.448Z",
                    "updatedAt": "2023-11-02T13:41:28.129Z",
                    "products": [
                        {
                            "product_id": "65014bd34f41af7936475b73",
                            "product_name": "Perfume Oil",
                            "price": 13,
                            "discountPercentage": 8.4,
                            "quantity": 1,
                            "thumbnail": {
                                "location": "public\\images\\product\\thumbnail-1694583763785-928417253-perfume_oil_thumbnail.jpg",
                                "contentType": "image/jpeg",
                                "originalname": "perfume_oil_thumbnail.jpg",
                                "size": 21513
                            },
                            "deleted": false
                        }
                    ],
                    "shippingAddress": {
                        "firstName": "Mohammed ",
                        "lastName": "Rehan",
                        "emailAddress": "rehan@zayd.com",
                        "mobileNumber": "+917337234824",
                        "altMobileNumber": "+919652336445",
                        "country": "india",
                        "street": "H-No: 5-16, Near royal function hall",
                        "city": "Hyderabad",
                        "state": "Telangana",
                        "pinCode": "506367",
                        "dist": "Siddipet",
                        "mandal": "Maddur",
                        "village": "Maddur",
                        "_id": "64f1579c2239b552d711a8b4"
                    }
                }
            ]
        }
    ]
}
```
***Error Responses***

*HTTP Status Code: 404 NOT FOUND*
```javascript
{ success: false, message: "Order Not Found" }
```
*HTTP Status Code: 400 BAD REQUEST*
```javascript
{ success: false, message: "Invalid Order ID" }
```
**Update Payment Status `/api/v1/order/admin/update-payment-status/{orderId}/{status}`**

***Request***

Path Parameter:

orderId (string, required): The unique identifier for the order.

status (string, required): The Updated Payment Status.

***Responses***

*HTTP Status Code: 200 OK*
```javascript
{
    "success": true,
    "message": "Payment Status Updated Successfully",
    "updatedOrder": [
        {
            "_id": "6519145d455006b5432841dc",
            "user": "64d9cca1fd210ef389e268a0",
            "order": [
                {
                    "_id": "6519145d455006b5432841dd",
                    "totalItems": 2,
                    "totalAmount": 534,
                    "paymentMethod": "cash",
                    "status": "cancelled",
                    "paymentStatus": "pending",
                    "createdAt": "2023-10-06T11:12:14.446Z",
                    "updatedAt": "2023-11-02T13:46:22.503Z",
                    "products": [
                        {
                            "product_id": "650140714f41af7936475ad0",
                            "product_name": "Samsung Universe 19",
                            "price": 401,
                            "discountPercentage": 9.36,
                            "quantity": 1,
                            "thumbnail": {
                                "location": "public\\images\\product\\thumbnail-1697105640977-721530433-samsung_universe_9_thumbnail.jpg",
                                "contentType": "image/jpeg",
                                "originalname": "samsung_universe_9_thumbnail.jpg",
                                "size": 3713166
                            },
                            "deleted": false
                        },
                        {
                            "product_id": "650140fb4f41af7936475ad4",
                            "product_name": "OPPOF19",
                            "price": 189,
                            "discountPercentage": 9.563,
                            "quantity": 1,
                            "thumbnail": {
                                "location": "public\\images\\product\\thumbnail-1695442558846-529302106-oppo_f19_thumbnail.jpg",
                                "contentType": "image/jpeg",
                                "originalname": "oppo_f19_thumbnail.jpg",
                                "size": 15815
                            },
                            "deleted": false
                        }
                    ],
                    "shippingAddress": {
                        "firstName": "Mohammed ",
                        "lastName": "Rehan",
                        "emailAddress": "rehan@zayd.com",
                        "mobileNumber": "+917337234824",
                        "altMobileNumber": "+919652336445",
                        "country": "india",
                        "street": "H-No: 5-16, Near royal function hall",
                        "city": "Hyderabad",
                        "state": "Telangana",
                        "pinCode": "506367",
                        "dist": "Siddipet",
                        "mandal": "Maddur",
                        "village": "Maddur",
                        "_id": "64f1579c2239b552d711a8b4"
                    }
                }
            ]
        }
    ]
}
```
***Error Responses***

*HTTP Status Code: 404 NOT FOUND*
```javascript
{ success: false, message: "Order Not Found" }
```
*HTTP Status Code: 400 BAD REQUEST*
```javascript
{ success: false, message: "Invalid Order ID" }
```
**Create Promo `/api/v1/promo/admin/create-promo`**

***Request***

FormData:
```javascript
{
  "brand": "brand_id",
  "category": "category_id",
  "promo_heading": "Shop Watches",
  "image_1": upload image,
  "image_2": upload image,
  "image_3": upload image,
  "image_4": upload image,
  "image_5": upload image,
  "image_6": upload image,
  "image_7": upload image,
}
```
***Responses***

*HTTP Status Code: 201 CREATED*
```javascript
{
    "success": true,
    "message": "Promo Created Successfully",
    "promo": {
        "_id": "65253151fac0ea496eea5cca",
        "promo_heading": "Buy Your Favourite Smart Phones From Your Favourite Brands",
        "images": [
            {
                "location": "public\\images\\promo\\image_1-1698933802233-671124513-watch1.jpg",
                "contentType": "image/jpeg",
                "originalname": "watch1.jpg",
                "size": 31332,
                "_id": "6543ac2ad265803c74db035e"
            },
            {
                "location": "public\\images\\promo\\image_2-1698933802238-52781720-watch2.jpg",
                "contentType": "image/jpeg",
                "originalname": "watch2.jpg",
                "size": 147637,
                "_id": "6543ac2ad265803c74db035f"
            },
            {
                "location": "public\\images\\promo\\image_3-1698933802246-369787451-watch3.jpg",
                "contentType": "image/jpeg",
                "originalname": "watch3.jpg",
                "size": 110850,
                "_id": "6543ac2ad265803c74db0360"
            },
            {
                "location": "public\\images\\promo\\image_4-1698933802247-574844927-watch6.jpg",
                "contentType": "image/jpeg",
                "originalname": "watch6.jpg",
                "size": 33959,
                "_id": "6543ac2ad265803c74db0361"
            },
            {
                "location": "public\\images\\promo\\image_5-1698933802248-407938677-watch10.jpg",
                "contentType": "image/jpeg",
                "originalname": "watch10.jpg",
                "size": 198076,
                "_id": "6543ac2ad265803c74db0362"
            },
            {
                "location": "public\\images\\promo\\image_6-1698933802250-549933012-watch20.jpg",
                "contentType": "image/jpeg",
                "originalname": "watch20.jpg",
                "size": 114799,
                "_id": "6543ac2ad265803c74db0363"
            },
            {
                "location": "public\\images\\promo\\image_7-1698933802252-206761934-watch23.jpg",
                "contentType": "image/jpeg",
                "originalname": "watch23.jpg",
                "size": 24501,
                "_id": "6543ac2ad265803c74db0364"
            }
        ],
        "createdAt": "2023-10-10T11:11:13.417Z",
        "updatedAt": "2023-11-02T14:03:22.361Z",
        "__v": 3,
        "category": "650138c14f41af7936475a64"
    }
}
```
***Error Responses***

*HTTP Status Code: 404 NOT FOUND*
```javascript
{ success: false, message: "Order Not Found" }
```
**Update Promo Image `/api/v1/promo/admin/update-promo-image/{imageIndex}`**

***Request***

Path Parameter:

imageIndex (string, required): The image index in the image array you want to update. Array contains total of 7 images.

FormData:
```javascript
{
  "image": upload image,
}
```
***Responses***

*HTTP Status Code: 200 OK*
```javascript
{
    "success": true,
    "message": "Promo Image Updated Successfully",
    "promo": {
        "_id": "65253151fac0ea496eea5cca",
        "promo_heading": "Buy Your Favourite Smart Phones From Your Favourite Brands",
        "images": [
            {
                "location": "public\\images\\promo\\image-1698934383316-305075522-watch26.jpg",
                "contentType": "image/jpeg",
                "originalname": "watch26.jpg",
                "size": 24774,
                "_id": "6543ae6fd265803c74db0386"
            },
            {
                "location": "public\\images\\promo\\image_2-1698933802238-52781720-watch2.jpg",
                "contentType": "image/jpeg",
                "originalname": "watch2.jpg",
                "size": 147637,
                "_id": "6543ac2ad265803c74db035f"
            },
            {
                "location": "public\\images\\promo\\image_3-1698933802246-369787451-watch3.jpg",
                "contentType": "image/jpeg",
                "originalname": "watch3.jpg",
                "size": 110850,
                "_id": "6543ac2ad265803c74db0360"
            },
            {
                "location": "public\\images\\promo\\image_4-1698933802247-574844927-watch6.jpg",
                "contentType": "image/jpeg",
                "originalname": "watch6.jpg",
                "size": 33959,
                "_id": "6543ac2ad265803c74db0361"
            },
            {
                "location": "public\\images\\promo\\image_5-1698933802248-407938677-watch10.jpg",
                "contentType": "image/jpeg",
                "originalname": "watch10.jpg",
                "size": 198076,
                "_id": "6543ac2ad265803c74db0362"
            },
            {
                "location": "public\\images\\promo\\image_6-1698933802250-549933012-watch20.jpg",
                "contentType": "image/jpeg",
                "originalname": "watch20.jpg",
                "size": 114799,
                "_id": "6543ac2ad265803c74db0363"
            },
            {
                "location": "public\\images\\promo\\image_7-1698933802252-206761934-watch23.jpg",
                "contentType": "image/jpeg",
                "originalname": "watch23.jpg",
                "size": 24501,
                "_id": "6543ac2ad265803c74db0364"
            }
        ],
        "createdAt": "2023-10-10T11:11:13.417Z",
        "updatedAt": "2023-11-02T14:13:03.379Z",
        "__v": 3,
        "category": "650138c14f41af7936475a64"
    }
}
```
***Error Responses***

*HTTP Status Code: 404 NOT FOUND*
```javascript
{ success: false, message: "Promo Not Found" }
```
*HTTP Status Code: 400 BAD REQUEST*
```javascript
{ success: false, message: "Image is Required" }
```
**Update Promo `/api/v1/promo/admin/update-promo`**

***Request***

Request Body:
```javascript
{
  "category": "Mens Watch",
  //provide one of brand & category
  "brand": "Rolex",
  "promo_heading": "Shop Your Favourites",
}
```
***Responses***

*HTTP Status Code: 200 OK*
```javascript
{
    "success": true,
    "message": "Promo Updated Successfully",
    "promo": {
        "_id": "65253151fac0ea496eea5cca",
        "promo_heading": "Buy Your Favourite Smart Phones From Your Favourite Categories",
        "images": [
            {
                "location": "public\\images\\promo\\image-1698934383316-305075522-watch26.jpg",
                "contentType": "image/jpeg",
                "originalname": "watch26.jpg",
                "size": 24774,
                "_id": "6543ae6fd265803c74db0386"
            },
            {
                "location": "public\\images\\promo\\image_2-1698933802238-52781720-watch2.jpg",
                "contentType": "image/jpeg",
                "originalname": "watch2.jpg",
                "size": 147637,
                "_id": "6543ac2ad265803c74db035f"
            },
            {
                "location": "public\\images\\promo\\image_3-1698933802246-369787451-watch3.jpg",
                "contentType": "image/jpeg",
                "originalname": "watch3.jpg",
                "size": 110850,
                "_id": "6543ac2ad265803c74db0360"
            },
            {
                "location": "public\\images\\promo\\image_4-1698933802247-574844927-watch6.jpg",
                "contentType": "image/jpeg",
                "originalname": "watch6.jpg",
                "size": 33959,
                "_id": "6543ac2ad265803c74db0361"
            },
            {
                "location": "public\\images\\promo\\image_5-1698933802248-407938677-watch10.jpg",
                "contentType": "image/jpeg",
                "originalname": "watch10.jpg",
                "size": 198076,
                "_id": "6543ac2ad265803c74db0362"
            },
            {
                "location": "public\\images\\promo\\image_6-1698933802250-549933012-watch20.jpg",
                "contentType": "image/jpeg",
                "originalname": "watch20.jpg",
                "size": 114799,
                "_id": "6543ac2ad265803c74db0363"
            },
            {
                "location": "public\\images\\promo\\image_7-1698933802252-206761934-watch23.jpg",
                "contentType": "image/jpeg",
                "originalname": "watch23.jpg",
                "size": 24501,
                "_id": "6543ac2ad265803c74db0364"
            }
        ],
        "createdAt": "2023-10-10T11:11:13.417Z",
        "updatedAt": "2023-11-02T14:22:54.255Z",
        "__v": 3,
        "category": "650138c14f41af7936475a64"
    }
}
```
***Error Responses***
*HTTP Status Code: 404 NOT FOUND*
```javascript
{ success: false, message: "Promo Not Found" }
```
*HTTP Status Code: 400 BAD REQUEST*
```javascript
{ success: false, message: "Fill The Required Fields" }
```
## User APIs
**Add To Cart `/api/v1/cart/user/add-to-cart/{productId}`**

***Request***

Path Parameter:

productId (string, required): The unique identifier for the product.

***Responses***

*HTTP Status Code: 201 CREATED*

When user adds first item to the cart. Say creates the cart.
```javascript
{
    "success": true,
    "message": "Item Added To Cart",
    "cart": {
        "_id": "6543c74d908cd5da8dc1c661",
        "user": "64d9cca1fd210ef389e268a0",
        "items": [
            {
                "product": {
                    "thumbnail": {
                        "location": "public\\images\\product\\thumbnail-1697105640977-721530433-samsung_universe_9_thumbnail.jpg",
                        "contentType": "image/jpeg",
                        "originalname": "samsung_universe_9_thumbnail.jpg",
                        "size": 3713166
                    },
                    "_id": "650140714f41af7936475ad0",
                    "product_name": "Samsung Universe 19",
                    "slug": "samsung-universe-19",
                    "brand": "650139fb4f41af7936475a70",
                    "category": "650138c14f41af7936475a64",
                    "description": "Samsung's new variant which goes beyond Galaxy to the Universe.",
                    "stock": 253,
                    "price": 401,
                    "discountPercentage": 9.36,
                    "images": [
                        {
                            "location": "public\\images\\product\\image-1697105440146-897086962-samsung_universe_9_thumbnail.jpg",
                            "contentType": "image/jpeg",
                            "originalname": "samsung_universe_9_thumbnail.jpg",
                            "size": 3713166,
                            "_id": "6527c6206bb91281f855c1a6"
                        },
                        {
                            "location": "public\\images\\product\\image-1697105461546-487149141-samsung_universe_9_image1.jpg",
                            "contentType": "image/jpeg",
                            "originalname": "samsung_universe_9_image1.jpg",
                            "size": 47518,
                            "_id": "6527c6356bb91281f855c1b6"
                        },
                        {
                            "location": "public\\images\\product\\image-1697105481621-829965747-samsung_universe_9_image3.jpeg",
                            "contentType": "image/jpeg",
                            "originalname": "samsung_universe_9_image3.jpeg",
                            "size": 24987,
                            "_id": "6527c6496bb91281f855c1c7"
                        },
                        {
                            "location": "public\\images\\product\\image-1697105495244-598606848-amsung_universe_9_image2.png",
                            "contentType": "image/png",
                            "originalname": "amsung_universe_9_image2.png",
                            "size": 235547,
                            "_id": "6527c6576bb91281f855c1d9"
                        }
                    ],
                    "createdAt": "2023-09-13T04:54:09.597Z",
                    "updatedAt": "2023-10-12T10:15:19.603Z",
                    "__v": 1,
                    "deleted": false,
                    "highlights": [
                        "4GB RAM",
                        "64GB ROM",
                        "3 year warrantee",
                        "20mpx front cam",
                        "183gm"
                    ]
                },
                "quantity": 1,
                "_id": "6543c74d908cd5da8dc1c662"
            }
        ],
        "createdAt": "2023-11-02T15:59:09.140Z",
        "updatedAt": "2023-11-02T15:59:09.140Z",
        "__v": 0
    }
}
```
*HTTP Status Code: 200 OK*

When user adds item to the already existing cart (Already having product(s) in the cart)
```javascript
{
    "success": true,
    "message": "Item Added To Cart",
    "cart": {
        "_id": "6543c74d908cd5da8dc1c661",
        "user": "64d9cca1fd210ef389e268a0",
        "items": [
            {
                "product": {
                    "thumbnail": {
                        "location": "public\\images\\product\\thumbnail-1697105640977-721530433-samsung_universe_9_thumbnail.jpg",
                        "contentType": "image/jpeg",
                        "originalname": "samsung_universe_9_thumbnail.jpg",
                        "size": 3713166
                    },
                    "_id": "650140714f41af7936475ad0",
                    "product_name": "Samsung Universe 19",
                    "slug": "samsung-universe-19",
                    "brand": "650139fb4f41af7936475a70",
                    "category": "650138c14f41af7936475a64",
                    "description": "Samsung's new variant which goes beyond Galaxy to the Universe.",
                    "stock": 253,
                    "price": 401,
                    "discountPercentage": 9.36,
                    "images": [
                        {
                            "location": "public\\images\\product\\image-1697105440146-897086962-samsung_universe_9_thumbnail.jpg",
                            "contentType": "image/jpeg",
                            "originalname": "samsung_universe_9_thumbnail.jpg",
                            "size": 3713166,
                            "_id": "6527c6206bb91281f855c1a6"
                        },
                        {
                            "location": "public\\images\\product\\image-1697105461546-487149141-samsung_universe_9_image1.jpg",
                            "contentType": "image/jpeg",
                            "originalname": "samsung_universe_9_image1.jpg",
                            "size": 47518,
                            "_id": "6527c6356bb91281f855c1b6"
                        },
                        {
                            "location": "public\\images\\product\\image-1697105481621-829965747-samsung_universe_9_image3.jpeg",
                            "contentType": "image/jpeg",
                            "originalname": "samsung_universe_9_image3.jpeg",
                            "size": 24987,
                            "_id": "6527c6496bb91281f855c1c7"
                        },
                        {
                            "location": "public\\images\\product\\image-1697105495244-598606848-amsung_universe_9_image2.png",
                            "contentType": "image/png",
                            "originalname": "amsung_universe_9_image2.png",
                            "size": 235547,
                            "_id": "6527c6576bb91281f855c1d9"
                        }
                    ],
                    "createdAt": "2023-09-13T04:54:09.597Z",
                    "updatedAt": "2023-10-12T10:15:19.603Z",
                    "__v": 1,
                    "deleted": false,
                    "highlights": [
                        "4GB RAM",
                        "64GB ROM",
                        "3 year warrantee",
                        "20mpx front cam",
                        "183gm"
                    ]
                },
                "quantity": 1,
                "_id": "6543c74d908cd5da8dc1c662"
            },
            {} // Other products added to cart
        ],
        "createdAt": "2023-11-02T15:59:09.140Z",
        "updatedAt": "2023-11-02T15:59:09.140Z",
        "__v": 0
    }
}
```
***Error Responses***
*HTTP Status Code: 409 CONFLICT*
```javascript
{ success: false, message: "Promo Not Found" }
```
*HTTP Status Code: 400 BAD REQUEST*
```javascript
{success: false, message: "Item is already present in your cart"}
```
**Get Cart Items `/api/v1/cart/user/get-cart-items`**

***Request***

Request Object is not required

***Responses***

*HTTP Status Code: 200 OK*
```javascript
{
    "success": true,
    "message": "Cart Items Fetched Successfully",
    "cart": {
        "_id": "6543c74d908cd5da8dc1c661",
        "user": "64d9cca1fd210ef389e268a0",
        "items": [
            {
                "product": {
                    "thumbnail": {
                        "location": "public\\images\\product\\thumbnail-1697105640977-721530433-samsung_universe_9_thumbnail.jpg",
                        "contentType": "image/jpeg",
                        "originalname": "samsung_universe_9_thumbnail.jpg",
                        "size": 3713166
                    },
                    "_id": "650140714f41af7936475ad0",
                    "product_name": "Samsung Universe 19",
                    "slug": "samsung-universe-19",
                    "brand": "650139fb4f41af7936475a70",
                    "category": "650138c14f41af7936475a64",
                    "description": "Samsung's new variant which goes beyond Galaxy to the Universe.",
                    "stock": 253,
                    "price": 401,
                    "discountPercentage": 9.36,
                    "images": [
                        {
                            "location": "public\\images\\product\\image-1697105440146-897086962-samsung_universe_9_thumbnail.jpg",
                            "contentType": "image/jpeg",
                            "originalname": "samsung_universe_9_thumbnail.jpg",
                            "size": 3713166,
                            "_id": "6527c6206bb91281f855c1a6"
                        },
                        {
                            "location": "public\\images\\product\\image-1697105461546-487149141-samsung_universe_9_image1.jpg",
                            "contentType": "image/jpeg",
                            "originalname": "samsung_universe_9_image1.jpg",
                            "size": 47518,
                            "_id": "6527c6356bb91281f855c1b6"
                        },
                        {
                            "location": "public\\images\\product\\image-1697105481621-829965747-samsung_universe_9_image3.jpeg",
                            "contentType": "image/jpeg",
                            "originalname": "samsung_universe_9_image3.jpeg",
                            "size": 24987,
                            "_id": "6527c6496bb91281f855c1c7"
                        },
                        {
                            "location": "public\\images\\product\\image-1697105495244-598606848-amsung_universe_9_image2.png",
                            "contentType": "image/png",
                            "originalname": "amsung_universe_9_image2.png",
                            "size": 235547,
                            "_id": "6527c6576bb91281f855c1d9"
                        }
                    ],
                    "createdAt": "2023-09-13T04:54:09.597Z",
                    "updatedAt": "2023-10-12T10:15:19.603Z",
                    "__v": 1,
                    "deleted": false,
                    "highlights": [
                        "4GB RAM",
                        "64GB ROM",
                        "3 year warrantee",
                        "20mpx front cam",
                        "183gm"
                    ]
                },
                "quantity": 1,
                "_id": "6543c74d908cd5da8dc1c662"
            }
        ],
        "createdAt": "2023-11-02T15:59:09.140Z",
        "updatedAt": "2023-11-02T15:59:09.140Z",
        "__v": 0
    }
}
```
***Error Responses***
*HTTP Status Code: 404 NOT FOUND*
```javascript
{ success: false, message: "Cart Not Found" }
```
