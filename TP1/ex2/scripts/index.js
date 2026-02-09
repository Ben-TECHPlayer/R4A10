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
    let table = document.querySelector("table")
    table.addEventListener("click", change_couleur);

    function change_couleur(event){
        let couleurCliquee = event.target;
        let couleur = couleurCliquee.innerText;

        let listeParagraphes = document.querySelectorAll("aside p");
        listeParagraphes.forEach((p) => {
            p.style.color = couleur;
        })
        console.log("couleur_value : ", couleur);
    }
});

