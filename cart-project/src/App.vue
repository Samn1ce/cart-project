<script setup>
import { ref } from "vue";
import foodData from "./assets/data.json";

//  variable & function that selects the EACH grid
// const isHovered = ref(foodData.map((food) => false));
const foods = ref(
  foodData.map((food) => ({
    ...food,
    inCart: false,
    isHovered: false,
    quantity: 1,
  }))
);

// const display = ref("none")

function toggleCart(food) {
  food.inCart = !food.inCart;
  
  if (!food.inCart) {
    // Check if the item is already in the cart
    const existingItem = cartData.value.find(item => item.id === food.id);
    if (!existingItem) {
      // Add the item to cart with quantity 1 if it's not already there
      food.quantity = 1; 
      addToCart(food); 
    }
  }
}


// function that adds and decrease number of item added to cart
// const numOfItems = ref(1);

function incrementOfItems(food) {
  food.quantity++;
  const existingItem = cartData.value.find(cartItem => cartItem.id === food.id);
  if (existingItem) {
    existingItem.quantity = food.quantity; 
  }
};

function decreamentOfItems(food) {
  if (food.quantity > 1) {
    food.quantity--;
  }
};

function cartClick(food) {
  decreamentOfItems(food); // Call decrement method
  addToCart(food);    // Call addToCart method
}

// cart data/add to cart
const cartData = ref([]); // An empty array to hold cart items

function addToCart(item) {
  let currentCart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Check if the item is already in the cart
  const existingItem = currentCart.find(cartItem => cartItem.id === item.id);
  
  if (existingItem) {
    existingItem.quantity += item.quantity;  // If it's already there, increment the quantity
  } else {
    currentCart.push({ ...item, quantity: item.quantity });
  }

  cartData.value = currentCart; // Update the reactive cartData array
  localStorage.setItem('cart', JSON.stringify(currentCart)); // Save to localStorage
}

function removeFromCart(item) {
  let currentCart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Remove item by filtering it out
  currentCart = currentCart.filter(cartItem => cartItem.id !== item.id);
  
  cartData.value = currentCart;  // Update the reactive cartData array
  localStorage.setItem('cart', JSON.stringify(currentCart));  // Save to localStorage
}

function cartDisplay() {
  // Step 1: Retrieve the cart from localStorage
  const storedCart = JSON.parse(localStorage.getItem('cart'));

  // Step 2: If there is data in localStorage, update the cartData array
  if (storedCart) {
    cartData.value = storedCart;
  }

  // Now `cartData.value` holds the items to be displayed
  return cartData.value;
}

</script>

<template>
  <main>
    <!-- container -->
    <div class="w-full flex justify-center items-center bg-orange-50 py-2">
      <!-- content -->
      <div class="w-4/5 h-full flex">
        <div class="w-3/4 flex flex-col gap-4">
          <h1 class="font-bold text-4xl">Desserts</h1>
          <!-- 3 template col grid -->
          <div class="grid grid-cols-3 gap-4">
            <!-- product -->
            <div class="w-52" v-for="food in foods" :key="food.id">
              <div 
                @mouseover="food.isHovered = true"
                @mouseleave="food.isHovered = false"
                class="relative"
              >
                <img
                  @click="toggleCart(food)"
                  class="rounded cursor-pointer hover:border-1 hover:border-orange-600"
                  :src="food.image.desktop"
                />
                <div
                  class="text-[12px] text-white border-gray-200 border-1 px-2 py-1 rounded-full absolute bottom-1 left-1/2 -translate-x-1/2 -mb-5 bg-orange-500 font-bold transition-all flex items-center justify-between w-32"
                >
                  <button
                    @click="cartClick(food)"
                    class="w-5 flex items-center justify-center h-5 cursor-pointer border-white border-1 rounded-full"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="2"
                      fill="none"
                      viewBox="0 0 10 2"
                    >
                      <path fill="#fff" d="M0 .375h10v1.25H0V.375Z" />
                    </svg>
                  </button>
                  <div
                    v-show="food.inCart"
                    @click="toggleCart(food)"
                    class="w-12 flex items-center justify-center h-full cursor-pointer"
                  >
                    {{ food.quantity }}
                  </div>
                  <button
                    @click="incrementOfItems(food)"
                    class="w-5 flex items-center justify-center h-5 border-1 border-white rounded-full"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="10"
                      fill="none"
                      viewBox="0 0 10 10"
                    >
                      <path
                        fill="#fff"
                        d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"
                      />
                    </svg>
                  </button>
                </div>
                <button
                  v-show="!food.inCart"
                  @click="toggleCart(food)"
                  class="text-[12px] border-gray-200 border-2 px-4 py-1 rounded-full absolute bottom-1 left-1/2 -translate-x-1/2 -mb-5 bg-white font-bold transition-colors hover:-mb-4 hover:border-none hover:bg-orange-500 hover:text-white flex items-center justify-center w-32"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="none"
                    viewBox="0 0 21 20"
                  >
                    <g fill="#C73B0F" clip-path="url(#a)">
                      <path
                        d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z"
                      />
                      <path
                        d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z"
                      />
                    </g>
                    <defs>
                      <clipPath id="a">
                        <path fill="#fff" d="M.333 0h20v20h-20z" />
                      </clipPath>
                    </defs></svg
                  >Add to Cart
                </button>
              </div>
              <div class="mt-5">
                <div class="text-sm text-gray-400 font-semibold">
                  {{ food.category }}
                </div>
                <div class="font-bold">{{ food.name }}</div>
                <div class="text-orange-500 font-bold">
                  ${{ parseFloat(food.price).toFixed(2) }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- cart -->
        <div
          class="w-1/4 bg-white rounded-lg border-1 border-zinc-100 h-fit p-4 sticky top-2"
        >
          <div class="flex flex-col gap-4">
            <h1 class="font-bold text-3xl text-orange-700">Your Cart ({{ cartData.length }})</h1>
            <!-- items -->
            <div 
              v-for="item in cartData"
              :key="item.id"
            >
              <!-- each item -->
              <div class="flex justify-between items-center">
                <!-- item detail -->
                <div>
                  <h1 class="font-semibold text-sm">{{ item.name }}</h1>
                  <!-- price & qty detail -->
                  <div class="flex text-12 gap-3">
                    <p class="text-orange-700 font-bold">{{ item.quantity }}</p>
                    <p class="text-zinc-500 font-semibold">@ ${{ parseFloat(item.price).toFixed(2) }}</p>
                    <p class="font-semibold">${{ parseFloat(item.price * item.quantity).toFixed(2) }}</p>
                  </div>
                </div>
                <!-- cancel -->
                <button
                  @click="removeFromCart(item)"
                ><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#CAAFA7" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/></svg></button>
              </div>
              <!--  -->
              <hr class="my-4" />
              <!--  -->
              
              <!-- total order  -->
              <div class="flex justify-between items-center">
                <p class="text-zinc-500 font-semibold">Order Total</p>
                <p class="text-3xl font-bold">$46.50</p>
              </div>
            </div>
            <!-- confirm order button -->
            <div class="flex flex-col gap-4">
              <button
                class="text-zinc-500 w-full rounded-lg p-3 bg-gray-100 text-xs transition-all hover:bg-zinc-600 hover:text-white"
              >
                This is a
                <span class="text-black font-semibold">carbon-neutral</span>
                delivery
              </button>
              <button
                class="text-sm font-bold text-white w-full bg-orange-600 p-3 rounded-full transition-all hover:bg-white hover:text-black hover:border-1 hover:border-gray-200"
              >
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
