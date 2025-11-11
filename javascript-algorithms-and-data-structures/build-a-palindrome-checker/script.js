const input = document.getElementById("text-input");
const checkBtn = document.getElementById("check-btn");
const result = document.getElementById("result");

checkBtn.addEventListener("click", () => {
  const text = input.value;


  if (!text) {
    alert("Please input a value");
    return;
  }

  const normalizedText = text
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

  const reversedText = normalizedText
    .split("")
    .reverse()
    .join("");

  const isPalindrome = normalizedText === reversedText;

  result.textContent = `${text} is ${isPalindrome ? "" : "not "}a palindrome`;
});