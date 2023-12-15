export default{
    name:'orders',
    title:'Orders',
    type:'document',
    fields:[
        {
            name:'order',
            title:'Ordered Proucts',
            type:'array',
            of:[{type:'object',
            fields:[
                {name:'product_name',title:'Product Name',type:'string'},
                {name:'qty',title:'Quantity',type:'number'},
                {name:'price',title:'Price',type:'number'},
                

            ]}]
          
        },
        {
            name:'total',
            title:'Total payment',
            type:'number'
        },
        {
            name:'customer',
            title:'Customer',
            type:'object',
            fields:[
                {name:'name',title:'Name',type:'string'},
                {name:'phone',title:'Phone',type:'number'},
                {name:'email',title:'Email',type:'string'},
                {name:'address',title:'Address',type:'object',
            fields:[
                {name:'city',title:'city',type:'string'},
                {name:'street',title:'Street',type:'string'},
                {name:'block',title:'Block',type:'string'},
                {name:'no',title:'Dorr Number',type:'string'},

            ]
            },
                
            ]
        },
        {
            name:'status',
            title:'is the order sent?',
            type:'boolean',

        }
    ]
}