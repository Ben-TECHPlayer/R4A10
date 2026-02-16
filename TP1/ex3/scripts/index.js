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

function ajouter_deux_couleurs(){
    let span = document.querySelector("span");
    let inputs = span.querySelectorAll("input");
    let table = document.querySelector("table tbody");

    let tr = document.createElement("tr");

    for (let i = 0; i < inputs.length; i++) {
        let td = document.createElement("td");
        td.innerText = inputs[i].value;
        td.style.backgroundColor = inputs[i].value;
        tr.appendChild(td);
    }
    table.appendChild(tr);
}