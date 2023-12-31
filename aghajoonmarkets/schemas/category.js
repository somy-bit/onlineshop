export default {

    name: 'category',
    type: 'document',
    title: 'دسته بندی ها',
    fields: [{
        name: 'category',
        title: ' به المانی دسته بندی',
        type: 'string'
    }
        ,

    {
        name:'arabic_cat',
        title:'دسته بندی به عربی',
        type:'string'
    }
    ,
    {
        name:'persian_cat',
        title:'دسته بندی به فارسی',
        type:'string'
    }
    ]
}