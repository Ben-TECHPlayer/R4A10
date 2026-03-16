"use strict"; // Recommandé dans le Cours 1

document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // 1. Marquer les notes en dessous de 10
    // ==========================================
    
    // On récupère uniquement les <td> (les notes) situés dans le <tbody>
    const toutes_les_notes = document.querySelectorAll("tbody td");
    
    toutes_les_notes.forEach( (td) => {
        // Cours 1 : utilisation de Number.parseInt()
        let note = Number.parseInt(td.textContent);
        
        if (note < 10) {
            // Cours 1 : modification directe du style
            td.style.color = "red";
            td.style.fontWeight = "bold";
        }
    });

    // ==========================================
    // 2. Calcul des moyennes par colonne
    // ==========================================
    
    const lignes_tbody = document.querySelectorAll("tbody tr");
    let nb_eleves = lignes_tbody.length;
    
    // On initialise un tableau vide (Cours 2)
    let sommes = []; 

    lignes_tbody.forEach( (tr) => {
        // Pour chaque ligne, on récupère les cellules contenant les notes
        const notes_eleve = tr.querySelectorAll("td");
        
        // Cours 2 : forEach avec l'élément ET son indice
        notes_eleve.forEach( (td, idx) => {
            // Cours 2 : Si la case du tableau n'existe pas encore, elle vaut "undefined"
            if (sommes[idx] === undefined) {
                sommes[idx] = 0; 
            }
            // On ajoute la note à la somme de la colonne correspondante
            sommes[idx] = sommes[idx] + Number.parseInt(td.textContent);
        });
    });

    // On crée un tableau pour stocker les moyennes
    let moyennes = [];
    sommes.forEach( (somme, idx) => {
        moyennes[idx] = somme / nb_eleves;
    });

    // Affichage des moyennes dans la bonne ligne
    // Cours 2 : utilisation de .children pour naviguer dans le DOM
    const lignes_tfoot = document.querySelector("tfoot").children;
    
    // La ligne des moyennes est la première enfant (indice 0) du tfoot
    const tds_moyennes = lignes_tfoot[0].querySelectorAll("td");
    
    moyennes.forEach( (moyenne, idx) => {
        // On utilise toFixed(2) comme vous l'aviez judicieusement fait dans votre propre code
        tds_moyennes[idx].textContent = moyenne.toFixed(2);
    });

    // ==========================================
    // 3. Agrégations (regroupement des colonnes)
    // ==========================================
    
    // La ligne des agrégations est la deuxième enfant (indice 1) du tfoot
    const tds_agreg = lignes_tfoot[1].querySelectorAll("td");

    // D'après la structure HTML (colspan="2"), on fait la moyenne manuellement 
    // des colonnes qui vont ensemble
    
    // Psionisme (seul)
    tds_agreg[0].textContent = moyennes[0].toFixed(2);
    
    // Essence (colonnes 1 et 2)
    tds_agreg[1].textContent = ((moyennes[1] + moyennes[2]) / 2).toFixed(2);
    
    // Canalisation (colonnes 3 et 4)
    tds_agreg[2].textContent = ((moyennes[3] + moyennes[4]) / 2).toFixed(2);
    
    // Mentalisme (colonnes 5 et 6)
    tds_agreg[3].textContent = ((moyennes[5] + moyennes[6]) / 2).toFixed(2);
    
    // Hybridation (colonnes 7 et 8)
    tds_agreg[4].textContent = ((moyennes[7] + moyennes[8]) / 2).toFixed(2);

});