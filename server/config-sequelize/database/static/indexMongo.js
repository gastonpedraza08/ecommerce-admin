const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
let realDirname = __dirname.replace('static', 'static/products-mongo');


fs.readdirSync(realDirname).forEach((file, i) => {
  //let { myArray } = require(path.join(realDirname, file));

  //fs.writeFileSync(`./products-mongo/${file}`, JSON.stringify({ myArray }, null, 2) , 'utf-8');  
});



function readWriteAsync() {
  fs.readdirSync(realDirname).forEach((file, i) => {
    fs.readFile(`./products-mongo/${file}`, 'utf-8', function(err, data){

      if (err) throw err;
      //if (i!==0) return null;


      var newValue = data;

      newValue = newValue.replace(/"con_wi-fi":/g, `"con_wi_fi":`);

      fs.writeFile(`./products-mongo/${file}`, newValue, 'utf-8', function (err) {
        if (err) throw err;
        console.log("modificado:", file)
      });
    });
  });

}

readWriteAsync();