let profilePic = "";

document.getElementById("pic").addEventListener("change", function(e){

  const file = e.target.files[0];

  const reader = new FileReader();

  reader.onload = function(){

    profilePic = reader.result;

    const preview = document.getElementById("preview");

    preview.src = profilePic;

    preview.style.display = "block";
  };

  reader.readAsDataURL(file);

});

function createAccount(){

  const name = document.getElementById("name").value;

  if(name === ""){

    alert("Enter your name");

    return;
  }

  const code = Math.floor(100000 + Math.random() * 900000);

  const user = {
    name:name,
    code:code,
    profilePic:profilePic
  };

  localStorage.setItem("user", JSON.stringify(user));

  document.getElementById("code").innerHTML =
    "Your Code: " + code;
}