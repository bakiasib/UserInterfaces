function countdown(releaseDate, id) {
  var countDownDate = new Date(releaseDate).getTime();
  var x = setInterval(function () {
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

function logInIndex() {


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
  if (confirm("Are you sure you want to log out?")) {
    document.cookie = "loggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.replace('/index.html')
  }
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
  if (update == "1") {
    var uname = document.getElementById("uname1").value;
    var psw = document.getElementById("psw1").value;
    var fname = document.getElementById("fname1").value;
    var lname = document.getElementById("lname1").value;
    var email = document.getElementById("email1").value;
    var dob = document.getElementById("dob1").value;
    var accepted = document.getElementById("accepted1").value;
    var profilePic = document.getElementById("profile-pic1").value;
  }
  else {
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

function updateAccountInfo(event) {
  save(event, "1");
  window.location.replace('/index.html')
}

function signUpUser(event) {
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
    document.getElementById("profile").src = list[6];
    if (document.getElementById("profile2") != null) {
      document.getElementById("profile2").src = list[6];
    }
    if (document.getElementById("profile3") != null) {
      document.getElementById("profile3").src = list[6];
    }
  }
}

function getUsername() {
  var username = getCookie("loggedIn").replaceAll('"', '');
  if (username.length > 0) {
    document.getElementById("username").innerHTML = username;
  }
}


function audioControl(song, path, image) {
  document.getElementById("footer-welcome-message").style.display = "none";
  document.getElementById("footer-audio").style.display = "grid";
  document.getElementById("footer-img").src = image;
  document.getElementById("footer-song-name").innerHTML = song;
  document.getElementById("song").src = path;
  document.getElementById("song").play();
}

function changeFill(id) {
  var opt2 = '"FILL" 1, "wght" 400, "GRAD" 0, "opsz" 48';
  var opt3 = '"FILL" 0, "wght" 400, "GRAD" 0, "opsz" 48';
  if (document.getElementById(id).style.fontVariationSettings == opt3) {
    document.getElementById(id).style.fontVariationSettings = opt2;
    document.getElementById(id + "-song").style.display = "block";
    return
  }
  if (document.getElementById(id).style.fontVariationSettings == opt2) {
    document.getElementById(id).style.fontVariationSettings = opt3;
    document.getElementById(id + "-song").style.display = "none";
    return
  }
  document.getElementById(id).style = "font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48;";
  document.getElementById(id + "-song").style.display = "block";
  return

}
function selectSong(num) {
  var id;

  id = "fav-icon" + num + "-song";

  if (num == "0") {
    id = "fav-icon-song";
  }

  console.log(id);
  var songName = document.getElementById(id);
  songName.style.display = "block";
  console.log(songName);
  document.getElementById("list-of-chosen").appendChild(songName);
}

function navDropDown(option) {
  document.getElementById("main-section").scrollTop = 0;

  for (var i = 0; i < document.getElementsByClassName("artist").length; i++) {
    document.getElementsByClassName("artist")[i].style.display = "none";
  }
  document.getElementById("playlists-list").style.display = "none";
  document.getElementById("id04").style.display = "none";
  document.getElementById("playlists-loggedIn").style.display = "none";
  if (document.querySelector('[id^="playlist-page-"]') != null) {
    document.querySelector('[id^="playlist-page-"]').style.display = "none";
  }


  if (option == "profile") {
    document.getElementById("id02").style.display = "none";
    document.getElementById("profile-playlists").style.display = "block";
    getUsername();
  }
  if (option == "account") {
    document.getElementById("profile-playlists").style.display = "none";
    document.getElementById("id02").style.display = "block";
    getAccountInfo();
  }

}

function navigateSideBar(page) {

  if (getCookie("loggedIn").length < 2) {
    alert("You need to be logged in to access this page");
    return;
  }
  document.getElementById("main-section").scrollTop = 0;

  for (var i = 0; i < document.getElementsByClassName("artist").length; i++) {
    document.getElementsByClassName("artist")[i].style.display = "none";
  }
  document.getElementById("profile-playlists").style.display = "none";
  document.getElementById("id02").style.display = "none";
  if (document.querySelector('[id^="playlist-page-"]') != null) {
    document.querySelector('[id^="playlist-page-"]').style.display = "none";
  }


  if (page == "home") {
    document.getElementById("id04").style.display = "none";
    document.getElementById("playlists-list").style.display = "none";
    document.getElementById("playlists-loggedIn").style.display = "block";

    return;
  } else if (page == "playlists") {
    document.getElementById("playlists-loggedIn").style.display = "none";
    document.getElementById("id04").style.display = "none";
    document.getElementById("playlists-list").style.display = "block";

    return
  } else if (page == "create") {
    document.getElementById("playlists-loggedIn").style.display = "none";
    document.getElementById("playlists-list").style.display = "none";
    document.getElementById("id04").style.display = "block";
    return
  }
}
function fillPlaylist(songList, playlistName, imgLink) {
  var emptyPage = document.getElementById("empty-page");
  var page = emptyPage.cloneNode(true);
  // var page = document.getElementById("empty-page")
  page.setAttribute("id", "playlist-page-" + playlistName.replaceAll(" ", "-"));
  page.childNodes[1].childNodes[1].childNodes[1].innerHTML = playlistName;
  page.childNodes[1].childNodes[1].childNodes[3].src = imgLink;
  page.childNodes[1].childNodes[1].childNodes[5].innerHTML = "Created by " + getCookie("loggedIn").replaceAll('"', '');
  page.childNodes[1].childNodes[1].childNodes[7].innerHTML = songList.length + " songs";
  var listWithSongs = page.childNodes[1].childNodes[5];
  for (var i = 0; i < songList.length; i++) {
    var songName = document.getElementById(songList[i]);
    songName.style.display = "block";
    listWithSongs.appendChild(songName);
  }
  document.getElementById("main-section").appendChild(page);
}

function showPlaylist(playlistName) {
  document.getElementById("main-section").scrollTop = 0;

  for (var i = 0; i < document.getElementsByClassName("artist").length; i++) {
    document.getElementsByClassName("artist")[i].style.display = "none";
  }

  document.getElementById("playlists-list").style.display = "none";
  document.getElementById("id04").style.display = "none";
  document.getElementById("playlists-loggedIn").style.display = "none";
  document.getElementById("id02").style.display = "none";
  document.getElementById("profile-playlists").style.display = "none";
  document.getElementById("playlist-page-" + playlistName.replaceAll(" ", "-")).style.display = "block";
}
var formId = 0;
function addNewPlaylist(event) {
  event.preventDefault();
  var srcLink = document.getElementById("playlist-pic").value;
  var namePlaylist = document.getElementById("playlist-tittle").value;
  var songList = [];
  for (var j = 0; j < document.getElementById("list-of-chosen").childNodes.length; j++) {
    songList.push(document.getElementById("list-of-chosen").childNodes[j].id);
  }
  var newPlaylist = document.getElementById("empty-playlist");
  var clone = newPlaylist.cloneNode(true);
  clone.setAttribute("id", "playlist-" + namePlaylist.replaceAll(" ", "-"));
  clone.childNodes[1].src = srcLink;
  clone.childNodes[3].innerHTML = namePlaylist;
  clone.style.display = "block";
  for (var i = 0; i < document.getElementsByClassName("playlists-flex-container").length; i++) {
    var newClone = clone.cloneNode(true);
    newClone.setAttribute("id", "playlist-" + namePlaylist.replaceAll(" ", "-") + i);
    newClone.childNodes[1].setAttribute("onclick", "showPlaylist(" + "'" + namePlaylist + "'" + ")");
    document.getElementsByClassName("playlists-flex-container")[i].prepend(newClone);
  }
  fillPlaylist(songList, namePlaylist, srcLink);


  showPlaylist(namePlaylist);

  document.getElementById("playlist-pic").value = "";
  document.getElementById("playlist-tittle").value = "";


}



function listOfSongs() {
  if (getCookie("loggedIn").length > 0) {
    var tittle;
    var size = document.getElementById('all-songs-list').childNodes.length;
    var ul = document.getElementById("myUL-songs");

    for (var i = 1, j = 0; i < size; i++, j++) {

      tittle = document.getElementById('all-songs-list').childNodes[i].getElementsByTagName("p")[0].innerHTML;

      var entry = document.createElement('li');
      entry.setAttribute("class", "song-list");

      var asset = document.createElement('a');
      asset.setAttribute("class", "song-name");
      asset.setAttribute("onclick", "selectSong('" + j + "')");
      asset.textContent = tittle;

      entry.appendChild(asset);
      ul.appendChild(entry);
      i++;
    }
  }
  return
}

function songSearch() {
  document.getElementById("myUL-songs").style.display = "block";
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


function countdown(releaseDate, id) {
  var countDownDate = new Date(releaseDate).getTime();
  var x = setInterval(function () {
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