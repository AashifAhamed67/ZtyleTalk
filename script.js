const socket = io("http://localhost:3000");

let profilePic = "";

document.getElementById("pic")
.addEventListener("change", function(e){

  const file = e.target.files[0];

  const reader = new FileReader();

  reader.onload = function(){

    profilePic = reader.result;

    const preview =
      document.getElementById("preview");

    preview.src = profilePic;

    preview.style.display = "block";
  };

  reader.readAsDataURL(file);

});

function createAccount(){

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

function sendMessage(){

  const input =
    document.getElementById("message");

  const message = input.value;

  socket.emit("send_message", message);

  input.value = "";
}

socket.on("receive_message", (message) => {

  const chat =
    document.getElementById("chat");

  chat.innerHTML +=
    "<p>" + message + "</p>";

});