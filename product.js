async function products(){
    try{
        let response=await fetch('./dataset/electronics_products_data.json')
        let data=await response.json()
        return data
    }
    catch(error){
        console.error(error);
        
    }
}
async function products_six(){
    try{
        let response=await fetch('./dataset/electronics_products_data.json')
        let data=await response.json()
        return data.slice(1,6)
    }
    catch(error){
        console.error(error);
        
    }
}
async function filter_products(val){
    try{
        let response=await fetch('./dataset/electronics_products_data.json')
        let data=await response.json()
        let filtered_data=await data.filter((data)=>data.name.toLowerCase().includes(val.toLowerCase()) || data.subcategory.toLowerCase().includes(val.toLowerCase()))
        return filtered_data
    }
    catch(error){
        console.error(error);  
    }
}
async function filter_one_product(val){
    try{
        let response=await fetch('./dataset/electronics_products_data.json')
        let data=await response.json()
        let filtered_data=await data.filter((data)=>data.id==val)
        return filtered_data
    }
    catch(error){
        console.error(error);
        
    }
}
async function increase_product_stock(id,val){
    try{
        let response=await fetch('./dataset/electronics_products_data.json')
        let data=await response.json()
        let filtered_data=await data.find((data)=>data.id==id)
        let index=await data.indexOf(filtered_data)
        data[index]['stock']=data[index]['stock']+val
        return data[index]
    }
    catch(error){
        console.error(error);
        
    }
}
async function decrease_product_stock(id,val){
    try{
        let response=await fetch('./dataset/electronics_products_data.json')
        let data=await response.json()
        let filtered_data=await data.find((data)=>data.id==id)
        let index=await data.indexOf(filtered_data)
        data[index]['stock']=data[index]['stock']-val
        return data[index]
    }
    catch(error){
        console.error(error);
        
    }
}

export default products;
export {filter_products,products_six,filter_one_product,increase_product_stock,decrease_product_stock}