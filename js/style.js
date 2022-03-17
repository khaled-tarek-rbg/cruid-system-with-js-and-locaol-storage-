let count = document.querySelector(".count")
const productName = document.querySelector("#product-name");
const productPrice = document.querySelector("#product-price");
const productDesc = document.querySelector("#product-desc");
const product_category = document.querySelector("#select-category");
const addBtn = document.querySelector("button");
const tablebody = document.querySelector("#tbody")
let id;
let container = [];

window.addEventListener("load",()=>{
   productName.focus();

})


if(localStorage.getItem("products") != null) {
   container = JSON.parse(localStorage.getItem("products"));
   displayData(container);
} 


addBtn.addEventListener("click" , (e)=>{
   e.preventDefault();
   let product = {
      name : productName.value,
      price : productPrice.value,
      desc : productDesc.value,
      category : product_category.value,
   }
   if(addBtn.innerHTML == "Add Product"){
      if(productName.value == "" || productPrice.value == "" || productDesc.value ==""||product_category.value==""){
         alert("please enter something")
      }else if(validation() == true){
         container.push(product)
      }
      else{
         alert("enter right number")
      }
   }else{
      container[id] = product;
      addBtn.innerHTML = "Add Product";
   }
   localStorage.setItem("products" , JSON.stringify(container))
   console.log(container);
   displayData(container);
   clearData()
})


function clearData(){
   productName.value="";
   productPrice.value="";
   productDesc.value="";
   product_category.value=""
}

function displayData(arr){
   count.innerHTML = `you have ${container.length} products`
   let design = ``;
   arr.map((item , index)=>{
      console.log(item)
      design += `
      <tr>
      <td>${index}</td>
      <td>${item.name}</td>
      <td>${item.price}</td>
      <td>${item.desc}</td>
      <td>${item.category}</td>

      <td><button onclick = 'updateBtn(${index})' class = "btn btn-outline-warning " >update</button></td>
      <td><button onclick = 'deleteBtn(${index})' class ="btn btn-outline-danger ">Delete</button></td>
      </tr>
      `
   })
   tablebody.innerHTML = design;

   
}



function deleteBtn(x){
   if(confirm("Are you sure you want to delete") == true){

      container.splice(x , 1);
      localStorage.setItem("products" , JSON.stringify(container))
      displayData(container);
   }
}




function searchproduct(arrSearch ){
  
   let searchWord = document.getElementById("product-search");
   let design = ``;
   arrSearch.map((item , index)=>{
      if(item.name.toLowerCase().includes(searchWord.value.toLowerCase()) == true){
         design += `
         <tr class = 'text-center'>
         <td>${index}</td>
         <td>${item.name}</td>
         <td>${item.price}</td>
         <td>${item.desc}</td>
         <td>${item.category}</td>
         <td><button onclick = 'updateBtn(${index})'  class = "btn btn-outline-warning">update</button></td>
         <td><button onclick = 'deleteBtn(${index})' class ="btn btn-outline-danger">Delete</button></td>
         </tr>
         `
         
         
      }
   })
      tablebody.innerHTML = design;

}

function searchcategory(arr){
   let searchcategory = document.getElementById("category-search");
   let design = ``;
   arr.map((item , index)=>{
      if(item.category.includes(searchcategory.value)==true){
         design += `
         <tr class = 'text-center'>
         <td>${index}</td>
         <td>${item.name}</td>
         <td>${item.price}</td>
         <td>${item.desc}</td>
         <td>${item.category}</td>
         <td><button  onclick = 'updateBtn(${index})'  class = "btn btn-outline-warning">update</button></td>
         <td><button onclick = 'deleteBtn(${index})' class ="btn btn-outline-danger">Delete</button></td>
         </tr>
         `
      }
   })
   tablebody.innerHTML = design;

}


function updateBtn(index){
      productName.value = container[index].name;
      productPrice.value = container[index].price;
      productDesc.value = container[index].desc;
      addBtn.innerHTML = "update";
      id = index;
      scroll({
         top : 0,
         behavior : "smooth"
      })

}

//validation in any programming language is reg expression

//  /[abc]/ => or square brackets is OR
// [a-z0-9] any letter or any number
//[^a-z] anything not a-z

/*
  
هفهمك بالراحه
[0-3] range
[10-80]  digit 1 and range(0-8) and digit 0
(10|80) 10 or 80
i want user to start with patteren use ^
$ is the finish of my patteren
^web your first word must be web
^[A-Z]{3} starts with any 3 capital letters
^[A-Z]{3 , 5} starts from  3 to 5 capital letters
^012[0-9]{8}  orange
^01[0125][0-9]{8} any number in eg
^(002|01)[0125][0-9]{8}
^(002){0,1}01[0125][0-9]{8}
^(002)?01[0125][0-9]{8}
^002{0,1}[0125][0-9]{8} error kerly brackets will be a
ffect only on 2 =>it should starts ith 00 and 2 is optional
? zero or one
* zero or more
+ 1 or more
from(10 to 80) => خانه الاحاد من 0-9
خانه العشرات من 1-8

82 = is problem make it 1-7
فكر فى الخانات
/d digit = [0-9]
/D anything not number
/w [a-z0-9_]
/. anything
/80\$$
*/
// let x = "Ahaled"
// let regex = /[a-z]/gi
// console.log(regex.test(x))
// console.log(x.match(regex))

//all events click , dclick , mouse enter , mouse leave , mouse down , mouse up, mousemove
//keyup , keydown , keypress
//focus blur change
//load
//propagation=> bubbling by default child happen first then parent , capturing if i make it true and only parent willhappen (third parameter of addevent listener )


function validation(){
   let regex = /^[0-9]{1,}$/gm;
   if(regex.test(productPrice.value) == true ){
     return true;
   }else{
     return false;
   }
}

