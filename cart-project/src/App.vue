<script setup>
  
  import { ref } from 'vue';
  import foodData from "./assets/data.json"

  //  variable & function that selects the EACH grid
  const foods = ref(foodData.map(food => ({ 
    ...food, 
    inCart: false,
  })));


  // const display = ref("none")

  function toggleCart(food) {
    food.inCart = !food.inCart;
    numOfItems.value = 1;
  }

  // function that adds and decrease number of item added to cart
  const numOfItems = ref(1)

  function incrementOfItems() {
    numOfItems.value++;
  };

  function decreamentOfItems() {
    if ( numOfItems.value > 1 ) {
      numOfItems.value--;
    };
  };
</script>

<template>
  <main>
    <!-- container -->
    <div class="w-full flex justify-center items-center bg-orange-50 py-2">
      <!-- content -->
      <div class="w-4/5 h-full flex">
        <div class=" w-3/4 flex flex-col gap-4">
          <h1 class="font-bold text-4xl">Desserts</h1>
          <!-- 3 template col grid -->
          <div class="grid grid-cols-3 gap-4">
            <!-- product -->
            <div class="w-52" v-for="food in foods" :key="food.id">
              <div class="relative inline-block">
                <img
                @click="toggleCart(food)"
                class="rounded cursor-pointer hover:border-1 hover:border-orange-600"
                :src="food.image.desktop"
                />
                <button
                class="text-[12px] text-white border-gray-200 border-2 px-2 py-1 rounded-full absolute bottom-1 left-1/2 -translate-x-1/2 -mb-5 bg-orange-500 font-bold transition-all flex items-center justify-between w-32">
                  <button
                    @click="decreamentOfItems"
                    class="w-5 flex items-center justify-center h-5 border-white border-1 rounded-full"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="2" fill="none" viewBox="0 0 10 2"><path fill="#fff" d="M0 .375h10v1.25H0V.375Z"/></svg>
                  </button>
                  <div 
                  v-show="food.inCart"
                    @click="toggleCart(food)"
                    class="w-12 flex items-center justify-center h-full"
                  >
                    {{ numOfItems }}
                  </div>
                  <button 
                    @click="incrementOfItems"
                    class="w-5 flex items-center justify-center h-5 border-1 border-white rounded-full"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#fff" d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"/></svg>
                  </button>
                </button>
                <button
                  v-show="!food.inCart"
                  @click="toggleCart(food)"
                  class="text-[12px] border-gray-200 border-2 px-4 py-1 rounded-full absolute bottom-1 left-1/2 -translate-x-1/2 -mb-5 bg-white font-bold transition-colors hover:-mb-4 hover:border-none hover:bg-orange-500 hover:text-white flex items-center justify-center w-32"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 21 20"><g fill="#C73B0F" clip-path="url(#a)"><path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z"/><path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M.333 0h20v20h-20z"/></clipPath></defs></svg>Add to Cart</button>
              </div>
              <div class="mt-5">
                <div class="text-sm text-gray-400 font-semibold">{{ food.category }}</div>
                <div class="font-bold">{{ food.name }}</div>
                <div class=" text-orange-500 font-bold">${{ parseFloat(food.price).toFixed(2) }}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- cart -->
        <div class="w-1/4 bg-white rounded-lg border-1 border-zinc-100 h-fit p-4 sticky top-2">
          <div class="flex flex-col gap-4">
            <h1 class="font-bold text-3xl text-orange-700">Your Cart (7)</h1>
            <!-- items -->
            <div class="">
              <!-- each item -->
              <div class="flex justify-between items-center">
                <!-- item detail -->
                <div>
                  <h1 class="font-semibold text-sm">Classic Tinubu</h1>
                  <!-- price & qty detail -->
                   <div class="flex text-12 gap-3">
                    <p class=" text-orange-700 font-bold">1x</p>
                    <p class="text-zinc-500 font-semibold">@ $5.50</p>
                    <p class="font-semibold">$5.50</p>
                   </div>
                </div>
                <!-- cancel -->
                <div>X</div>
              </div>
              <!--  -->
              <hr class="my-4"/>
              <!--  -->
              <div class="flex justify-between items-center">
                <!-- item detail -->
                <div>
                  <h1 class="font-semibold text-sm">Classic Tinubu</h1>
                  <!-- price & qty detail -->
                   <div class="flex text-12 gap-3">
                    <p class=" text-orange-700 font-bold">1x</p>
                    <p class="text-zinc-500 font-semibold">@ $5.50</p>
                    <p class="font-semibold">$5.50</p>
                   </div>
                </div>
                <!-- cancel -->
                <div>X</div>
              </div>
              <!--  -->
              <hr class="my-4"/>
              <!--  -->
              <div class="flex justify-between items-center">
                <!-- item detail -->
                <div>
                  <h1 class="font-semibold text-sm">Classic Tinubu</h1>
                  <!-- price & qty detail -->
                   <div class="flex text-12 gap-3">
                    <p class=" text-orange-700 font-bold">1x</p>
                    <p class="text-zinc-500 font-semibold">@ $5.50</p>
                    <p class="font-semibold">$5.50</p>
                   </div>
                </div>
                <!-- cancel -->
                <div>X</div>
              </div>
              <!--  -->
              <hr class="my-4"/>
              <!-- total order  -->
              <div class="flex justify-between items-center">
                <p class="text-zinc-500 font-semibold">Order Total</p>
                <p class="text-3xl font-bold">$46.50</p>
              </div>
            </div>
            <!-- confirm order button -->
            <div class="flex flex-col gap-4">
              <button class="text-zinc-500 w-full rounded-lg p-3 bg-gray-100 text-xs transition-all hover:bg-zinc-600 hover:text-white">This is a <span class="text-black font-semibold">carbon-neutral</span> delivery</button>
              <button class="text-sm font-bold text-white w-full bg-orange-600 p-3 rounded-full transition-all hover:bg-white hover:text-black hover:border-1 hover:border-gray-200">Confirm Order</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>