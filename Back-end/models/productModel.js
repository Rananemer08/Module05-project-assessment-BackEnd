import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      validate: {
        validator: (value) => value >= 0, // Enforce non-negative prices
        message: "Price must be non-negative",
      },
    },
    image: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    fabric: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    bestSeller: {
      type: Boolean,
      default: false,
    },
    description: {
      //description text for the product
      type: String,
    },
    // userId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Product",
    //     required: true,
    //   },
   
  },
  {
    timestamps: true,
  }
);
// productSchema.pre("find", function (next) {
//   this.populate(["userId"]);
//   next();
// });

// productSchema.pre("findOne", function (next) {
//   this.populate(["usertId"]);
//   next();
// });

const Product = mongoose.model("Product", productSchema);

export default Product;