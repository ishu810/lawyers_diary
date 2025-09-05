import dotenv from "dotenv"
dotenv.config({
    path:'./.env'
})

import {app} from "./app.js"
import connectDB from "./db/index.js"

connectDB()
.then(
    app.listen(process.env.PORT || 8000,()=>{
        console.log("server started")
    })
)
.catch(
    (err)=>{
        console.log(`can't connect server due to err: ${err}`);
    }
);
