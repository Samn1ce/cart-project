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
          v-if="cartData.length > 0"
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
        <!-- empty cart -->
        <div
          v-else
          class="w-1/4 bg-white rounded-lg border-1 border-zinc-100 h-fit p-4 sticky top-2"
        >
          <div class="flex flex-col gap-4">
            <h1 class="font-bold text-3xl text-orange-700">Your Cart ({{ cartData.length }})</h1>
            <!-- items -->
            <div class="m-auto">
              <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" fill="none" viewBox="0 0 128 128"><path fill="#260F08" d="M8.436 110.406c0 1.061 4.636 2.079 12.887 2.829 8.252.75 19.444 1.171 31.113 1.171 11.67 0 22.861-.421 31.113-1.171 8.251-.75 12.887-1.768 12.887-2.829 0-1.061-4.636-2.078-12.887-2.828-8.252-.75-19.443-1.172-31.113-1.172-11.67 0-22.861.422-31.113 1.172-8.251.75-12.887 1.767-12.887 2.828Z" opacity=".15"/><path fill="#87635A" d="m119.983 24.22-47.147 5.76 4.32 35.36 44.773-5.467a2.377 2.377 0 0 0 2.017-1.734c.083-.304.104-.62.063-.933l-4.026-32.986Z"/><path fill="#AD8A85" d="m74.561 44.142 47.147-5.754 1.435 11.778-47.142 5.758-1.44-11.782Z"/><path fill="#CAAFA7" d="M85.636 36.78a2.4 2.4 0 0 0-2.667-2.054 2.375 2.375 0 0 0-2.053 2.667l.293 2.347a3.574 3.574 0 0 1-7.066.88l-1.307-10.667 14.48-16.88c19.253-.693 34.133 3.6 35.013 10.8l1.28 10.533a1.172 1.172 0 0 1-1.333 1.307 4.696 4.696 0 0 1-3.787-4.08 2.378 2.378 0 1 0-4.72.587l.294 2.346a2.389 2.389 0 0 1-.484 1.755 2.387 2.387 0 0 1-1.583.899 2.383 2.383 0 0 1-1.755-.484 2.378 2.378 0 0 1-.898-1.583 2.371 2.371 0 0 0-1.716-2.008 2.374 2.374 0 0 0-2.511.817 2.374 2.374 0 0 0-.493 1.751l.293 2.373a4.753 4.753 0 0 1-7.652 4.317 4.755 4.755 0 0 1-1.788-3.17l-.427-3.547a2.346 2.346 0 0 0-2.666-2.053 2.4 2.4 0 0 0-2.08 2.667l.16 1.173a2.378 2.378 0 1 1-4.72.587l-.107-1.28Z"/><path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width=".974" d="m81.076 28.966 34.187-4.16"/><path fill="#87635A" d="M7.45 51.793c-.96 8.48 16.746 17.44 39.466 19.947 22.72 2.506 42.08-2.16 43.04-10.667l-3.947 35.493c-.96 8.48-20.24 13.334-43.04 10.667S2.463 95.74 3.423 87.18l4.026-35.387Z"/><path fill="#AD8A85" d="M5.823 65.953c-.96 8.453 16.746 17.44 39.573 20.027 22.827 2.586 42.053-2.187 43.013-10.667L87.076 87.1c-.96 8.48-20.24 13.333-43.04 10.666C21.236 95.1 3.53 86.22 4.49 77.74l1.334-11.787Z"/><path fill="#CAAFA7" d="M60.836 42.78a119.963 119.963 0 0 0-10.347-1.627c-24-2.667-44.453 1.893-45.333 10.373l-2.133 18.88a3.556 3.556 0 1 0 7.066.8 3.574 3.574 0 1 1 7.094.8l-.8 7.094a5.93 5.93 0 1 0 11.786 1.333 3.556 3.556 0 0 1 7.067.8l-.267 2.347a3.573 3.573 0 0 0 7.094.826l.133-1.2a5.932 5.932 0 1 1 11.787 1.36l-.4 3.52a3.573 3.573 0 0 0 7.093.827l.933-8.267a1.174 1.174 0 0 1 1.307-.906 1.146 1.146 0 0 1 1.04 1.306 5.947 5.947 0 0 0 11.813 1.334l.534-4.72a3.556 3.556 0 0 1 7.066.8 3.573 3.573 0 0 0 7.094.826l1.786-15.546a2.373 2.373 0 0 0-2.08-2.667L44.143 55.74l16.693-12.96Z"/><path fill="#87635A" d="m59.156 57.66 1.68-14.88-16.827 13.173 15.147 1.707Z"/><path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width=".974" d="M9.796 52.06c-.667 5.866 16.24 12.586 37.733 15.04 14.774 1.68 27.867.906 34.854-1.654"/></svg>
              <!--  -->
            </div>
            <!-- p -->
             <p class="text-sm font-bold text-zinc-600">Your added items will appear here</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
