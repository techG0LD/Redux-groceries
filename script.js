const groceryList = document.getElementById('list')
const groceryInput = document.getElementById('newItem')
const addGroceryBtn = document.getElementById('addGrocery')
const clearBtn = document.getElementById('clear')


//store inital state
const initialState = {
    groceries:[]
}


//reducer
const reducer = (state = initialState,action) => {
    switch(action.type){
        case 'groceries/clear':
            return initialState
        case 'groceries/add':
            return {groceries: [...state.groceries, action.payload]}
        default:
            return state
    }
}


//create store
let store = Redux.createStore(reducer)

//Dispatch functions

const clearList = () => {
    groceryInput.value = ''
    store.dispatch({type:'groceries/clear'})
}


const newGrocery = (e) => {
    e.preventDefault()
    store.dispatch({type:'groceries/add', payload: groceryInput.value})
}

//event listeners

addGroceryBtn.addEventListener('click',newGrocery)
clearBtn.addEventListener('click',clearList)

//render data

const renderList= () => {
    const state = store.getState()
    while(groceryList.firstChild){
        groceryList.removeChild(groceryList.firstChild)
    }
    state.groceries.forEach(grocery => {

        let li = document.createElement('li')

        groceryList.appendChild(li)

        li.textContent = grocery

    })
}

//Subscribe
store.subscribe(renderList)

