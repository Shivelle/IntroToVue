Vue.config.devtools = true;

var eventBus = new Vue();

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

  <product-tabs :reviews="reviews" :shipping="shipping" :details="details"></product-tabs>

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
      reviews: [],
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
    mounted() {
      eventBus.$on("review-submitted", (productReview) => {
        this.reviews.push(productReview);
      });
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

Vue.component("product-review", {
  template: `
    <form class="review-form" @submit.prevent="onSubmit">

    <p v-if="errors.length">
      <strong>Please correct the following error(s):</strong>
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
    </p>

     <p>
      <label for="name">Name:</label>
      <input id="name" v-model="name">
      </p>

      <p>
      <label for="review">Review:</label>
      <textarea id="review" v-model="review"></textarea>
      </p>

    <p>
      <label for="rating">Rating:</label>
      <select id="rating" v-model.number="rating">
        <option>5</option>
        <option>4</option>
        <option>3</option>
        <option>2</option>
        <option>1</option>
      </select>
    </p>

    <div>
      <p>Would you recommend this product?</p>
      <p>
        <label for="yes">Yes</label>
        <input type="radio" value="yes" name="yes" v-model="recommendation">
      <p>
      <p>
        <label for="no">No</label>
        <input type="radio" value="no" name="no" v-model="recommendation">
      <p>   
    </div>

    <p>
      <input type="submit" value="Submit"> 
    </p>    
    </form>


  `,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      recommendation: null,
      errors: [],
    };
  },
  methods: {
    onSubmit() {
      if (this.name && this.review && this.rating && this.recommendation) {
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating,
          recommendation: this.recommendation,
        };
        eventBus.$emit("review-submitted", productReview);
        this.name = null;
        this.review = null;
        this.rating = null;
        this.recommendation = null;
      } else {
        if (!this.name) this.errors.push("Name required.");
        if (!this.review) this.errors.push("Review required.");
        if (!this.rating) this.errors.push("Rating required.");
        if (!this.recommendation) this.errors.push("Recommendation required.");
      }
    },
  },
});

Vue.component("product-tabs", {
  props: {
    reviews: {
      type: Array,
      required: true,
    },
    shipping: {
      required: true,
    },
    details: {
      type: Array,
      required: true,
    },
  },
  template: `
    <div>
      <ul>
        <span class="tab"
              :class="{ activeTab: selectedTab === tab }"
              v-for="(tab, index) in tabs" 
              :key="index"
              @click="selectedTab = tab">
              {{ tab }}</span>
      </ul>

      <div v-show="selectedTab === 'Reviews'">
        <p v-if="!reviews.length">There are no reviews yet.</p>
        <ul v-else>
            <li v-for="(review, index) in reviews" :key="index">
              <p>{{ review.name }}</p>
              <p>Rating:{{ review.rating }}</p>
              <p>{{ review.review }}</p>
            </li>
        </ul>
    </div>
    
    <div v-show="selectedTab === 'Make a Review'">
      <product-review></product-review>
    </div>

    <div v-show="selectedTab === 'Shipping'">
      <p>Shipping cost: {{ shipping }}</p>
    </div>

    <div v-show="selectedTab === 'Details'">
    Details:
      <ul>
        <li v-for="detail in details">{{ detail }}</li>
      </ul>
  </div>

  </div>
  `,
  data() {
    return {
      tabs: ["Reviews", "Make a Review", "Shipping", "Details"],
      selectedTab: "Reviews",
    };
  },
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
