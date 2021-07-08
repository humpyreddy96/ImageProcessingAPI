import express from "express";
import { convertImage } from "../utilities/imgprocess";
import checkImage from "../utilities/checkForImage";
const route = express.Router();

route.get("/", async (req: express.Request, res: express.Response) => {
  const image = req.query.image as string;
  const height = parseInt(req.query.height as string);
  const width = parseInt(req.query.width as string);

  if (!(req.query.image && req.query.width && req.query.height)) {
    res.statusCode = 400;
    return res.send("400: Request was not valid.");
  }

  const returnedImage = await checkImage(image, height, width);

  if (returnedImage) {
    res.sendFile(returnedImage);
  } else {
    try {
      if (isNaN(height) || isNaN(width) || height <= 0 || width <= 0) {
        res.statusCode = 400;
        return res.send("Invalid height and width values.");
      }

      const image_title = req.query.image as string;
      const image_path = await convertImage(image_title, width, height);
      res.sendFile(image_path);
    } catch (e) {
      const error = e as Error;
      if (error.message == "Image was not found") {
        res.statusCode = 404;
        res.send("404: Image not found. Please provide a valid image title.");
      }
    }
  }
});

export default route;
