'use strict';

const smartphoneProps = require('./product/phone-and-smartphone');

module.exports = mongoose => {
  const newSchema = new mongoose.Schema({
    // for all products
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    sku: {
      type: String,
      required: true
    },
    thumbnail: {
      type: String,
      required: true
    },
    condition: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    images: {
      type: [String],
      required: true
    },
    categoryId: {
      type: String,
      required: true
    },
    stock: {
      type: Number,
      required: true
    },
    state: {
      type: String,
      required: true
    },

    //smartphone props
    ...smartphoneProps

  }, {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
  });
  newSchema.index(
    { 
      name: 'text',
      description: 'text',
    },
    {
     weights: {
       name: 10,
       description: 5
     }
   }
  )

  const Product = mongoose.model('Product', newSchema);
  return Product;
};