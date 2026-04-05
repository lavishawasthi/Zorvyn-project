import dotenv from "dotenv"
import {app} from "./app.js"
import connectDB from "./config/db.js";

dotenv.config({
    path:'./.env'
})

const port=process.env.PORT|| 3000;


connectDB()
.then(()=>{
    app.on("error",(error)=>{
        console.log("error in the backend !!:",error);
        throw error
    })

    app.listen(port,()=>{
       console.log(`server is listening on the port ${port}`)
    })
})
.catch((error)=>{
    console.log("mongoDB connection failed!!",error);
});



