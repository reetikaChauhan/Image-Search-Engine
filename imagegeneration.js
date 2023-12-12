class ImageGenerator{
    constructor(formEle){
        this.formEle = formEle
        this.API_key = 'eXZJSOBCegwpEHDlocf1pUR4Ge7QIkf5a0O0PBTXEGIX7e9x34SfTvyR'
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
        if (formValidation(usersearchtext)){
            document.querySelectorAll(".error")[0].classList.add("hide")
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
                Paginator.checkfunc()
                Paginator.showfunc()
                Paginator.paginationfunc()
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
        this.handleimagegeneration(usersearchtext,this.API_key)
    } 
    else{
        document.querySelectorAll(".error")[0].classList.remove("hide")
        document.querySelectorAll(".error")[0].innerHTML = "No numbers or special characters allowed in search";
    }     

    }
  
    async handleimagegeneration(usersearchtext, API_key) {
        try {
          const response = await fetch(
            `https://api.pexels.com/v1/search?query=${usersearchtext}&per_page=${15}`,
            {
              headers: {
                Authorization: API_key,
              },
            }
          );
          const data = await response.json();
          this.updateimages(data.photos);
        } catch (error) {
          console.error('This is the error:', error.message);
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
class Paginator{
    static checkfunc(){
        if(index==2){
            next.classList.add("disabled");
        }
        else{
        next.classList.remove("disabled");	
        }
    
        if(index==1){
            prev.classList.add("disabled");
        }
        else{
        prev.classList.remove("disabled");	
        }
    }
    static showfunc (){
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
    static paginationfunc (){
        paginationdiv.classList.remove("hide-img")
        prev.addEventListener("click",function(){
            index = 1;
            Paginator.checkfunc();
            Paginator.showfunc();
        })
        next.addEventListener("click",function(){
            index = 2;
            Paginator.checkfunc();
            Paginator.showfunc();  
        })
    }
}

const generateform = document.querySelectorAll(".generate-form")[0];
const inputfield = document.getElementsByTagName("input")[0];
const searchhistory = document.querySelectorAll(".searchhistoryList")[0]
const imagecards = document.querySelectorAll(".img-card");
const prev=document.querySelector(".prev");
const next=document.querySelector(".next");
console.log(next)
const page=document.querySelector(".page-num");
const paginationdiv = document.querySelectorAll(".pagination")[0]
const image_generation = new ImageGenerator(generateform)
let index = 1
const maxItem = 8
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
const formValidation = function (str){
    return /^[A-Za-z\s]*$/.test(str) ;
}

const saveinlocalstorage = function(usersearchtext){
    let searcharray = []
    const getlocaldata = localStorage.getItem("searchhistory")
    if(getlocaldata == null){
        searcharray.push(usersearchtext)
    }
    else{
        searcharray = JSON.parse(getlocaldata)
        let index = searcharray.indexOf(usersearchtext)
        if (index == -1){
            searcharray.push(usersearchtext)
        }
    }
    
    localStorage.setItem("searchhistory",JSON.stringify(searcharray))
}



inputfield.addEventListener("input",() =>{
    showSearches()
});
generateform.addEventListener("submit",(e) =>{
    const event = e
    image_generation.generateImages(event)
})

