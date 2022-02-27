const words = ["apple","book","cat","pen", "toytrain"];
const randomWord = words[Math.floor(Math.random() * words.length)];
const visitedArray = [];
const correctChar = [];
const wrongChar = [];
const hangmanBody = document.querySelectorAll(".figure-part");

console.log(randomWord);

function showChar() {
    document.getElementById("word").innerHTML = 
    `
    ${randomWord.split("").map((letter) => 
        `
        <span class = "letter"> 
            ${correctChar.includes(letter) ? letter : ""}
        </span>
        `
    ).join("")
    }
    `;   
    const guessedWord = document.getElementById("word").innerText.replace(/\n/g,"");
    if(guessedWord === randomWord)  {
        alert("we won the game  ");
        wrongChar.splice(0);
        correctChar.splice(0);
        visitedArray.splice(0);
        showChar();
    }
    
}
function updateIncorrectChar() {
    document.querySelector("#wrong-letter-container").innerHTML =
    `
    ${wrongChar.length >= 1 ? "<p> Wrong Char Guessed </p>" : ""}
    ${wrongChar.map((letter) => 
        `
        <span>${letter}</span>
        `
        )}
    `;
    hangmanBody.forEach((ele, index) => {
        const noOfIncorrectGuess = wrongChar.length;

        if(index < noOfIncorrectGuess)  {
            ele.style.display = "block";    // Show body
        }   else    {
            ele.style.display = "none";     // hide body
        }
    })

    if(wrongChar.length === hangmanBody.length) {
        alert("You lost the game");
    }
}

function showNotification() {
    document.getElementById("notification-container").style.display = "block";
    setTimeout(() => {
        document.getElementById("notification-container").style.display = "none";
    }, 600);
}

document.getElementById("notification-container").style.display = "none";
showChar();
window.addEventListener("keydown", (e) => {
    if(e.key >= 'a' && e.key <= 'z')    {
        if(visitedArray.includes(e.key))    {
            showNotification();// show alert
        }   else    {
            visitedArray.push(e.key);
            if(randomWord.includes(e.key))  {
                correctChar.push(e.key);
                showChar();                // Correct character
            }   else    {
                wrongChar.push(e.key);                
                updateIncorrectChar();                // Wrong character
            }
            console.log("Visited " + visitedArray);
            console.log("Wrong char " + wrongChar);
            console.log("correct " + correctChar);
        }
    }   else    {
        console.log("bad character...");
    }
})