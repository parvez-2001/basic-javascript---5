
let acc_tag = 2025000;
let accounts = {};
let validation = 0;
let active_acc = 0;
let found = 0;

function signup() {
  let Pin1 = document.getElementById("signupPin1").value;
  let Pin2 = document.getElementById("signupPin2").value;
  let accAge = document.getElementById("signupAge").value;
  let accName = document.getElementById("signupName").value;

  if (Pin1 === Pin2) {
    if (accAge >= 18) {
      accounts[++acc_tag] = {
        name: accName,
        age: accAge,
        pin: Pin1,
        balance: 22000
      };

      alert(`Welcome ${accName}!\nYour unique Account Number is ${acc_tag}`);

      const cardHtml = `
        <div class="card">
          <div>
            <h5 class="card-title text-center">Welcome, <strong>${accName}</strong></h5>
            <p class="card-text text-center"><strong>Account Number:</strong> ${acc_tag}</p>
          </div>
        </div>
      `;
      document.getElementById("output").innerHTML += cardHtml;

    } else {
      alert("You must be 18 or above to Register.");
    }
  } else {
    alert("Pin does not match");
  }
}

function checkBalance() {
  let accNum = document.getElementById("accountNumber").value;

  if ((active_acc != accNum) || (validation == 0)) {
    found = 0;
    for (let i in accounts) {
      if (i == accNum) {
        found = 1;
        let valPin = prompt("Enter Your Pin");
        if (valPin == accounts[i].pin) {
          validation = 1;
          active_acc = i;
          alert(`Welcome ${accounts[i].name}`);
        } else {
          alert("Incorrect Pin");
        }
        break;
      }
    }
    if (found == 0) {
      alert("Account Not Found");
    }
  }
}

// ✅ Show current balance in input box
function showCurrentBalance() {
  if (validation == 1 && accounts[active_acc]) {
    document.getElementById("balance").value = `₹${accounts[active_acc].balance}`;
  } else {
    alert("Please authenticate first!");
  }
}

function tnsn(x) {
  if (validation == 1 && accounts[active_acc]) {
    let amt = parseInt(document.getElementById("amount").value);

    if (x == 0) {
      accounts[active_acc].balance += amt;
      alert("Credited");
    } else if (x == 1) {
      accounts[active_acc].balance -= amt;
      alert("Debited");
    }

    const HcardHtml = `
      <div class="card">
        <div class="text">
          <p class="card-text mb-1"><strong>Acc Number:</strong> ${active_acc}</p>
          <p class="card-text"><strong>${x == 0 ? 'Credited' : 'Debited'}:</strong> ₹${amt}</p>
        </div>
      </div>`;
    document.getElementById("history").innerHTML += HcardHtml;
  } else {
    alert("Access Denied");
  }
}
