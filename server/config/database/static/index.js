var fs = require('fs');

function readWriteAsync() {


  for (let i=0; i<=39; i++) {
    fs.readFile(`product-${i}.js`, 'utf-8', function(err, data){
      if (err) throw err;

      var newValue = data.replace(/(?<="price":\s\d+)\./g, '');

      fs.writeFile(`product-${i}.js`, newValue, 'utf-8', function (err) {
        if (err) throw err;
        console.log('filelistAsync complete');
      });
    });
  }

}

readWriteAsync();