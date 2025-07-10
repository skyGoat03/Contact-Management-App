
/*
let tasks = [] 

function addTask(taskText){
 return new Promise((resolve) =>{
   setTimeout(()=> {
      const task ={
        id : tasks.length,
        text: taskText,
        completed:false
      };
       tasks.push(task);
       console.log(`added task :       "${task.text}"`);
     resolve();
   },1000)
 });
}

function listTasks(){
  for(let i = 0 ; i<tasks.length;i++){
    console.log(i+"."+tasks[i].text);
  }
}
function delTask(taskId){
  if(taskId>=0 && taskId<tasks.length){
  const removed=tasks.splice(taskId,1);
  console.log(`1Removed task : "${removed[0].text}"`);
  }
  else {
  console.log(" invalid task id")
  
  }
  }

function markDone(taskId){
  tasks[taskId].completed=true;
}



async function runTasks(){
await addTask("Learn this");
await addTask("Buy Groceries");
listTasks();

delTask(1);
listTasks(1);

}
runTasks();
*/

const person=[{
  name:"John",
  age:30,
  greet(){
console.log("Hello, "+this.name);
  }
}, 
              {
                name:"Jane",
                age:25,
                Meet(){
                  console.log("Hi, "+this.name);
                }
              }             ];



const [person1,person2]= person
console.log(person1)


