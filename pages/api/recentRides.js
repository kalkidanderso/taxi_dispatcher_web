import fs from "fs";
import path from "path";

function recentRidesHandler(req, res, next){
  if(req.method === "GET"){
      const filepath = path.join(process.cwd(), "Data", "recentRides.json");
      const FileData = fs.readFileSync(filepath);
      const data = JSON.parse(FileData);
      res.status(200).json({TableData: data});
  }
}

export default recentRidesHandler;