// src/pages/api/todo.js

import { client } from "../../lib/client";

export default async function handler(req, res) {
    switch (req.method) {
        case "POST":

            const user = await JSON.parse(req.body);
            const query = '*[_type=="user" && email=="'+user.email+'" && password == "'+user.password+'"]';

            try {
                const checkUser = await client.fetch(query);
                if (checkUser.length >0) {

                    res
                        .status(200)
                        .json({ msg: 'je bent succesvol ingelogd' ,user:checkUser})
                        console.log('-------------------------',checkUser)
                }else{
                    res.status(500)
                    .json({msg:'Voer het juiste e-mailadres of wachtwoord in'})
                }


            } catch (err) {

                console.error(err);
                res.status(500).json({ msg: "Error, check console" });
            }

            break;
    }
}