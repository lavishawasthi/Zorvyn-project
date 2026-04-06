import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"


const app=express()

app.use(cors({
    origin:process.env.CORS_ORIGIN || "*",
    credentials:true
}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//routes import
import userRouter from './routes/user.routes.js'
import transactionRouter from './routes/transaction.routes.js';
import auditRouter from './routes/audit.routes.js';


//routes declaaration
app.use("/api/v1/users",userRouter);
app.use("/api/v1/transactions", transactionRouter);
app.use("/api/v1/audit", auditRouter);


export {app}