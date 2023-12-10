class ImageGenerator{
    constructor(formEle){
        this.formEle = formEle
        this.maxItem = 8
        this.index = 1
        this.API_key = ''
    }
    generateImages(e){
        e.preventDefault();
        //hiding search history
        searchhistory.classList.add("hide")
        searchhistory.innerHTML = ""
        this.index=1;
        // getting user search text
        const usersearchtext = e.srcElement[0].value;
        const numberofimages = parseInt(e.srcElement[1].value);
        const imgquantity = document.querySelectorAll(".img-quantity")[0];
        //  Form validation
        if (Form.formValidation(usersearchtext)){
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
        this.handleimagegeneration(usersearchtext)
        }  

    }
  
    handleimagegeneration(usersearchtext){
        try {
            fetch( `https://api.pexels.com/v1/search?query=${usersearchtext}?per_page=${10}`,{
                 headers:{
                     Authorization:this.API_key
                 }
            })
              .then(resp =>{
                 return resp.json()
              })
              .then(data =>{
                 this.updateimages(data.photos);
              })
             } catch(error){
                  console.log('did not work', error)
             }
    }
    updateimages(images){
        for(let i = 0; i < imagecards.length;i++ ){
            let imgcard =imagecards[i].getElementsByTagName("img")[0]
            imagecards[i].classList.remove("loading")
            imgcard.setAttribute("src",images[i].src.tiny)   
    }
    }
}
class Form {
    static  formValidation (str){
        const result = /^[A-Za-z\s]*$/.test(str)
        if (result == false){
            document.querySelectorAll(".error")[0].classList.remove("hide")
            document.querySelectorAll(".error")[0].innerHTML = "No numbers or special characters allowed in search";
            return false
        }
        document.querySelectorAll(".error")[0].classList.add("hide")
        return true ;
    }
}
const generateform = document.querySelectorAll(".generate-form")[0];
const inputfield = document.getElementsByTagName("input")[0];
const searchhistory = document.querySelectorAll(".searchhistoryList")[0]
const imagecards = document.querySelectorAll(".img-card");
const prev=document.querySelector(".prev");
const next=document.querySelector(".next");
const page=document.querySelector(".page-num");
const paginationdiv = document.querySelectorAll(".pagination")[0]
const image_generation = new ImageGenerator(generateform)
const showSearches = function(){
    const searchData = JSON.parse(localStorage.getItem("searchhistory"))
    if(searchData != null && searchhistory.classList.contains("hide")){
        showsearchlist(searchData)  
    }  
}

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

const saveinlocalstorage = function(usersearchtext){
    let searcharray = []
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
const checkfunc = function(){
    const pagination=Math.ceil(imagecards.length/this.maxItem);
    if(image_generation.index>=pagination){
        next.classList.add("disabled");
    }
    else{
    next.classList.remove("disabled");	
    }

    if(image_generation.index<=1){
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
        if(i>=(image_generation.index*image_generation.maxItem)-image_generation.maxItem && i<image_generation.index*image_generation.maxItem){
            imagecards[i].classList.remove("hide-img");
            imagecards[i].classList.add("img-card");
            imagecards[i].classList.add("show");
        }
       
    }
    page.innerHTML=image_generation.index;
}
const paginationfunc = function(){
    paginationdiv.classList.remove("hide-img")
    prev.addEventListener("click",function(){
        image_generation.index = 1;
        checkfunc();
        showfunc();
    })
    next.addEventListener("click",function(){
        image_generation.index = 2;
        console.log("hello")
        checkfunc();
        showfunc();  
    })
}
inputfield.addEventListener("input",() =>{
    showSearches()
});
generateform.addEventListener("submit",(e) =>{
    const event = e
    image_generation.generateImages(event)
})

