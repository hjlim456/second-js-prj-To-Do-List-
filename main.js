//유저가 입력한다 >>input태그를 가져와야 한다.
//+버튼을 입력하면, 할일이 추가된다
//delete 버튼을누르면 할일이 삭제된다
//check 버튼을 누르면 할일이 끝나면서 취소선이 생긴다
//1.check 버튼 클릭하는 순간 true false
//2.true 이면 끝난걸로 간주하고 취소선
//3.flase 이면 안끝난걸로 간주하고 취소선없애기

// 다른 탭을 누를떄마다 언더바가 이동한다.
// 끝난탭은 끝난것들만 진행중탭은 진행중인것들만 ..
// 전체탭을 누르면 다시 전체 아이템이 보이게

let addButton = document.getElementById("add-button");
let underline = document.getElementById("tap-underline");
let userInput = document.getElementById("input-tap");
let taskList = [];
let filteredList = [];
let list = [];
let mode = "all";


let taps = document.querySelectorAll(".task-taps div");

addButton.addEventListener("click", addTask);
userInput.addEventListener("keydown", function(e){
    if(e.key == "Enter"){
        addTask()
    }
})

for (let i = 1; i < taps.length; i++) {
  taps[i].addEventListener("click", function (e) {

    filter(e);
  });
}

userInput.addEventListener('input', function(e) {
       addButton.disabled = false
});


function addTask() {

  let task = {
    id: randomIdGenerate(),
    isComplete: false,
    taskContent: userInput.value,
  };
  
  taskList.push(task);

  //input탭에 text를 입력햇다가 지운상태로 +버튼을 눌렀을때 조건막기
  if(task.taskContent ===""){
    addButton.disabled = true;
    taskList.pop(task);
    alert("할일을 입력하세요");
    return;
  }


  userInput.value=""
  render(); 
  addButton.disabled = true;

}

function render() {
  
  let resultHTML = "";
  // 1. 내가 선택한 탭에따라서 다른 리스트를 제공해라    // 2. all => taskList , ongoing,done => filteredList
  // 조건 검사
  if (mode == "all") {
    list = taskList;
  } else if (mode == "ongoing" || mode == "done") {
    list = filteredList;
  }

  //실행문


  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      resultHTML += ` <div class="task">
                            <div class="task-content task-done"> ${list[i].taskContent} </div>
                            <div class="button-box">
                                <button onclick="toggleComplete('${list[i].id}')">
                                  <i class="fa-solid fa-arrow-rotate-left"></i>  
                                </button>
                                <button onclick="deleteTask('${list[i].id}')">
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                            </div>      
                        </div>`;
    } else {
      resultHTML += ` <div class="task">
                            <div class="task-content"> ${list[i].taskContent} </div>
                            <div class="button-box">
                                <button onclick="toggleComplete('${list[i].id}')">
                                    <i class="fa-solid fa-check"></i>
                                </button>
                                <button onclick="deleteTask('${list[i].id}')">
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                            </div>
                        </div>`;
    }
  }
  document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  filter();
}
function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
        taskList.splice(i, 1);
      break;
    }
  }
  filter();
}

function filter(e) {    
    if(e){
        mode = e.target.id;
        
        underline.style.width = e.target.offsetWidth + "px";
        underline.style.left = e.target.offsetLeft + "px";
        underline.style.top =
        e.target.offsetTop + (e.target.offsetHeight-7) + "px";
    }
        


    filteredList = [];
    if (mode == "ongoing") {
        //isComplete == false 보여주기
        for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].isComplete === false) {
            filteredList.push(taskList[i]);
        }
        }
    } else if (mode == "done") {
    //isComplete == true 보여주기
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].isComplete === true) {
            filteredList.push(taskList[i]);
            }
        }
  }
  render();

}

function randomIdGenerate() {
  return "_" + Math.random().toString(36).slice(2, 9);
}
