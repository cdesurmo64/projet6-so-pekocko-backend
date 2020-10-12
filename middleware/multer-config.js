const multer = require('multer'); // Useful to handle files sent with HTTP request to our API

const MIME_TYPES = { // Creates a dictionary of mime types with their translation
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

// The config object for multer : sets the destination where the files will be saved and their name
const storage = multer.diskStorage({  // Files will be saved in the disk
    destination: (req, file, callback) => {
        callback(null, 'images');
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({ storage: storage }).single('image'); // Exports the multer element fully configured, passing him the multer config object storage, and indicating that it will handle only individual uploads of image files
