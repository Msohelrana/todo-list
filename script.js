let tastForm=document.querySelector("#task-form");
let newTask=document.getElementById("new-task");
let addBtn=document.getElementById("add-btn");
let taskFilter=document.getElementById("task-filter");
let clearBtn=document.getElementById("clear-btn");
let taskList=document.querySelector("ul");

addBtn.addEventListener('click',addTask);
taskList.addEventListener('click',removeTask);
clearBtn.addEventListener('click',clearAll);
taskFilter.addEventListener('keyup',filterTask);
document.addEventListener('DOMContentLoaded',getTask);

//add Task
function addTask(e){
    if(newTask.value=='') {
        alert("Add a Task");
    }
    else{
        //creat task element

        let li=document.createElement('li');
        li.appendChild(document.createTextNode(newTask.value + " "));
        taskList.appendChild(li);
        let link=document.createElement('a');
        link.setAttribute('href','#');
        link.innerHTML='x';
        li.appendChild(link);
        storeTaskInLocalStorage(newTask.value);
        newTask.value='';

        
    }
    e.preventDefault();
}
//remove Task
function removeTask(e){
    if(e.target.hasAttribute("href")){
       if(confirm("Are You Sure?")){
         let ele=e.target.parentElement;
         ele.remove();
         removeFromLS(ele);
       }
    }
}

//clear all task

function clearAll(e){
   // taskList.innerHTML='';

   //faster way to remove

   while(taskList.firstChild){
     taskList.removeChild(taskList.firstChild);
   }
   localStorage.clear();
}

//filter Task

function filterTask(e){
    let text=e.target.value.toLowerCase();

    document.querySelectorAll('li').forEach(task =>{
        let item=task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text)!=-1){
            task.style.display='block';
        }
        else{
            task.style.display='none';
        }
    })
}

// stor task in local Storage

function storeTaskInLocalStorage(task){
    let tasks;

    if(localStorage.getItem('tasks') === null){
         tasks = [];
    }
    else{
      tasks=JSON.parse(localStorage.getItem('tasks'));
    }
   tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));

}


function getTask(){
    let tasks;

    if(localStorage.getItem('tasks') === null){
         tasks = [];
    }
    else{
      tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(task =>{
        let li=document.createElement('li');
        li.appendChild(document.createTextNode(task+ " "));
        taskList.appendChild(li);
        let link=document.createElement('a');
        link.setAttribute('href','#');
        link.innerHTML='x';
        li.appendChild(link);
    })
}

function removeFromLS(taskItem){
    let tasks;

    if(localStorage.getItem('tasks') === null){
         tasks = [];
    }
    else{
      tasks=JSON.parse(localStorage.getItem('tasks'));
    }

    let li=taskItem;
    li.removeChild(li.lastChild);

    tasks.forEach((task,index)=>{
        if(li.textContent.trim()===task){
            tasks.splice(index,1);
        }
    })
    localStorage.setItem('tasks',JSON.stringify(tasks));
}