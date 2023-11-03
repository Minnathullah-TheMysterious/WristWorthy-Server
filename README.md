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
**Create Product `POST /api/v1/product/admin/create-product`**

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
**Update Product `PUT /api/v1/product/admin/update-product/{productId}`**

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
**Update Product Thumbnail `PUT /api/v1/product/admin/update-product-thumbnail/{productId}`**

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
**Update Product Image `PUT /api/v1/product/admin/update-product-image/{productId}/{imageIndex}`**

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
**Delete Product `DELETE /api/v1/product/admin/delete-product/{productId}`**

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
**Restore Product `PUT /api/v1/product/admin/restore-product/{productId}`**

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
**Create Brand `POST /api/v1/brand/admin/create-brand`**

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
**Update Brand `PUT /api/v1/brand/admin/update-brand/{brandId}`**

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
**Update Brand Image `PUT /api/v1/brand/admin/update-brand-image/{brandId}`**

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
**Delete Brand `DELETE /api/v1/brand/admin/delete-brand/{brandId}`**

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
**Restore Brand `PUT /api/v1/brand/admin/restore-brand/{brandId}`**

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
**Create Category `POST /api/v1/category/admin/create-category`**

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
**Update Category `PUT /api/v1/category/admin/update-category/{categoryId}`**

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
**Update Category Image `UPDATE /api/v1/category/admin/update-category-image/{categoryId}`**

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
**Delete Category `DELETE /api/v1/category/admin/delete-category/{categoryId}`**

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
**Restore Category `PUT /api/v1/category/admin/restore-category/{categoryId}`**

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
**Get All or Filtered Orders `GET /api/v1/order/admin/get-all-filtered-orders`**

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
**Fetch Order By Id `GET /api/v1/order/admin/get-order-details/{orderId}`**

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
**Update Order Status `PUT /api/v1/order/admin/update-order-status/{orderId}/{status}`**

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
**Update Payment Status `PUT /api/v1/order/admin/update-payment-status/{orderId}/{status}`**

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
**Create Promo `POST /api/v1/promo/admin/create-promo`**

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
**Update Promo Image `PUT /api/v1/promo/admin/update-promo-image/{imageIndex}`**

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
**Update Promo `PUT /api/v1/promo/admin/update-promo`**

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
**Add To Cart or Create Cart `POST /api/v1/cart/user/add-to-cart/{productId}`**

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
**Get Cart Items `GET /api/v1/cart/user/get-cart-items`**

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
**Delete A Cart Item `DELETE /api/v1/cart/user/delete-cart-item/{productId}`**

***Request***

Path Parameter:

productId (string, required): The unique identifier for the product.

***Responses***

*HTTP Status Code: 200 OK*
```javascript
{
    "success": true,
    "message": "Item Removed From Cart",
    "cart": {
        "_id": "6543c74d908cd5da8dc1c661",
        "user": "64d9cca1fd210ef389e268a0",
        "items": [],
        "createdAt": "2023-11-02T15:59:09.140Z",
        "updatedAt": "2023-11-03T03:33:09.541Z",
        "__v": 1
    }
}
```
***Error Responses***

*HTTP Status Code: 404 NOT FOUND*
```javascript
{ success: false, message: "User Not Found / Product Not Found In The Cart" }
```
  *HTTP Status Code: 400 BAD REQUEST*
```javascript
{ success: false, message: "Validation Error" }
```
**Delete The Cart `DELETE /api/v1/cart/user/delete-cart`**

***Request***

Request Object is not required

***Responses***

*HTTP Status Code: 200 OK*
```javascript
{success: true, message: "Cart Has Been Reset"}
```
***Error Responses***

*HTTP Status Code: 404 NOT FOUND*
```javascript
{ success: false, message: "Cart not found" }
```
  *HTTP Status Code: 400 BAD REQUEST*
```javascript
{ success: false, message: "Not a valid user Id" }
```
**Update Product Quantity In The Cart `PUT /api/v1/cart/user/update-product-quantity/{productId}/{productQuantity}`**

***Request***

Path Parameter:

productId (string, required): The unique identifier for the product.

productQuantity (string, required): The quantity you want to update.

***Responses***

*HTTP Status Code: 200 OK*
```javascript
{
    "success": true,
    "message": "Quantity Updated Successfully",
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
                "quantity": 8,
                "_id": "65446d80887d7a386ef887e3"
            }
        ],
        "createdAt": "2023-11-02T15:59:09.140Z",
        "updatedAt": "2023-11-03T03:48:24.155Z",
        "__v": 3
    }
}
```
***Error Responses***

*HTTP Status Code: 404 NOT FOUND*
```javascript
{ success: false, message: "Cart not found / Product Not Found" }
```
  *HTTP Status Code: 400 BAD REQUEST*
```javascript
{ success: false, message: "Not a valid user Id / Not A Valid Product ID" }
```
**Get All User Orders `GET /api/v1/order/user/get-orders`**

***Request***

Request Object Is Not Required

***Responses***

*HTTP Status Code: 200 OK*
```javascript
{
  "success": true,
  "message": "Orders Fetched Successfully",
  "orders": {
    "_id": "6519145d455006b5432841dc",
    "user": "64d9cca1fd210ef389e268a0",
    "orders": [
      {
        "paymentStatus": "pending",
        "products": [
          {
            "product_id": {
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
          "_id": "6519145d455006b5432841de"
        },
        // Remaining products in this order
      ],
      "totalItems": 2,
      "totalAmount": 534,
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
      },
      "paymentMethod": "cash",
      "status": "cancelled",
      "_id": "6519145d455006b5432841dd",
      "createdAt": "2023-10-06T11:12:14.446Z",
      "updatedAt": "2023-11-02T13:46:22.503Z"
    },
    // Other remaining orders of the user
    ]
  }
}
```
***Error Responses***

*HTTP Status Code: 404 NOT FOUND*
```javascript
{ success: false, message: "Orders Not Found" }
```
**Place Order `POST /api/v1/order/user/place-order`**

***Request***

Request Body:
```javascript
{
    "products": [{"product_id": "650140714f41af7936475ad0", "quantity": 2}, {"product_id": "650140fb4f41af7936475ad4", "quantity": 2}, //Add more products as you want],
    "totalItems": 2,
    "totalAmount": 1526,
    "shippingAddress": {
        firstName: String,
        lastName: String,
        emailAddress: String,
        mobileNumber: String,
        altMobileNumber: String,
        country: String,
        street: String,
        city: String,
        state: String,
        pinCode: String,
        dist: String,
        mandal: String,
        village: String,},
    "paymentMethod": "card"
}
```
***Responses***

*HTTP Status Code: 201 CREATED*
```javascript
{
  "success": true,
  "message": "Order Placed Successfully",
  "orders": {
    "_id": "6519145d455006b5432841dc",
    "user": "64d9cca1fd210ef389e268a0",
    "orders": [
      {
        "paymentStatus": "pending",
        "products": [
          {
            "product_id": {
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
          "_id": "6519145d455006b5432841de"
        },
        // Remaining products in this order
      ],
      "totalItems": 2,
      "totalAmount": 534,
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
      },
      "paymentMethod": "cash",
      "status": "cancelled",
      "_id": "6519145d455006b5432841dd",
      "createdAt": "2023-10-06T11:12:14.446Z",
      "updatedAt": "2023-11-02T13:46:22.503Z"
    },
    // Other remaining orders of the user
    ]
  }
}
```
***Error Responses***

*HTTP Status Code: 400 BAD REQUEST*
```javascript
{ success: false, message: "Required Fields Error" }
```
**Cancel Order `PUT /api/v1/order/user/cancel-order/{orderId}`**

***Request***

Path Parameter:

orderId (string, required): The unique identifier for the order.

***Responses***

*HTTP Status Code: 200 OK*
```javascript
{
  "success": true,
  "message": "Order Cancelled Successfully",
  "orders": {
    "_id": "6519145d455006b5432841dc",
    "user": "64d9cca1fd210ef389e268a0",
    "orders": [
      {
        "paymentStatus": "pending",
        "products": [
          {
            "product_id": {
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
          "_id": "6519145d455006b5432841de"
        },
        // Remaining products in this order
      ],
      "totalItems": 2,
      "totalAmount": 534,
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
      },
      "paymentMethod": "cash",
      "status": "cancelled",
      "_id": "6519145d455006b5432841dd",
      "createdAt": "2023-10-06T11:12:14.446Z",
      "updatedAt": "2023-11-02T13:46:22.503Z"
    },
    // Other remaining orders of the user
    ]
  }
}
```
***Error Responses***

*HTTP Status Code: 404 NOT FOUND*
```javascript
{ success: false, message: "Order Not Found / User Orders Not Found" }
```
**Get User Data `GET /api/v1/user/own/info`**

***Request***

Request Object is not required

***Responses***

*HTTP Status Code: 200 OK*
```javascript
{
    "success": true,
    "message": "User Data Fetched Successfully",
    "user": {
        "_id": "64d9cca1fd210ef389e268a0",
        "user_name": "Minnathullah Rahmani",
        "email": "minnathullahmohammed7337@gmail.com",
        "password": "$2b$12$c.3mWslgXymvEkvfBsALX.BtAFmW76GPVMhYZV3FmPVF52zo9lrkC",
        "phone": "+919652336445",
        "createdAt": "2023-08-14T06:41:37.807Z",
        "updatedAt": "2023-10-13T04:04:28.467Z",
        "otpSecret": "$2b$12$.D571GHVT.CGdwX9hplSHejCnR4DVzcpLlSaDZRinOyaaC5p/p/dC",
        "__v": 34,
        "addresses": [
            {
                "firstName": "Mohammed ",
                "lastName": "Rehan",
                "emailAddress": "rehan@zayd.com",
                "mobileNumber": "+917337234824",
                "altMobileNumber": "+919652336445",
                "country": "india",
                "street": "H-No: 5-16, Near gandhi",
                "city": "Hyderabad",
                "state": "Telangana",
                "pinCode": "506367",
                "dist": "Siddipet",
                "mandal": "Maddur",
                "village": "Maddur",
                "_id": "64f1579c2239b552d711a8b4"
            },
            // Other addresses if present
        ],
        "role": "user",
        "token": "zdW6IMKV0sLDq53FinYgOyVSOFXGr38HP9r6bhnWG7tYDyodre9A"
    }
}
```
***Error Responses***

*HTTP Status Code: 404 NOT FOUND*
```javascript
{ success: false, message: "User Not Found" }
```
**Add User Address `POST /api/v1/user/own/add-address`**

***Request***

Request Body:
```javascript
{
  firstName: String,
  lastName: String,
  emailAddress: String,
  mobileNumber: String,
  altMobileNumber: String,
  country: String,
  street: String,
  city: String,
  state: String,
  pinCode: String,
  dist: String,
  mandal: String,
  village: String,
}
```

***Responses***

*HTTP Status Code: 200 OK*
```javascript
{
    "success": true,
    "message": "User Address Added Successfully",
    "user": {
        "_id": "64d9cca1fd210ef389e268a0",
        "user_name": "Minnathullah Rahmani",
        "email": "minnathullahmohammed7337@gmail.com",
        "password": "$2b$12$c.3mWslgXymvEkvfBsALX.BtAFmW76GPVMhYZV3FmPVF52zo9lrkC",
        "phone": "+919652336445",
        "createdAt": "2023-08-14T06:41:37.807Z",
        "updatedAt": "2023-10-13T04:04:28.467Z",
        "otpSecret": "$2b$12$.D571GHVT.CGdwX9hplSHejCnR4DVzcpLlSaDZRinOyaaC5p/p/dC",
        "__v": 34,
        "addresses": [
            {
                "firstName": "Mohammed ",
                "lastName": "Rehan",
                "emailAddress": "rehan@zayd.com",
                "mobileNumber": "+917337234824",
                "altMobileNumber": "+919652336445",
                "country": "india",
                "street": "H-No: 5-16, Near gandhi",
                "city": "Hyderabad",
                "state": "Telangana",
                "pinCode": "506367",
                "dist": "Siddipet",
                "mandal": "Maddur",
                "village": "Maddur",
                "_id": "64f1579c2239b552d711a8b4"
            },
            // Other addresses if present
        ],
        "role": "user",
        "token": "zdW6IMKV0sLDq53FinYgOyVSOFXGr38HP9r6bhnWG7tYDyodre9A"
    }
}
```
***Error Responses***

*HTTP Status Code: 404 NOT FOUND*
```javascript
{ success: false, message: "User Not Found" }
```
*HTTP Status Code: 400 BAD REQUEST*
```javascript
{ success: false, message: "Required Fields Error" }
```
**Get User Address `GET /api/v1/user/own/get-addresses`**

***Request***

Request Object Is Not Required

***Responses***

*HTTP Status Code: 200 OK*
```javascript
{
    "success": true,
    "message": "User Addresses Fetched Successfully",
    "addresses": [
        {
            "firstName": "Mohammed ",
            "lastName": "Rehan",
            "emailAddress": "rehan@zayd.com",
            "mobileNumber": "+917337234824",
            "altMobileNumber": "+919652336445",
            "country": "india",
            "street": "H-No: 5-16, Near gandhi",
            "city": "Hyderabad",
            "state": "Telangana",
            "pinCode": "506367",
            "dist": "Siddipet",
            "mandal": "Maddur",
            "village": "Maddur",
            "_id": "64f1579c2239b552d711a8b4"
        },
        // All Other Addresses
    ]
}
```
***Error Responses***

*HTTP Status Code: 404 NOT FOUND*
```javascript
{ success: false, message: "User Not Found" }
```
**Update Address By Address ID `PUT /api/v1/user/own/update-address/{addressId}`**

***Request***

Path Parameter:

addressId (string, required): The unique identifier for the address.

Request Body:
```javascript
{
  firstName: String,
  lastName: String,
  emailAddress: String,
  mobileNumber: String,
  altMobileNumber: String,
  country: String,
  street: String,
  city: String,
  state: String,
  pinCode: String,
  dist: String,
  mandal: String,
  village: String,
}
```

***Responses***

*HTTP Status Code: 200 OK*
```javascript
{
    "success": true,
    "message": "Address Updated Successfully",
    "updatedUser": {
        "_id": "64d9cca1fd210ef389e268a0",
        "user_name": "Minnathullah Rahmani",
        "email": "minnathullahmohammed7337@gmail.com",
        "password": "$2b$12$c.3mWslgXymvEkvfBsALX.BtAFmW76GPVMhYZV3FmPVF52zo9lrkC",
        "phone": "+919652336445",
        "createdAt": "2023-08-14T06:41:37.807Z",
        "updatedAt": "2023-11-03T05:55:20.447Z",
        "otpSecret": "$2b$12$HAuJ6i789/0EWS7nescilOyvUWaVmqLj7qnD83w6WDAeEUEr1MBXu",
        "__v": 37,
        "addresses": [
            {
                "firstName": "Mohammed ",
                "lastName": "Rehan",
                "emailAddress": "rehan@zayd.com",
                "mobileNumber": "+917337234824",
                "altMobileNumber": "+919652336445",
                "country": "india",
                "street": "H-No: 5-16, Near gandhi",
                "city": "Hyderabad",
                "state": "Telangana",
                "pinCode": "506367",
                "dist": "Siddipet",
                "mandal": "Maddur",
                "village": "Maddur",
                "_id": "64f1579c2239b552d711a8b4"
            },
            // Other remaining addresses
        ],
        "role": "user",
        "token": "zdW6IMKV0sLDq53FinYgOyVSOFXGr38HP9r6bhnWG7tYDyodre9A"
    }
}
```
***Error Responses***

*HTTP Status Code: 404 NOT FOUND*
```javascript
{ success: false, message: "Address Not Found / User Not Found" }
```
**Delete Address by  Address ID `DELETE /api/v1/user/own/delete-address/{addressId}`**

***Request***

Path Parameter:

addressId (string, required): The unique identifier for the address.

***Responses***

*HTTP Status Code: 200 OK*
```javascript
{
    "success": true,
    "message": "Address Deleted Successfully",
    "userPostDelete": {
        "_id": "64d9cca1fd210ef389e268a0",
        "user_name": "Minnathullah Rahmani",
        "email": "minnathullahmohammed7337@gmail.com",
        "password": "$2b$12$c.3mWslgXymvEkvfBsALX.BtAFmW76GPVMhYZV3FmPVF52zo9lrkC",
        "phone": "+919652336445",
        "createdAt": "2023-08-14T06:41:37.807Z",
        "updatedAt": "2023-11-03T05:46:51.301Z",
        "otpSecret": "$2b$12$K5toV6m5g4Ugw0RKDORaiOxCDtiKAvjGdIcDmSwvD5.//UFOiyfFm",
        "__v": 36,
        "addresses": [
            //All the addresses after the successfull deletion of the the given order
            {
                "firstName": "Mohammed ",
                "lastName": "Rehan",
                "emailAddress": "rehan@zayd.com",
                "mobileNumber": "+917337234824",
                "altMobileNumber": "+919652336445",
                "country": "india",
                "street": "H-No: 5-16, Near gandhi",
                "city": "Hyderabad",
                "state": "Telangana",
                "pinCode": "506367",
                "dist": "Siddipet",
                "mandal": "Maddur",
                "village": "Maddur",
                "_id": "64f1579c2239b552d711a8b4"
            },
            // Other remaining addresses
        ],
        "role": "user",
        "token": "zdW6IMKV0sLDq53FinYgOyVSOFXGr38HP9r6bhnWG7tYDyodre9A"
    }
}
```
***Error Responses***

*HTTP Status Code: 404 NOT FOUND*
```javascript
{ success: false, message: "Address Not Found / User Not Found" }
```
**Create Or Add Prducts To Your Wishlist `POST /api/v1/wishlist/user/add-to-wishlist/{productId}`**

***Request***

Path Parameter:

productId (string, required): The unique identifier for the product.

***Responses***

*HTTP Status Code: 200 OK*
```javascript
{
    "success": true,
    "message": "Item Added To Wishlist",
    "wishlist": {
        "_id": "650548475b0c14784e62cd86",
        "user": "64d9cca1fd210ef389e268a0",
        "products": [
            "65014bd34f41af7936475b73",
            "65017bb54f41af7936475bd7",
            // All other products
        ],
        "createdAt": "2023-09-16T06:16:39.827Z",
        "updatedAt": "2023-11-03T06:19:28.210Z",
        "__v": 60
    }
}
```
*HTTP Status Code: 201 CREATED*
```javascript
{
  "success": true,
  "message": "Wishlist Created & Added Item To It Successfully",
  "wishlist": {
    "products": [
            "65014bd34f41af7936475b73"
    ],
    "createdAt": "2023-09-16T06:16:39.827Z",
    "updatedAt": "2023-11-03T06:19:28.210Z",
    "__v": 60
  }
  
}
```
***Error Responses***

*HTTP Status Code: 409 CONFLICT*
```javascript
{success: false, message: "Item is already present in your Wishlist",}
```
**Fetch Wishlist Items `GET /api/v1/wishlist/user/get-wishlist`**

***Request***

Request object is not required

***Responses***

*HTTP Status Code: 200 OK*
```javascript
{
    "success": true,
    "message": "Wishlist Items fetched successfully",
    "wishlist": {
        "_id": "650548475b0c14784e62cd86",
        "user": "64d9cca1fd210ef389e268a0",
        "products": [
            {
                "thumbnail": {
                    "location": "public\\images\\product\\thumbnail-1694583763785-928417253-perfume_oil_thumbnail.jpg",
                    "contentType": "image/jpeg",
                    "originalname": "perfume_oil_thumbnail.jpg",
                    "size": 21513
                },
                "_id": "65014bd34f41af7936475b73",
                "product_name": "Perfume Oil",
                "slug": "perfume-oil",
                "brand": "65014af14f41af7936475b5a",
                "category": "6501396a4f41af7936475a6a",
                "description": "Mega Discount, Impression of Acqua Di Gio by GiorgioArmani concentrated attar perfume Oil",
                "stock": 58,
                "price": 13,
                "discountPercentage": 8.4,
                "images": [
                    {
                        "location": "public\\images\\product\\image_1-1694583763796-985306334-perfume_oil_image1.jpg",
                        "contentType": "image/jpeg",
                        "originalname": "perfume_oil_image1.jpg",
                        "size": 10734,
                        "_id": "65014bd34f41af7936475b74"
                    },
                    {
                        "location": "public\\images\\product\\image-1697103224708-403892907-perfume_oil_image2.jpg",
                        "contentType": "image/jpeg",
                        "originalname": "perfume_oil_image2.jpg",
                        "size": 21979,
                        "_id": "6527bd786bb91281f8558aac"
                    },
                    {
                        "location": "public\\images\\product\\image-1697103239536-315782199-perfume_oil_image3.jpg",
                        "contentType": "image/jpeg",
                        "originalname": "perfume_oil_image3.jpg",
                        "size": 19771,
                        "_id": "6527bd876bb91281f8558abd"
                    },
                    {
                        "location": "public\\images\\product\\image-1697103272304-983693337-perfume_oil_thumbnail.jpg",
                        "contentType": "image/jpeg",
                        "originalname": "perfume_oil_thumbnail.jpg",
                        "size": 21513,
                        "_id": "6527bda86bb91281f8558acf"
                    }
                ],
                "createdAt": "2023-09-13T05:42:43.897Z",
                "updatedAt": "2023-10-14T06:09:53.198Z",
                "__v": 1,
                "deleted": false,
                "highlights": [
                    "concentrated attar",
                    "Non-Alcaholic",
                    "Perfume that refreshes the environment",
                    "50ml",
                    null
                ]
            },
            // All other products in the wishlist
        ],
        "createdAt": "2023-09-16T06:16:39.827Z",
        "updatedAt": "2023-11-03T06:19:28.210Z",
        "__v": 60
    }
}
```
***Error Responses***

*HTTP Status Code: 404 NOT FOUND*
```javascript
{ success: false, message: "Wishlist Not Found" }
```
**Delete WishList Items `DELETE /api/v1/wishlist/user/delete-wishlist-item/{productId}`**

***Request***

Path Parameter:

productId (string, required): The unique identifier for the product.

***Responses***

*HTTP Status Code: 200 OK*
```javascript
{
    "success": true,
    "message": "Item Deleted Successfully",
    "wishlist": {
        "_id": "650548475b0c14784e62cd86",
        "user": "64d9cca1fd210ef389e268a0",
        "products": [
            //Products after deleting the given product from wishlist
            {
                "thumbnail": {
                    "location": "public\\images\\product\\thumbnail-1694596021555-390770788-Fog_Scent_Xpressio_Perfume_thumbnail.webp",
                    "contentType": "image/webp",
                    "originalname": "Fog_Scent_Xpressio_Perfume_thumbnail.webp",
                    "size": 23660
                },
                "_id": "65017bb54f41af7936475bd7",
                "product_name": "Fog Scent Xpressio Perfume",
                "slug": "fog-scent-xpressio-perfume",
                "brand": "65014aa14f41af7936475b54",
                "category": "6501396a4f41af7936475a6a",
                "description": "Product details of Best Fog Scent Xpressio Perfume 100ml For Men cool long lasting perfumes for Men",
                "stock": 61,
                "price": 13,
                "discountPercentage": 8.14,
                "images": [
                    {
                        "location": "public\\images\\product\\image_1-1694596021555-834973975-Fog_Scent_Xpressio_Perfume_image1.jpg",
                        "contentType": "image/jpeg",
                        "originalname": "Fog_Scent_Xpressio_Perfume_image1.jpg",
                        "size": 9055,
                        "_id": "65017bb54f41af7936475bd8"
                    },
                    {
                        "location": "public\\images\\product\\image-1697101691517-296109208-Fog_Scent_Xpressio_Perfume_image2.jpg",
                        "contentType": "image/jpeg",
                        "originalname": "Fog_Scent_Xpressio_Perfume_image2.jpg",
                        "size": 14381,
                        "_id": "6527b77b6bb91281f85574fa"
                    },
                    {
                        "location": "public\\images\\product\\image-1697101728373-448615607-Fog_Scent_Xpressio_Perfume_image3.jpg",
                        "contentType": "image/jpeg",
                        "originalname": "Fog_Scent_Xpressio_Perfume_image3.jpg",
                        "size": 8159,
                        "_id": "6527b7a06bb91281f855750b"
                    },
                    {
                        "location": "public\\images\\product\\image-1697101743750-735994401-Fog_Scent_Xpressio_Perfume_image4.jpg",
                        "contentType": "image/jpeg",
                        "originalname": "Fog_Scent_Xpressio_Perfume_image4.jpg",
                        "size": 25664,
                        "_id": "6527b7af6bb91281f855751d"
                    }
                ],
                "createdAt": "2023-09-13T09:07:01.683Z",
                "updatedAt": "2023-10-12T09:12:16.603Z",
                "__v": 1,
                "deleted": false,
                "highlights": [
                    "Alcoholic Perfume",
                    "Lasts as long as you in bed",
                    "Perfume that refreshes the environment",
                    "Fog Jo Frog Bana de",
                    "100ml"
                ]
            },
            //All other products in the wishlist
        ],
        "createdAt": "2023-09-16T06:16:39.827Z",
        "updatedAt": "2023-11-03T06:36:43.483Z",
        "__v": 61
    }
}
```
***Error Responses***

*HTTP Status Code: 404 NOT FOUND*
```javascript
{ "success": false, "message": "Wishlist Not Found" / "Item Not Found" }
```
## Public APIs
**Register `POST /api/v1/auth/register`**

***Request***

Request Body
```javascript
{
  "user_name": "Mohammed Minnathullah",
  "email": "test8@test.com",
  "password": "123456",
  "phone": "+917337234828",
  "confirm_password": "123456"
}
```
***Responses***

*HTTP Status Code: 201 CREATED*
```javascript
{
    "success": true,
    "message": "User Registered Successfully",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTQ0OTk0MTIxNWU4M2I2NzRmY2JhM2MiLCJyb2xlIjoidXNlciIsImlhdCI6MTY5ODk5NDQ5OCwiZXhwIjoxNjk5NTk5Mjk4fQ.L70Tn_YCMuQ1dQ0uVlcQmO5XUeqFko2SthLQBJvbXRk",
    "user": {
        "_id": "65449941215e83b674fcba3c",
        "role": "user"
    }
}
```
***Error Responses***

*HTTP Status Code: 400 BAD REQUEST*
```javascript
{ "success": false, "message": "Required Fields Error" | "Passwords Does Not Match" }
```
  *HTTP Status Code: 409 CONFLICT*
```javascript
{ "success": false, "message": "Already registered user" }
```
**Longin `POST /api/v1/auth/login`**

***Request***

Request Body
```javascript
{
    "username": "+919652336445",
    "password": "123456"
    //Provide either your `registered email` or your `registered phone number` in the `username`
}
```
***Responses***

*HTTP Status Code: 200 OK*
```javascript
{
    "success": true,
    "message": "User Logged In successfully",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGQ5Y2NhMWZkMjEwZWYzODllMjY4YTAiLCJyb2xlIjoidXNlciIsImlhdCI6MTY5ODk5MDQwOCwiZXhwIjoxNjk5NTk1MjA4fQ.QpbbuAwRCWcblIYrvHRV60FMGBP2w1M4E-kelh8DcRo",
    "user": {
        "_id": "64d9cca1fd210ef389e268a0",
        "role": "user"
    }
}
```
***Error Responses***

*HTTP Status Code: 400 BAD REQUEST* `Required fields are not provided`

**Logout `POST /api/v1/auth/logout`**

***Request***

Request Object is not required

***Responses***

*HTTP Status Code: 200 OK*
```javascript
{
    "success": true,
    "message": "user logged out successfully"
}
```
**Request For Password Reset Via SMS `POST /api/v1/auth/req-password-reset`**

***Request***

Request Body
```javascript
{
    "phone":"+919652336445"
}
```
***Responses***

*HTTP Status Code: 200 OK*
```javascript
{
    "success": true,
    "message": "OTP sent successfully",
    "user_id": "64d9cca1fd210ef389e268a0"
}
```
***Error Responses***

*HTTP Status Code: 400 BAD REQUEST*
```javascript
{ "success": false, "message": "Phone number is required" }
```
  *HTTP Status Code: 404 NOT FOUND*
```javascript
{ "success": false, "message": "User not found" }
```
  *HTTP Status Code: 500 INTERNAL SERVER ERROR*
```javascript
{
  "success": false,
  "message": "Failed To Send OTP",
  "error": error message,
}
```
**Verify OTP For Password Reset `POST /api/v1/auth/verify-otp/{userId}`**

***Request***

Path Parameter:

userId (string, required): The unique identifier for the user.

Request Body
```javascript
{"otp": 123456}
```
***Responses***

*HTTP Status Code: 200 OK*
```javascript
{
  "success": true,
  "message": "OTP Verified",
}
```
***Error Responses***

*HTTP Status Code: 400 BAD REQUEST*
```javascript
{ "success": false, "message": "OTP is required" }
```
  *HTTP Status Code: 404 NOT FOUND*
```javascript
{ "success": false, "message": "User not found" }
```
  *HTTP Status Code: 401 UNAUTHORIZED*
```javascript
{
  "success": false,
  "message": "Invalid OTP",
}
```
**Request For Password Reset Via Mail `POST /api/v1/auth/req-password-reset-mail`**

***Request***

Request Body
```javascript
{"email": "minnathullahmohammed7337@gmail.com"}
```
***Responses***

*HTTP Status Code: 200 OK*
```javascript
{
  "success": true,
  "message": "Mail Sent Successfully",
}
```
***Error Responses***

*HTTP Status Code: 400 BAD REQUEST*
```javascript
{ "success": false, "message": "Email is required" }
```
  *HTTP Status Code: 404 NOT FOUND*
```javascript
{ "success": false, "message": "User not found" }
```
  *HTTP Status Code: 500 INTERNAL SERVER ERROR*
```javascript
{
  "success": false,
  "message": "Failed To Send Mail" | "Failed to generate token",
}
```
**Reset Password Via SMS `POST /api/v1/auth/reset-password/{userId}`**

***Request***

Path Parameter:

userId (string, required): The unique identifier for the user.

Request Body
```javascript
{
    "newPassword": "123456",
    "confirmNewPassword": "123456"
}
```
***Responses***

*HTTP Status Code: 200 OK*
```javascript
{
    "success": true,
    "message": "Password Reset Successful",
    "updatedUser": {
        "_id": "64d9cca1fd210ef389e268a0",
        "user_name": "Minnathullah Rahmani",
        "email": "minnathullahmohammed7337@gmail.com",
        "password": "$2b$12$c.3mWslgXymvEkvfBsALX.BtAFmW76GPVMhYZV3FmPVF52zo9lrkC",
        "phone": "+919652336445",
        "createdAt": "2023-08-14T06:41:37.807Z",
        "updatedAt": "2023-11-03T10:26:24.440Z",
        "otpSecret": "$2b$12$zAEqz8QRJ7ClxZTulH7OQeQjEQXUfeo3rdIud8R9jXDzbdPOAV6ei",
        "__v": 37,
        "addresses": [
            {
                "firstName": "Mohammed ",
                "lastName": "Rehan",
                "emailAddress": "rehan@zayd.com",
                "mobileNumber": "+917337234824",
                "altMobileNumber": "+919652336445",
                "country": "india",
                "street": "H-No: 5-16, Near gandhi",
                "city": "Hyderabad",
                "state": "Telangana",
                "pinCode": "506367",
                "dist": "Siddipet",
                "mandal": "Maddur",
                "village": "Maddur",
                "_id": "64f1579c2239b552d711a8b4"
            },
            // All Other Addresses
        ],
        "role": "user",
        "token": "BB9P5W5VCC5U8RuCX0VPAYaow38dFkqWxgMbexnUZHeHfyEgk4nK"
    }
}
```
***Error Responses***

*HTTP Status Code: 400 BAD REQUEST*
```javascript
{ "success": false, "message": "Required Fields Error" | "Passwords Does Not Match" }
```
  *HTTP Status Code: 404 NOT FOUND*
```javascript
{ "success": false, "message": "User not found" }
```
**Reset Password Via Mail `POST /api/v1/auth/reset-password`**

***Request***

Request Body
```javascript
{
    "email": "minnathullahmohammed7337@gmail.com",
    "newPassword": "123456",
    "confirmNewPassword": "123456"
}
```
***Responses***

*HTTP Status Code: 200 OK*
```javascript
{
    "success": true,
    "message": "Password Reset Successful",
    "updatedUser": {
        "_id": "64d9cca1fd210ef389e268a0",
        "user_name": "Minnathullah Rahmani",
        "email": "minnathullahmohammed7337@gmail.com",
        "password": "$2b$12$c.3mWslgXymvEkvfBsALX.BtAFmW76GPVMhYZV3FmPVF52zo9lrkC",
        "phone": "+919652336445",
        "createdAt": "2023-08-14T06:41:37.807Z",
        "updatedAt": "2023-11-03T10:26:24.440Z",
        "otpSecret": "$2b$12$zAEqz8QRJ7ClxZTulH7OQeQjEQXUfeo3rdIud8R9jXDzbdPOAV6ei",
        "__v": 37,
        "addresses": [
            {
                "firstName": "Mohammed ",
                "lastName": "Rehan",
                "emailAddress": "rehan@zayd.com",
                "mobileNumber": "+917337234824",
                "altMobileNumber": "+919652336445",
                "country": "india",
                "street": "H-No: 5-16, Near gandhi",
                "city": "Hyderabad",
                "state": "Telangana",
                "pinCode": "506367",
                "dist": "Siddipet",
                "mandal": "Maddur",
                "village": "Maddur",
                "_id": "64f1579c2239b552d711a8b4"
            },
            // All Other Addresses
        ],
        "role": "user",
        "token": "BB9P5W5VCC5U8RuCX0VPAYaow38dFkqWxgMbexnUZHeHfyEgk4nK"
    }
}
```
***Error Responses***

*HTTP Status Code: 400 BAD REQUEST*
```javascript
{ "success": false, "message": "Required Fields Error" | "Passwords Does Not Match" }
```
  *HTTP Status Code: 301 MOVED PERMANENTLY*
```javascript
{ "success": false, "message": "Link Has Been Expired" }
```
**Get All Brands `GET /api/v1/brand/get-all-brands`**

***Request***

Request object is not required

***Responses***

*HTTP Status Code: 200 OK*
```javascript
{
    "success": true,
    "message": "All The Brands Fetched Successfully",
    "brands": [
        {
            "image": {
                "location": "public\\images\\brand\\image-1698929824235-31604055-watch1.jpg",
                "contentType": "image/jpeg",
                "originalname": "watch1.jpg",
                "size": 31332
            },
            "_id": "654399dfd265803c74daff0b",
            "brand_name": "Updated Brand",
            "slug": "updated-brand",
            "deleted": true,
            "createdAt": "2023-11-02T12:45:19.409Z",
            "updatedAt": "2023-11-02T12:59:36.117Z",
            "__v": 0
        },
        // All other brands
    ]
}
```
**Get All Categories `GET /api/v1/category/get-all-categories`**

***Request***

Request object is not required

***Responses***

*HTTP Status Code: 200 OK*
```javascript
{
    "success": true,
    "message": "All The Categories Fetched Successfully",
    "categories": [
        {
            "image": {
                "location": "public\\images\\brand\\image-1698929824235-31604055-watch1.jpg",
                "contentType": "image/jpeg",
                "originalname": "watch1.jpg",
                "size": 31332
            },
            "_id": "654399dfd265803c74daff0b",
            "category_name": "Updated Brand",
            "slug": "updated-brand",
            "deleted": true,
            "createdAt": "2023-11-02T12:45:19.409Z",
            "updatedAt": "2023-11-02T12:59:36.117Z",
            "__v": 0
        },
        // All other categories
    ]
}
```
**Get all or filtered Products `GET /api/v1/product/get-filtered-products`**

***Request***

Query Parameters:

`brand | category | lowerPriceLimit | higherPriceLimit | _order | _sort | _page | _limit`

_Page is by default 1 & _limit is by default 8

Use lowerPriceLimit & higherPriceLimit to find products between a price range

Use brand to find a particular brands product, similarly use category to find products of a specific category only. However you can use both to be much specific.

Use _order to get products in a specific order according to product price (Use `-1` or `desc` for descending order and `1` or `asc` for ascending order)

***Responses***

*HTTP Status Code: 200 OK*
```javascript
{
    "success": true,
    "message": "Filtered Products fetched successfully",
    "totalNonDeletedProductsCount": 4,
    "totalProductsCount": 4,
    "filteredProducts": [
        {
            "thumbnail": {
                "location": "public\\images\\product\\thumbnail-1697094678094-638933267-iPhone9_thumbnail.jpg",
                "contentType": "image/jpeg",
                "originalname": "iPhone9_thumbnail.jpg",
                "size": 7878
            },
            "_id": "6514f2b0e9396786044e70d3",
            "product_name": "I Phone 9",
            "slug": "i-phone-9",
            "brand": {
                "image": {
                    "location": "public\\images\\brand\\image-1695456471497-923516794-apple_logo.png",
                    "contentType": "image/png",
                    "originalname": "apple_logo.png",
                    "size": 13222
                },
                "_id": "650139d14f41af7936475a6d",
                "brand_name": "Apple",
                "slug": "apple",
                "createdAt": "2023-09-13T04:25:53.296Z",
                "updatedAt": "2023-09-30T04:29:01.951Z",
                "__v": 0,
                "deleted": false
            },
            "category": {
                "image": {
                    "location": "public\\images\\category\\image-1697105881674-115650086-samsung_universe_9_image1.jpg",
                    "contentType": "image/jpeg",
                    "originalname": "samsung_universe_9_image1.jpg",
                    "size": 47518
                },
                "_id": "650138c14f41af7936475a64",
                "category_name": "Smart Phones",
                "slug": "smart-phones",
                "createdAt": "2023-09-13T04:21:21.480Z",
                "updatedAt": "2023-10-12T10:18:02.023Z",
                "__v": 0,
                "deleted": false
            },
            "description": "An apple mobile which is nothing like apple",
            "stock": 4,
            "price": 549,
            "discountPercentage": 11.56,
            "images": [
                {
                    "location": "public\\images\\product\\image_1-1695871664659-320176472-ATM.jpeg",
                    "contentType": "image/jpeg",
                    "originalname": "ATM.jpeg",
                    "size": 138168,
                    "_id": "6514f2b0e9396786044e70d4"
                },
                {
                    "location": "public\\images\\product\\image_2-1695871664667-229529932-VoterIdCard.jpeg",
                    "contentType": "image/jpeg",
                    "originalname": "VoterIdCard.jpeg",
                    "size": 181889,
                    "_id": "6514f2b0e9396786044e70d5"
                },
                {
                    "location": "public\\images\\product\\image_3-1695871664671-822547284-PAN.jpeg",
                    "contentType": "image/jpeg",
                    "originalname": "PAN.jpeg",
                    "size": 225546,
                    "_id": "6514f2b0e9396786044e70d6"
                },
                {
                    "location": "public\\images\\product\\image_4-1695871664674-304364639-license.jpeg",
                    "contentType": "image/jpeg",
                    "originalname": "license.jpeg",
                    "size": 55548,
                    "_id": "6514f2b0e9396786044e70d7"
                }
            ],
            "deleted": false,
            "createdAt": "2023-09-28T03:27:44.859Z",
            "updatedAt": "2023-10-20T03:23:55.552Z",
            "__v": 0,
            "highlights": [
                "4GB RAM",
                "64GB ROM",
                "180gm weight",
                "4500mah battery",
                "2 year warrantee"
            ]
        },
        //Remaining All Filtered Produts
    ],
    "filteredNonDeletedProducts": [
        {
            "thumbnail": {
                "location": "public\\images\\product\\thumbnail-1697094678094-638933267-iPhone9_thumbnail.jpg",
                "contentType": "image/jpeg",
                "originalname": "iPhone9_thumbnail.jpg",
                "size": 7878
            },
            "_id": "6514f2b0e9396786044e70d3",
            "product_name": "I Phone 9",
            "slug": "i-phone-9",
            "brand": {
                "image": {
                    "location": "public\\images\\brand\\image-1695456471497-923516794-apple_logo.png",
                    "contentType": "image/png",
                    "originalname": "apple_logo.png",
                    "size": 13222
                },
                "_id": "650139d14f41af7936475a6d",
                "brand_name": "Apple",
                "slug": "apple",
                "createdAt": "2023-09-13T04:25:53.296Z",
                "updatedAt": "2023-09-30T04:29:01.951Z",
                "__v": 0,
                "deleted": false
            },
            "category": {
                "image": {
                    "location": "public\\images\\category\\image-1697105881674-115650086-samsung_universe_9_image1.jpg",
                    "contentType": "image/jpeg",
                    "originalname": "samsung_universe_9_image1.jpg",
                    "size": 47518
                },
                "_id": "650138c14f41af7936475a64",
                "category_name": "Smart Phones",
                "slug": "smart-phones",
                "createdAt": "2023-09-13T04:21:21.480Z",
                "updatedAt": "2023-10-12T10:18:02.023Z",
                "__v": 0,
                "deleted": false
            },
            "description": "An apple mobile which is nothing like apple",
            "stock": 4,
            "price": 549,
            "discountPercentage": 11.56,
            "images": [
                {
                    "location": "public\\images\\product\\image_1-1695871664659-320176472-ATM.jpeg",
                    "contentType": "image/jpeg",
                    "originalname": "ATM.jpeg",
                    "size": 138168,
                    "_id": "6514f2b0e9396786044e70d4"
                },
                {
                    "location": "public\\images\\product\\image_2-1695871664667-229529932-VoterIdCard.jpeg",
                    "contentType": "image/jpeg",
                    "originalname": "VoterIdCard.jpeg",
                    "size": 181889,
                    "_id": "6514f2b0e9396786044e70d5"
                },
                {
                    "location": "public\\images\\product\\image_3-1695871664671-822547284-PAN.jpeg",
                    "contentType": "image/jpeg",
                    "originalname": "PAN.jpeg",
                    "size": 225546,
                    "_id": "6514f2b0e9396786044e70d6"
                },
                {
                    "location": "public\\images\\product\\image_4-1695871664674-304364639-license.jpeg",
                    "contentType": "image/jpeg",
                    "originalname": "license.jpeg",
                    "size": 55548,
                    "_id": "6514f2b0e9396786044e70d7"
                }
            ],
            "deleted": false,
            "createdAt": "2023-09-28T03:27:44.859Z",
            "updatedAt": "2023-10-20T03:23:55.552Z",
            "__v": 0,
            "highlights": [
                "4GB RAM",
                "64GB ROM",
                "180gm weight",
                "4500mah battery",
                "2 year warrantee"
            ]
        },
        // Remaining Filtered Non Deleted Products...
    ]
}
```
**Get Product By ID `GET /api/v1/product/get-selected-product/{productId}`**

***Request***

Path Parameter:

productId (string, required): The unique identifier for the Product.

***Responses***

*HTTP Status Code: 200 OK*
```javascript
{
    "success": true,
    "message": "Selected Product Fetched Successfully",
    "selectedProduct": {
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
    }
}
```
***Error Responses***

*HTTP Status Code: 404 NOT FOUND*
```javascript
{ "success": false, message: "Product Not Found" }
```
**Get Related Products By Category ID & Product ID `GET /api/v1/product/get-related-products/{categoryId}/{productId}`**

***Request***

Path Parameter:

categoryId (string, required): The unique identifier for the Category.

productId (string, required): The unique identifier for the Product.

***Responses***

*HTTP Status Code: 200 OK*
```javascript
{
    "success": true,
    "message": "Related Products Fetched Successfully",
    "relatedProducts": [
        {
            "thumbnail": {
                "location": "public\\images\\product\\thumbnail-1695442558846-529302106-oppo_f19_thumbnail.jpg",
                "contentType": "image/jpeg",
                "originalname": "oppo_f19_thumbnail.jpg",
                "size": 15815
            },
            "_id": "650140fb4f41af7936475ad4",
            "product_name": "OPPOF19",
            "slug": "oppof19",
            "brand": "65013a104f41af7936475a73",
            "category": "650138c14f41af7936475a64",
            "description": "OPPO F19 is officially announced on April 2021. A High Quality Metal Body Product.",
            "stock": 132,
            "price": 189,
            "discountPercentage": 9.563,
            "images": [
                {
                    "location": "public\\images\\product\\image-1695451906799-334421826-oppo_f19_image1.jpg",
                    "contentType": "image/jpeg",
                    "originalname": "oppo_f19_image1.jpg",
                    "size": 18749,
                    "_id": "650e8b0232805025bf41961d"
                },
                {
                    "location": "public\\images\\product\\image-1695451890531-834220071-oppo_f19_image2.jpg",
                    "contentType": "image/jpeg",
                    "originalname": "oppo_f19_image2.jpg",
                    "size": 14056,
                    "_id": "650e8af232805025bf419611"
                },
                {
                    "location": "public\\images\\product\\image-1695452103341-197719436-oppo_f19_image3.jpg",
                    "contentType": "image/jpeg",
                    "originalname": "oppo_f19_image3.jpg",
                    "size": 17168,
                    "_id": "650e8bc732805025bf41964e"
                },
                {
                    "location": "public\\images\\product\\image-1695452320645-634381847-oppo_f19_image4.jpg",
                    "contentType": "image/jpeg",
                    "originalname": "oppo_f19_image4.jpg",
                    "size": 8747,
                    "_id": "650e8ca032805025bf419698"
                }
            ],
            "createdAt": "2023-09-13T04:56:27.141Z",
            "updatedAt": "2023-10-12T09:59:42.323Z",
            "__v": 0,
            "deleted": false,
            "highlights": [
                "4GB RAM",
                "64GB ROM",
                "2 year warrantee",
                "20mpx front cam",
                "High Quality Metal Body"
            ]
        },
        //Remaining Products
    ]
}
```
***Error Responses***

*HTTP Status Code: 404 NOT FOUND*
```javascript
{ "success": false, message: "Related Products Not Found" }
```
**Search Products By Name `GET /api/v1/product/search-product/{productName}`**

***Request***

Path Parameter:

productName (string, required): The product name you want to get.

***Responses***

*HTTP Status Code: 200 OK*
```javascript
{
    "success": true,
    "message": "Product Found",
    "productsCount": 1,
    "nonDeletedProductsCount": 0,
    "products": [
        {
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
            "deleted": true,
            "createdAt": "2023-11-02T11:35:30.196Z",
            "updatedAt": "2023-11-02T12:31:15.592Z",
            "__v": 0
        },
        // You will get more products if search result matched
    ],
    "nonDeletedProducts": [{}, //Will get products if any]
}
```
***Error Responses***

*HTTP Status Code: 404 NOT FOUND*
```javascript
{ "success": false, message: "No Products Found" }
```
**Get Promo `GET /api/v1/promo/get-promo`**

***Request***

Request Object is not required.

***Responses***

*HTTP Status Code: 200 OK*
```javascript
{
    "success": true,
    "message": "Promo Fetched Successfully",
    "promo": [
        {
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
            "category": {
                "image": {
                    "location": "public\\images\\category\\image-1697105881674-115650086-samsung_universe_9_image1.jpg",
                    "contentType": "image/jpeg",
                    "originalname": "samsung_universe_9_image1.jpg",
                    "size": 47518
                },
                "_id": "650138c14f41af7936475a64",
                "category_name": "Smart Phones",
                "slug": "smart-phones",
                "createdAt": "2023-09-13T04:21:21.480Z",
                "updatedAt": "2023-10-12T10:18:02.023Z",
                "__v": 0,
                "deleted": false
            }
        }
    ]
}
```
***Error Responses***

*HTTP Status Code: 404 NOT FOUND*
```javascript
{ "success": false, message: "Promo Not Found" }
```
