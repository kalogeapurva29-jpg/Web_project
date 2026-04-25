// =============================
// BOOK APPOINTMENT
// =============================
function bookAppointment(){
let phone = "9699108220";
let message = "Hello, I want to book an appointment for naturopathy treatment.";
let url = "https://wa.me/" + phone + "?text=" + encodeURIComponent(message);
window.open(url, "_blank");
}

// =============================
// OWNER LOGIN
// =============================
function ownerLogin(){
let password = prompt("Enter Owner Password");

if(password === "admin123"){
let panel = document.getElementById("adminPanel");
if(panel) panel.style.display = "block";
loadAdminOffers();
}
else{
alert("Wrong Password");
}
}

// =============================
// PAGE LOAD
// =============================
window.addEventListener("load", function(){
loadOffers();
revealOnScroll();
});

// =============================
// LOAD OFFERS
// =============================
function loadOffers(){

let offers = JSON.parse(localStorage.getItem("offers")) || [];

let track = document.getElementById("offerTrack");

// 🔴 IMPORTANT FIX (avoid errors if element missing)
if(!track) return;

// ✅ if no offers
if(offers.length === 0){
track.innerHTML = `<span class="offer-item">🔥 No offers available</span>`;
return;
}

// build content
let content = "";

offers.forEach(function(offer){
content += `
<span class="offer-item">
<span class="blink">🔥 OFFER</span> ${offer}
</span>
`;
});

// ✅ NO duplication (you removed marquee)
track.innerHTML = content;
}

// =============================
// SCROLL ANIMATION (RIGHT → LEFT)
// =============================
function revealOnScroll(){

let cards = document.querySelectorAll(".service-card");
let windowHeight = window.innerHeight;

cards.forEach(function(card){

let position = card.getBoundingClientRect().top;

if(position < windowHeight - 100){
card.classList.add("show");
}

});
}

window.addEventListener("scroll", revealOnScroll);

// =============================
// ADD OFFER
// =============================
function addOffer(){

let input = document.getElementById("offerText");
let value = input.value.trim();

if(value === ""){
alert("Please enter an offer");
return;
}

let offers = JSON.parse(localStorage.getItem("offers")) || [];

// ✅ prevent duplicate
if(offers.includes(value)){
alert("Offer already exists");
return;
}

offers.push(value);
localStorage.setItem("offers", JSON.stringify(offers));

input.value = "";

loadOffers();
loadAdminOffers();
}

// =============================
// LOAD ADMIN OFFERS
// =============================
function loadAdminOffers(){

let list = document.getElementById("adminList");

// 🔴 important fix
if(!list) return;

list.innerHTML = "";

let offers = JSON.parse(localStorage.getItem("offers")) || [];

offers.forEach(function(offer, index){

let li = document.createElement("li");

let text = document.createElement("span");
text.textContent = offer;

// EDIT BUTTON
let editBtn = document.createElement("button");
editBtn.textContent = "Edit";
editBtn.onclick = function(){
editOffer(index);
};

// DELETE BUTTON
let deleteBtn = document.createElement("button");
deleteBtn.textContent = "Delete";
deleteBtn.onclick = function(){
deleteOffer(index);
};

li.appendChild(text);
li.appendChild(editBtn);
li.appendChild(deleteBtn);

list.appendChild(li);

});
}

// =============================
// DELETE OFFER
// =============================
function deleteOffer(index){

let offers = JSON.parse(localStorage.getItem("offers")) || [];

offers.splice(index, 1);

localStorage.setItem("offers", JSON.stringify(offers));

loadOffers();
loadAdminOffers();
}

// =============================
// EDIT OFFER
// =============================
let editIndex = -1;

function editOffer(index){

let offers = JSON.parse(localStorage.getItem("offers")) || [];

document.getElementById("offerText").value = offers[index];

editIndex = index;
}

// =============================
// UPDATE OFFER
// =============================
function updateOffer(){

let offers = JSON.parse(localStorage.getItem("offers")) || [];

let value = document.getElementById("offerText").value.trim();

if(editIndex === -1){
alert("Select offer to edit");
return;
}

if(value === ""){
alert("Offer cannot be empty");
return;
}

offers[editIndex] = value;

localStorage.setItem("offers", JSON.stringify(offers));

// reset
editIndex = -1;
document.getElementById("offerText").value = "";

// refresh
loadOffers();
loadAdminOffers();
}