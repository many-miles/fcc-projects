const API_URL = 'https://rpg-creature-api.freecodecamp.rocks/api/creature/';

const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const creatureInfo = document.getElementById('creature-info');
const creatureName = document.getElementById('creature-name');
const creatureId = document.getElementById('creature-id');
const weight = document.getElementById('weight');
const height = document.getElementById('height');
const types = document.getElementById('types');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');
const spriteContainer = document.getElementById('sprite-container');


const searchCreature = async () => {
    const searchValue = searchInput.value.trim().toLowerCase();
    
    if (!searchValue) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}${searchValue}`);
        
        if (!response.ok) {
            alert('Creature not found');
            return;
        }

        const data = await response.json();
        displayCreature(data);
    } catch (error) {
        alert('Creature not found');
        console.error('Error fetching creature:', error);
    }
};

const displayCreature = (data) => {
   
    types.innerHTML = '';
    
    creatureName.textContent = data.name.toUpperCase();
    creatureId.textContent = `#${data.id}`;
    weight.textContent = `Weight: ${data.weight}`;
    height.textContent = `Height: ${data.height}`;
    
    const statsMap = {};
    data.stats.forEach(stat => {
        statsMap[stat.name] = stat.base_stat;
    });
    
    hp.textContent = statsMap.hp;
    attack.textContent = statsMap.attack;
    defense.textContent = statsMap.defense;
    specialAttack.textContent = statsMap['special-attack'];
    specialDefense.textContent = statsMap['special-defense'];
    speed.textContent = statsMap.speed;
    
    data.types.forEach(type => {
        const typeElement = document.createElement('span');
        typeElement.className = `type-badge type-${type.name.toLowerCase()}`;
        typeElement.textContent = type.name.toUpperCase();
        types.appendChild(typeElement);
    });
    

    const spriteUrl = `https://rpg-creature-api.freecodecamp.rocks/sprites/${data.id}.png`;
    spriteContainer.innerHTML = `<img src="${spriteUrl}" alt="${data.name}">`;
    
    creatureInfo.classList.remove('hidden');
};

searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    searchCreature();
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        searchCreature();
    }
});