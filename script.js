const themeBtn = document.getElementById("theme-btn");
const body = document.body;
const quizBtn = document.getElementById("quiz");
const content = document.querySelector("#content");
const quizContainer = document.querySelector("#quiz-container");
const add = document.getElementById("add");

let form = [];
const q = document.getElementById("q");
const op1 = document.getElementById("op1");
const op2 = document.getElementById("op2");
const op3 = document.getElementById("op3");
const op4 = document.getElementById("op4");
const next = document.getElementById("submit-quiz");
const end = document.getElementById("end");
const resultContainer = document.getElementById("result-container");
const result = document.getElementById("result");

const question = document.getElementById("question");
const option1 = document.getElementById("option1");
const option2 = document.getElementById("option2");
const option3 = document.getElementById("option3");
const option4 = document.getElementById("option4");
const correct = document.getElementById("correct");

let score = 0;
let options = [op1, op2, op3, op4];

themeBtn.addEventListener("click", function () {
  body.classList.toggle("lightmode");
});

let num = 0;
add.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    question.value &&
    option1.value &&
    option2.value &&
    option3.value &&
    option4.value &&
    correct.value
  ) {
    correct.value = correct.value.trim();
    form.push([
      question.value,
      option1.value,
      option2.value,
      option3.value,
      option4.value,
      correct.value,
    ]);
    question.value = "";
    option1.value = "";
    option2.value = "";
    option3.value = "";
    option4.value = "";
    correct.value = "";
    num++;
  } else {
    alert("Please fill all fields");
  }
});

quizBtn.addEventListener("click", function (e) {
  e.preventDefault(); //prevent page reload
  if (form.length == 0) {
    alert("Please fill the form first .");
    return;
  }
  switchWindows(content, quizContainer);
  q.textContent = form[0][0];
  op1.textContent = form[0][1];
  op2.textContent = form[0][2];
  op3.textContent = form[0][3];
  op4.textContent = form[0][4];
});

let i = 1;
next.addEventListener("click", function () {
  const op = document.getElementById("op" + form[i - 1][5]);
  op.classList.add("correct");

  options.forEach((btn) => {
    if (btn.classList.contains("selected")) {
      if (btn.classList.contains("correct")) {
        score++;
        console.log(score);
      }
    }
  });

  if (i == num) {
    next.style.display = "none";
    end.style.display = "flex";
    end.style.justifyContent = "center";
    end.style.alignItems = "center";
    end.style.width = "40%";
    end.style.borderRadius = "50px";
  }

  if (i < num) {
    options.forEach((btn) => {
      btn.classList.remove("selected");
    });

    q.textContent = form[i][0];
    op1.textContent = form[i][1];
    op2.textContent = form[i][2];
    op3.textContent = form[i][3];
    op4.textContent = form[i][4];

    i++;
  }
});

end.addEventListener("click", function () {
  switchWindows(quizContainer, resultContainer);

  result.textContent = "You scored " + score + " out of " + num;
});

options.forEach((op) => {
  op.onclick = () => {
    options.forEach((btn) => btn.classList.remove("selected"));
    op.classList.add("selected");
  };
});

//pressing enter to jump to another input field
question.addEventListener("keydown", (e) => {
  if (e.key === "Enter") option1.focus();
});

option1.addEventListener("keydown", (e) => {
  if (e.key === "Enter") option2.focus();
});

option2.addEventListener("keydown", (e) => {
  if (e.key === "Enter") option3.focus();
});

option3.addEventListener("keydown", (e) => {
  if (e.key === "Enter") option4.focus();
});

option4.addEventListener("keydown", (e) => {
  if (e.key === "Enter") correct.focus(); //used gpt
});

correct.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    add.click();
    question.focus();
  }
});

//switching between windows
function switchWindows(fromW, toW) {
  fromW.classList.add("fade-out");

  fromW.classList.remove("fade-in");

  setTimeout(() => {
    fromW.style.display = "none"; //this is here because we have to wait 0.5 s for the animation to carry out
    toW.style.display = "flex";
    toW.classList.remove("fade-out");
    toW.classList.add("fade-in");
  }, 500);
}
