 import fs from "fs";
 const getApi = async()=>{
    try{
     let response = await fetch('https://dummyjson.com/products');
    if(!response.ok){
        throw new Error("Failed to fetch the data");
    }

    let data =  await response.json();
    console.log(data);
    let products = data.products;
    let csv = "Title,Price,Brand,Product SKU,Reviews Comment\n";
    for (let product of products) {
      const title = product.title ?? "";
      const price = product.price ?? "";
      const brand = product.brand ?? "";
      const sku = product.sku ?? "";

      let reviews = "";
      if (Array.isArray(product.reviews)) {
        reviews = product.reviews
          .slice(0, 3)
          .map(r => r.comment)
          .join("|");
      }
      csv += `"${title}",${price},"${brand}","${sku}","${reviews}"\n`;
    }
    fs.writeFileSync("product.csv", csv);
    console.log("product.csv created successfully");
    
    

}catch(error){
     console.error("Error",error.message);
    }
}
getApi();