document.addEventListener('DOMContentLoaded', () => 
    document.getElementById('showMargaritas').addEventListener('click', getMargaritas)
)

function getMargaritas(){
    const drinkLis = document.getElementById('drink-list')
    const info = document.getElementById('info')
    const liked = document.getElementById('likes')
    drinkLis.innerHTML = ''
    info.innerHTML = ''
    liked.innerHTML = ''
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita`)
    .then(resp => resp.json())
    .then(results => {
        console.log('a')
        results.drinks.map(drink => { 
            const ingredients = []
            for (const [key, value] of Object.entries(drink)) {
                console.log(`${key}: ${value}`);
                if (key.startsWith('strIngredient') && value != null) {
                    ingredients.push(value)
                }
                
              }
              console.log(ingredients)
            drinkLis.innerHTML += `
            <ul>
                <a href='#' data-id='${drink.idDrink}' data-name="${drink.strDrink}" data-instructions="${drink.strInstructions}"> ${drink.strDrink}</a>
            </ul>
            `
        })
        clickLinks()
    })
    console.log('b')
}

function clickLinks(){
    const margaritaNames = document.querySelectorAll('ul a')
    margaritaNames.forEach(margarita => 
        margarita.addEventListener('click', displayDrinkInfo)
        )
}

function displayDrinkInfo(e){
    const a = e.target
    const drinkName = document.getElementById('drink-list')
    const instructions = document.getElementById('info')
    const btn = document.createElement('button')
    btn.setAttribute('id', 'buttons')
    btn.innerText = "like"
    drinkName.innerHTML = `<h2>${a.dataset.name}</hr>`
    instructions.innerHTML = `<p>${a.dataset.instructions}</p>`  
    instructions.appendChild(btn)
    btn.addEventListener('click', btnLike())
}

function btnLike(){
    let p = document.createElement('p')
    let container = document.getElementById('likes')
    let likeBtn = document.getElementById('buttons')
    likeBtn.addEventListener('click', () => container.appendChild(p),
    p.innerHTML = "You liked this!")
}