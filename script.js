let task = [
    {
        text: "Membuat Website to-do list",
        completed: false
    },
    {
        text: "Kerjain Jarkom Modul 2",
        completed: false
    },
    {
        text: "buat aplikasi pemmob",
        completed: false
    }
];

// menampilkan task
function renderTasks() {
    const taskList = document.getElementById("task");

    if (!taskList) {
        return;
    }

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {   // DIUBAH: belum ada filter, jadi index langsung dari forEach
        const li = document.createElement("li");

        li.innerHTML = `
            <span style="display:flex; align-items:center; gap:10px;">
                <input type="checkbox" class="completeCheckbox" data-index="${index}" ${task.completed ? "checked" : ""}>
                <span style="${task.completed ? "text-decoration: line-through; color: #999;" : ""}">${task.text}</span>
            </span>
            <button class="deleteButton" data-index="${index}">
                Delete
            </button>
        `;

        taskList.appendChild(li);
    });
}

renderTasks();

// menambah task baru
function addTask() {
    const input = document.getElementById("taskInput");
    const text = input.value.trim();

    if (text === "") {
        return;
    }

    tasks.push({
        text: text,
        completed: false
    });

    renderTasks();

    input.value = "";
    input.focus();
}

// tombol Add
document.getElementById("addButton").addEventListener("click", addTask);

// bisa tambah task pakai Enter di input
document.getElementById("taskInput").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});

// menghapus task berdasarkan index
function deleteTask(index) {
    const taskIndex = Number(index);

    if (Number.isNaN(taskIndex) || taskIndex < 0 || taskIndex >= tasks.length) {
        return;
    }

    tasks.splice(taskIndex, 1);
    renderTasks();
}

function toggleTaskComplete(index) {
    const taskIndex = Number(index);

    if (Number.isNaN(taskIndex) || taskIndex < 0 || taskIndex >= tasks.length) {
        return;
    }

    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    renderTasks();
}

// event delegation buat tombol delete
document.getElementById("task").addEventListener("click", (e) => {
    const deleteButton = e.target.closest(".deleteButton");

    if (deleteButton) {
        const index = deleteButton.getAttribute("data-index");
        deleteTask(index);
    }
});

// event delegation buat checkbox complete
document.getElementById("task").addEventListener("change", (e) => {
    if (e.target.classList.contains("completeCheckbox")) {
        const index = e.target.getAttribute("data-index");
        toggleTaskComplete(index);
    }
});

let currentFilter = "all";

// mengembalikan task yang sudah difilter sesuai currentFilter
function getFilteredTasks() {
    if (currentFilter === "active") {
        return tasks.filter((task) => !task.completed);
    }

    if (currentFilter === "completed") {
        return tasks.filter((task) => task.completed);
    }

    return tasks;
}

// mengganti filter aktif
function setFilter(filter) {
    currentFilter = filter;
    renderTasks();
}

// tombol filter
document.getElementById("all").addEventListener("click", () => setFilter("all"));
document.getElementById("active").addEventListener("click", () => setFilter("active"));
document.getElementById("done").addEventListener("click", () => setFilter("completed"));