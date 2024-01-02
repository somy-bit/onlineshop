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
               
                    source: 'product_name',
                    maxLength: 200, // will be ignored if slugify is set
                    slugify: input => input
                                         .toLowerCase()
                                         .replace(/\s+/g, '-')
                                         .slice(0, 200)
                
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
        {
            name:"in_sale",
            title :"تخفیف",
            type:"boolean"

        },
        {
            name:"off_price",
            title :"قیمت تخفیف خورده",
            type:"number"

        },
      
    ],
    initialValue: {
        off_price: 0,
        in_sale:false,
        available:true,

      }
}