const multer = require('multer'); // Useful to handle files sent with HTTP request to our API

const MIME_TYPES = { // Creates a dictionary of mime types with their translation
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

// The config object for multer
const storage = multer.diskStorage({  // Files will be saved in the disk
    destination: (req, file, callback) => { // The destination where the files will be save is given by a function (that needs the request, the file and a callback as arguments)...
        callback(null, 'images'); // which call the callback immediately ('null' says there wasn't any error ; 'images' is the destination folder)
    },
    filename: (req, file, callback) => { // The filename which will be given to the saved file is given by a function (that needs the request, the file and a callback as arguments)...
        const name = file.originalname.split(' ').join('_'); // which creates a name part with underscores instead of whitespaces
        const extension = MIME_TYPES[file.mimetype]; // and gets the file mime type
        callback(null, name + Date.now() + '.' + extension); // to make a fully unique name using the name without whitespace + a time stamp (date in millisec) + '.' + extension found above
    }
});

module.exports = multer({storage: storage}).single('image'); // Exports the multer element fully configured, passing him the multer config object storage, and indicating that we'll handle only individual uploads of image files
