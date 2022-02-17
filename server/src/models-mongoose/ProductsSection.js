'use strict';

module.exports = mongoose => {
  const newSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    order: {
      type: Number,
      required: true
    },
    products: {
      type: [String],
      required: true
    },
  }, {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
  });

  const ProductsSection = mongoose.model('ProductsSection', newSchema);
  return ProductsSection;
};