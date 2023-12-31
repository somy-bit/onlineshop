export default{
    name:"product",
    title:"محصولات",
    type:"document",
    fields:[
        {
            name:"product_image",
            title:"عکس",
            type:"array",
            of:[{ type:"image" }],
            Options:{
                hotspot:true, 
            }
        },
        {
            name:"product_name",
            title :"نام المانی",
            type:"string"

        },
        {
            name:"arabic_name",
            title :"نام عربی",
            type:"string"

        },
        {
            name:"persian_name",
            title :"نام فارسی",
            type:"string"

        },
        {
            name:"slug",
            title:"Slug",
            type:"slug",
            options:{
                source:"name",
                maxLength:90, 
            }
        },
        {
            name:'category',
            title:'دسته بندی',
            type:'reference',
            to:[{ type: 'category' }]

        },
        {
            name:"price",
            title:"قیمت",
            type:"number"
        },
        {
            name:"description",
            title:"توضیحات المانی",
            type:"string"
        },
        {
            name:"arabic_desc",
            title :"توضیحات عربی",
            type:"string"

        },
        {
            name:"persian_desc",
            title :"توضیحات فارسی",
            type:"string"

        },
        {
            name:"available",
            title :"موجودی",
            type:"boolean"

        },
    ]
}