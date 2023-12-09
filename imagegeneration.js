const generateform = document.querySelectorAll(".generate-form")[0];
const inputfield = document.getElementsByTagName("input")[0];
console.log(inputfield)
const searchhistory = document.querySelectorAll(".searchhistoryList")[0]
const imagecards = document.querySelectorAll(".img-card");
const prev=document.querySelector(".prev");
const next=document.querySelector(".next");
const page=document.querySelector(".page-num");
const paginationdiv = document.querySelectorAll(".pagination")[0]
const maxItem=8;
let index=1;
const API_KEY = ''
inputfield.addEventListener("input",() =>{
    const searchData = JSON.parse(localStorage.getItem("searchhistory"))
    console.log(searchData)
    if(searchData != null && searchhistory.classList.contains("hide")){
        showsearchlist(searchData)  
    }  
})


const showsearchlist = function(searchData){
    searchhistory.classList.remove("hide")
    searchData.forEach(element => {
        const lielement = document.createElement('li');
        lielement.innerHTML = element;
        const spanelement = document.createElement("span")
        spanelement.classList.add("icon")
        const iconelement = document.createElement("i")
        iconelement.classList.add("fas")
        iconelement.classList.add("fa-trash")
        spanelement.appendChild(iconelement)
        lielement.appendChild(spanelement)
        searchhistory.appendChild(lielement)
        lielement.addEventListener("click",()=>{
            document.getElementById("textfield").value = element
        })
        spanelement.addEventListener("click",(e) =>{
            let index = searchData.indexOf(e.target.value)
            searchData.splice(index,1)
            localStorage.setItem("searchhistory",JSON.stringify(searchData))
            searchhistory.removeChild(lielement)
        })
    });
}
generateform.addEventListener("submit",(e) =>{
    e.preventDefault();
    searchhistory.classList.add("hide")
    searchhistory.innerHTML = ""
    index=1;
    const usersearchtext = e.srcElement[0].value;
    const numberofimages = parseInt(e.srcElement[1].value);
    const imgquantity = document.querySelectorAll(".img-quantity")[0];
    //  Form validation
    if (formValidation(usersearchtext)){
        saveinlocalstorage(usersearchtext)
        // pagination API returns 15 images per request. Displaying in the form of pagination.
        if (numberofimages == 0){
            for(let i=0;i < imagecards.length;i++){
                imagecards[i].classList.add('img-card')
                imagecards[i].classList.remove('hide-img');
                let imgcard =imagecards[i].getElementsByTagName("img")[0]
                imgcard.setAttribute("src", 'images/loading-bar.png') 
                imagecards[i].classList.add("loading")
            }
            checkfunc()
            showfunc()
            paginationfunc()
        }
        else{
        paginationdiv.classList.add("hide-img")
        for(let i=0;i < imagecards.length;i++){
                if (i < numberofimages){
                    imagecards[i].classList.add('img-card')
                    imagecards[i].classList.remove('hide-img');
                    let imgcard =imagecards[i].getElementsByTagName("img")[0]
                    imgcard.setAttribute("src", 'images/loading-bar.png') 
                    imagecards[i].classList.add("loading")
                    
                }
                else{
                    imagecards[i].classList.remove('img-card')
                    imagecards[i].classList.add('hide-img');
                    imagecards[i].classList.remove("show");
                }
            }
        
        }
    handleimagegeneration(usersearchtext)
    }  
})
const formValidation = function(str){
    const result = /^[A-Za-z]+$/.test(str)
    if (result == false){
        document.querySelectorAll(".error")[0].classList.remove("hide")
        document.querySelectorAll(".error")[0].innerHTML = "No numbers or special characters allowed in search";
        return false
    }
    document.querySelectorAll(".error")[0].classList.add("hide")
    return true ;
}
const saveinlocalstorage = function(usersearchtext) {
      const getlocaldata = localStorage.getItem("searchhistory")
      if(getlocaldata == null){
        searcharray = []
      }
      else{
        searcharray = JSON.parse(getlocaldata)
      }
      searcharray.push(usersearchtext)
      localStorage.setItem("searchhistory",JSON.stringify(searcharray))
      
      
}

const paginationfunc = function(){
    paginationdiv.classList.remove("hide-img")
    prev.addEventListener("click",function(){
        index = 1;
        console.log("index decre",index)
        checkfunc()
        showfunc();

    })
    next.addEventListener("click",function(){
        index = 2;
        console.log("index incre",index)
        checkfunc();
        showfunc();  
    })

}

const checkfunc = function(){
    const pagination=Math.ceil(imagecards.length/maxItem);
    if(index>=pagination){
        next.classList.add("disabled");
    }
    else{
    next.classList.remove("disabled");	
    }

    if(index<=1){
        prev.classList.add("disabled");
    }
    else{
    prev.classList.remove("disabled");	
    }
}

const showfunc = function(){
    for (let i = 0 ;i < imagecards.length; i++){
        imagecards[i].classList.remove("show");
        imagecards[i].classList.remove("img-card");
        imagecards[i].classList.add("hide-img");
        if(i>=(index*maxItem)-maxItem && i<index*maxItem){
            imagecards[i].classList.remove("hide-img");
            imagecards[i].classList.add("img-card");
            imagecards[i].classList.add("show");
        }
       
}
page.innerHTML=index;
                
}

// Creating API request to 
const handleimagegeneration = function(usersearchtext){
    try {
   fetch( `https://api.pexels.com/v1/search?query=${usersearchtext}?per_page=${15}`,{
        headers:{
            Authorization:API_KEY
        }
   })
     .then(resp =>{
        return resp.json()
     })
     .then(data =>{
        updateimages(data.photos);
     })
    } catch(error){
         console.log('did not work', error)
    }
}

const updateimages = function(images){
   
    for(let i = 0; i < imagecards.length;i++ ){
       
            let imgcard =imagecards[i].getElementsByTagName("img")[0]
            imagecards[i].classList.remove("loading")
            imgcard.setAttribute("src",images[i].src.tiny)
        
    }
 

} 

