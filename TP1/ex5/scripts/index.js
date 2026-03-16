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
    const texte = input.value.toLowerCase();   // cours 01 : accès .value
    const ps = document.querySelectorAll("main section article p"); // cours 01 : querySelectorAll

    let trouve = false;

    ps.forEach(p => {                          // cours 02 : .forEach
        const contenu = p.textContent.toLowerCase();

        if (texte !== "" && contenu.includes(texte)) {  // cours 02 : méthodes string
            p.classList.add("match");                  // cours 02 : classList.add
            trouve = true;
        } else {
            p.classList.remove("match");               // cours 02 : classList.remove
        }
        console.log("texte recherche : " + p.textContent);
    });

    // cours 01 : validité + setCustomValidity + reportValidity
    if (texte !== "" && !trouve) {
        input.setCustomValidity("Aucun paragraphe ne contient ce texte");
    } else {
        input.setCustomValidity("");
    }

    input.reportValidity(); // cours 01
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

            // On reconstruit la chaîne avec des <span class="match"> autour des hits
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
            // On remet le texte propre, sans span
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

// Exercice 5
// On attend que le DOM soit chargé
document.addEventListener("DOMContentLoaded", () => {

    // Structure pour mémoriser le déplacement total (x, y) de chaque div par son ID
    // On initialise à 1 pour correspondre au 1px du CSS
    const trajetTotal = {
        "cadre1": { x: 1, y: 1 },
        "cadre2": { x: 1, y: 1 },
        "cadre3": { x: 1, y: 1 },
        "cadre4": { x: 1, y: 1 }
    };

    /**
     * Callback associée à l'événement mousemove
     * @param {MouseEvent} event 
     */
    function move_img(event) {
        // 1. Contrôler que le bouton gauche est enfoncé
        // .buttons retourne un champ de bits (1 = bouton gauche)
        if (event.buttons === 1) {
            
            // 2. Récupérer l'élément (ou son id) via .target
            const element = event.target;
            const id = element.id;

            // 3. Déterminer quel déplacement s'est produit via .movementX/Y
            const dx = event.movementX;
            const dy = event.movementY;

            // 4. Mettre à jour le déplacement total depuis le chargement
            // On vérifie que l'id existe dans notre structure pour éviter les erreurs
            if (trajetTotal[id]) {
                trajetTotal[id].x += dx;
                trajetTotal[id].y += dy;

                // 5. Mettre à jour les valeurs CSS .style.left et .style.top
                element.style.left = trajetTotal[id].x + "px";
                element.style.top = trajetTotal[id].y + "px";

                // Petit log pour vérifier que ça bouge bien
                console.log(`Déplacement de ${id} : x=${trajetTotal[id].x}, y=${trajetTotal[id].y}`);
            }
        }
    }

    // Association de la callback à l'événement mousemove pour chaque div
    const cadres = document.querySelectorAll('aside div[id^="cadre"]');
    cadres.forEach(div => {
        div.addEventListener("mousemove", move_img);
    });
});