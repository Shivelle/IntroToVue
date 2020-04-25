Vue.config.devtools = true;

Vue.component("product", {
  props: {
    premium: Boolean,
    required: true,
  },
  template: `
  <div class="product">
  <div class="product-image">
    <img :src="image" alt="brown boots" />
  </div>

  <div class="product-info">
    <h1>{{ title }}</h1>
    <p v-if="inStock" class="inventory badge">
      <strong>In Stock</strong>
    </p>
    <p v-else :class="{ lineThrough: !inStock }" class= "badge"><strong>Out of Stock</strong></p>
    <span v-if="onSale" class="on-sale badge">{{ sale }}</span>
    <p>User is premium: {{ premium }}</p>
    <p>Shipping: {{ shipping }}</p>
    <p class="desc">{{ description }}</p>
    <product-details :details="details"></product-details>

    <div>
      <span>Available colors:</span>
      <div v-for="(variant, index) in variants" :key="variant.variantId"
      class="color-box"
      :style="{ backgroundColor: variant.variantColor }"
      @mouseover="updateProduct(index)">
      </div>
    </div>

    <div>
      <span>Available sizes:</span>
      <select>
        <option v-for="size in sizes" :key="size">{{ size }}</option>
      </select>
    </div>

    <button v-on:click="addToCart"
            :disabled="!inStock"
            :class="{ disabledButton: !inStock }"
            >Add to Cart</button>
    <a href="#" v-on:click="removeFromCart">Remove from Cart</button>
    <hr />
    <a :href="link">more about boots</a>
  </div>
</div>  
  `,
  data() {
    return {
      product: "Brown boots",
      brand: "VM Best Boots",
      selectedVariant: 0,
      link: "https://en.wikipedia.org/wiki/Boot",
      details: ["80% leatherette", "20% polyester", "gender-neutral"],
      variants: [
        {
          variantID: 2234,
          variantColor: "brown",
          variantImage: "./assets/img/boots/boots1.jpeg",
          variantQuantity: 8,
        },
        {
          variantID: 2235,
          variantColor: "black",
          variantImage: "./assets/img/boots/boots2.jpeg",
          variantQuantity: 0,
        },
      ],
      sizes: [37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48],
      onSale: true,
      description:
        "A boot, plural boots, is a type of specific footwear. Most boots mainly cover the foot and the ankle, while some also cover some part of the lower calf.",
    };
  },
  methods: {
    addToCart: function () {
      this.$emit("add-to-cart", this.variants[this.selectedVariant].variantId);
    },
    removeFromCart: function () {
      this.$emit(
        "remove-from-cart",
        this.variants[this.selectedVariant].variantId
      );
    },
    updateProduct(index) {
      this.selectedVariant = index;
      console.log(index);
    },
  },
  computed: {
    title() {
      return this.brand + ": " + this.product;
    },
    image() {
      return this.variants[this.selectedVariant].variantImage;
    },
    inStock() {
      return this.variants[this.selectedVariant].variantQuantity;
    },
    sale() {
      if (this.onSale) {
        return this.brand + " " + this.product + " are on sale!";
      }
      return this.brand + " " + this.product + " are not on sale";
    },
    shipping() {
      if (this.premium) {
        return "free";
      } else {
        return "3,99€";
      }
    },
  },
});

Vue.component("product-details", {
  props: {
    details: {
      type: Array,
      required: true,
    },
  },
  template: `
    <ul>
      <li v-for="detail in details">{{ detail }}</li>
    </ul>
  `,
});

var app = new Vue({
  el: "#app",
  data: {
    premium: false,
    cart: [],
  },
  methods: {
    updateCart(id) {
      this.cart.push(id);
    },
    removeItem(id) {
      for (var i = this.cart.length - 1; i >= 0; i--) {
        if (this.cart[i] === id) {
          this.cart.splice(i, 1);
        }
      }
    },
  },
});
