const pokeGrid = document.querySelector('.pokeGrid')
const loadButton = document.querySelector('.loadPokemon')
const fetchButton = document.querySelector('#fetchSelectedPokemon')
const newButton = document.querySelector('#newPokemon')

const dialog = document.querySelector('.modal')
const closeButton = document.querySelector('.modal-close')
const modalBackground = document.querySelector('.modal-background')
const submitButton = document.querySelector('#submitButton')

//let inputValue

//closeButton.addEventListener('click', () => {
//    dialog.classList.toggle("is-active")
//})
//
//modalBackground.addEventListener('click', () => {
//    dialog.classList.toggle("is-active")
//})
//

loadButton.addEventListener('click', () => {
    loadPage()
})

class Pokemon {
    constructor (name, height, weight, abilities, moves, held_items, types) {
        this.id = 900
        this.name = name,
        this.height = height
        this.weight = weight
        this.abilities = abilities
        this.moves = moves
        this.held_items = held_items
        this.types = types
    }
}

newButton.addEventListener('click', () => {
    let pokeName = prompt('What is the name of your new Pokemon?')
    let pokeHeight = prompt('What is the height of your new Pokemon?')
    let pokeWeight = prompt('What is the weight of your new Pokemon?')
    let pokeAbilities = prompt('What are the abilities that your new Pokemon has? Use commas to seperate.')
    let pokeMoves = prompt("What are the moves that your new Pokemon has? If your Pokemon has multiple moves, use commas to seperate.")
    let pokaHeld_items = prompt("What are the hidden items that your new Pokemon has? If your Pokemon has multiple hidden items, use commas to seperate.")
    let abilitiesArray = getAbilitiesArray(pokeAbilities)
    let movesArray = getMovesArray(pokeMoves)
    let held_itemsArray = getHeld_itemsArray(pokaHeld_items)
    let newPokemon = new Pokemon(
        pokeName,
        pokeHeight,
        pokeWeight,
        abilitiesArray,
        movesArray,
        held_itemsArray,
//        [
//            {
//                move: {
//                    name: pokeMove
//                }
//            }
//        ],
        [{
            type: {
            name: 'normal',
            },
        },
        ],
    )
    //console.log(newPokemon)
    populatePokeCard(newPokemon)
})

function getAbilitiesArray(commaString) {
    let tempArray = commaString.split(',')
    return tempArray.map((abilityName) => {
        return {
            ability: {
                name: abilityName
            }
        }
    })
}

function getMovesArray(commaString) {
    let tempArray = commaString.split(',')
    return tempArray.map((movesName) => {
        return {
            moves: {
                name: movesName
            }
        }
    })
}

function getHeld_itemsArray(commaString) {
    let tempArray = commaString.split(',')
    return tempArray.map((held_itemsName) => {
        return {
            held_items: {
                name: held_itemsName
            }
        }
    })
}

fetchButton.addEventListener('click', () => {
    let pokeNameOrId = prompt("Enter Pokemon ID or Name:").toLowerCase()
    console.log(pokeNameOrId)
    getAPIData(`https://pokeapi.co/api/v2/pokemon/${pokeNameOrId}`).then(
        (data) => {
            populatePokeCard(data)
        }
    )
})

//submitButton.addEventListener('click', () => {
//    console.log(inputValue)
//    let inputField = document.querySelector('.input')
//    inputValue = inputField.value
//    //console.log(inputValue)
//} )

async function getAPIData(url){
    try{
        const response = await fetch(url)
        const data = await response.json()
        return data
    } 
    
    catch (error){
        console.log(error)
    }
}

function loadPage(){
    const response = getAPIData(`https://pokeapi.co/api/v2/pokemon?limit=25&offset=150`).then(
        async(data)=> {
            for (const singlePokemon of data.results) {
                await getAPIData(singlePokemon.url).then(
                    (pokeData) => populatePokeCard(pokeData)
                )
                
            }
        }
    )
    //console.log(response)
}

function populatePokeCard(singlePokemon){
    //console.log(singlePokemon)
    let pokeScene = document.createElement('div')
    pokeScene.className = 'scene'
    let pokeCard = document.createElement('div')
    pokeCard.className = 'card'
    pokeCard.addEventListener('click', () => {
        pokeCard.classList.toggle('is-flipped')
    })
    pokeCard.appendChild(populateCardFront(singlePokemon))
    pokeCard.appendChild(populateCardBack(singlePokemon))
    pokeScene.appendChild(pokeCard)
    pokeGrid.appendChild(pokeScene)
}


function populateCardFront (pokemon) {
    console.log(pokemon)
    let pokeFront = document.createElement('div')
    pokeFront.className = 'card_face card_face--front'
    let frontLabel = document.createElement('p')
    frontLabel.textContent = pokemon.name
    let frontImage = document.createElement('img')
    frontImage.src = getImageFileName(pokemon)
    
    frontImage.addEventListener('error', (err) => {
        //console.log(`broken image: ${err}`)
        frontImage.src = 'images/pokeball.png'
    })
    
//    let pokeType1 = pokemon.types[0].type.name
//    if(pokemon.types.length > 1) {
//        let pokeType2 = pokemon.types[1].type.name
//        pokeFront.style.setProperty('background', `linear-gradient( ${getPokeTypeColor(pokeType1)}, ${getPokeTypeColor(pokeType2)})`)
//    } else {
//        pokeFront.style.setProperty('background', getPokeTypeColor(pokeType1))
//    }

    //console.log(getPokeTypeColor(pokeType))


    
    //pokeFront.classList.add(pokeType)
    
    pokeFront.appendChild(frontLabel)
    pokeFront.appendChild(frontImage)
    return pokeFront
}

function populateCardBack(pokemon) {
    let pokeBack = document.createElement('div')
    pokeBack.className = 'card_face card_face--back'
    let backLabel = document.createElement('h3')
    backLabel.textContent = `Moves: ${pokemon.moves.length}`
    pokeBack.appendChild(backLabel)
    
    let typeLabel = document.createElement('h3')
    typeLabel.textContent = "Types:"
    pokeBack.appendChild(typeLabel)
    
    pokemon.types.forEach((pokeType) => {
        let backType = document.createElement('p')
        backType.textContent = pokeType.type.name
        pokeBack.appendChild(backType)
    })
    
    let abilityLabel = document.createElement('h3')
    abilityLabel.textContent = "Abilities:"
    pokeBack.appendChild(abilityLabel)
    pokemon.abilities.forEach((pokeAbility) => {
        let ability = document.createElement('p')
        ability.textContent = pokeAbility.ability.name
        pokeBack.appendChild(ability)
    })
    
    let backItemsLabel = document.createElement('h3')
    backItemsLabel.textContent = `Held Items: ${pokemon.held_items.length}`
    pokeBack.appendChild(backItemsLabel)
    
    let pokeType1 = pokemon.types[0].type.name
    if(pokemon.types.length > 1) {
        let pokeType2 = pokemon.types[1].type.name
        pokeBack.style.setProperty('background', `linear-gradient( ${getPokeTypeColor(pokeType1)}, ${getPokeTypeColor(pokeType2)})`)
    } else {
        pokeBack.style.setProperty('background', getPokeTypeColor(pokeType1))
    }
    
    return pokeBack
}

function getImageFileName(pokemon) {
    let pokeId
    if (pokemon.id < 10) pokeId = `00${pokemon.id}`
    if (pokemon.id > 9 && pokemon.id < 100) pokeId= `0${pokemon.id}`
    if (pokemon.id > 99 && pokemon.id < 810) pokeId = pokemon.id
    if (pokemon.id === 900){
        return `images/pokeball.png`
    }
    return `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${pokeId}.png`
}


function getPokeTypeColor(pokeType) {
    let color
    switch (pokeType) {
        case 'grass':
            color = '#9fdf9f'
            break;
            
        case 'fire':
            color = '#ff4500'
            break;
            
        case 'water':
            color = '#0066ff'
            break;
            
        case 'bug':
            color = '#b3b3ff'
            break;
            
        case 'flying':
            color = '#00bfff'
            break;
            
        case 'electric':
            color = '#3333ff'
            break;
            
        case 'poison':
            color = '#990073'
            break;
            
        case 'psychic':
            color = '#bf80ff'
            break;
            
        case 'normal':
            color = '#ffb399'
            break;
            
        default:
            color ='#e0ebeb'
    }
    return color
}































