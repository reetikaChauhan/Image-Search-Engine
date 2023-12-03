//import { createClient } from 'pexels';
const generateform = document.querySelectorAll(".generate-form")[0];
console.log(generateform)
const imagecards = document.querySelectorAll(".img-card");

console.log(imagecards)

const API_KEY = ''
//const client = createClient(API_KEY);

generateform.addEventListener("submit",(e) =>{
    e.preventDefault();
    console.log("event ",e)
    const usersearchtext = e.srcElement[0].value;
    console.log("text",usersearchtext)
    const numberofimages = parseInt(e.srcElement[1].value);
    console.log('images number',numberofimages)
    console.log("i am working")
    const imgquantity = document.querySelectorAll(".img-quantity")[0];
    console.log(imgquantity.value);
    console.log(imagecards.length)
    for(let i=0;i < imagecards.length;i++){
            console.log(i)
            if (i < imgquantity.value){
                console.log(imagecards[i])
                imagecards[i].classList.add('img-card')
                imagecards[i].classList.remove('hide-img');
                let imgcard =imagecards[i].getElementsByTagName("img")[0]
                console.log(imgcard)
                imgcard.setAttribute("src", 'images/loading-bar.png') 
                imagecards[i].classList.add("loading")
                
            }
            else{
                console.log("helllll")
                imagecards[i].classList.remove('img-card')
                imagecards[i].classList.add('hide-img');
            }

    }
    handleimagegeneration(usersearchtext,numberofimages)
    


})

// Creating API request to 
const handleimagegeneration = function(usersearchtext,numberofimages){
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
        console.log('pictures',data.photos)
        updateimages(data.photos);
     })
    } catch(error){
         console.log('did not work', error)
    }
}

const updateimages = function(images){
    for(let i = 0; i < imagecards.length;i++ ){
        if(imagecards[i].classList.contains("img-card")){
            let imgcard =imagecards[i].getElementsByTagName("img")[0]
            imagecards[i].classList.remove("loading")
            imgcard.setAttribute("src",images[i].src.tiny)
        }

    }
} 
