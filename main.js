var app = new Vue({
  el: "#app",
  data: {
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
    cart: 0,
    onSale: true,
    description:
      "A boot, plural boots, is a type of specific footwear. Most boots mainly cover the foot and the ankle, while some also cover some part of the lower calf.",
  },
  methods: {
    addToCart() {
      this.cart += 1;
    },
    removeFromCart() {
      if (this.cart > 0) {
        this.cart -= 1;
      }
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
  },
});
