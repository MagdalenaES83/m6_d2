import express from "express";
import cors from "cors"

import createTables from "./utils/create-tables.js";
import  pool from "./utils/pool.js";
//import productsRoute from "./services/products/routes.js"
//import reviewsRoute from "./services/reviews/routes.js"

const server = express()


const PORT = process.env.PORT

server.use(cors())
server.use(express.json())

//server.use("/products", productsRoute)
//server.use("/reviews", reviewsRoute)



server.listen(PORT,async ()=>{
    console.log(`Server is running on port:  ${PORT}`)
    const result = await pool.query("Select now()")
    console.log(result)
})

server.on('error',(error)=>{
    console.log('Server doesnt work',error)
})
