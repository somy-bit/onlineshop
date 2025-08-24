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
                        .json({ msg_du: 'successfully logged in',msg_fa:'شما با موفقیت وارد شدید',msg_ar:'لقد قمت بتسجيل الدخول بنجاح' ,user:checkUser})
                        console.log('-------------------------',checkUser)
                }else{
                    res.status(500)
                    .json({msg_du:'wrong credentials',msg_fa:'آدرس ایمیل یا رمز عبور صحیح را وارد کنید',msg_ar:'أدخل عنوان البريد الإلكتروني أو كلمة المرور الصحيحة'})
                }


            } catch (err) {

                console.error(err);
                res.status(500).json({ msg: "Error, check console" });
            }

            break;
    }
}