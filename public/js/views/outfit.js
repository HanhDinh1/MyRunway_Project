
const likedImage = document.querySelectorAll('.like-img');
console.log(likedImage);
const unlikedImage = document.querySelectorAll('.unlike-img');
const likedMe = document.querySelectorAll('.numOfLikes');

let isSending = false;
for(let i=0; i<unlikedImage.length; i++) {
unlikedImage[i].addEventListener('click', () =>{
    if(!isSending) {
        isSending = true;
        axios.post(`/like/${likedImage[i].dataset.userId}`)
        .then((response) =>{
            console.log(response);
        if(response.data.success) {
            like[i].textContent = response.data.totalLikes.likedMe;
        }
    unlikedImage[i].classList.add('hidden');
    likedImage[i].classList.remove('hidden');
    isSending = false;
        })
        .catch((error) => {
            isSending = false;
            console.log(error);
        })
    }
})
}

for(let i=0; i<likedImage.length; i++) {
    likedImage[i].addEventListener('click', () =>{
        if(!isSending) {
            isSending = true;
            axios.post(`/unlike/${unlikedImage[i].dataset.userId}`)
            .then((response) =>{
                console.log(response);
            if(response.data.success) {
                like[i].textContent = response.data.totalLikes.likedMe;
            }
        unlikedImage[i].classList.remove('hidden');
        likedImage[i].classList.add('hidden');
        isSending = false;
            })
            .catch((error) => {
                isSending = false;
                console.log(error);
            })
        }
    })
    }
