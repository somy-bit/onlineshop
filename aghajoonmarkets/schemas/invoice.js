export default{
    name:'orders',
    title:'سفارش ها',
    type:'document',
    fields:[
        {
            name:'order',
            title:'محصولات سفارش داده شده',
            type:'array',
           
            of:[{type:'object',
            fields:[
                {name:'product_name',title:'اسم محصول',type:'string'},
                {name:'qty',title:'تعداد',type:'number'},
                {name:'price',title:'قیمت',type:'number'},
                

            ]}]
            
          
        },
        {
            name:'total',
            title:'مجموع',
            type:'number'
        },
        {
            name:'customer',
            title:'مشتری',
            type:'object',
            fields:[
                {name:'name',title:'نام',type:'string'},
                {name:'phone',title:'تلفن',type:'string'},
                {name:'email',title:'ایمیل',type:'string'},
                {name:'address',title:'ادرس',type:'object',
            fields:[
                {name:'city',title:'شهر',type:'string'},
                {name:'street',title:'خیابان',type:'string'},
                {name:'block',title:'بلوک',type:'string'},
                {name:'no',title:'بفیه ادرس',type:'string'},

            ]
            },
                
            ]
        },
        {
            name:'status',
            title:'وضعیت سفارش',
            type:'boolean',

        }
    ]
}