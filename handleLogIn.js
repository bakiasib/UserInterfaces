

function createCookies(uname, psw, fname, lname, email, dob, accepted, profilePic) {
  console.log("creatig cookies")
  const d = new Date();
  d.setTime(d.getTime() + (1 * 24 * 60 * 60 * 1000));
  let expires = "expires=" + d.toUTCString();
  var list = [psw, fname, lname, email, dob, accepted, profilePic];
  document.cookie = uname + "=" + JSON.stringify(list) + ";" + expires + ";path=/";
  return
}


function createACookie(uname) {
  console.log("creatig cookies")
  const d = new Date();
  d.setTime(d.getTime() + (1 * 24 * 60 * 60 * 1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = "loggedIn" + "=" + JSON.stringify(uname) + ";" + expires + ";path=/";
  return
}

function logOut() {
  if(confirm("Are you sure you want to log out?")) {
    document.cookie = "loggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.replace('/index.html')}
  return;
}


function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function clearInfo() {
  document.getElementById("uname").value = "";
  document.getElementById("fname").value = "";
  document.getElementById("lname").value = "";
  document.getElementById("email").value = "";
  document.getElementById("dob").value = "";
  document.getElementById("accepted").value = "";
  document.getElementById("profile-pic").value = "";
}

function save(event) {
  event.preventDefault();
  var uname = document.getElementById("uname").value;
  var psw = document.getElementById("psw").value;
  var fname = document.getElementById("fname").value;
  var lname = document.getElementById("lname").value;
  var email = document.getElementById("email").value;
  var dob = document.getElementById("dob").value;
  var accepted = document.getElementById("accepted").value;
  var profilePic = document.getElementById("profile-pic").value;
  console.log('saving data for ' + uname);
  createCookies(uname, psw, fname, lname, email, dob, accepted, profilePic);
  if (getCookie(uname) != null) {
    console.log("cookie created");
    window.location.replace('/loggedIn.html')
  }
  else {
    console.log("cookie not created");
    return
  }
}
function updateAccountInfo(event){
  save(event);
  window.location.replace('/loggedIn.html')

}
function signUpUser(event){
  save(event);
  window.location.replace('/logIn.html')

}

function checkCredentials(uname, psw) {
  var username = getCookie(uname);
  if (username.length > 0) {
    var list = JSON.parse(username);
    if (list[0] == psw) {
      console.log("correct password");
      return true;
    }
    else {
      console.log("incorrect password");
      return false;
    }
  }
  else {
    console.log("username not found");
    return false;
  }
}

function checkCookie(event) {
  event.preventDefault();
  var user = checkCredentials(document.getElementsByName("uname")[0].value, document.getElementsByName("psw")[0].value);
  if (user == true) {
    console.log("user found");
    createACookie(document.getElementsByName("uname")[0].value);
    window.location.replace('/loggedIn.html')
  } else {
    console.log("user not found");
    return;
  }
}

function getAccountInfo() {
  var username = getCookie("loggedIn").replaceAll('"', '');
  console.log(username);
  if (username.length > 0) {
    var accountInfo = getCookie(username);
    var list = JSON.parse(accountInfo);
    document.getElementById("uname").value = username;
    document.getElementById("fname").value = list[1];
    document.getElementById("lname").value = list[2];
    document.getElementById("email").value = list[3];
    document.getElementById("dob").value = list[4];
    document.getElementById("accepted").value = list[5];
    document.getElementById("profile-pic").value = list[6];
    }
  }

  function getProfilePic() {
    var username = getCookie("loggedIn").replaceAll('"', '');
    console.log(username);
    if (username.length > 0) {
      var accountInfo = getCookie(username);
      var list = JSON.parse(accountInfo);
      document.getElementById("profile").src =  list[6];
      document.getElementById("profile2").src =  list[6];
      }
    }

    function getUsername() {
      var username = getCookie("loggedIn").replaceAll('"', '');
      console.log(username);
      if (username.length > 0) {
        document.getElementById("username").innerHTML = username ;
        }
      }

function getAccountInfo2() {
  getProfilePic();
  getUsername();
}


  