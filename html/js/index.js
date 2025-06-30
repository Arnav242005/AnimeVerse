    var swiper = new Swiper(".mySwiper", {
      spaceBetween: 30,
      centeredSlides: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });

document.addEventListener("DOMContentLoaded", function () {
  const logoutBtn = document.querySelector(".logout-btn");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      let username = getCookie("username");
      document.cookie = `username=${username}; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      alert("Logout Successful");
    });
  } else {
    console.warn("No element with class 'logout_btn' found.");
  }
});

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  
  if (parts.length === 2) return parts.pop().split(';').shift();
  
  return null;
}

document.querySelectorAll(".categorybtn").forEach(btn => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    const category = this.getAttribute("data-category");
    window.location.href = `products.html?category=${encodeURIComponent(category)}`;
  });
});