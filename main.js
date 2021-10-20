console.log("start");


const BASE_API_URL = 'https://api.thedogapi.com/v1'

const fetchDoggoBreeds = async () => {
 
    const response = await fetch(BASE_API_URL + '/breeds');
    const dogBreeds = await response.json();
    populateDoggoSelect(dogBreeds);
 
}



const populateDoggoSelect = (breeds) =>{
 const select = document.querySelector('.breed-select');
 const breedOptions = breeds.map(breed => { 
    const option = document.createElement('option');
    option.text = breed.name;
    option.value = breed.id;
    return option;
 })

 breedOptions.forEach(breedOption => {
     select.appendChild(breedOption);
 })
}

const fillDoggoImage= (imageUrl) =>{
    document.querySelector('#doggo-image').setAttribute('src', imageUrl);
}

const createDescriptionEntry = ({label,value}) =>{
    const descriptionTerm = document.createElement('td');
    descriptionTerm.textContent = label;
    const descriptionValue = document.createElement('dd');
    descriptionValue.textContent = value;
    const parentElement = document.querySelector('#doggo-description');
    parentElement.appendChild(descriptionTerm);
    parentElement.appendChild(descriptionValue);
}

const clearDoggoDescription = () =>{
    const descriptionElement = document.
    querySelector('#doggo-description');
    
    while(descriptionElement.firstChild){
        descriptionElement.removeChild(descriptionElement.firstChild);
    }
}

//todos itens
const fillDoggoDescription= ({bred_for: bredFor, breed_group: Group, name, temperament, life_span: lifeSpan, origin, height, weight}) =>{

    
    clearDoggoDescription();    
    createDescriptionEntry({
       label:'Name',
       value: name
   })
   createDescriptionEntry({
    label:'Bred for',
    value: bredFor
    });
    createDescriptionEntry({
    label:'Breed Group',
    value: Group || 'empty'
    });
    createDescriptionEntry({
    label:'Temperament',
    value: temperament
    });
    createDescriptionEntry({
        label:'Life span',
        value: lifeSpan
    });
    // createDescriptionEntry({
    //     label:'Origin',
    //     value: origin
    // });
    createDescriptionEntry({
        label:'Height - cm',
        value: height.metric
    });
    createDescriptionEntry({
        label:'Weight - kg',
        value: weight.metric
    });
}

const getDogByBreed = async (breedId) => {

    const loadingElement = document.querySelector('.loading');
    loadingElement.classList.add('show-loading');

    const [data] = await fetch(BASE_API_URL + '/images/search?include_breed=1&breed_id=' + breedId).then((data) => data.json());
    const {url: imageUrl, breeds} = data;
    fillDoggoImage(imageUrl);
    fillDoggoDescription(breeds[0]);
    loadingElement.classList.remove('show-loading')
}

const changeDoggo = () =>{ 
    console.log(event.target.value);
    getDogByBreed(event.target.value);
}

fetchDoggoBreeds();