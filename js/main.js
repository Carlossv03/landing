let ready = () => {
    console.log('Dom está listo')
}
let loaded = () => {
    var myform = document.getElementById('form')
    myform.addEventListener("submit", (eventSubmit) =>{eventSubmit.preventDefault();

    var emailElement = document.querySelector('.form-control-lg')
    var emailText = emailElement.value;
    if (emailText.length == 0){
        emailElement.focus()
    }
    emailElement.animate(
        [
            { transform: "translateX(0)" },
            { transform: "translateX(50px)" },
            { transform: "translateX(-50px)" },
            { transform: "translateX(0)" }
        ],
        {
            duration: 400,
            easing: "linear",
        }
    )

    }
    
)
    
}


window.addEventListener("DOMContentLoaded", ready)
window.addEventListener("load", loaded)

