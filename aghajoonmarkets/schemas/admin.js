export default{
    name:'admin',
    type:'document',
    title:'Admin',
    fields:[
        {
            name:'name',
            title:'Name',
            type:'string'
        },
        {
            name:'password',
            title:'Password',
            type:'string'
        },
        {
            name:'secret_key',
            title:'Secret Key',
            type:'string'
        }
    ]
}