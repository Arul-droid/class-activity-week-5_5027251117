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