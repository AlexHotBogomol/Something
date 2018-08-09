const form = document.querySelector(".task");
const input = document.getElementById("taskInput");
const list = document.querySelector(".collection");
const taskBtn = document.getElementById("taskBtn");
const clearBtn = document.getElementById("clearBtn");
const deleteBtn = document.querySelector(".delete-item");

let tasks;
if(localStorage.getItem("tasks") === null){
	tasks = [];
}else{
	tasks = JSON.parse(localStorage.getItem("tasks"));
	tasks.forEach(function(taskText){
		createListItem(taskText);
	})
}

delegateEvents();

function delegateEvents(){
	form.addEventListener("submit", submitHandler);
	clearBtn.addEventListener("click", clearBtnHandler);
	list.addEventListener("click", deleteBtnHandler);
}

function submitHandler(e){
	e.preventDefault();
	if(input.value === ""){
		alert("Enter task");
	}else{
		tasks.push(input.value);
		localStorage.setItem("tasks", JSON.stringify(tasks));
		createListItem(input.value);
		input.value = "";
	}
}

function createListItem(taskText){
	const li = document.createElement("li");
	li.classList.add("collection__item");
	const liContent = document.createElement("span");
	liContent.classList.add("content");
	liContent.textContent = taskText;
	li.appendChild(liContent);
	const link = document.createElement("a");
	link.classList.add("delete-item");
	link.innerHTML = "&#9747";
	li.appendChild(link);
	list.appendChild(li);
}

 function clearBtnHandler(e){
 	e.preventDefault();
 	localStorage.clear();
 	const listArray = Array.from(list.children);
 	listArray.forEach(function(task){
 		task.remove();
 	})
 }

 function deleteBtnHandler(e){
 		if(e.target.classList.contains("delete-item")){
 			tasks = JSON.parse(localStorage.getItem("tasks"));
 			tasks.forEach(function(task, index, array){
 				if(e.target.previousElementSibling.textContent === task){
 					array.splice(index, 1);
 				}
 			})
			localStorage.setItem("tasks", JSON.stringify(tasks));
 			e.target.parentElement.remove();
 		}
 }