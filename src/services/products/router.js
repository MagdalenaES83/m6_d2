import {Router} from "express"
import pool from "../../utils/db.js"
const route = Router()


route.get("/",async(req,res,next)=>{
    try {
        const query = `SELECT * FROM products;`
        const result = await pool.query(query)
        res.send(result.rows)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

route.get("/:id",async(req,res,next)=>{
    try {
        const query = `SELECT * FROM product WHERE product_id=${req.params.id};`
      
        const result = await pool.query(query)
        if(result.rows.length > 0){
            const product = result.rows[0]
            const productQuery = `SELECT * FROM reviews WHERE product=${req.params.id};`
            const productResult = await pool.query(productQuery)
            const product = productResult.rows
            res.send({product,review})
        }
        else{
            res.status(404).send({message:`product with ${req.params.id} is not found.`})
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

route.delete("/:id",async(req,res,next)=>{
    try {
        const query = `DELETE FROM product WHERE product_id=${req.params.id};`
        await pool.query(query)
        res.status(204).send()
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

route.put("/:id",async(req,res,next)=>{
    try {
        const {name,description,brand,image_url,price, category} = req.body;
        const query =`
            UPDATE product 
            SET 
                name=${"'"+name+"'"},
                description=${"'"+description+"'"},
                brand=${"'"+brand+"'"},
                image_url=${"'"+image_url+"'"},
                price=${"'"+price+"'"},
                category=${"'"+category+"'"},
                updated_at= NOW()
            WHERE product_id=${req.params.id}
            RETURNING*;`
        const result = await pool.query(query)
        res.send(result.rows[0])
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

route.post("/",async(req,res,next)=>{
    try {
        const {name,description,brand,image_url,price, category} = req.body;
        const query =`
        INSERT INTO products
        (  name, description,brand,image_url,price, category                    )
        VALUES 
        (
            ${"'"+name+"'"},
            ${"'"+description+"'"},
            ${"'"+brand+"'"},
            ${"'"+image_url+"'"},
            ${"'"+price+"'"},
            ${"'"+category+"'"}
        ) RETURNING *;
        `
        const result = await pool.query(query)
        res.status(201).send(result.rows[0])
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})


export default route;