// src/pages/api/todo.js


import { strings } from "../../strings";
import { client } from "../../lib/client";
import bcrypt from 'bcrypt';

export default async function handler(req, res) {


  switch (req.method) {
    case "POST":
    let pass='';
      const newUser = await JSON.parse(req.body);
      const query = '*[_type=="user"]{email}';
      const usrs = await client.fetch(query);

      let user = {
        _type: "user",
        name: newUser.name,
        phone: newUser.phone,
        email: newUser.email,
        address: newUser.address,
        user_type: newUser.user_type
      }
      if (usrs.find(i => i.email === newUser.email)) {
        return res.status(500).json({msg:strings.USER_EXIST_MSG})
      } else {
        try {
          bcrypt
            .genSalt(8)
            .then(salt => {
              console.log(`Salt: ${salt}`);
              return bcrypt.hash(newUser.password, salt);
            })
            .then(async(hash) => {
              console.log('...........hashhhhh',hash)
              user = {...user,password:hash}
              console.log(user)
              const nUser = await client
              .create(user)
  
            res
              .status(200)
              .json({ msg: strings.SUCCESS_REGISTER_MSG, id: nUser._id })
            })
            .catch(err => console.error(err.message));
         




        } catch (err) {

          console.error(err);
          res.status(500).json({ msg: "Error, check console" });
        }

        break;
      }
  }
}