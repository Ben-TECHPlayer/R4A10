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

