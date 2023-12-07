const generateform = document.querySelectorAll(".generate-form")[0];
console.log(generateform)
const imagecards = document.querySelectorAll(".img-card");
const loginEle = document.getElementById("login");
const logoutEle = document.getElementById("logout")
const prev=document.querySelector(".prev");
const next=document.querySelector(".next");
const page=document.querySelector(".page-num");
const paginationdiv = document.querySelectorAll(".pagination")[0]
// pagination
const maxItem=8;
let index=1;
const API_KEY = ''
//const client = createClient(API_KEY);
generateform.addEventListener("submit",(e) =>{
    e.preventDefault();
    index=1;
    const usersearchtext = e.srcElement[0].value;
    const numberofimages = parseInt(e.srcElement[1].value);
    const imgquantity = document.querySelectorAll(".img-quantity")[0];
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
    handleimagegeneration(usersearchtext,numberofimages)

})

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
const handleimagegeneration = function(usersearchtext,numberofimages){
    try {
   fetch( `https://api.pexels.com/v1/search?query=${usersearchtext}?per_page=${10}`,{
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

