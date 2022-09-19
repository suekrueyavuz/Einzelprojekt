import './styles/style.scss';
import * as bootstrap from 'bootstrap';

let button = document.getElementById('button');
let input = document.getElementById('input');
let email = document.getElementById('email');
let password = document.getElementById('password');

button.onclick = validateInput;

function validateInput() {
    if(email.value === "admin@fh.at" && password.value === "admin") {
        alert('You are logged in!');
        window.location.href = 'homepage.html';
    } else {
        alert('Email or password wrong!');
    }
}

