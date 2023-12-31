// src/pages/api/todo.js

import { strings } from "../../strings";
import { client } from "../../lib/client";
import bcrypt from 'bcrypt';


export default async function handler(req, res) {
    switch (req.method) {
        case "POST":

            const user = await JSON.parse(req.body);
            const query = '*[_type=="user" && email=="'+user.email+'"]';

            try {
                const checkUser = await client.fetch(query);
                console.log('-------------------------',checkUser)
                if (checkUser.length >0) {
                    const matchPassword = await bcrypt.compare(user.password,checkUser[0].password)
                    if(matchPassword){
                    res
                        .status(200)
                        .json({ msg:strings.SUCCESS_LOGIN_MSG,user:checkUser})
                       
                }else{
                    res.status(500)
                    .json({msg:strings.WRONG_EMAIL_PASS_MSG})
                }
            }


            } catch (err) {

                console.error(err);
                res.status(500).json({ msg: "Error, check console" });
            }

            break;
    }
}