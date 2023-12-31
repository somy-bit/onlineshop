export default {
    name: 'user',
    title: 'مشتری ها',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'نام',
            type: 'string',
            maxLength: 90,

        },
        {
            name: 'user_type',
            title: 'نوع کاربر',
            type: 'string',
        
        },
        {
            name: 'phone',
            title: 'شماره تلفن',
            type: 'string'
        },
        {
            name: 'email',
            title: 'ایمیل',
            type: 'string'
        },
        {
            name: 'password',
            title: 'کلمه عبور',
            type: 'string'
        },
        {
            name: 'address',
            title: 'ادرس',
            type: 'document',
            fields: [
                {
                    name: 'city',
                    title: 'شهر',
                    type: 'string'
                },
                {
                    name: 'street',
                    title: 'خیابان',
                    type: 'string'
                },
                {
                    name: 'block',
                    title: 'بلوک',
                    type: 'string'
                },
                {
                    name: 'no',
                    title: 'بقیه ادرس',
                    type: 'string'
                },

            ]


        }
    ]
}