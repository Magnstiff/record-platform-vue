import { queryExe } from "./backend/sql.js";
import fs from 'fs';

queryExe('select name from photos;', (error, res) => {
  const temp = res.map((item)=>{
    return item.name
  })
  
  fs.readdir('./public/photos/', (err, files)=>{
    files.forEach((item)=>{
      console.log(item);
    })
  })
  console.log(1)
  return
})
