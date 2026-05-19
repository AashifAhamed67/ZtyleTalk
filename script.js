const socket = io("http://localhost:3000");

let profilePic = "";

/* TABS */

function showTab(tabId){

  document.querySelectorAll(".tab")
  .forEach(tab => {
    tab.classList.add("hidden");
  });

  document.getElementById(tabId)
  .classList.remove("hidden");
}

/* LOAD USER */

window.onload = () => {

  const user =
  JSON.parse(localStorage.getItem("user"));

  if(user){

    document.getElementById("code")
    .innerHTML =
    "Your Code: " + user.code;

  }

  loadContacts();
};

/* PROFILE PIC */

document.getElementById("pic")
.addEventListener("change", (e) => {

  const file = e.target.files[0];

  const reader = new FileReader();

  reader.onload = () => {

    profilePic = reader.result;

    document.getElementById("preview").src =
    profilePic;

  };

  reader.readAsDataURL(file);

});

/* ACCOUNT */

function createAccount(){

  let existing =
  JSON.parse(localStorage.getItem("user"));

  if(existing){

    alert("Account already exists");

    return;
  }

  const name =
  document.getElementById("name").value;

  const code =
  Math.floor(100000 + Math.random() * 900000);

  const user = {
    name:name,
    code:code,
    profilePic:profilePic
  };

  localStorage.setItem(
    "user",
    JSON.stringify(user)
  );

  document.getElementById("code")
  .innerHTML =
  "Your Code: " + code;

}

/* CONTACTS */

function addContact(){

  const code =
  document.getElementById("contactCode").value;

  if(code.length !== 6){

    alert("Invalid Code");

    return;
  }

  let contacts =
  JSON.parse(localStorage.getItem("contacts"))
  || [];

  if(contacts.includes(code)){

    alert("Already Added");

    return;
  }

  contacts.push(code);

  localStorage.setItem(
    "contacts",
    JSON.stringify(contacts)
  );

  loadContacts();

}

function loadContacts(){

  const list =
  document.getElementById("contactsList");

  list.innerHTML = "";

  let contacts =
  JSON.parse(localStorage.getItem("contacts"))
  || [];

  contacts.forEach(contact => {

    list.innerHTML +=
    `
    <div class="contact">
      Contact Code: ${contact}
    </div>
    `;

  });

}

/* CHAT */

function sendMessage(){

  const input =
  document.getElementById("message");

  const message = input.value;

  socket.emit("send_message", message);

  input.value = "";

}

socket.on("receive_message", (message) => {

  const chat =
  document.getElementById("chatBox");

  chat.innerHTML +=
  `
  <div class="message">
    ${message}
  </div>
  `;

});