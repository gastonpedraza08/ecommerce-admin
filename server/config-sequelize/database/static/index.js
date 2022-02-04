const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
console.log(__dirname)
let realDirname = __dirname.replace('static', 'static/products');

let fullArr = [];

fs.readdirSync(realDirname).forEach((file, i) => {
  let { myArray } = require(path.join(realDirname, file));
  myArray = myArray.map(product => {
    let thumbnail;

    if (product.thumbnail.slice(0,10) === 'data:image') {
      thumbnail = product.images.split(';')[0];
    }

    return {
      ...product,
      createdAt: 'valor-unico-e-irrepetible',
      updatedAt: 'valor-unico-e-irrepetible',
      infoHelper: JSON.parse(product.infoHelper),
      thumbnail: thumbnail ? thumbnail : product.thumbnail
    }
  });

  fs.writeFileSync(`./products/${file}`, JSON.stringify({ myArray }, null, 2) , 'utf-8');  
});


function readWriteAsync() {


  fs.readdirSync(realDirname).forEach((file, i) => {
    fs.readFile(`./products/${file}`, 'utf-8', function(err, data){
      if (err) throw err;

      var newValue = data.replace(/"valor-unico-e-irrepetible"/g, 'new Date()');

      newValue = newValue.replace(/(?<="infoHelper":)\s/g, ' JSON.stringify(');
      newValue = newValue.replace(/}(?=,\s+"sku":)/g, '})');
      newValue = newValue.replace(/{(?=\s+"myArray":)/g, 'module.exports = {');
      

      fs.writeFile(`./products/${file}`, newValue, 'utf-8', function (err) {
        if (err) throw err;
        console.log('filelistAsync complete');
      });
    });
  });

}

readWriteAsync();