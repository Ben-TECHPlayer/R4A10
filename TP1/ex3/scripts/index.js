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
    let input = span.querySelector("input");
    let table = document.querySelector("table tbody");

    let tr = document.createElement("tr");
    table.appendChild(tr);

    input.forEach((i) => {
        let textNode = document.createTextNode(i.value);
        let caseTab = document.createElement("tr td");
        caseTab.style.backgroundColor = i.value;
        caseTab.appendChild(textNode);
        table.appendChild(caseTab);
    })
    console.log()
}