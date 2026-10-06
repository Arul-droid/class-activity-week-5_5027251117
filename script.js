let tasks = [
    {
        text: "Membuat Website to-do list",
        course: "",
        dueDate: "",
        completed: false
    },
    {
        text: "Kerjain Jarkom Modul 2",
        course: "",
        dueDate: "",
        completed: false
    },
    {
        text: "buat aplikasi pemmob",
        course: "",
        dueDate: "",
        completed: false
    }
];

let currentFilter = "all";

// menampilkan task
function renderTasks() {
    const taskList = document.getElementById("task");

    if (!taskList) {
        return;
    }

    taskList.innerHTML = "";

    const filteredTasks = getFilteredTasks();

    filteredTasks.forEach((task) => {
        const originalIndex = tasks.indexOf(task);
        const li = document.createElement("li");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "completeCheckbox";
        checkbox.dataset.index = originalIndex;
        checkbox.checked = task.completed;

        const text = document.createElement("span");
        text.textContent = task.text;
        if (task.completed) {
            text.classList.add("done");
        }

        const details = [task.course, task.dueDate].filter(Boolean).join(" | ");
        const taskContent = document.createElement("span");
        taskContent.append(checkbox, text);
        taskContent.style.display = "flex";
        taskContent.style.alignItems = "center";
        taskContent.style.gap = "10px";
        li.appendChild(taskContent);

        if (details) {
            const detailText = document.createElement("small");
            detailText.textContent = details;
            li.appendChild(detailText);
        }

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "deleteButton";
        deleteButton.dataset.index = originalIndex;
        deleteButton.textContent = "Delete";
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });
}

// menambah task baru
function addTask() {
    const input = document.getElementById("taskInput");
    const courseInput = document.getElementById("courseInput");
    const dueDateInput = document.getElementById("dueDateInput");
    const text = input.value.trim();

    if (text === "") {
        return;
    }

    tasks.push({
        text: text,
        course: courseInput.value ? courseInput.selectedOptions[0].textContent.trim() : "",
        dueDate: dueDateInput.value,
        completed: false
    });

    saveTasks();
    renderTasks();

    input.value = "";
    courseInput.value = "";
    dueDateInput.value = "";
    input.focus();
}

// tombol Add
document.getElementById("addButton").addEventListener("click", addTask);

// bisa tambah task pakai Enter di input
document.getElementById("taskInput").addEventListener("keydown", (e) => {
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
    saveTasks();
    renderTasks();
}

function toggleTaskComplete(index) {
    const taskIndex = Number(index);

    if (Number.isNaN(taskIndex) || taskIndex < 0 || taskIndex >= tasks.length) {
        return;
    }

    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    saveTasks();
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

// menyimpan data
function saveTasks() {
    try {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (error) {
        console.error("Gagal menyimpan data task:", error);
    }
}

// mengambil data
function loadTasks() {
    let savedTasks;
    try {
        savedTasks = localStorage.getItem("tasks");
    } catch (error) {
        console.error("Gagal mengambil data task:", error);
        return;
    }

    if (!savedTasks) {
        return;
    }

    try {
        const parsedTasks = JSON.parse(savedTasks);

        if (Array.isArray(parsedTasks)) {
            tasks = parsedTasks
                .filter((task) => task && typeof task.text === "string")
                .map((task) => ({
                    text: task.text,
                    course: typeof task.course === "string" ? task.course : "",
                    dueDate: typeof task.dueDate === "string" ? task.dueDate : "",
                    completed: task.completed === true
                }));
        }
    } catch (error) {
        console.error("Gagal membaca data task:", error);
    }
}

loadTasks();
renderTasks();