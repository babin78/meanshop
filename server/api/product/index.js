'use strict';

var express = require('express');
var controller = require('./product.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.upsert);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.destroy);
/*var uploadOptions = { //autoFile: true,
                      uploadDir: 'client/assets/uploads/'
}
var multiparty = require('connect-multiparty');

router.post('/:id/upload', multiparty(uploadOptions), controller.upload);
*/
var multer=require('multer');
var storage        = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, 'client/assets/uploads/');
  },
  filename: function(req, file, cb){
    if(file.mimetype=='image/png' || file.mimetype=='image/jpeg')
    {
      var filename = Date.now();
      switch (file.mimetype) {
        case 'image/png':
        filename = filename + ".png";
        break;
        case 'image/jpeg':
        filename = filename + ".jpeg";
        break;
        default:
        break;
      }

      cb(null, filename);

    }
    else{
       cb(new Error('file type is not supported'));

    }


  }
});
var upload       = multer({ storage: storage,limits:{files:2,}});
router.post('/:id/upload', upload.array('files',2), controller.upload);

module.exports = router;
