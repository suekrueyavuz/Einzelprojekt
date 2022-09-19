import '../styles/style.scss';
import * as bootstrap from 'bootstrap';

let favoriteBreedsTable = document.getElementById('tableBody');
let editButton = document.getElementById('edit');

fillInTable();
editButton.onclick = showCheckBoxes;

function fillInTable() {
    let favoriteBreeds = JSON.parse(localStorage.getItem('favorites'));
    for(let i=0; i<favoriteBreeds.length; i++) {
        let row = favoriteBreedsTable.insertRow(-1);
        let cell = row.insertCell(0);
        row.insertCell(1);
        let breedName = favoriteBreeds[i].charAt(0).toUpperCase() + favoriteBreeds[i].slice(1)
        cell.innerHTML = breedName;
        cell.setAttribute('id', breedName);
    }
}

function showCheckBoxes() {
    if(editButton.innerHTML === 'Edit') {
        for(let i=0; i<favoriteBreedsTable.rows.length; i++) {
            let checkbox = document.createElement("INPUT");
            checkbox.setAttribute("type", "checkbox");
            checkbox.setAttribute("class", "removeCheckbox");
            let breedName = favoriteBreedsTable.rows[i].cells[0].innerHTML.charAt(0).toLowerCase() + favoriteBreedsTable.rows[i].cells[0].innerHTML.slice(1)
            checkbox.setAttribute("value", breedName);
            favoriteBreedsTable.rows[i].cells[1].appendChild(checkbox);
        }
        editButton.innerHTML = 'Remove';
    } else if(editButton.innerHTML === 'Remove') {
        let elementsToRemove = getSelectedBreedsToRemove();
        removeBreedFromFavorites(elementsToRemove);

        for(let i=0; i<favoriteBreedsTable.rows.length; i++) {
            favoriteBreedsTable.rows[i].cells[1].innerHTML = '';
        }

        editButton.innerHTML = 'Edit';
        window.location.reload();
    }
}

function removeBreedFromFavorites(breedsToRemoveList) {
    let favoriteBreeds = JSON.parse(localStorage.getItem('favorites'));

    let newListFavoriteBreeds = favoriteBreeds.filter(v => {
        return !breedsToRemoveList.includes(v);
    })

    localStorage.setItem('favorites', JSON.stringify(newListFavoriteBreeds));
}

function getSelectedBreedsToRemove() {
    let elementsToRemove = [];
    let inputElements = document.getElementsByClassName('removeCheckbox');
    for(let i=0; inputElements[i]; i++) {
        if(inputElements[i].checked) {
            elementsToRemove.push(inputElements[i].value);
        }
    }
    return elementsToRemove;
}
