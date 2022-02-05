'use strict';
const fs = require('fs');
const path = require('path');

let realDirname = __dirname.replace('seeders', 'static/products-mongo');

let fullArr = [];

fs.readdirSync(realDirname).forEach((file, i) => {
  const { myArray } = require(path.join(realDirname, file));
  fullArr.push(...myArray);
});

module.exports = {
  up: (models, mongoose) => {
      return models.Product.insertMany(fullArr).then(res => {
      console.log(res.insertedCount);
    });
  },

  down: (models, mongoose) => {
      return models.Product.bulkWrite([
        {
          deleteOne: {
            filter: {
              name: 'first test'
            }
          }
        }
      ]).then(res => {
      console.log(res.deletedCount);
      });
  }
};
