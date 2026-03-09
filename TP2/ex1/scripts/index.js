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
function cherche_dans_paragraphes_de_main(input) {
    const texte = input.value.toLowerCase(); 
    const ps = document.querySelectorAll("main section article p"); 

    let trouve = false;

    ps.forEach(p => {                        
        const contenu = p.textContent.toLowerCase();

        if (texte !== "" && contenu.includes(texte)) { 
            p.classList.add("match");
            trouve = true;
        } else {
            p.classList.remove("match");
        }
        console.log("texte recherche : " + p.textContent);
    });

    if (texte !== "" && !trouve) {
        input.setCustomValidity("Aucun paragraphe ne contient ce texte");
    } else {
        input.setCustomValidity("");
    }

    input.reportValidity();
}

// Question 3 de l'ex 4
document.addEventListener("DOMContentLoaded", function () {
    const ps = document.querySelectorAll("main section article p");

    ps.forEach(p => {
        p.setAttribute("data-text_orig", p.textContent);
    });
});

function cherche_dans_paragraphes_de_main_v2(input) {
    const texte = input.value.toLowerCase();
    const ps = document.querySelectorAll("main section article p");

    let trouve = false;

    ps.forEach(p => {
        const original = p.getAttribute("data-text_orig") || p.textContent;
        const originalMin = original.toLowerCase();

        if (texte !== "" && originalMin.includes(texte)) {

            let resultat = "";
            let debut = 0;
            let pos = originalMin.indexOf(texte);

            while (pos !== -1) {
                resultat += original.substring(debut, pos)
                         + '<span class="match">'
                         + original.substring(pos, pos + texte.length)
                         + '</span>';
                debut = pos + texte.length;
                pos = originalMin.indexOf(texte, debut);
            }
            resultat += original.substring(debut);

            p.innerHTML = resultat;
            trouve = true;

        } else {
            p.textContent = original;
        }
    });

    if (texte !== "" && !trouve) {
        input.setCustomValidity("Aucun paragraphe ne contient ce texte");
    } else {
        input.setCustomValidity("");
    }

    input.reportValidity();
}

// Question 2 de l'ex 5
document.addEventListener("DOMContentLoaded", function () {
    function move_img(){

    }
});

document.addEventListener("DOMContentLoaded", (event) => {
    function mousemove(){
        let element = event.target;
    }
});

function echange_images(){
    let element = event.target;
    if(clicked){
        element.style.borderColor = "#007AFF";
    }
}