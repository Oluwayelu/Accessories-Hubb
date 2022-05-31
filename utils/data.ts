import bcrypt from "bcryptjs";

export const users = [
  {
    firstname: "Admin",
    lastname: "Admin",
    middlename: "Admin",
    email: "admin@ahubb.com",
    imgUrl: "/images/avatar/guy_4.png",
    password: bcrypt.hashSync("admin2022"),
    isAdmin: true,
    verified: true,
  },
  {
    imgUrl: "/images/avatar/guy_3.png",
    middlename: "David",
    firstname: "Ifeoluwa",
    lastname: "Oluwayelu",
    email: "oluwayeluifeoluwa@gmail.com.com",
    password: bcrypt.hashSync("Gbenga200@"),
    phoneNumber: "+2349053156229",
    verified: true,
    isAdmin: false,
  },
];

export const products = [
  {
    name: "Boat Earphones",
    slug: "boat-earphones-23se",
    category: "earphones",
    image: [
      "/images/assets/earphones_a_1.webp",
      "/images/assets/earphones_a_2.webp",
      "/images/assets/earphones_a_3.webp",
      "/images/assets/earphones_a_4.webp",
    ],
    price: 2000,
    brand: "Boat",
    rating: 2.5,
    countInStock: 20,
    description: "A popular boat earphones",
  },
  {
    name: "Boat Earphones Pod",
    slug: "boat-earphones-pod-1g5e",
    category: "earphones",
    image: [
      "/images/assets/earphones_b_1.webp",
      "/images/assets/earphones_b_2.webp",
      "/images/assets/earphones_b_3.webp",
      "/images/assets/earphones_b_4.webp",
    ],
    price: 5200,
    brand: "Boat",
    rating: 4.5,
    countInStock: 11,
    description: "A popular wireless Boat earphones pod",
  },
  {
    name: "Boat Earphones Bluetooth",
    slug: "boat-earphones-bluetooth-bb47",
    category: "earphones",
    image: [
      "/images/assets/earphones_c_1.webp",
      "/images/assets/earphones_c_2.webp",
      "/images/assets/earphones_c_3.webp",
      "/images/assets/earphones_c_4.webp",
    ],
    price: 8000,
    brand: "Boat",
    rating: 2.5,
    countInStock: 18,
    description: "A popular boat earphones",
  },
  {
    name: "Boat Headphones",
    slug: "boat-headphones-11hb",
    category: "Headphones",
    image: [
      "/images/assets/headphones_a_1.webp",
      "/images/assets/headphones_a_2.webp",
      "/images/assets/headphones_a_3.webp",
      "/images/assets/headphones_a_4.webp",
    ],
    price: 14200,
    brand: "boat",
    rating: 4.0,
    countInStock: 6,
    description: "A popular boat headphones",
  },
  {
    name: "Boat Headphones Pro",
    slug: "boat-headphones-pro-7h8i",
    category: "Headphones",
    image: [
      "/images/assets/headphones_b_1.webp",
      "/images/assets/headphones_b_2.webp",
      "/images/assets/headphones_b_3.webp",
      "/images/assets/headphones_b_4.webp",
    ],
    price: 56000,
    brand: "boat",
    rating: 4.8,
    countInStock: 10,
    description: "A popular boat headphones pro",
  },
  {
    name: "Boat Speaker",
    slug: "boat-speaker-nb35",
    category: "Speaker",
    image: [
      "/images/assets/speaker1.webp",
      "/images/assets/speaker2.webp",
      "/images/assets/speaker3.webp",
      "/images/assets/speaker4.webp",
    ],
    price: 25000,
    brand: "boat",
    rating: 4.8,
    countInStock: 10,
    description: "A popular boat speaker",
  },
  {
    name: "Boat Smart watch",
    slug: "boat-smart-watch-sm61",
    category: "Watch",
    image: [
      "/images/assets/watch_1.webp",
      "/images/assets/watch_2.webp",
      "/images/assets/watch_3.webp",
      "/images/assets/watch_4.webp",
    ],
    price: 70000,
    brand: "boat",
    rating: 5.0,
    countInStock: 12,
    description: "A popular boat smart watch",
  },
];
