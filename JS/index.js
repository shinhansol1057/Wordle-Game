let index = 0;
let attempts = 0;
let count = 0;
let timer;
const answer = "APPLE";

const refresh = () => location.reload()

const appStart = () => {
  const displayGameOver = () => {
    const div = document.createElement("div");
    div.innerHTML = `<div>Game Over</div>
                    <button onclick="refresh()">reset</button>`;
    div.setAttribute("class", "game-over")
    document.body.appendChild(div); 
  };

  const nextLine = () => {
    attempts++;
    index = 0;
    count = 0;
  };

  const gameOver = () => {
    window.removeEventListener("keydown", handleKeydown);
    displayGameOver();
    clearInterval(timer);
  };

  const handleEnterKey = () => {
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

    if (count === 5 || attempts === 5) gameOver();
    else nextLine();
  };

  const handleBackspace = () => {
    if(index > 0){
      const preBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerHTML = "";
      index--;
    } 
  };

  const handleKeydown = (e) => {
    const key = e.key.toUpperCase();
    const keyCode = e.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );

    if (e.key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (e.key === "Enter") handleEnterKey();
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
      timeH1.innerHTML = `${minutes}:${seconds}`
    }
    timer = setInterval(setTime, 1000)
  }

  startTimer();
  window.addEventListener("keydown", handleKeydown);
};

appStart();
