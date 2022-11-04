function countdown(releaseDate,id){
  var countDownDate = new Date(releaseDate).getTime();
  var x = setInterval(function() {
    var now = new Date().getTime();
    var distance = countDownDate - now;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById(id).innerHTML = days + "d " + hours + "h "
    + minutes + "m " + seconds + "s ";
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("demo").innerHTML = "RELEASED";
    }
  }, 1000);
  }
  
    function logInIndex(){


  }

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

function save(event, update) {
  if(update == "1"){
  var uname = document.getElementById("uname1").value;
  var psw = document.getElementById("psw1").value;
  var fname = document.getElementById("fname1").value;
  var lname = document.getElementById("lname1").value;
  var email = document.getElementById("email1").value;
  var dob = document.getElementById("dob1").value;
  var accepted = document.getElementById("accepted1").value;
  var profilePic = document.getElementById("profile-pic1").value;
  }
  else{
  event.preventDefault();
  var uname = document.getElementById("uname").value;
  var psw = document.getElementById("psw").value;
  var fname = document.getElementById("fname").value;
  var lname = document.getElementById("lname").value;
  var email = document.getElementById("email").value;
  var dob = document.getElementById("dob").value;
  var accepted = document.getElementById("accepted").value;
  var profilePic = document.getElementById("profile-pic").value;
  }
  console.log('saving data for ' + uname);
  createCookies(uname, psw, fname, lname, email, dob, accepted, profilePic);
  if (getCookie(uname) != null) {
    console.log("cookie created");
    window.location.replace('/index.html')
  }
  else {
    console.log("cookie not created");
    return
  }
}

function sign(option) {
  document.getElementById("main-section").scrollTop = 0;
  document.getElementById("playlists-not-loggedIn").style.display = "none";
  if (option == "in") {
      document.getElementById("id00").style.display = "none";
      document.getElementById("id01").style.display = "block";
      return
  }
  document.getElementById("id01").style.display = "none";
  document.getElementById("id00").style.display = "block";
  return
}

function updateAccountInfo(event){
  save(event, "1");
  window.location.replace('/index.html')
}

function signUpUser(event){
  save(event, "0");
  return;
}

function checkCredentials(uname, psw) {
  var username = getCookie(uname);
  if (username.length > 0) {
    var list = JSON.parse(username);
    if (list[0] == psw) {
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

    window.location.replace('/index.html')
    logInIndex();
    return 
  } else {
    console.log("user not found");
    return;
  }
}

function getAccountInfo() {
  var username = getCookie("loggedIn").replaceAll('"', '');
  if (username.length > 0) {
    var accountInfo = getCookie(username);
    var list = JSON.parse(accountInfo);
    document.getElementById("uname1").value = username;
    document.getElementById("fname1").value = list[1];
    document.getElementById("lname1").value = list[2];
    document.getElementById("email1").value = list[3];
    document.getElementById("dob1").value = list[4];
    document.getElementById("accepted1").value = list[5];
    document.getElementById("profile-pic1").value = list[6];
    }
  }

  function getProfilePic() {
    var username = getCookie("loggedIn").replaceAll('"', '');
    if (username.length > 0) {
      var accountInfo = getCookie(username);
      var list = JSON.parse(accountInfo);
      document.getElementById("profile").src =  list[6];
      if(document.getElementById("profile2") != null){
      document.getElementById("profile2").src =  list[6];
      }
      if(document.getElementById("profile3") != null){
        document.getElementById("profile3").src =  list[6];
        }
    }
  }

    function getUsername() {
      var username = getCookie("loggedIn").replaceAll('"', '');
      if (username.length > 0) {
        document.getElementById("username").innerHTML = username ;
        }
      }


function audioControl(song, path, image){
  document.getElementById("footer-welcome-message").style.display = "none";
  document.getElementById("footer-audio").style.display = "grid";
  document.getElementById("footer-img").src = image;
  document.getElementById("footer-song-name").innerHTML = song;
  document.getElementById("song").src = path;
  document.getElementById("song").play();
}

function changeFill(id){
  var opt2 = '"FILL" 1, "wght" 400, "GRAD" 0, "opsz" 48';
  var opt3 = '"FILL" 0, "wght" 400, "GRAD" 0, "opsz" 48';
  if(document.getElementById(id).style.fontVariationSettings == opt3){ 
    document.getElementById(id).style.fontVariationSettings = opt2;
    document.getElementById(id + "-song").style.display = "block";
    return
  }
  if(document.getElementById(id).style.fontVariationSettings == opt2){
    document.getElementById(id).style.fontVariationSettings = opt3;
    document.getElementById(id + "-song").style.display = "none";
    return 
  }
    document.getElementById(id).style = "font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48;";
    document.getElementById(id + "-song").style.display = "block";
    return 

}
function selectSong(num){
  var id;
  if(num == 0 ){
    id = "fav-icon-song";
  }
  id = "fav-icon" + num + "-song";

  


}



function listOfSongs() {
  if(getCookie("loggedIn").length > 0){
  var tittle;
  var size =  document.getElementById('all-songs-list').childNodes.length;
  var ul =  document.getElementById("myUL-songs");
  
  for (var i = 1, j=0; i<size; i++, j++) {
      
      tittle = document.getElementById('all-songs-list').childNodes[i].getElementsByTagName("p")[0].innerHTML;

      var entry = document.createElement('li');
      entry.setAttribute("class", "song-list");

      var asset = document.createElement('a');
      asset.setAttribute("class", "song-name");
      asset.setAttribute("onclick", "selectSong('j')");
      asset.textContent = tittle;

      entry.appendChild(asset);
      ul.appendChild(entry);
      i++;
  }
  }
  return
}

function songSearch() {
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById("playlist-song-input");
  filter = input.value.toUpperCase();
  ul = document.getElementById("myUL-songs");
  li = ul.getElementsByClassName("song-list");
  for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByClassName("song-name")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
          li[i].style.display = "";
      } else {
          li[i].style.display = "none";
      }
  }
}

 
function countdown(releaseDate,id){
  var countDownDate = new Date(releaseDate).getTime();
  var x = setInterval(function() {
    var now = new Date().getTime();
    var distance = countDownDate - now;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById(id).innerHTML = days + "d " + hours + "h "
    + minutes + "m " + seconds + "s ";
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("demo").innerHTML = "RELEASED";
    }
  }, 1000);
  }