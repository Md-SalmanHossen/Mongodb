
use('e-commerce');

//db.brands.find()
db.products.aggregate([

   // row count pipeline     
   // {$count: 'total'}

   //ascending and descending
   // {$sort:{title:1}}

   //limit
   // {$limit:3}

   // {$match: {// remark:"new"// price{$gt:400}// case sensitive title:/Ap/ }},

   // {$project: {   _id:0,title:1,price:1 }}

   //skip and limit
   // {$skip:3},
   // {$limit:2}

   //grouping data
   //  {$group: {_id: "$title"//after group,can do avg,max,min,each and every thing}}

   //relation ship 
   // {$lookup: {from: 'brands',localField:'brandID',foreignField:'_id',as:'my_brands'}},

   /*{$lookup: {
     from: 'catagories',
     localField: 'categoryID',
     foreignField: '_id',
     as: 'my_categories'
   }},*/


   //projection
   //{$project: {_id: 0,title: "$title",price: "$price",brand_name: { $first: "$my_brands.brandName" },cat_name: { $first: "$my_categories.categoryName" }  // Use $first to get the first category name}},

  //group stage handle the array
  {$project:{_id:0,tittle:'$title',price:'$price',brand_name:{$arrayElemAt:['$my_brands.brandName',0]},cat_name:{$arrayElemAt:['$my_categories.categoryName',0]}}},
  
  //sorting this projection
  {
    $sort:{
      price:1
    }
  }

]);



