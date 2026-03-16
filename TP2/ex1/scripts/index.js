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

"use strict"; // Cours 1 : "use strict" pour de meilleurs messages d'erreur

// Événement initial : on attend que le DOM soit prêt (Cours 1)
document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // EXERCICE 5 : DÉPLACEMENT DES CADRES
    // ==========================================
    
    // Déclaration locale avec 'const' privilégié (Cours 2)
    const trajetTotal = {
        "cadre1": { x: 1, y: 1 },
        "cadre2": { x: 1, y: 1 },
        "cadre3": { x: 1, y: 1 },
        "cadre4": { x: 1, y: 1 }
    };

    // Déclaration de la fonction à l'intérieur pour profiter de la Clôture (Cours 3)
    function move_img(event) {
        // Test fort === (Cours 2)
        if (event.buttons === 1) {
            // event.target est l'élément DOM concerné (Cours 1)
            const element = event.target;
            const id = element.id;
            const dx = event.movementX;
            const dy = event.movementY;

            if (trajetTotal[id]) {
                trajetTotal[id].x += dx;
                trajetTotal[id].y += dy;
                // Manipulation du style css (Cours 1)
                element.style.left = trajetTotal[id].x + "px";
                element.style.top = trajetTotal[id].y + "px";
            }
        }
    }

    // Association en javascript via querySelectorAll (Cours 1)
    const cadres = document.querySelectorAll('aside div[id^="cadre"]');
    // Itération forEach (Cours 2)
    cadres.forEach(div => {
        div.addEventListener("mousemove", move_img);
    });


    // ==========================================
    // EXERCICE 6 : ÉCHANGE DES IMAGES
    // ==========================================
    
    // Cette variable n'est plus globale ! Elle est protégée dans la clôture (Cours 3)
    let premiereImageSelectionnee = null;

    const checkboxEchange = document.getElementById("echange");
    
    // Arrow function pour une callback simple définie à la volée (Cours 3)
    checkboxEchange.addEventListener("change", (event) => {
        // Opérateur logique && vu comme un court-circuit, et test fort !== (Cours 2)
        if (!event.target.checked && premiereImageSelectionnee !== null) {
            premiereImageSelectionnee.style.outline = "none";
            premiereImageSelectionnee = null;
        }
    });

    // Fonction d'échange (aussi protégée dans la clôture)
    function echange_images(event) {
        if (!checkboxEchange.checked) return;

        // On utilise event.target selon le Cours 1
        const elementClique = event.target; 
        
        if (elementClique.tagName !== "IMG") return;

        if (premiereImageSelectionnee === null) {
            premiereImageSelectionnee = elementClique;
            premiereImageSelectionnee.style.outline = "4px solid #007AFF";
        } 
        else if (premiereImageSelectionnee === elementClique) {
            premiereImageSelectionnee.style.outline = "none";
            premiereImageSelectionnee = null;
        }
        else {
            const a = premiereImageSelectionnee;
            const b = elementClique;
            
            // Remonter/descendre dans le DOM (Cours 2)
            const parent = a.parentNode;
            const nextA = a.nextSibling;
            const nextB = b.nextSibling;

            // Tests forts === (Cours 2)
            if (nextA === b) {
                parent.insertBefore(b, a);
            } else if (nextB === a) {
                parent.insertBefore(a, b);
            } else {
                parent.insertBefore(a, b);
                parent.insertBefore(b, nextA);
            }

            a.style.outline = "none";
            premiereImageSelectionnee = null;
            checkboxEchange.checked = false;
        }
    }

    const imagesAlbum = document.querySelectorAll(".album img");
    imagesAlbum.forEach(img => {
        img.addEventListener("click", echange_images);
    });
});