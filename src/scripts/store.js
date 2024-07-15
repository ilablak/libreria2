const booksBD = '../json/libreria.json'
import { getJson } from "./libs/getJson.js"
import { componente } from '../components/book.js'

// asociado al input  checked y extrae su valor
function getSelectCategory() {
    const inputChecked = document.querySelectorAll('input:checked')
    const categorySelect = inputChecked[0].nextElementSibling.innerText
    return categorySelect
}

// FILTER filtra el json buscando tag seleccionado
// y guarda las coincidencias en un array  
let librosFiltrados = []
async function filter(param) {
    librosFiltrados = []
    const json = await getJson(param)
    const filterSelected = getSelectCategory()

    let i = 0 // contador de libros en json
    if (filterSelected === 'General') {
        librosFiltrados = json
    } else {
        for (const item of json) {
            i = i + 1
            if (item.tags.includes(filterSelected)) {
                librosFiltrados.push(item)
            }
        }
    }
    console.log(filterSelected)
    console.log(librosFiltrados)
    arquited(librosFiltrados, 4)
}


export function arquited(par1, par2) {
    console.log('dddd')
    const mainContainer = document.getElementById('mainContainer')
    mainContainer.innerHTML = ''
    const containers = Math.ceil(par1.length / par2)
    let x = 0 // contador de libros no tocar

    for (let i = 0; i < containers; i++) {
        // crear un nuevo contenedor
        const newContainer = document.createElement('div');
        newContainer.setAttribute('id', 'flexContainer' + i);
        newContainer.setAttribute('class', 'flexContainer');

        for (let i = par2; i > 0; i--) {
            // crear boxes dentro del contenedor
            const newBox = document.createElement('div');
            newBox.setAttribute('id', 'box' + x);
            newBox.setAttribute('class', 'box');
            const newBook = document.createElement('book-card')
            newBox.appendChild(newBook)
            newContainer.appendChild(newBox);
            x += 1;
        }

        mainContainer.appendChild(newContainer);
    }

    // const out = mainContainer.querySelectorAll('div');
}

const inputs = document.querySelectorAll('input')
for (const item of inputs) {
    item.addEventListener('click', function () { filter(booksBD) })
}
filter(booksBD)