let myTask = document.querySelector(".task");
let addTaskButton = document.querySelector(".add");
let showTasks = document.querySelector(".results");
let tasks = [];

function anl(returnType, text, from, outIn) {
    return outIn.push(
        text.slice(
            text.indexOf(`${returnType}`) + from,
            text.indexOf(`"`, text.indexOf(`${returnType}`) + from)
        )
    );
}

function titles(text) {
    let titles = [];
    while (text.includes("id")) {
        anl("title", text, 8, titles);
        if (text.includes("id")) text = text.slice(text.indexOf("title") + 8);
        else break;
    }
    return titles;
}

function ids(text) {
    let ids = [];
    while (text.includes("id")) {
        anl("id", text, 5, ids);
        if (text.includes("id")) text = text.slice(text.indexOf("title") + 8);
        else break;
    }
    return ids;
}
function existIn(ar, el) {
    let x = false;
    if (ar.length !== 0)
        ar.forEach((e) => (e.title === el ? (x = true) : x ? "" : (x = false)));
    else x = false;
    return x;
}

function addTask(object, parent) {
    let newTask = document.createElement("div");
    let deletTask = document.createElement("button");

    newTask.id = object.id;
    newTask.setAttribute("title", object.title);
    newTask.textContent = object.title;

    deletTask.textContent = "X";
    deletTask.addEventListener("click", function (e) {
        e.preventDefault();
        deletTask.parentElement.remove();
        tasks = tasks.filter((e) => e.id !== deletTask.parentElement.id);
        window.localStorage.setItem("Tasks", JSON.stringify(tasks));
    });

    newTask.appendChild(deletTask);
    parent.appendChild(newTask);
}

if (window.localStorage.getItem("Tasks")) {
    let sto = window.localStorage.getItem("Tasks");
    for (let i = 0; i < ids(sto).length; i++) {
        let objects = { id: ids(sto)[i], title: titles(sto)[i] };
        addTask(objects, showTasks);
        tasks.push(objects);
    }
} else tasks = [];

addTaskButton.addEventListener("click", function (e) {
    e.preventDefault();
    if (myTask.value === "") return;
    let task = {
        id: `${(Math.random() * (1e10 - 1e8 + 1) + 1e8).toFixed()}`,
        title: `${myTask.value}`,
    };
    if (!existIn(tasks, myTask.value)) {
        tasks.push(task);
        window.localStorage.setItem("Tasks", JSON.stringify(tasks));
        addTask(task, showTasks);
        myTask.value = "";
    }
});
