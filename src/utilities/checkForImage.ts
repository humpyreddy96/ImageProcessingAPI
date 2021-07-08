import { promises as fspromises } from "fs";
import path from "path";

const checkImage = async (
  image_title: string,
  width: number,
  height: number
): Promise<string> => {
  const thumbDir = path.join(__dirname, "../../src/images/thumbs/");
  const file_path = path.join(
    thumbDir,
    `${image_title.toLowerCase()}(${width}x${height}).jpg`
  );

  try {
    await fspromises.readdir(thumbDir);
  } catch {
    await fspromises.mkdir(thumbDir);
  }

  try {
    await fspromises.readFile(file_path, { flag: "r" });
    return file_path;
  } catch {
    return "";
  }
};

export default checkImage;
