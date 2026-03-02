// document.addEventListener("DOMContentLoaded", (event) => {
//     let table = document.querySelector("table")
//     table.addEventListener("click", change_couleur);

//     function change_couleur(event){
//         let couleurCliquee = event.target;
//         let couleur = couleurCliquee.innerText;

//         let listeParagraphes = document.querySelectorAll("aside p");
//         listeParagraphes.forEach((p) => {
//             p.style.color = couleur;
//         })
//         console.log("couleur_value : ", couleur);
//     }
// });


// function ajouter_deux_couleurs(){
//     let span = document.querySelector("span");
//     let inputs = span.querySelectorAll("input");
//     let table = document.querySelector("table tbody");

//     let tr = document.createElement("tr");

//     for (let i = 0; i < inputs.length; i++) {
//         let td = document.createElement("td");
//         td.innerText = inputs[i].value;
//         td.style.backgroundColor = inputs[i].value;
//         tr.appendChild(td);
//     }
//     table.appendChild(tr);
// }

// Question 5 de l'ex 3
document.querySelectorAll(".color-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        let couleur = btn.dataset.color;
        document.querySelectorAll("aside p").forEach(p => {
            p.style.color = couleur;
        });
    });
});

// Question 1 de l'ex 4
document.addEventListener("DOMContentLoaded", (event) => {
    // let input = document.querySelector("input");
    // input.addEventListener("keyup", cherche_dans_paragraphes_de_main);
    
});

function cherche_dans_paragraphes_de_main(that){
    //let texte = event.target;
    let texte = that.value;
    //console.log("texte recherche : " + texte)
    //let texteRecherche = document.getElementById("paragraph");
    let texteRecherche = document.querySelectorAll("main section article p");
    // listeParagraphes.innerHTML = texteRecherche.textContent;
    // texte = texte.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
    // let pattern = new RegExp(`${texte}`, "gi");
    texteRecherche.forEach((p) => {
        console.log("texte recherche : " + p.textContent);
    })
    //texteRecherche.innerHTML = texteRecherche.textContext.replace(pattern, match => `<mark>${match}</mark>`);
    //if(){    
        // listeParagraphes.forEach((p) => {
        //     p.style.color = "#0000FF";
        // })
    //}
    //console.log("texte recherché : " + texteRecherche);
}
