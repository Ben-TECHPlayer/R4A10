document.addEventListener("DOMContentLoaded", (event) =>{
    let caseTd = document.querySelectorAll("tfoot tr td");
    let i = 0;
    caseTd.forEach(tr => {
        let title = tr.querySelector("th");
        if(title.innerHTML == "Moyenne"){
            let caseTdFooter = tr.querySelectorAll("td");
            caseTdFooter.forEach(td => {
                let somme = 0;
                tabMoy[i].forEach(j => {
                    somme += j;
                });
                let moyenne = somme / tabMoy[i].length;
                td.innerText = moyenne.toFixed(2);
                i++;
            })
        }
    })
});