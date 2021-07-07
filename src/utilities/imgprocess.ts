import { promises as fspromises } from "fs";

import path from "path";
import sharp from "sharp";

const convertImage = async (
  image_title: string,
  width: number,
  height: number
): Promise<string> => {
  const file_path = path.join(
    __dirname,
    "../../src/images/", 
    `${image_title.toLowerCase()}.jpg`
  );
  const output_file_path = path.join(
    __dirname,
    "../../src/images/thumbs/",
    `${image_title.toLowerCase()}(${width}x${height}).jpg`
  );

  let image: fspromises.FileHandle;
    try {
      image = await fspromises.open(file_path, "r");
    } catch {
      throw new Error("Image was not found");
    }

    try {
      await sharp(await image.readFile())
        .resize({ width, height })
        .toFile(output_file_path);
      image.close();
    } catch {
      image.close();
      throw new Error("Sorry, cannot convert!");
    }
    return output_file_path;

};

export { convertImage };
