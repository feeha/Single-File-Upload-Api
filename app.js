const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');

var filenameVid = ''; 
var filenameImg = '';
var filenameDoc = '';

//-----------------------------------Video---------------------------------------------------------------//

// Set The Video Storage Engine

const videoStorage = multer.diskStorage({
  destination: './public/uploads/videos',
  filename: function(req, file, cb){
    filenameVid = Date.now() + '-' + path.basename(file.originalname);
    cb(null, filenameVid);
  }
});
// Init Video Upload

const uploadVideo = multer({
  storage: videoStorage,
  limits:{fileSize: 209715200},
  fileFilter: function(req, file, cb){
    checkVideoFileType(file, cb);
  }
}).single('videoUpload');

// Check Video File Type
function checkVideoFileType(file, cb){
  // Allowed ext
  const filetypes = /mp3|mp4|mpeg/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: videos Only!');
  }
}

//-----------------------------------Image---------------------------------------------------------------//

// Set The Image Storage Engine

const imageStorage = multer.diskStorage({
  destination: './public/uploads/images',
  filename: function(req, file, cb){
    filenameImg = Date.now() + '-' + path.basename(file.originalname);
    cb(null, filenameImg);
  }
}); 

// Init Image Upload

  const uploadImg = multer({
  storage: imageStorage,
  limits: {fileSize: 10000000},
  fileFilter: function(req, file, cb){
    checkImageFileType(file,cb);
  }
}).single('imageUpload'); 

//check Image File Type
function checkImageFileType(file, cb){
  const filetypes = /jpeg|jpg|png|gif|pdf/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null, true);
  } else {
    cb('Error: Images Only');
  }
} 

//-----------------------------------------------------------------------------------------------------//

// Set The Doc Storage Engine

const docStorage = multer.diskStorage({
  destination: './public/uploads/docs',
  filename: function(req, file, cb){
    filenameDoc = Date.now() + '-' + path.basename(file.originalname);
    cb(null, filenameDoc);
  }
}); 

// Init Doc Upload

  const uploadDoc = multer({
  storage: docStorage,
  limits: {fileSize: 10000000},
  fileFilter: function(req, file, cb){
    checkDocFileType(file,cb);
  }
}).single('docUpload'); 

//check Doc File Type
function checkDocFileType(file, cb){
  const filetypes = /pdf|doc|docx|pptx|ppt/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null, true);
  } else {
    cb('Error: Doc Only');
  }
} 
 
//---------------------------------------------------------------------------------------------------//

// Init app
const app = express();

// EJS
app.set('view engine', 'ejs');

// Public Folder
app.use(express.static('./public'));

app.get('/', (req, res) => res.render('index'));

// video upload route
app.post('/upload', (req, res) => {
  uploadVideo(req, res, (err) => {    
    if(err){
      console.log(err);
      res.render('index', {
        msg: err        
      });
    } else {
      if(req.file == undefined){
        res.render('index', {
          msg: 'Error: No File Selected!'
        });
      } else {
        res.render('index', {
          msg: 'File Uploaded!',
          file: `uploads/videos/${filenameVid}`
        });
      }
    }
  });  
});

 // image upload route
app.post('/upload-image', (req, res) => {
  uploadImg(req, res, (err) => {    
    if(err){
      console.log(err);
      res.render('index', {
        msg: err        
      });
    } else {
      if(req.file == undefined){
        res.render('index', {
          msg: 'Error: No File Selected!'
        });
      } else {
        res.render('index', {
          msg: 'File Uploaded!',
          file: `uploads/images/${filenameImg}`
        });
      }
    }
  });  
});

 // doc upload route
 app.post('/upload-doc', (req, res) => {
  uploadDoc(req, res, (err) => {    
    if(err){
      console.log(err);
      res.render('index', {
        msg: err        
      });
    } else {
      if(req.file == undefined){
        res.render('index', {
          msg: 'Error: No File Selected!'
        });
      } else {
        res.render('index', {
          msg: 'File Uploaded!',
          file: `uploads/docs/${filenameDoc}`
        });
      }
    }
  });  
});

const port = 3000;

app.listen(port, () => console.log(`Server started on port ${port}`));