import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { createWriteStream, mkdirSync, existsSync, renameSync } from "fs";
import bodyparser from "body-parser";
import formidable, { Fields, Files } from "formidable";
import { v4 as uuidv4 } from "uuid";
const app = express();
dotenv.config();

app.use(bodyparser.json());

const port = 3000;
const apiUrl = process.env.API_URL;
app.use(bodyparser.json());
app.use(express.static("public"));
const dir = __dirname + "/../image";
if (!existsSync(dir)) {
  mkdirSync(dir);
}
const users = [{ name: "sai", gmail: "sai@com" }];
const html = `
<!DOCTYPE html>
<html>
  <head></head>
  <body>
    <script type="text/javascript">
        localStorage.setItem('apiUrl', '${apiUrl}')
        window.location.href = "/"
    </script>
  </body>
</html>
`;

app.get("/api/html", (req: Request, res: Response) => {
  res.send(html);
});

app.get("/api/users", (req: Request, res: Response) => {
  res.json({ name: "user1", email: "user1@gmail.com", age: 30 });
  
});
app.post("/api/uploadFile", (req: Request, res: Response) => {
  const form = formidable({ multiples: true });
  form.parse(req, (err, fields: Fields, files: Files) => {
    console.log(err, fields, files);
    let myfiles = JSON.parse(JSON.stringify(files.uploadFiles));

    if (!Array.isArray(myfiles)) {
      let myfile = JSON.parse(JSON.stringify(files.uploadFiles));
      let tempPath = myfile.filepath;
      let newPath =
        __dirname + "/../image/" + uuidv4() + myfile.originalFilename;
      console.log(myfile.size);
      renameSync(tempPath, newPath);
    } else {
      myfiles.forEach((file) => {
        let tempPath = file.filepath;
        let newPath =
          __dirname + "/../image/" + uuidv4() + file.originalFilename;
        console.log(file.filepath, file.originalFilename);
        renameSync(tempPath, newPath);
      });
    }

    res.json({ message: "success" });
  });
});
app.get("/api/users", (req: Request, res: Response) => {
  res.send(users);
});

app.listen(3000, () => {
  console.log("Server started listening: ", port);
});
