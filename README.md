AnimeVerse – Anime E-Commerce Store

AnimeVerse is a full-stack inspired e-commerce platform for anime lovers, where users can browse, filter, and shop anime merchandise like T-shirts, hats, pendants, katanas, and more.

🚀 Features

🛒 Add to Cart using localStorage (persists across sessions).

🔑 User Authentication using cookies (login/logout system).

📦 Product Catalog powered by JSON files for products & users.

🔍 Advanced Filters:

By Category (T-shirts, Hats, Pendants, Katanas, etc.)

By Anime (Naruto, One Piece, Jujutsu Kaisen, etc.)

📑 Pagination for product browsing.

🎞️ Swiper.js for featured product sliders.

📱 Responsive Design using Bootstrap (mobile-first breakpoints).

🛠️ Tech Stack

Frontend: HTML, CSS, JavaScript, Bootstrap, Swiper.js

Data Handling: JSON (products, users)

Storage: LocalStorage (Cart), Cookies (Authentication)

Version Control: Git & GitHub

📂 Project Structure
AnimeVerse/
│── index.html          # Homepage with featured products & Swiper
│── products.html       # Product listing + filters
│── cart.html           # Shopping cart page
│── login.html          # User login system
│── js/
│   ├── products.js     # Filtering, rendering, pagination
│   ├── cart.js         # LocalStorage cart logic
│   ├── auth.js         # Login/logout with cookies
│── data/
│   ├── products.json   # All product data
│   ├── users.json      # User credentials
│── css/
│   ├── style.css       # Custom styles
│── images/             # Product & UI images

⚡ Setup & Usage

Clone the repo:

git clone https://github.com/Arnav242005/AnimeVerse.git
cd AnimeVerse


Open index.html in your browser.

Explore products, use filters, login, and add items to cart.


🔮 Future Improvements

🖥️ Backend with database (Node.js + MongoDB / Firebase).

💳 Payment Gateway integration (Stripe/PayPal).

👤 User profiles & order history.

📦 Admin dashboard for product management.

👨‍💻 Authors

Arnav Jadhav – Developer
