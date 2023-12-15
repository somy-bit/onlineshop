// src/pages/api/todo.js


import { client } from "../../lib/client";

export default async function handler(req, res) {

 
  switch (req.method) {
    case "POST":
     
      const newUser = await JSON.parse(req.body);
      const query='*[_type=="user"]{email}';
      const usrs = await client.fetch(query);
      if(usrs.find(i=>i.email===newUser.email)){
        res.json({msg:'this user already exists'})
      }
      try {
        await client
          .create({
            _type: "user",
            name:newUser.name,
            phone:newUser.phone,
            email:newUser.email,
            password:newUser.password,
            address:newUser.address
          })
          .then((res) => {
           
            console.log(`Todo was created, document ID is ${res}`); 
        
          });    
          res
          .status(200)
          .json({ msg: `Todo was created, document ID is ${res._id}` })
          
       
         
          
      } catch (err) {
       
        console.error(err);
        res.status(500).json({ msg: "Error, check console" });
      }
      
      break;
  }
}