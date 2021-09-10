const inputNome = document.getElementById("input-nome");
const listaNomi = document.getElementById("listaNomi");
const comandoTx = document.getElementById("input-comando");
const testo = document.getElementById("testo");
const separatore = document.getElementById("separatore");
const body = document.getElementById("body");

var persone = [];
var struttura = [];
var storia = ["", ""];

inputNome.addEventListener("keydown", function (event) { // input per l'elenco dei nomi

    if (event.key === "Enter") {

        let nomi = inputNome.value.split(";");
        inputNome.value = "";
        let numeroPersone = persone.length;

        nomi.forEach((nome, i) => {
            switch (nome[0]) {

                case "-": // togli un nome
                    
                    nome = nome.slice(1); // togli il '-'
                    persone.splice(parseInt(nome), 1);

                    aggiorna();
                    testo.innerText = storia.pop();

                    break;

                case "^": // rinomina un nome
                    // TODO
                    break;
            
                default:
                    persone.push([nome, numeroPersone + i]); // immagazina la persona nell'array
                    aggiorna();
                    break;

            }
        });

    }

});

function aggiorna() {

    listaNomi.innerHTML = "";

    persone.forEach((e, i) => {

        e[1] = i;
        listaNomi.innerHTML += `<li class="p${i}" onmouseover="evidenzia(event);" onmouseleave="deevidenzia(event);">${e[0]}</li>`;

    });

}

comandoTx.addEventListener("keydown", function (event) { // input per i comandi della struttura

    if (event.key === "Enter") {

        let comandi = comandoTx.value.split(";"); // separo in più comandi 

        comandi.forEach(function (elemento) { // ne eseguo uno alla volta
            switch (elemento) {

                case "c":
                case "copia":
                case "COPIA":
                    copyStringToClipboard(testo.innerText);
                    break;

                case "i":
                case "incolla":
                case "INCOLLA":
                    navigator.clipboard.readText().then((copiedText) => {
                        testo.innerText = copiedText;
                        console.log(copiedText);
                    });
                    break;

                case "a":
                case "aggiungi":
                case "AGGIUNGI":
                    navigator.clipboard.readText().then((copiedText) => {
                        testo.innerText += copiedText;
                        console.log(copiedText);
                    });
                    break;

                case "r":
                case "randomizza":
                case "RANDOMIZZA":

                    storia.push(testo.innerText); // memorizzo stato in caso volessi tornare indietro

                    let seed = 0;

                    for (let i = 0; i < testo.innerText.length; i++) {

                        if (testo.innerText[i] === ".") {

                            ++i;
                            let numero = '';
                            while (testo.innerText[i] >= '0' && testo.innerText[i] <= '9') { // immagazino il numero in una stringa
                                numero += testo.innerText[i++];
                            }

                            let tmp = "";
                            let personeDaInserire = [];

                            for (let j = 0; j < parseInt(numero); j++, seed++) { // creo l'array con le persone da inserire in quel gruppo
                                if (seed === persone.length) 
                                    seed = 0;
                                personeDaInserire.push(persone[seed]);
                            }

                            randomizza(personeDaInserire);

                            personeDaInserire.forEach(persona => { // creo una stringa 'tmp' che contiene i nomi randomizzati
                                tmp += `<span class="p${persona[1]}">${persona[0]}</span> - `;
                            });

                            tmp = tmp.slice(0, -3); // togli ' - '
                            console.log(tmp);
                            testo.innerHTML = testo.innerHTML.replace(`.${numero}`, tmp); // rimpiazza il numero con tmp

                        }

                    }

                    break;

                case "u":
                case "undo":
                case "UNDO":
                    testo.innerText = storia.pop();
                    break;

                default:
                    testo.innerText = elemento;
                    break;

            }
        });

        comandoTx.value = "";

    }

});

testo.addEventListener("keydown", function (event) {

    if (event.key === "Tab") {
        event.preventDefault();
        document.execCommand('insertHTML', false, '&#009');
    }

});

function evidenzia(e) {

    let arr = document.getElementsByClassName(e.target.className);
    inputNome.value = `${arr.length - 1}`;

    for (let i = 0; i < arr.length; i++) {

        arr[i].style.backgroundColor = "yellow";

    }

}

function deevidenzia(e) {

    let arr = document.getElementsByClassName(e.target.className);
    inputNome.value = "";

    for (let i = 0; i < arr.length; i++) {

        arr[i].style.backgroundColor = "";

    }

}

function randomizza(array) {

    array = array.sort(() => Math.random() - 0.5);

}

// questa l'ho presa da "https://techoverflow.net/2018/03/30/copying-strings-to-the-clipboard-using-pure-javascript/"
function copyStringToClipboard(str) {
    // Create new element
    var el = document.createElement('textarea');
    // Set value (string to be copied)
    el.value = str;
    // Set non-editable to avoid focus and move outside of view
    el.setAttribute('readonly', '');
    el.style = { position: 'absolute', left: '-9999px' };
    document.body.appendChild(el);
    // Select text inside element
    el.select();
    // Copy text to clipboard
    document.execCommand('copy');
    // Remove temporary element
    document.body.removeChild(el);
}


/*

a;b;c;d;e;f;g;h;i;l;m;n;o;p;q;r;s;t;u;v;z

lunedì:
    colazione:
        apparecchiare:
            .2
        sparecchiare:
            .4
    pranzo:
        apparecchiare:
            .2
        sparecchiare:
            .4
    cena:
        apparecchiare:
            .2
        sparecchiare:
            .4

*/

// const fMenu = document.getElementById("modifica");

// function finestraMenu(event) {
//     fMenu.style.display = "block";
//     fMenu.style.left = event.pageX + "px";
//     fMenu.style.top = event.pageY + "px";
// }

// function nascondiMenu() {
//     fMenu.style.display = "none";
// }

// function rinominaNome(event) {

//     let rinomina = document.getElementById("rinomina");
//     rinomina.contentEditable = "true";
//     rinomina.innerHTML = "";

//     rinomina.addEventListener("onkeypress", (e) => {
//         console.log(e);
//         if (e.key === "Enter") {

//             rinomina.contentEditable = "false";
//             let nuovoNome = rinomina.value;
//             let arr = document.getElementsByClassName(e.target.className);

//             for (let i = 0; i < arr.length; i++) {
//                 arr[i].innerHTML = nuovoNome;
//             }

//         }

//     });

// }

// function eliminaNome(event) {

// }






// LOGICA PER IL RESIZING

var tocco = false;

separatore.addEventListener("mousedown", (e) => {

    tocco = true;console.log("toccato");
    body.style.userSelect = "none";
    body.style.pointerEvents = "none";
    body.style.cursor = "ew-resize";
    
});

document.addEventListener("mousemove", (e) => {

    if (tocco) {

        document.getElementById("lista").style.width = `${e.clientX}px`;
        document.getElementById("struttura").style.width = `calc(100% - ${e.clientX}px)`;

    }
    
});

document.addEventListener("mouseup", (e) => {

    tocco = false;console.log("alzato");
    body.style.userSelect = "";
    body.style.pointerEvents = "";
    body.style.cursor = "default";
    
});
