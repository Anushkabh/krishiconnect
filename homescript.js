import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getFirestore, setDoc, addDoc,doc, updateDoc,deleteDoc, getDoc, query, collection, where, getDocs, onSnapshot  } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";



const firebaseConfig = {
    apiKey: "AIzaSyAmVZazd1cBsO5mftadw5HppCKu-JC4GRY",
    authDomain: "krishiconnect-64752.firebaseapp.com",
    databaseURL: "https://krishiconnect-64752-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "krishiconnect-64752",
    storageBucket: "krishiconnect-64752.appspot.com",
    messagingSenderId: "641022690248",
    appId: "1:641022690248:web:0f6761e2847339d69536fd",
    measurementId: "G-4Z04QQF90G"
  };
  firebase.initializeApp(firebaseConfig);

 

var productFormDB = firebase.database().ref("contactForm");

window.listproduct=(e)=>{
    var product = getElementVal("product");
    var category = getElementVal("category");
    var quantity = getElementVal("quantity");
    var unit = getElementVal("unit");
  
    saveProduct(name, emailid, msgContent);
  
  
    //   reset the form
    document.getElementById("productform").reset();
  }
  
  const saveProduct = (name, emailid, msgContent) => {
    var newContactForm = contactFormDB.push();
  
    newProductForm.set({
      name: name,
      emailid: emailid,
      msgContent: msgContent,
    });
  };
  
  const getElementVal = (id) => {
    return document.getElementById(id).value;
  };