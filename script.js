const x=require("./script2.js")
console.log("hello")
console.log("Angelika")
console.log(x)
//functions

async function createNewFruit(e){
    e.preventDefault()
    console.log("hello")

    const data={name:e.target.fruitInput1.value}

    const options={
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
    }

    const resp=await fetch(`http://localhost:3000/fruits`,options)
    console.log(resp)

    if(resp.status==201){
        e.target.fruitInput1.value=""
        messageStatus.textContent="Fruit sucessfully created."

        setTimeout(()=>{
            messageStatus.textContent=""

        }, 4000)
    }
    else{
        e.target.fruitInput1.value=""
        messageStatus.textContent="This fruit already exists. Please input another fruit"
        setTimeout(()=>{
            messageStatus.textContent=""

        }, 4000)

    }
}

function extractFruit(e){
    e.preventDefault()
    console.log(e)
    console.log(e.target[0].value)
    //if(e.target.fruitInput.value){
    //addFruit(e.target.fruitInput.value)
    fetchfruitData(e.target.fruitInput.value)
    //}
    e.target.fruitInput.value=""
}

// function fetchfruitData(fruit){

//     //Promise-one way
//     fetch(`https://fruity-api.onrender.com/api/fruits/${fruit}`)
//     // .then((resp)=>resp.json())
//     .then(processResponse)
//     .then((data)=>{
//         addFruit(data)
//         console.log(data)})
//     .catch((e)=>console.log(e))



// }

async function fetchfruitData(fruit){

    //Promise-other way

    try{
           //const resp=await fetch(`https://fruity-api.onrender.com/api/fruits/${fruit}`)
           const resp=await fetch(`http://localhost:3000/fruits/${fruit}`)

        if(resp.ok){
            const data= await resp.json();
            addFruit(data)
        }else{
            throw "Error:http status code:"+resp.status
        }

    }
    catch(e){
            console.log(e)
    }



}

function processResponse(resp){
   // (resp)=>resp.json()

   if(resp.ok){
    return resp.json();
   }else{
    throw "Error:http status code:"+resp.status
   }

}



let cal=0;
let fruitCal={}
function addFruit(fruit){
    console.log(fruit)
    const li=document.createElement("li");
    li.textContent=fruit.name;
    li.addEventListener("click", removeFruit)
    fruitList.appendChild(li)
    fruitCal[fruit.name]=fruit.nutritions.calories;
    console.log(fruitCal)

    cal+=fruit.nutritions.calories
    fruitNutrition.textContent="Total calories:"+cal;
}

// function addFruit(fruit){
//     console.log(fruit)
//     const li=document.createElement("li");
//     li.textContent=fruit;
//     li.addEventListener("click", removeFruit)
//     fruitList.appendChild(li)
// }

function removeFruit(e){
   // e.target.textContent gives me the name of thje fruit to be deleted
   cal-=fruitCal[e.target.textContent]
   delete fruitCal[e.target.textContent]
   console.log(fruitCal)
   fruitNutrition.textContent="Total calories:"+cal;
    e.target.remove();
}

const createForm=document.querySelector("#create-form")
const fruitForm=document.querySelector("#inputSection form")
const fruitList=document.querySelector("#fruitSection ul")
const fruitNutrition=document.querySelector("#nutritionSection p")
const messageStatus=document.querySelector("#message")
console.log(fruitForm)

console.log(fetch("https://fruity-api.onrender.com/api/fruits/"))



fruitForm.addEventListener("submit", extractFruit)
createForm.addEventListener("submit", createNewFruit)
