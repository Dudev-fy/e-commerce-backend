import multer from 'multer';
import multerConfig from '../config/multer';
import Image from '../models/Image';

const upload = multer(multerConfig).single('image');

class ImageController {
  storeImage(req, res) {
    return upload(req, res, async (error) => {
      if (error) {
        return res.status(400).json({
          errors: [error.code],
        });
      }

      try {
        const { filename } = req.file;
        const { productId } = req.body;

        const newImage = await Image.create({ fileName: filename, productId });

        res.json(newImage);
      } catch {
        res.json(null);
      }
    });
  }
}

export default new ImageController();
