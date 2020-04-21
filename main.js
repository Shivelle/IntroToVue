var app = new Vue({
  el: "#app",
  data: {
    product: "Brown boots",
    image: "./assets/img/boots/boots1.jpeg",
    link: "https://en.wikipedia.org/wiki/Boot",
    inventory: 8,
    onSale: true,
    details: ["80% leatherette", "20% polyester", "gender-neutral"],
    variants: [
      {
        variantID: 2234,
        variantColor: "brown",
        variantImage: "./assets/img/boots/boots1.jpeg",
      },
      {
        variantID: 2235,
        variantColor: "black",
        variantImage: "./assets/img/boots/boots2.jpeg",
      },
    ],
    sizes: [37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48],
    cart: 0,
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
    updateProduct(variantImage) {
      this.image = variantImage;
    },
  },
});
