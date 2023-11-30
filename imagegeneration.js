const generateform = document.querySelectorAll(".generate-form")[0];
console.log(generateform)
const numberofimages = document.querySelectorAll(".img-quantity");
console.log(numberofimages)
const imagecards = document.querySelectorAll(".img-card");
console.log(imagecards)
generateform.addEventListener("submit",(e) =>{
    e.preventDefault();
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


})