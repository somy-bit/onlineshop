// src/pages/api/todo.js

import { client } from "../../lib/client";

export default async function handler(req, res) {
 
  switch (req.method) {
    case "POST":
      
      const newOrder = await JSON.parse(req.body);
      
      try {
        await client
          .create({
            _type: "orders",
            order: newOrder.order,
            status: false,
            total:newOrder.total,
            customer: newOrder.customer,
          })
          .then((res) => {
           

            console.log(`order was created, document ID is ${res._id}`);
           
          });
        res
          .status(200)
          .json({ msg: 'Wir haben Ihre Bestellung erhalten! Vielen Dank, dass Sie sich für uns entschieden haben' })
         
          
          
      } catch (err) {
       
        console.error(err);
        res.status(500).json({ msg: "Error, check console" });
      }
     
      break;
  }
}