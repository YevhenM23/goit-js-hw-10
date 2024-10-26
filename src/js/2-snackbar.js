import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");

form.addEventListener("submit", handleSubmit);


function handleSubmit(e) {
    e.preventDefault();
    
    const delay = Number(form.delay.value);
    const selectedState = form.state.value;
    
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (selectedState === "fulfilled") {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
    })
       
            
    promise        
    .then((delay) => {
        iziToast.success({
                    message: `Fulfilled promise in ${delay} ms`,
                    position: 'topRight',
                });
    })
    .catch((delay) => {
        iziToast.error({
                    message: `Rejected promise in ${delay} ms`,
                    position: 'topRight',
                });
    });

    form.delay.value = "";
}


    