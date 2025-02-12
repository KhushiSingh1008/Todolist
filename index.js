document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("task-input");
    const addBtn = document.getElementById("add-btn");
    const taskList = document.getElementById("task-list");
    const progressText = document.getElementById("progress-text");
    const message = document.getElementById("message");

    let tasks = [];

    function updateProgress() {
        const completedTasks = document.querySelectorAll(".task.completed").length;
        const totalTasks = tasks.length;
        const progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
        
        progressText.textContent = `Progress: ${Math.round(progress)}%`;

        if (progress === 100) {
            message.textContent = "Great job! You've completed all your tasks! 🎉";
        } else if (progress >= 50) {
            message.textContent = "You're halfway there! Keep going! 💪";
        } else if (totalTasks > 0) {
            message.textContent = "Keep pushing! You got this! 🚀";
        } else {
            message.textContent = "";
        }
    }

    function addTask() {
        const taskValue = taskInput.value.trim();
        if (taskValue === "") return;

        const taskObj = { id: Date.now(), text: taskValue, completed: false };
        tasks.push(taskObj);

        renderTasks();
        taskInput.value = "";
    }

    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach(task => {
            const taskItem = document.createElement("li");
            taskItem.classList.add("task");
            if (task.completed) taskItem.classList.add("completed");

            const taskText = document.createElement("span");
            taskText.textContent = task.text;
            taskText.classList.add("task-text");

            const editInput = document.createElement("input");
            editInput.type = "text";
            editInput.classList.add("edit-input");
            editInput.value = task.text;
            editInput.style.display = "none";

            const editBtn = document.createElement("button");
            editBtn.textContent = "Edit";
            editBtn.classList.add("edit-btn");

            editBtn.addEventListener("click", () => {
                if (taskText.style.display !== "none") {
                    taskText.style.display = "none";
                    editInput.style.display = "inline";
                    editInput.focus();
                } else {
                    task.text = editInput.value;
                    taskText.textContent = editInput.value;
                    taskText.style.display = "inline";
                    editInput.style.display = "none";
                }
            });

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.classList.add("delete-btn");

            deleteBtn.addEventListener("click", () => {
                tasks = tasks.filter(t => t.id !== task.id);
                renderTasks();
            });

            const completeBtn = document.createElement("button");
            completeBtn.textContent = "Complete";
            completeBtn.classList.add("complete-btn");

            completeBtn.addEventListener("click", () => {
                task.completed = true;
                renderTasks();
            });

            taskItem.append(taskText, editInput, editBtn, deleteBtn, completeBtn);
            taskList.appendChild(taskItem);
        });

        updateProgress();
    }

    addBtn.addEventListener("click", addTask);
});
