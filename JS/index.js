let index = 0;
let attempts = 0;
let count = 0;
let timer;
let answer = "TRAIN";

const refresh = () => location.reload();

const appStart = () => {

  const displayGameOver = () => {
    const div = document.createElement("div");
    div.innerHTML = `<div>Game Finish</div>
                    <button onclick="refresh()">reset</button>`;
    div.setAttribute("class", "game-over");
    document.body.appendChild(div);
  };

  const nextLine = () => {
    attempts++;
    index = 0;
    count = 0;
  };

  const gameFinished = () => {
    answerKeyColor();
    window.removeEventListener("keydown", handleKeydown);
    displayGameOver();
    clearInterval(timer);
    
  };

  const answerKeyColor = () => {
    for (let i = 0; i < 5; i++){
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );
      const inputLetter = block.innerHTML;
      const answer_key = document.querySelector(`#${inputLetter}`);
      answer_key.style = "background-color:red";
    }
    
  };

  const handleEnterKey = async () => {
    // 서버에서 정답을 받아오는 코드
    // const res = await fetch("/answer");
    // const data = await res.json();
    // answer = data.answer;

    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );
      const inputLetter = block.innerHTML;
      const correctLetter = answer[i];
      if (inputLetter === correctLetter) {
        block.style.background = "#6AAA64";
        count++;
      } else if (answer.includes(inputLetter))
        block.style.background = "#C9B458";
      else block.style.background = "#787C7E";
      block.style.color = "white";
    }

    if (count === 5 || attempts === 5) {
      gameFinished();
      for (let i = 0; i < 5; i++) {
        const block = document.querySelector(
          `.board-block[data-index='${attempts}${i}']`
        );
        block.style.transition = "all 1s ease-in-out"
        block.style.margin = "20px"
        block.style.transform = "scale(1.4)"
      }
    }else nextLine();
  };

  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerHTML = "";
      index--;
    }
  };

  const keyButton = (e) => {
    console.log(e.target.id)
    const key = e.target.id
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );

    if (key === "BACKSPACE") handleBackspace();
    else if (index === 5) {
      if (key === "ENTER") handleEnterKey();
      else return;
    } else if (key !== ("ENTER" && "")) {
      thisBlock.innerHTML = key;
      index++;
    }
  }

  const handleKeydown = (e) => {
    let key = e.key.toUpperCase();
    let keyCode = e.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );

    if (key === "BACKSPACE") handleBackspace();
    else if (index === 5) {
      if (key === "ENTER") handleEnterKey();
      else return;
    } else if (keyCode >= 65 && keyCode <= 90) {
      thisBlock.innerHTML = key;
      index++;
    }
  };

  const startTimer = () => {
    const start_time = new Date();

    const setTime = () => {
      const now_time = new Date();
      const time = new Date(now_time - start_time);
      const minutes = time.getMinutes().toString().padStart(2, "0");
      const seconds = time.getSeconds().toString().padStart(2, "0");
      const timeH1 = document.querySelector(".timer");
      timeH1.innerHTML = `${minutes}:${seconds}`;
    };
    timer = setInterval(setTime, 1000);
  };

  startTimer();
  window.addEventListener("keydown", handleKeydown);
  window.addEventListener("click", keyButton)
};



appStart();
