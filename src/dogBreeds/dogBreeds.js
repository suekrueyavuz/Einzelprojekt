import '../styles/style.scss';
import * as bootstrap from 'bootstrap';

let allBreedsTable = document.getElementById('tableBody');
let selectedBreedTable = document.getElementById('tableBodySelectedBreed');
const urlAllBreeds = 'https://dog.ceo/api/breeds/list/all';

getAllBreedsRequest();

async function getAllBreedsRequest() {
    await fetch(urlAllBreeds).then(function (response) {
	    return response.json();
    }).then(function (data) {
        fillInTable(JSON.stringify(data.message));
    }).catch(function (err) {
	    console.warn('Something went wrong.', err);
    });
}

function fillInTable(data) {
    for(const breed in JSON.parse(data)) {
        let row = allBreedsTable.insertRow(-1);
        let cell = row.insertCell(0);
        let cellImage = row.insertCell(1);

        let favoritesList = JSON.parse(localStorage.getItem('favorites'))
        
        if(favoritesList === null) {
            favoritesList = [];
        } else {
            if(favoritesList.includes(breed)) {
                insertLikeImageIfBreedIsFavorite(cellImage);
            }
        }

        let breedName = breed.charAt(0).toUpperCase() + breed.slice(1)
        cell.innerHTML = breedName;
        cell.setAttribute('id', breed);
        row.addEventListener('click', function() { 
            getImageByBreedRequest(breed);
        }, false);
    }
}

function insertLikeImageIfBreedIsFavorite(cell) {
    const img = new Image();
    img.src = 'https://www.nicepng.com/png/detail/170-1704470_like-love-heart-like-love-heart-instagram-heart.png';
    img.style.width = '1rem';
    cell.appendChild(img);
}

function getImageByBreedRequest(breedName) {
    let urlImage = 'https://dog.ceo/api/breed/'+breedName+'/images/random';
    fetch(urlImage).then(function (response) {
	    return response.json();
    }).then(function (data) {
        showImageOfDog(data.message, breedName);
    }).catch(function (err) {
	    console.warn('Something went wrong.', err);
    });
} 

function showImageOfDog(data, breedName) {
    document.getElementById('imageOfSelectedDog').innerHTML = '';
    document.getElementById('button').innerHTML = '';

    const img = new Image(100, 200);
    img.src = data;
    img.style.width = 'auto';
    img.style.height = 'auto';
    img.style.maxWidth = '50%';
    img.style.maxHeight = '50%';
    img.setAttribute('class', 'img-fluid');
    img.style.position = 'fixed';

    let button = document.createElement('button');
    button.innerHTML = 'Add to favorites';
    button.style.position = 'fixed';
    button.addEventListener('click', function() { 
        addToFavorites(breedName); 
    }, false);

    document.getElementById('button').appendChild(button);
    document.getElementById('imageOfSelectedDog').appendChild(img);
}

function addToFavorites(breedName) {
    if (localStorage.getItem('favorites') === null) {
        let favorites = [breedName];
        localStorage.setItem('favorites', JSON.stringify(favorites));
        updateTable(breedName);
        alert(breedName + ' added to the favorites list!')
    } else {
        if(!checkIfBreedIsInFavoritesList(breedName)) {
            let currentFavorites = JSON.parse(localStorage.getItem('favorites'));
            currentFavorites.push(breedName);
            localStorage.setItem('favorites', JSON.stringify(currentFavorites));
            updateTable(breedName);
            alert(breedName + ' added to the favorites list!')
        } else {
            alert(breedName + ' is already in your favorites list!');
        }
    }
}

function updateTable(breedName) {
    for(let i=0; i<allBreedsTable.rows.length; i++) {
        let breedNameFromTable = allBreedsTable.rows[i].cells[0].innerHTML;
        breedNameFromTable = breedNameFromTable.charAt(0).toLowerCase() + breedNameFromTable.slice(1);
        if(breedName === breedNameFromTable) {
            insertLikeImageIfBreedIsFavorite(allBreedsTable.rows[i].cells[1]);
        }
    }
}

function checkIfBreedIsInFavoritesList(breedName) {
    let favoritesList = JSON.parse(localStorage.getItem('favorites'));
    for(let i=0; i<=favoritesList.length; i++) {
        if(favoritesList[i] === breedName) {
            return true;
        }
    }
    return false;
}