export default{
    name:"product",
    title:"Product",
    type:"document",
    fields:[
        {
            name:"product_image",
            title:"Image",
            type:"array",
            of:[{ type:"image" }],
            Options:{
                hotspot:true, 
            }
        },
        {
            name:"product_name",
            title :"Name",
            type:"string"

        },
        {
            name:"arabic_name",
            title :"Name",
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
            title:'Category',
            type:'reference',
            to:[{ type: 'category' }]

        },
        {
            name:"price",
            title:"Price",
            type:"number"
        },
        {
            name:"description",
            title:"description",
            type:"string"
        }
    ]
}