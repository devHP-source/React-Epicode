/* 
   - "essay"   domanda aperta la risposta sta in "answer"
   - "boolean" per vero o falso per la risposta corretta
   - "choice"  quattro alternative

   "solution" è l'indice della risposta corretta dentro l'elenco delle opzioni
*/

const questions = [
    {
        type: "essay",
        text: "Cos'è ReactJS?",
        answer: "Una libreria JavaScript (non un framework) per costruire interfacce utente",
        note: "Creata da Meta, si basa su componenti riutilizzabili e aggiorna il DOM reale soltanto dove serve, confrontandolo con una copia tenuta in memoria (Virtual DOM)."
    },
    {
        type: "boolean",
        text: "ReactJS è un framework, non una libreria.",
        solution: 1,
        note: "React si occupa solo della vista: per il routing, le chiamate HTTP o lo stato globale servono librerie esterne."
    },
    {
        type: "choice",
        text: "Il file package.json contiene…",
        options: [
            "Informazioni non essenziali, può essere tranquillamente eliminato",
            "Solamente il nome e la versione dell'applicazione",
            "Molte informazioni utili, come ad esempio l'elenco di tutte le dipendenze richieste dall'applicazione",
            "Il primo componente React caricato all'avvio"
        ],
        solution: 2,
        note: "Oltre a nome e versione elenca dipendenze e script: è il file su cui npm si basa per installare e avviare il progetto."
    },
    {
        type: "boolean",
        text: "create-react-app è l'unico modo possibile per creare un'applicazione React.",
        solution: 1,
        note: "Oggi si parte più spesso da Vite, ma si può anche configurare a mano bundler e compilatore."
    },
    {
        type: "choice",
        text: "Qual è il comando da lanciare nel terminale per creare una nuova create-react-app con nome “test”?",
        options: [
            "npx create-react-app test",
            "npm create-react-app test",
            "npx create-react-app-test",
            "npx create-new-react-app test"
        ],
        solution: 0,
        note: "npx scarica ed esegue il pacchetto al volo, senza bisogno di installarlo globalmente."
    },
    {
        type: "choice",
        text: "Cos'è un componente React?",
        options: [
            "Una libreria che è necessario importare dentro l'applicazione",
            "Una pagina ben specifica all'interno dell'applicazione",
            "Un blocco di logica/contenuto riutilizzabile all'interno dell'applicazione",
            "Una landing page per l'applicazione"
        ],
        solution: 2,
        note: "Racchiude markup, stile e logica in un pezzo che puoi riusare e comporre con altri componenti."
    },
    {
        type: "boolean",
        text: "Un componente React può venire creato in tre modi: come funzione, classe o interfaccia.",
        solution: 1,
        note: "I modi sono due, funzione e classe. L'interfaccia non esiste in React: è un concetto che arriva da TypeScript."
    },
    {
        type: "boolean",
        text: "Le props sono frammenti di informazione assegnati all'invocazione di un componente React, utili al fine di rendere il componente dinamico e più riutilizzabile.",
        solution: 0,
        note: "Si passano come attributi al momento dell'invocazione e permettono di riusare lo stesso componente con contenuti diversi."
    },
    {
        type: "boolean",
        text: "Le props possono essere passate solamente da un componente genitore a un componente figlio, non è possibile fare il contrario.",
        solution: 0,
        note: "Il flusso dei dati è unidirezionale: per far risalire un'informazione, il genitore passa al figlio una funzione da richiamare."
    },
    {
        type: "choice",
        text: "Da dove possono venire recuperate le props all'interno di un componente React creato come classe?",
        options: [
            "Sono proprietà contenute in un oggetto accessibile attraverso i parametri della funzione",
            "Possono essere recuperate all'interno dell'oggetto ‘this’, dentro un sotto-oggetto chiamato ‘props’",
            "Vengono applicate come proprietà dell'oggetto globale ‘window’",
            "Vengono applicate come proprietà dell'oggetto ‘document’"
        ],
        solution: 1,
        note: "Nei componenti a classe le props vivono su this.props; nei componenti funzione arrivano invece come primo parametro."
    }
];

const trueFalse = ["Vero", "Falso"];

const topbar = document.querySelector(".topbar");
const grid = document.querySelector(".faq-grid");

const dialog = document.querySelector(".detail-modal");
const detailTitle = document.querySelector(".detail-title");
const detailAnswer = document.querySelector(".detail-answer");
const detailNote = document.querySelector(".detail-note");
const detailOthers = document.querySelector(".detail-others");
const detailList = document.querySelector(".detail-list");

const optionsOf = (question) => question.options ?? trueFalse;

/* La domanda aperta porta la risposta scritta le altre la ricavano
   dall'elenco delle opzioni così il testo non va tenuto in due posti. */
const answerOf = (question) => question.answer ?? optionsOf(question)[question.solution];

const otherOptionsOf = (question) => question.type === "essay"
    ? []
    : optionsOf(question).filter((option, index) => index !== question.solution);

const createCard = (question, position) => {
    const item = document.createElement("li");
    const card = document.createElement("article");
    const title = document.createElement("h3");
    const summary = document.createElement("p");
    const lead = document.createElement("strong");
    const more = document.createElement("button");
    const arrow = document.createElement("ion-icon");

    item.className = "faq-item";
    item.style.setProperty("--index", position);

    card.className = "faq-card";

    title.className = "faq-question";
    title.textContent = question.text;

    lead.className = "faq-answer-lead";
    lead.textContent = answerOf(question);

    /* Il punto sta fuori dal grassetto così la parte in evidenza resta
       esattamente la risposta, e la spiegazione parte come frase a sé. */
    summary.className = "faq-answer";
    summary.append(lead, `. ${question.note}`);

    arrow.setAttribute("name", "arrow-forward");
    more.className = "faq-more";
    more.type = "button";
    more.append("More", arrow);
    more.addEventListener("click", () => openDetail(question, more));

    card.append(title, summary, more);
    item.append(card);

    return item;
};

const createOtherOption = (option) => {
    const item = document.createElement("li");
    const mark = document.createElement("ion-icon");
    const text = document.createElement("span");

    item.className = "detail-option";
    mark.setAttribute("name", "ellipse-outline");
    text.textContent = option;

    item.append(mark, text);
    return item;
};

const openDetail = (question, trigger) => {
    const others = otherOptionsOf(question);

    detailTitle.textContent = question.text;
    detailAnswer.textContent = answerOf(question);
    detailNote.textContent = question.note;

    detailList.replaceChildren(...others.map(createOtherOption));
    detailOthers.hidden = others.length === 0;

    /* Bootstrap riporta il fuoco al pulsante di partenza solo quando la
       finestra viene aperta con data-bs-toggle */
    dialog.addEventListener("hidden.bs.modal", () => trigger.focus(), { once: true });

    /* L'istanza si crea al primo clic se il bundle di Bootstrap non fosse
       disponibile, a saltare sarebbe solo l'apertura e non tutta la pagina. */
    bootstrap.Modal.getOrCreateInstance(dialog).show();
};

const handleScroll = () => topbar.classList.toggle("is-scrolled", window.scrollY > 4);

grid.replaceChildren(...questions.map(createCard));
window.addEventListener("scroll", handleScroll, { passive: true });
