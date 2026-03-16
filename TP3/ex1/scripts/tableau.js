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

    // ==========================================
    // EXERCICE 2 : Transformation Mobile/Desktop
    // ==========================================

    // 1. Définir une variable contenu initialisée avec un objet vide
    let contenu = {};

    function extraire_donnees() {
        // On s'assure de repartir d'un objet propre
        contenu = {};

        // 3. Initialiser l'attribut colonnes avec une liste (tableau) vide
        contenu.colonnes = [];

        const thead_lignes = document.querySelector("thead").children;
        const cases_en_tete = thead_lignes[1].querySelectorAll("th");

        // 4 & 5. Extraire les .innerText et les ajouter à la liste
        cases_en_tete.forEach( (th) => {
            let texte = th.innerText.trim(); 
            if (texte !== "") {
                contenu.colonnes.push(texte); 
            }
        });

        // 7. Définir un attribut .lignes (liste de listes)
        contenu.lignes = [];

        // 8. Sélecteur pour les lignes de tbody
        const lignes_tbody = document.querySelectorAll("tbody tr");

        // 9. Itérer sur les lignes pour extraire les notes
        lignes_tbody.forEach( (tr) => {
            let liste_notes = [];
            
            // On sélectionne uniquement les <td> pour ignorer le <th> qui contient le nom du magicien
            const cases_notes = tr.querySelectorAll("td");
            
            cases_notes.forEach( (td) => {
                liste_notes.push(td.innerText.trim());
            });

            // On ajoute la ligne de notes à notre grand tableau
            contenu.lignes.push(liste_notes);
        });

        // 6. Petit contrôle dans la console !
        console.log("Modèle extrait du tableau :", contenu);
    }

    // On exécute l'extraction tout de suite pour avoir nos données prêtes
    extraire_donnees();

    // -- Préparation des boutons (les fonctions de transformation viendront ensuite) --
    const btnMobile = document.getElementById("btn_mobile");
    const btnDesktop = document.getElementById("btn_desktop");

    function table_to_mobile() {
        // 1. On attrape le nœud correspondant au tableau
        const table = document.querySelector("table");

        // 2. Vider complètement le tableau
        // Cours 2 (while) et Cours 1 (removeChild et firstChild)
        while (table.firstChild) {
            table.removeChild(table.firstChild);
        }
        
        // Petit test visuel dans la console pour confirmer que c'est vide
        console.log("Le tableau a été vidé !");

        // ==========================================
        // 3. Reconstruction du thead (Vue 2 colonnes)
        // ==========================================
        
        // Étape A : Création des éléments (balises vides)
        let nouveau_thead = document.createElement("thead");
        let ligne_en_tete = document.createElement("tr");
        
        let case_discipline = document.createElement("th");
        let case_note = document.createElement("th");

        // Étape B : Création des nœuds de texte
        let texte_discipline = document.createTextNode("Discipline");
        let texte_note = document.createTextNode("Note");

        // Étape C : Assemblage (de l'enfant vers le parent)
        // On met le texte dans les <th>
        case_discipline.appendChild(texte_discipline);
        case_note.appendChild(texte_note);

        // On met les <th> dans le <tr>
        ligne_en_tete.appendChild(case_discipline);
        ligne_en_tete.appendChild(case_note);

        // On met le <tr> dans le <thead>
        nouveau_thead.appendChild(ligne_en_tete);

        // Étape D : Ajout final au DOM (dans le <table>)
        table.appendChild(nouveau_thead);

        // ... (Suite de table_to_mobile) ...

        // ==========================================
        // 4. Reconstruction du tbody (Vue 2 colonnes)
        // ==========================================

        // On crée le nouveau corps du tableau en mémoire
        let nouveau_tbody = document.createElement("tbody");

        // 1. Parcourir contenu.lignes (chaque élément est la liste des notes d'un magicien)
        // On utilise 'idx_ligne' pour gérer l'alternance des couleurs
        contenu.lignes.forEach((liste_notes, idx_ligne) => {
            
            // Si l'index de la ligne est impair, on appliquera le filtre
            let appliquer_filtre = (idx_ligne % 2 !== 0);

            // 2. Boucle imbriquée : parcourir contenu.colonnes
            contenu.colonnes.forEach((nom_discipline, idx_colonne) => {
                
                // On récupère la note qui correspond à cette discipline pour ce magicien
                let la_note = liste_notes[idx_colonne];

                // 3. Création des éléments pour la nouvelle ligne (2 cases)
                let tr = document.createElement("tr");
                let td_discipline = document.createElement("td");
                let td_note = document.createElement("td");

                // Création des noeuds de texte
                let texte_discipline = document.createTextNode(nom_discipline);
                let texte_note = document.createTextNode(la_note);

                // Assemblage (Textes -> Cases)
                td_discipline.appendChild(texte_discipline);
                td_note.appendChild(texte_note);

                // Assemblage (Cases -> Ligne)
                tr.appendChild(td_discipline);
                tr.appendChild(td_note);

                // Alternance du fond pour aider la lecture (Consigne de l'Ex 2)
                if (appliquer_filtre) {
                    // Modification directe du style (Cours 1)
                    tr.style.filter = "invert(0.1)"; 
                }

                // 4. Assemblage final (Ligne -> Tbody)
                nouveau_tbody.appendChild(tr);
            });
        });

        // 5. Attacher le tbody complet au tableau
        table.appendChild(nouveau_tbody);
    }

    btnMobile.addEventListener("click", () => {
        console.log("Clic sur Vue Mobile - À implémenter");
        table_to_mobile();
    });

    function table_to_desktop() {
        // ==========================================
        // a) Extraction des données depuis la vue Mobile
        // ==========================================
        const table = document.querySelector("table");
        const tbody = table.querySelector("tbody");
        
        // Sécurité : si on est déjà en desktop ou que le tableau est vide
        if (!tbody) return;

        const NB_DISCIPLINES = 9;
        
        // On réinitialise notre modèle
        contenu = { colonnes: [], lignes: [] };
        
        // On récupère toutes les lignes (les <tr>) du tbody mobile
        const lignes_mobiles = tbody.children;

        // Phase 1 : Récupérer les noms des colonnes (les 9 premières lignes suffisent)
        for (let i = 0; i < NB_DISCIPLINES; i++) {
            // Le nom de la discipline est dans la 1ère case (indice 0) du <tr>
            let td_discipline = lignes_mobiles[i].children[0];
            contenu.colonnes.push(td_discipline.innerText);
        }

        // Phase 2 : Récupérer toutes les notes et les grouper par magicien
        let notes_du_magicien_courant = [];
        
        for (let i = 0; i < lignes_mobiles.length; i++) {
            // La note est dans la 2ème case (indice 1) du <tr>
            let td_note = lignes_mobiles[i].children[1];
            notes_du_magicien_courant.push(td_note.innerText);

            // Dès qu'on a récolté 9 notes, on a fini un magicien !
            // (i + 1) permet de compter de 1 à 9, 10 à 18, etc.
            if ((i + 1) % NB_DISCIPLINES === 0) {
                contenu.lignes.push(notes_du_magicien_courant);
                // On vide le tableau temporaire pour le magicien suivant
                notes_du_magicien_courant = []; 
            }
        }

        // ==========================================
        // b) Vider le tableau et reconstruire le thead
        // ==========================================
        
        // Vider complètement le tableau
        while (table.firstChild) {
            table.removeChild(table.firstChild);
        }

        // Création du thead
        let nouveau_thead = document.createElement("thead");
        let ligne_en_tete = document.createElement("tr");

        // On crée une case <th> pour chaque discipline stockée
        for (let i = 0; i < contenu.colonnes.length; i++) {
            let th = document.createElement("th");
            let texte = document.createTextNode(contenu.colonnes[i]);
            th.appendChild(texte);
            ligne_en_tete.appendChild(th);
        }
        nouveau_thead.appendChild(ligne_en_tete);
        table.appendChild(nouveau_thead);

        // ==========================================
        // c) Reconstruire le tbody manquant
        // ==========================================
        
        let nouveau_tbody = document.createElement("tbody");

        // On parcourt nos lignes (les magiciens)
        for (let i = 0; i < contenu.lignes.length; i++) {
            let tr = document.createElement("tr");
            let liste_notes = contenu.lignes[i];

            // On parcourt les notes de ce magicien
            for (let j = 0; j < liste_notes.length; j++) {
                let td = document.createElement("td");
                let texte = document.createTextNode(liste_notes[j]);
                
                td.appendChild(texte);
                tr.appendChild(td);
            }
            nouveau_tbody.appendChild(tr);
        }

        table.appendChild(nouveau_tbody);
    }

    btnDesktop.addEventListener("click", () => {
        console.log("Clic sur Vue Bureau - À implémenter");
        table_to_desktop();
    });

    // ==========================================
    // EXERCICE TRI : QUESTION 2
    // ==========================================

    // 1. Définition de la callback
    function trier(event) {
        // ==========================================
        // a) Récupérer le tableau
        // ==========================================
        // Si vous avez ajouté id="mon_tableau" à votre balise <table> :
        // let el_table = document.getElementById("mon_tableau");
        // Sinon, on peut rester sur un querySelector :
        let el_table = document.querySelector("table");

        // ==========================================
        // b) Mémoriser le contenu de chaque ligne
        // ==========================================
        let elements_lignes_dom = el_table.querySelectorAll("tbody tr");
        let lignes = [];

        // On parcourt les lignes du DOM pour extraire le texte de chaque case
        for (let i = 0; i < elements_lignes_dom.length; i++) {
            let cases_dom = elements_lignes_dom[i].children; // Les td/th de la ligne
            let contenu_ligne = [];
            
            for (let j = 0; j < cases_dom.length; j++) {
                contenu_ligne.push(cases_dom[j].innerText.trim());
            }
            // On ajoute ce tableau de textes à notre grand tableau 'lignes'
            lignes.push(contenu_ligne);
        }

        // ==========================================
        // c) Déterminer la direction et la colonne
        // ==========================================
        
        // Direction : vrai si c'est la flèche 'asc' (vers le bas)
        let est_ascendant = event.target.classList.contains("asc");

        // Colonne : Remonter dans le DOM pour trouver l'indice
        let element_clique = event.target;           // La flèche <span>
        
        // Selon comment vous avez imbriqué vos spans, le parent est le <th> (ou le <div> puis le <th>)
        let case_entete = element_clique.parentNode; 
        while (case_entete.tagName !== "TH" && case_entete.tagName !== "TD") {
            case_entete = case_entete.parentNode;
        }
        
        let ligne_entete = case_entete.parentNode;   // Le <tr> qui contient les en-têtes

        

        // On compte parmi les enfants du <tr> pour trouver l'indice
        let col_idx = 0;
        let enfants_tr = ligne_entete.children;
        for (let i = 0; i < enfants_tr.length; i++) {
            if (enfants_tr[i] === case_entete) {
                col_idx = i;
                break; // On a trouvé l'indice, on arrête de compter
            }
        }

        // ==========================================
        // d) Trier les données extraites
        // ==========================================
        lignes.sort((l_a, l_b) => {
            // On récupère les valeurs à comparer
            let val_a = l_a[col_idx];
            let val_b = l_b[col_idx];

            // Astuce : On essaie de les convertir en nombre avec Number.parseInt() (Cours 1)
            // Sinon, trier "12" et "5" en texte dirait que "12" est plus petit que "5" !
            let num_a = Number.parseInt(val_a);
            let num_b = Number.parseInt(val_b);

            // Si la conversion réussit, on compare les nombres. Sinon, on compare les textes (ex: noms des magiciens)
            if (!isNaN(num_a) && !isNaN(num_b)) {
                val_a = num_a;
                val_b = num_b;
            }

            // Logique de réponse de la callback (-1, 0, 1)
            let reponse = 0;
            if (val_a < val_b) {
                reponse = -1; // val_a va AVANT val_b
            } else if (val_a > val_b) {
                reponse = 1;  // val_a va APRÈS val_b
            }

            // Inversion de la réponse si la direction voulue est descendante
            if (!est_ascendant) {
                reponse = reponse * -1;
            }

            return reponse;
        });

        // ==========================================
        // e) Mettre à jour le tableau HTML
        // ==========================================
        for (let i = 0; i < elements_lignes_dom.length; i++) {
            let cases_dom = elements_lignes_dom[i].children;
            
            for (let j = 0; j < cases_dom.length; j++) {
                // On remplace l'ancien texte par celui de notre tableau fraîchement trié
                cases_dom[j].innerText = lignes[i][j];
            }
        }
    }

    // 2. Utilisation de querySelectorAll avec les sélecteurs demandés combinés
    // La virgule dans le sélecteur CSS permet de cibler les deux classes en même temps
    const fleches_tri = document.querySelectorAll("table thead .asc, table thead .desc");

    // 3. Association de la callback à l'événement "click"
    fleches_tri.forEach( (fleche) => {
        fleche.addEventListener("click", trier);
    });

});

 const url = './notes_v1.php';
  fetch( 
      url 
  ).then(
      response => response.json()
  ).then(
      json => {
      document.getElementById("tableau_notes").innerText = json.name;
  });