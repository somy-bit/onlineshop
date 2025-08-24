// src/pages/api/todo.js


import { client } from "../../lib/client";

export default async function handler(req, res) {


  switch (req.method) {
    case "POST":

      const newUser = await JSON.parse(req.body);
      const query = '*[_type=="user"]{email}';
      const usrs = await client.fetch(query);
      if (usrs.find(i => i.email === newUser.email)) {
        return res.status(500).json({ msg_du: 'An account with this email already exists!',msg_fa:'یک کاربر از قبل با این آدرس ایمیل وجود دارد!' })
      } else {
        try {
         const nUser = await client
            .create({
              _type: "user",
              name: newUser.name,
              phone: newUser.phone,
              email: newUser.email,
              password: newUser.password,
              address: newUser.address,
              user_type:newUser.user_type
            })
          
          res
            .status(200)
            .json({ msg: 'successfully registered',id:nUser._id})




        } catch (err) {

          console.error(err);
          res.status(500).json({ msg: "Error, check console" });
        }

        break;
      }
  }
}