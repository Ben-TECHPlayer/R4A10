// function rajoute_un_clic(){
//     const hello = document.getElementById("hello");
//     if (hello.innerText === "Hello !"){
//         alert("welcome !");
//         hello.innerText = "welcome !";
//     } else {
//         alert("on s'est deja vu !");
//         //hello.innerText = "Hello !";
//     }
// }

// function rajoute_un_clic_alt(that){
//     if (that.innerText === "Hello !"){
//         alert("welcome !");
//         that.innerText = "welcome !";
//     } else {
//         alert("on s'est deja vu !");
//     }
// }

document.addEventListener("DOMContentLoaded", (event) => {
    document.querySelector("table").addEventListener('click', change_couleur);
});

function change_couleur(event){
    let couleur = event.target;
    couleur.innerText = "";
    let listeParagraphes = document.querySelectorAll("p");
    listeParagraphes.forEach((couleur) => {
        couleur.style.color = this;
    })
}