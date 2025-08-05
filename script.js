// Load tasks on page load
window.onload = function () {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach((task) => createTaskElement(task.text, task.completed));
};

function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();

  if (taskText === "") return;

  createTaskElement(taskText, false);
  input.value = "";
  saveTasks();
}

function createTaskElement(text, completed) {
  const li = document.createElement("li");
  li.textContent = text;

  if (completed) {
    li.classList.add("completed");
  }

  li.addEventListener("click", function () {
    li.classList.toggle("completed");
    saveTasks();
  });

  const del = document.createElement("span");
  del.textContent = "✖"; // red cross
  del.className = "delete";
  del.onclick = function (event) {
    event.stopPropagation(); // prevent toggle when deleting
    li.remove();
    saveTasks();
  };

  li.appendChild(del);
  document.getElementById("taskList").appendChild(li);
}

function saveTasks() {
  const listItems = document.querySelectorAll("#taskList li");
  const tasks = [];

  listItems.forEach((li) => {
    tasks.push({
      text: li.firstChild.textContent,
      completed: li.classList.contains("completed"),
    });
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeAllTasks() {
  document.getElementById("taskList").innerHTML = "";
  localStorage.removeItem("tasks");
}
