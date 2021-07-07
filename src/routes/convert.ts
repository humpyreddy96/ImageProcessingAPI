import express from "express";
import { convertImage } from "../utilities/imgprocess";
const route = express.Router();

route.get("/", async (req: express.Request, res: express.Response) => {
  try {
      const height = parseInt(req.query.height as string);
      const width = parseInt(req.query.width as string);

      if(isNaN(height) || isNaN(width)){
        res.statusCode = 400
        return res.send('Invalid height and width values.')
      }
      
      const image_title = req.query.image as string;
      const image_path = await convertImage(image_title, width, height);
      res.sendFile(image_path);
  } catch(e){
      const error = e as Error
      if(error.message == 'Image was not found'){
        res.statusCode = 404
        res.send('404: Image not found. Please provide a valid image title.')
      }
  }

  if(! (req.query.image && req.query.width && req.query.height) ){
      res.statusCode = 400;
      return res.send('400: Request was not valid.');
    }

});

export default route;
