export default {
    name: 'user',
    title: 'user',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
            maxLength: 90,

        },
        {
            name: 'user_type',
            title: 'User Type',
            type: 'string',
        
        },
        {
            name: 'phone',
            title: 'Phone Number',
            type: 'number'
        },
        {
            name: 'email',
            title: 'Email',
            type: 'string'
        },
        {
            name: 'password',
            title: 'Password',
            type: 'string'
        },
        {
            name: 'address',
            title: 'Address',
            type: 'document',
            fields: [
                {
                    name: 'city',
                    title: 'City',
                    type: 'string'
                },
                {
                    name: 'street',
                    title: 'Street',
                    type: 'string'
                },
                {
                    name: 'block',
                    title: 'Block',
                    type: 'string'
                },
                {
                    name: 'no',
                    title: 'No',
                    type: 'string'
                },

            ]


        }
    ]
}