// APIs that are to be used for this project 
// Use the endpoint https://pokeapi-proxy.freecodecamp.rocks/api/pokemon to see a list of all valid Pokémon names, id numbers, and URLs.
// Use the endpoint https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/{name-or-id} to get data for a Pokémon, where {name-or-id} is the Pokémon's name or id number.


// Select elements
const pokemonID = document.getElementById('pokemon-id');
const pokemonName = document.getElementById('pokemon-name');
const spriteContainer = document.getElementById('sprite-container');
const types = document.getElementById('types');
const height = document.getElementById('height');
const weight = document.getElementById('weight');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');

let slideIndex = 0; // Start at the first slide
showSlides(); // Call the function to show the slides

function showSlides() {
    let slides = document.getElementsByClassName("slide");
    
    // Loop through all slides and set them to display none
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }

    slideIndex++; // Increment the slide index
    if (slideIndex > slides.length) {
        slideIndex = 1; // Reset to the first slide
    }

    slides[slideIndex - 1].style.display = "block"; // Display the current slide
    setTimeout(showSlides, 3000); // Change slide every 5 seconds
}


// Function to fetch and display Pokémon info
const getPokemon = async (nameOrId) => {
    try {
        const response = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${nameOrId}`);
        if (!response.ok) {
            throw new Error('Pokémon not found');
        }
        const data = await response.json();
        displayPokemonInfo(data);
    } catch (error) {
        resetDisplay();
        alert(error.message);
    }
};

// Function to display Pokémon info
const displayPokemonInfo = (data) => {
    pokemonName.textContent = `${data.name.toUpperCase()}`;
    pokemonID.textContent = `#${data.id}`;
    weight.textContent = `Weight: ${data.weight}`;
    height.textContent = `Height: ${data.height}`;
    spriteContainer.innerHTML = `
      <img id="sprite" src="${data.sprites.front_default}" alt="${data.name} front default sprite">
    `;
    hp.textContent = data.stats[0].base_stat;
    attack.textContent = data.stats[1].base_stat;
    defense.textContent = data.stats[2].base_stat;
    specialAttack.textContent = data.stats[3].base_stat;
    specialDefense.textContent = data.stats[4].base_stat;
    speed.textContent = data.stats[5].base_stat;
    types.innerHTML = data.types
      .map(obj => `<span class="type ${obj.type.name}">${obj.type.name}</span>`)
      .join('');
};

// Function to reset display
const resetDisplay = () => {
    const sprite = document.getElementById('sprite');
    if (sprite) sprite.remove();

    pokemonName.textContent = '';
    pokemonID.textContent = '';
    types.innerHTML = '';
    height.textContent = '';
    weight.textContent = '';
    hp.textContent = '';
    attack.textContent = '';
    defense.textContent = '';
    specialAttack.textContent = '';
    specialDefense.textContent = '';
    speed.textContent = '';
};

// Event listeners
searchButton.addEventListener('click', () => {
    const input = searchInput.value.toLowerCase().trim();
    getPokemon(input);
});

// Handle form submission to prevent default behaviordocument.addEventListener('DOMContentLoaded', () => {
    document.getElementById('search-input').addEventListener('submit', (e) => {
        e.preventDefault();
        const input = searchInput.value.toLowerCase().trim();
        getPokemon(input);
    });




