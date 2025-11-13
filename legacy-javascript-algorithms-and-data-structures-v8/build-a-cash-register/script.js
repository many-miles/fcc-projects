let price = 19.5;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];

const cashInput = document.getElementById("cash");
const changeDueElement = document.getElementById("change-due");
const purchaseBtn = document.getElementById("purchase-btn");
const priceDisplay = document.getElementById("price-display");
const drawerDisplay = document.getElementById("drawer-display");

const currencyValues = {
  "PENNY": 0.01,
  "NICKEL": 0.05,
  "DIME": 0.1,
  "QUARTER": 0.25,
  "ONE": 1,
  "FIVE": 5,
  "TEN": 10,
  "TWENTY": 20,
  "ONE HUNDRED": 100
};

const displayPrice = () => {
  priceDisplay.textContent = `$${price.toFixed(2)}`;
};

const displayDrawer = () => {
  drawerDisplay.innerHTML = "";
  const reversedCid = [...cid].reverse();
  
  reversedCid.forEach(([denomination, amount]) => {
    const item = document.createElement("div");
    item.className = "drawer-item";
    item.innerHTML = `<span>${denomination}</span><strong>$${amount.toFixed(2)}</strong>`;
    drawerDisplay.appendChild(item);
  });
};

const calculateChange = (changeDue, cashInDrawer) => {
  let remaining = Math.round(changeDue * 100) / 100;
  const change = [];
  const drawerCopy = [...cashInDrawer].reverse();
  
  for (let [denomination, amount] of drawerCopy) {
    const unitValue = currencyValues[denomination];
    let amountToReturn = 0;
    
    while (remaining >= unitValue && amount > 0) {
      remaining = Math.round((remaining - unitValue) * 100) / 100;
      amount = Math.round((amount - unitValue) * 100) / 100;
      amountToReturn = Math.round((amountToReturn + unitValue) * 100) / 100;
    }
    
    if (amountToReturn > 0) {
      change.push([denomination, amountToReturn]);
    }
  }
  
  if (remaining > 0) {
    return null;
  }
  
  return change;
};

const getTotalCashInDrawer = () => {
  return cid.reduce((total, [_, amount]) => total + amount, 0);
};

const handlePurchase = () => {
  const cash = parseFloat(cashInput.value);
  
  if (isNaN(cash)) {
    alert("Please enter a valid amount");
    return;
  }
  
  if (cash < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }
  
  if (cash === price) {
    changeDueElement.textContent = "No change due - customer paid with exact cash";
    return;
  }
  
  const changeDue = Math.round((cash - price) * 100) / 100;
  const totalCid = Math.round(getTotalCashInDrawer() * 100) / 100;
  
  if (totalCid < changeDue) {
    changeDueElement.textContent = "Status: INSUFFICIENT_FUNDS";
    return;
  }
  
  const change = calculateChange(changeDue, cid);
  
  if (change === null) {
    changeDueElement.textContent = "Status: INSUFFICIENT_FUNDS";
    return;
  }
  
  if (totalCid === changeDue) {
    const changeStr = change.map(([denom, amt]) => `${denom}: $${amt.toFixed(2)}`).join(" ");
    changeDueElement.textContent = `Status: CLOSED ${changeStr}`;
  } else {
    const changeStr = change.map(([denom, amt]) => `${denom}: $${amt.toFixed(2)}`).join(" ");
    changeDueElement.textContent = `Status: OPEN ${changeStr}`;
  }
};

purchaseBtn.addEventListener("click", handlePurchase);

cashInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    handlePurchase();
  }
});

displayPrice();
displayDrawer();