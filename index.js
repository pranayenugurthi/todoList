let todoList=[
    {
        id:"Learn htmltodo",
        task:"Learn HTML",
        completed:false
     },{
        id:"Learn csstodo",
        task:"Learn CSS",
        completed:false
     },{
        id:"Learn jstodo"   ,
        task:"Learn JavaScript",
        completed:false
     },{
        id:"Learn reacttodo",
        task:"Learn React",
        completed:false
    }
]

let listElement=document.getElementById("taskList");
let inputElement=document.getElementById("taskInput");
let addButton=document.getElementById("addTaskButton");
addButton.addEventListener("click",()=>{
    if(inputElement.value.trim()===""){
        alert("Please enter a task");
        return;
    }
    let existingTodo=todoList.find(todo=>todo.task.toLowerCase()===inputElement.value.trim().toLowerCase());
    if(existingTodo){
        alert("Task already exists");
        return;
    }
    let newTodo={
        id:inputElement.value.trim()+"todo",
        task:inputElement.value.trim(),
        completed:false
    }
    addTodoItem(newTodo)
    todoList.push(newTodo);
    inputElement.value="";
});
function renderList(){
    for(let todo of todoList){
        addTodoItem(todo);  
    }
}
function addTodoItem(todo){
    let listItem=document.createElement("li");
    listItem.classList.add("list-item")
    listElement.appendChild(listItem);
    let inputElement=document.createElement("input");
    inputElement.type="checkbox";
    inputElement.id="todo"+todo.id;
    inputElement.classList.add("item-checkbox");
    inputElement.checked=todo.completed;
    inputElement.addEventListener("change",()=>{
        todo.completed=inputElement.checked;
        console.log(todo.task+" is "+(todo.completed?"completed":"not completed"));
            if(todo.completed){
                listItem.classList.add("completed");
            } else {
                listItem.classList.remove("completed");
            }
    });
    listItem.appendChild(inputElement);
    let labelElement=document.createElement("label");
    labelElement.classList.add("item-label");
    labelElement.htmlFor="todo"+todo.id;
    labelElement.textContent=todo.task;
    listItem.appendChild(labelElement);
    let deleteButton=document.createElement("button");
    deleteButton.classList.add("delete-btn");
    deleteButton.innerHTML='<i class="bi bi-trash3"></i>';
    deleteButton.addEventListener("click",()=>{
        listItem.remove();
        todoList=todoList.filter(t=>t.id!==todo.id);
        if(!todoList.length){
        let listItem=document.createElement("li");
        listItem.classList.add("list-item");
        listItem.textContent="Add new task";
        listElement.appendChild(listItem);
    }
    });
    listItem.appendChild(deleteButton);
}
renderList();