// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления
const minWeight = document.querySelector('.minweight__input'); 
const maxWeight = document.querySelector('.maxweight__input');
// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек
const display = () => {
  // TODO: очищаем fruitsList от вложенных элементов,
  // чтобы заполнить актуальными данными из fruits
  fruitsList.innerHTML = null;

  for (let i = 0; i < fruits.length; i++) {
    // TODO: формируем новый элемент <li> при помощи document.createElement,
    // и добавляем в конец списка fruitsList при помощи document.appendChild
    let liFruit = document.createElement('li'); 

    
    switch (fruits[i].kind) {
      case 'Мангустин':
        liFruit.className = 'fruit__item fruit_violet';
        break
      case 'Дуриан':
        liFruit.className = 'fruit__item fruit_green';
        break
      case 'Личи':
        liFruit.className = 'fruit__item fruit_carmazin';
        break
      case 'Карамбола':
        liFruit.className = 'fruit__item fruit_yellow';
        break
      case 'Тамаринд':
        liFruit.className = 'fruit__item fruit_lightbrown';
        break
      default:
        liFruit.className = 'fruit__item fruit_red';
  }
  let divFruit = document.createElement('div'); 
    divFruit.className = 'fruit__info'; 
    liFruit.appendChild(divFruit); 

    
    let divIndex = document.createElement('div');
    let divKind = document.createElement('div');
    let divColor = document.createElement('div');
    let divWeight = document.createElement('div');

    
    divFruit.appendChild(divIndex);
    divFruit.appendChild(divKind);
    divFruit.appendChild(divColor);
    divFruit.appendChild(divWeight);

    
    divIndex.textContent = 'Номер: ' + i;
    divKind.textContent = 'Название: ' + fruits[i].kind;
    divColor.textContent = 'Цвет: ' + fruits[i].color;
    divWeight.textContent = 'Вес (кг): ' + fruits[i].weight;

    fruitsList.appendChild(liFruit); 
  }
};


display();

/*** ПЕРЕМЕШИВАНИЕ ***/

function shuffleFruits() {
  let fruitsForShuffle = fruits.slice(); 
  
  for (let y = fruitsForShuffle.length - 1; y > 0; y--) {
    let z = Math.floor(Math.random() * (y + 1));
    [fruitsForShuffle[y], fruitsForShuffle[z]] = [fruitsForShuffle[z], fruitsForShuffle[y]];
  }
  
  if (JSON.stringify(fruits) === JSON.stringify(fruitsForShuffle)) {
    alert('Перемешайте еще раз');
  }
  
  fruits = fruitsForShuffle;
  return fruits;
}


shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();

});

/*** ФИЛЬТРАЦИЯ ***/

function filterFruits() {
  
  let min = minWeight.value;
  let max = maxWeight.value;

  if (parseInt(min) <= 0 || isNaN(parseInt(min)) || parseInt(max.value) <= 0 || isNaN(parseInt(max)) || min > max) {
    alert('Введите корректные значения');
  }
  
  else {
    const fruitsFilter = fruits.filter(element => {
      return element.weight <= max && element.weight >= min;
    });
    fruits = fruitsFilter;
  }
  
  minWeight.value = null;
  maxWeight.value = null;
  
  return fruits;
};

filterButton.addEventListener('click', () => {
  filterFruits();
  display();
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; 
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = '-';

const comparationColor = (index1, index2) => {
  
  return fruits[index1].color.length > fruits[index2].color.length;
};

const bubbleSort = (arr, comparation) => {
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    
    for (let j = 0; j < n - 1 - i; j++) {
      
      if (comparation(j, j + 1)) {
        
        let temp = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = temp;
      }
    }
  }
};

function partition(arr, start, end) {
  
  const pivotValue = arr[end].color.length;
  let pivotIndex = start;
  for (let i = start; i < end; i++) {
    if (arr[i].color.length < pivotValue) {
      
      [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
      
      pivotIndex++;
    }
  }
  
  [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]]
  return pivotIndex;
};

function quickSortRecursive(arr, start, end) {

  if (start >= end) {
    return;
  }

  
  let index = partition(arr, start, end);

  
  quickSortRecursive(arr, start, index - 1);
  quickSortRecursive(arr, index + 1, end);
};

sortChangeButton.addEventListener('click', () => {
  
  sortKindLabel.textContent == 'bubbleSort' ? sortKindLabel.textContent = 'quickSort' : sortKindLabel.textContent = 'bubbleSort';
});

sortActionButton.addEventListener('click', () => {
  const start = new Date().getTime();
  sortKindLabel.textContent == 'bubbleSort' ? bubbleSort(fruits, comparationColor) : quickSortRecursive(fruits, 0, fruits.length - 1);
  const end = new Date().getTime();
  display();
  sortTimeLabel.textContent = `${end - start} ms`;
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  if (kindInput.value === '' || colorInput.value === '' || weightInput.value === '' || parseInt(weightInput.value) <= 0 || isNaN(parseInt(weightInput.value))) {
    alert('Введите корректные значения');
  } else {
    
    let newFruit = {
      kind: kindInput.value,
      color: colorInput.value,
      weight: weightInput.value
    };
    
    fruits.push(newFruit);
    display();
  }
  
  kindInput.value = null;
  colorInput.value = null;
  weightInput.value = null;
});
