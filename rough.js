class ImageGeneration{
    constructor(formEle){
        this.formEle = formEle
        this.maxItem = 8
        this.index = 1
        this.API_key = ''
    }

    showSearches(){
        console.log("hello")
        const searchData = JSON.parse(localStorage.getItem("searchhistory"))
        if(searchData != null && searchhistory.classList.contains("hide")){
            this.showsearchlist(searchData)  
        }  
    }
    showsearchlist(searchData){
        console.log("in searches")
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
        if (this.formValidation(usersearchtext)){
            this.saveinlocalstorage(usersearchtext)
            // pagination API returns 15 images per request. Displaying in the form of pagination.
            if (numberofimages == 0){
                for(let i=0;i < imagecards.length;i++){
                    imagecards[i].classList.add('img-card')
                    imagecards[i].classList.remove('hide-img');
                    let imgcard =imagecards[i].getElementsByTagName("img")[0]
                    imgcard.setAttribute("src", 'images/loading-bar.png') 
                    imagecards[i].classList.add("loading")
                }
                this.checkfunc()
                this.showfunc()
                this.paginationfunc()
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
    formValidation(str){
        console.log(str)
        const result = /^[A-Za-z]+$/.test(str)
        if (result == false){
            document.querySelectorAll(".error")[0].classList.remove("hide")
            document.querySelectorAll(".error")[0].innerHTML = "No numbers or special characters allowed in search";
            return false
        }
        document.querySelectorAll(".error")[0].classList.add("hide")
        return true ;
    }
    saveinlocalstorage(usersearchtext){
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
    checkfunc(){
        console.log('checking',next)
        const pagination=Math.ceil(imagecards.length/this.maxItem);
        if(this.index>=pagination){
            next.classList.add("disabled");
        }
        else{
        next.classList.remove("disabled");	
        }

        if(this.index<=1){
            prev.classList.add("disabled");
        }
        else{
        prev.classList.remove("disabled");	
        }
    }
    showfunc(){
        for (let i = 0 ;i < imagecards.length; i++){
            imagecards[i].classList.remove("show");
            imagecards[i].classList.remove("img-card");
            imagecards[i].classList.add("hide-img");
            if(i>=(this.index*this.maxItem)-this.maxItem && i<this.index*this.maxItem){
                imagecards[i].classList.remove("hide-img");
                imagecards[i].classList.add("img-card");
                imagecards[i].classList.add("show");
            }
           
        }
        page.innerHTML=this.index;
    }
    paginationfunc(){
        paginationdiv.classList.remove("hide-img")
        prev.addEventListener("click",function(){
            this.index = 1;
            this.checkfunc();
            this.showfunc();
        })
        next.addEventListener("click",function(){
            this.index = 2;
            console.log("hello")
            this.checkfunc();
            this.showfunc();  
        })
    }
    
    
    handleimagegeneration(usersearchtext){
        console.log("handlinf")
        console.log(this.API_key)
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
const generateform = document.querySelectorAll(".generate-form")[0];
const inputfield = document.getElementsByTagName("input")[0];
const searchhistory = document.querySelectorAll(".searchhistoryList")[0]
const imagecards = document.querySelectorAll(".img-card");
const prev=document.querySelector(".prev");
const next=document.querySelector(".next");
const page=document.querySelector(".page-num");
const paginationdiv = document.querySelectorAll(".pagination")[0]
const image_generation = new ImageGeneration(generateform)
inputfield.addEventListener("input",() =>{
    image_generation.showSearches()
})

generateform.addEventListener("submit",(e) =>{
    const event = e
    image_generation.generateImages(event)
})

