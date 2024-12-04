<script setup>
import { ref } from "vue";
import foodData from "./assets/data.json";
import Decrement from "./components/icons/IconDecrement.vue";
import Increament from "./components/icons/IconIncreament.vue";
import Cart from "./components/icons/IconCart.vue";
import Remove from "./components/icons/IconCancel.vue";
import Empty from "./components/icons/IconEmpty.vue";

//  variable & function that selects the EACH grid
const foods = ref(
  foodData.map((food) => ({
    ...food,
    inCart: false,
    quantity: 1,
    isHovered: false,
  }))
);

function toggleCart(food) {
  food.inCart = !food.inCart;

  if (!food.inCart) {
    addToCart(food);
  } else {
    food.quantity = 1;
  }
}

function incrementOfItems(food) {
  food.quantity++;
  updateCartItem(food);
}

function decrementOfItems(food) {
  if (food.quantity > 1) {
    food.quantity--;
    updateCartItem(food);
  }
}

// cart data/add to cart
const cartData = ref([]); // An empty array to hold cart items
// save cart to local storage
function saveCartToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cartData.value));
}

function addToCart(item) {
  let currentCart = JSON.parse(localStorage.getItem("cart")) || [];

  // Check if the item is already in the cart
  const existingItem = currentCart.find((cartItem) => cartItem.id === item.id);

  if (existingItem) {
    existingItem.quantity += item.quantity; // If it's already there, increment the quantity
  } else {
    currentCart.push({ ...item, quantity: item.quantity });
  }

  cartData.value = currentCart; // Update the reactive cartData array
  localStorage.setItem("cart", JSON.stringify(currentCart)); // Save to localStorage
}

function removeFromCart(item) {
  let currentCart = JSON.parse(localStorage.getItem("cart")) || [];

  // Remove item by filtering it out
  currentCart = currentCart.filter((cartItem) => cartItem.id !== item.id);

  cartData.value = currentCart; // Update the reactive cartData array
  localStorage.setItem("cart", JSON.stringify(currentCart)); // Save to localStorage
}

function updateCartItem(item) {
  const cartItem = cartData.value.find((cartItem) => cartItem.id === item.id);
}

function cartDisplay() {
  // Step 1: Retrieve the cart from localStorage
  const storedCart = JSON.parse(localStorage.getItem("cart"));

  // Step 2: If there is data in localStorage, update the cartData array
  if (storedCart) {
    cartData.value = storedCart;
  }

  // Now `cartData.value` holds the items to be displayed
  return cartData.value;
}
</script>

<template>
  <main class="bg-orange-50">
    <!-- container -->
    <div class="max-w-7xl mx-auto w-full flex justify-center items-center py-2">
      <!-- content -->
      <div
        class="w-11/12 md:w-4/5 h-full flex flex-col md:flex-row justify-center items-center md:justify-normal md:items-start"
      >
        <div
          class="w-3/4 flex flex-col justify-center items-center md:justify-normal md:items-start gap-4"
        >
          <h1 class="font-bold text-4xl">Desserts</h1>
          <!-- 3 template col grid -->
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <!-- product -->
            <div class="w-52" v-for="food in foods" :key="food.id">
              <div
                @mouseover="food.isHovered = true"
                @mouseleave="food.isHovered = false"
                class="relative"
              >
                <img
                  @click="toggleCart(food)"
                  :class="[
                    'rounded cursor-pointer border-1 hover:border-orange-600',
                    food.isHovered ? 'border-orange-600' : '',
                    food.inCart ? 'border-orange-600' : 'border-none',
                  ]"
                  :src="food.image.desktop"
                />
                <div
                  class="text-[12px] text-white border-gray-200 border-1 px-2 py-1 rounded-full absolute bottom-1 left-1/2 -translate-x-1/2 -mb-5 bg-orange-500 font-bold transition-all flex items-center justify-between w-32"
                >
                  <button
                    @click="decrementOfItems(food)"
                    class="w-5 flex items-center justify-center h-5 cursor-pointer border-white border-1 rounded-full"
                  >
                    <Decrement />
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
                    <Increament />
                  </button>
                </div>
                <button
                  v-show="!food.inCart"
                  @click="toggleCart(food)"
                  :class="[
                    'text-[12px] border-gray-200 border-2 px-4 py-1 rounded-full absolute bottom-1 left-1/2 -translate-x-1/2 -mb-5 font-bold transition-colors hover:-mb-4 hover:border-none flex items-center justify-center w-32',
                    food.isHovered ? 'bg-orange-500 text-white' : 'bg-white',
                  ]"
                >
                  <Cart />Add to Cart
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
          class="w-11/12 md:w-1/4 bg-white rounded-lg border-1 border-zinc-100 h-fit p-4 sticky top-2"
        >
          <div class="flex flex-col gap-4">
            <h1 class="font-bold text-3xl text-orange-700">
              Your Cart ({{ cartData.length }})
            </h1>
            <!-- items -->
            <div v-for="item in cartData" :key="item.id">
              <!-- each item -->
              <div class="flex justify-between items-center">
                <!-- item detail -->
                <div>
                  <h1 class="font-semibold text-sm">{{ item.name }}</h1>
                  <!-- price & qty detail -->
                  <div class="flex text-12 gap-3">
                    <p class="text-orange-700 font-bold">{{ item.quantity }}</p>
                    <p class="text-zinc-500 font-semibold">
                      @ ${{ parseFloat(item.price).toFixed(2) }}
                    </p>
                    <p class="font-semibold">
                      ${{ parseFloat(item.price * item.quantity).toFixed(2) }}
                    </p>
                  </div>
                </div>
                <!-- cancel -->
                <button @click="removeFromCart(item)">
                  <Remove />
                </button>
              </div>
              <!--  -->
              <hr class="my-4" />
              <!-- total order  -->
              <div class="flex justify-between items-center">
                <p class="text-zinc-500 font-semibold">Order Total</p>
                <p class="text-3xl font-bold">
                  ${{ parseFloat(item.price * item.quantity).toFixed(2) }}
                </p>
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
          class="w-11/12 md:w-1/4 bg-white rounded-lg border-1 border-zinc-100 h-fit p-4 sticky top-2"
        >
          <div class="flex flex-col gap-4">
            <h1 class="font-bold text-3xl text-orange-700">
              Your Cart ({{ cartData.length }})
            </h1>
            <!-- items -->
            <div class="m-auto">
              <Empty />
            </div>
            <!-- p -->
            <p class="text-sm font-bold text-zinc-600">
              Your added items will appear here
            </p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
