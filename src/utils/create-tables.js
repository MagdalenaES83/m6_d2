import pool from "../utils/db.js"

const query = `
    -- DROP TABLE IF EXISTS products;
    CREATE TABLE IF NOT EXISTS 
        products(
            product_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            name VARCHAR (50) NOT NULL,
            description VARCHAR (450) NOT NULL,
            brand VARCHAR (100) NOT NULL,
            image_url TEXT NOT NULL,
            price INTEGER NOT NULL, 
            category VARCHAR (50) NOT NULL,
            created_at TIMESTAMPTZ DEFAULT NOW(),
            updated_at TIMESTAMPTZ DEFAULT NOW()
        );

    -- DROP TABLE IF EXISTS reviews;
    CREATE TABLE IF NOT EXISTS
        reviews(
            review_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            comment VARCHAR (100) NOT NULL,
            rate TEXT NOT NULL,
            product INTEGER NOT NULL REFERENCES products(product_id) ON DELETE CASCADE,
            created_at TIMESTAMPTZ DEFAULT NOW(),
            
        );
`

const createTables = async () => {
    try {
     await pool.query(query)
     console.log('Default tables are created')
    } catch (error) {
     console.log(error)
      console.log('Default tables are not created')
    }
}

export default createTables