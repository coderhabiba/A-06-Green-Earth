//all plants
let allPlants = [];

// all plants data
const url = 'https://openapi.programming-hero.com/api/plants';
const spinner = document.getElementById('spinner-area');
spinner.classList.remove('hidden');
fetch(url)
  .then(res => res.json())
  .then(data => {
    allPlants = data.plants;
    showCardData(allPlants);
    spinner.classList.add('hidden');
  });

const showCardData = plants => {
  const cardContainer = document.getElementById('card-container');
  cardContainer.innerHTML = '';
  // console.log(cardContainer);

  const modal = document.getElementById('my_modal');
  const modalContent = document.getElementById('modal-content');

  plants.forEach(plant => {
    const card = document.createElement('div');
    card.className = 'p-4 bg-white rounded-lg';

    card.innerHTML = `
      <div class="card-img rounded-lg h-[250px]">
        <img class="h-full rounded-lg w-full" src="${plant.image}" alt="${plant.name}">
      </div>
      <h6 class="plant-title mt-3 mb-2 text-sm font-semibold cursor-pointer">
        ${plant.name}
      </h6>
      <p class="mb-2 text-xs text-[#1f2937] opacity-[0.8] leading-4">${plant.description}</p>
      <div class="flex items-center justify-between">
        <div class="w-auto bg-[#DCFCE7] text-sm leading-5 py-1 px-3 rounded-full mb-4 text-[#15803d]">
          ${plant.category}
        </div>
        <div class="text-[#1f2937] text-sm font-semibold leading-5">৳${plant.price}</div>
      </div>
      <button class="cart-btn btn bg-[#15803d] text-white rounded-full hover:bg-[#07b441a6] transition-all duration-[1s] w-full">
        Add to Cart
      </button>
    `;
    cardContainer.appendChild(card);

    // modal click
    const title = card.querySelector('.plant-title');
    title.addEventListener('click', () => {
      modalContent.innerHTML = `
      <div class=''>
       <h6 class="mb-2 text-lg font-semibold">${plant.name}</h6>
        <div class="card-img rounded-lg h-[400px] mb-4">
          <img class="h-full rounded-lg w-full" src="${plant.image}" alt="${plant.name}">
        </div>
        <div class="mb-4">
          <span class="text-sm font-extrabold leading-5 text-[#15803d]">Category:</span>
          <span class="text-sm leading-5 text-[#15803d]">${plant.category}</span>
        </div>
        <div class="mb-4">
          <span class="text-sm font-extrabold leading-5 text-[#15803d]">Price:</span>
          <span class="text-sm leading-5 text-[#15803d]">৳${plant.price}</span>
        </div>
        <div class="mb-4">
          <span class="text-sm font-extrabold leading-5 text-[#15803d]">Description:</span>
          <span class="text-sm leading-5 text-[#15803d]">৳${plant.description}</span>
        </div>
      </div>
      `;
      modal.showModal();
    });

    // cart click
    const cartBtn = card.querySelector('.cart-btn');
    cartBtn.addEventListener('click', function () {
      alert(`${plant.name} tree has been added to the cart✔️`)
      const cartList = document.getElementById('lists');
      const cartItem = document.createElement('div');
      cartItem.className =
        'cart-item flex items-center justify-between p-2 rounded-lg mb-2 bg-[#F0FDF4]';

      cartItem.innerHTML = `
      <div>
        <p class="text-sm font-semibold">${plant.name}</p>
        <p class="text-sm text-[#aaa5a5] mt-2">৳<span class="plant-price">${plant.price}</span></p>
      </div>
      <div class="w-4 h-4">
        <img class="cross-btn w-full h-full cursor-pointer" src="../assets/cross.png" alt="cross">
      </div>
  `;
      cartList.appendChild(cartItem);

      // total sum
      const plantPrice = parseInt(plant.price);
      const totalPrice = document.getElementById('total-price');
      let total = parseInt(totalPrice.innerText);
      totalPrice.innerText = total + plantPrice;

      // cross clicking function
      cartItem.querySelector('.cross-btn').addEventListener('click', function () {
          const priceRemove = parseInt(
            cartItem.querySelector('.plant-price').innerText
          );
          let currentTotal = parseInt(totalPrice.innerText);
          totalPrice.innerText = currentTotal - priceRemove;
          cartItem.remove();
        });
    });
  });
  
  const spinner = document.getElementById('spinner-area');
  spinner.classList.add('hidden');
  
};

// all category btn data
fetch('https://openapi.programming-hero.com/api/categories')
  .then(res => res.json())
  .then(data => {
    showCategory(data.categories);
  });

  // category
const showCategory = datas => {
  const categories = document.getElementById('categories');
  //
  const allBtn = document.createElement('button');
  allBtn.textContent = 'All Trees';
  allBtn.className =
    'hover:text-white text-left text-[#1f2937] font-medium rounded hover:bg-[#15803d] w-full py-2 px-[10px]';
  
  allBtn.addEventListener('click', () => {
    
    showCardData(allPlants);

    categories.querySelectorAll('button').forEach(btn => {
      btn.classList.remove('bg-[#15803d]', 'text-white');
    });

    allBtn.classList.add('bg-[#15803d]', 'text-white');
  });
  categories.appendChild(allBtn);

  datas.forEach(data => {
    const btn = document.createElement('button');
    btn.textContent = data.category_name;
    btn.className =
      'hover:text-white text-left text-[#1f2937] font-medium rounded hover:bg-[#15803d] w-full py-2 px-[10px]';

    //
    btn.addEventListener('click', () => {
      if (allPlants && allPlants.length > 0) {
        const filtered = allPlants.filter(
          plant => plant.category === data.category_name
        );
        showCardData(filtered);
        categories.querySelectorAll('button').forEach(b => {
          b.classList.remove('bg-[#15803d]', 'text-white');
        });

        btn.classList.add('bg-[#15803d]', 'text-white');
      }
    });

    categories.appendChild(btn);
  });

  allBtn.classList.add('bg-[#15803d]', 'text-white');
};
