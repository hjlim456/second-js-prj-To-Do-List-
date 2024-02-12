//유저가 입력한다 >>input태그를 가져와야 한다.
//+버튼을 입력하면, 할일이 추가된다
//delete 버튼을누르면 할일이 삭제된다
//check 버튼을 누르면 취소선이 생긴다

// 다른 탭을 누를떄마다 언더바가 이동한다.
// 끝난탭은 끝난것들만 진행중탭은 진행중인것들만 ..
// 전체탭을 누르면 다시 전체 아이템이 보이게

let inputTap = document.getElementById("input-tap");
let addButton = document.getElementById("add-button");
let taskList = [];

addButton.addEventListener("click", addTask);

function addTask() {
  taskList.push(inputTap.value);
  render();
}

function render() {
  let resultHTML = "";

  taskList.forEach((task) => {
    resultHTML += `<div class="task">
                      ${task}
                      <div>
                          <button>Check</button>
                          <button>Delete</button>
                      </div>
                  </div>`;
  });
  document.getElementById("task-board").innerHTML = resultHTML;
}
