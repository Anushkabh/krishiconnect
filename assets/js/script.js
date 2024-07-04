// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js';
import {
  getFirestore,
  setDoc,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
  query,
  collection,
  where,
  getDocs,
  onSnapshot,
} from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAmVZazd1cBsO5mftadw5HppCKu-JC4GRY',
  authDomain: 'krishiconnect-64752.firebaseapp.com',
  databaseURL:
    'https://krishiconnect-64752-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'krishiconnect-64752',
  storageBucket: 'krishiconnect-64752.appspot.com',
  messagingSenderId: '641022690248',
  appId: '1:641022690248:web:0f6761e2847339d69536fd',
  measurementId: 'G-4Z04QQF90G',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

// Get elements by ID
var email = document.getElementById('email');
var password = document.getElementById('pass');
var fname = document.getElementById('fname');
var lname = document.getElementById('lname');
var username = '';

// Signup function
window.signup = (e) => {
  e.preventDefault();
  var obj = {
    fname: fname.value,
    lname: lname.value,
    email: email.value,
    password: password.value,
  };

  createUserWithEmailAndPassword(auth, obj.email, obj.password)
    .then(function (success) {
      alert('Signup Successful');
      username = obj.email;
      addDoc(collection(db, username), {});
    })
    .catch(function (err) {
      alert('Error: ' + err);
    });
  console.log(obj);
};

// Login function
var userid = document.getElementById('User1');
var pass = document.getElementById('pass1');

window.login = (e) => {
  e.preventDefault();
  var obj2 = {
    email: userid.value,
    password: pass.value,
  };

  signInWithEmailAndPassword(auth, obj2.email, obj2.password)
    .then(function (userCredential) {
      alert('Login successful');
      window.location.href = 'home.html';
      username = obj2.email;
    })
    .catch(function (err) {
      alert('Error: ' + err);
    });
};

// Logout function
window.logout = (e) => {
  signOut(auth)
    .then(() => {
      window.location.href = 'login.html';
    })
    .catch((error) => {
      alert('Error: ' + error);
    });
};

// Auth state change listener
onAuthStateChanged(auth, (user) => {
  if (user) {
    username = user.email;
    getAllData(username);
  }
});

// Initialize Cloud Firestore
var pNo = 0;

var submitform = document.getElementById('submitform');
submitform.addEventListener('click', (e) => {
  e.preventDefault();
  var product = document.getElementById('Product').value;
  var category = document.getElementById('category').value;
  var quantity = document.getElementById('quantity').value;
  var unit = document.getElementById('unit').value;

  addDoc(collection(db, username), {
    product: product,
    category: category,
    quantity: quantity,
    unit: unit,
    sold: 0,
  });

  alert('Product added');
});

var stdNo = 0;
var tbody = document.getElementById('tbody1');

function addItem(product, category, quantity, unit, id, sold) {
  var trow = document.createElement('tr');
  var td1 = document.createElement('td');
  var td2 = document.createElement('td');
  var td3 = document.createElement('td');
  var td4 = document.createElement('td');
  var td5 = document.createElement('td');
  var td6 = document.createElement('td');

  td1.innerHTML = ++stdNo;
  td2.innerHTML = product;
  td3.innerHTML = category;
  td4.innerHTML = quantity;
  td5.innerHTML = unit;
  td6.innerHTML = sold;

  trow.appendChild(td1);
  trow.appendChild(td2);
  trow.appendChild(td3);
  trow.appendChild(td4);
  trow.appendChild(td5);
  trow.appendChild(td6);

  tbody.appendChild(trow);
}

function allItem(productlist) {
  stdNo = 0;
  tbody.innerHTML = '';
  productlist.forEach((element) => {
    addItem(
      element.product,
      element.category,
      element.quantity,
      element.unit,
      element.id,
      element.sold
    );
  });
}

var users = [];
async function getAllData(username) {
  users = [];
  const docSnap = await getDocs(collection(db, username));
  docSnap.forEach((doc) => {
    users.push({ ...doc.data(), id: doc.id });
  });
  allItem(users);
}

window.Deleterow = (id) => {
  deleteDoc(doc(db, username, id));
};

// Weather API call
const weatherUrl =
  'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=Delhi';
const weatherOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'f00852dd75msh30e9d9e37fb9613p1b22c6jsn063d05d7d46d',
    'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com',
  },
};

try {
  const weatherResponse = await fetch(weatherUrl, weatherOptions);
  const weatherResult = await weatherResponse.json();
  document.getElementById('temp').innerHTML = weatherResult.temp;
  document.getElementById('feels_like').innerHTML = weatherResult.feels_like;
  document.getElementById('min_temp').innerHTML = weatherResult.min_temp;
  document.getElementById('max_temp').innerHTML = weatherResult.max_temp;
  document.getElementById('cloud_pct').innerHTML = weatherResult.cloud_pct;
  document.getElementById('humidity').innerHTML = weatherResult.humidity;
} catch (error) {
  console.error('Weather API Error: ', error);
}

// News API call
const newsUrl =
  'https://news-api14.p.rapidapi.com/top-headlines?country=in&language=en&pageSize=10&category=agro';
const newsOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'f00852dd75msh30e9d9e37fb9613p1b22c6jsn063d05d7d46d',
    'X-RapidAPI-Host': 'news-api14.p.rapidapi.com',
  },
};

try {
  const newsResponse = await fetch(newsUrl, newsOptions);
  const newsResult = await newsResponse.json();
  const articles = newsResult.articles;
  document.getElementById('news').innerHTML = articles[0].title;
  document.getElementById('news2').innerHTML = articles[1].title;
  document.getElementById('news3').innerHTML = articles[2].title;
  document.getElementById('news4').innerHTML = articles[3].title;
  document.getElementById('news5').innerHTML = articles[4].title;
} catch (error) {
  console.error('News API Error: ', error);
}
