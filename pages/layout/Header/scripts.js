const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// khai bao
const nav_listItem = $(".nav-listItem");
const btn_TonggleMenu = $(".menu-toggle");
const overlay = $(".overlay");
const btn_close_menumb = $(".btn-close_menumb");

// events
const tonggleShowMenu = () => {
  if (nav_listItem && overlay && btn_close_menumb) {
    nav_listItem.classList.add("active");
    overlay.classList.add("active");
    btn_close_menumb.classList.add("active");
  }
};
const closeMenuMb = () => {
  if (nav_listItem && overlay && btn_close_menumb) {
    nav_listItem.classList.remove("active");
    overlay.classList.remove("active");
    btn_close_menumb.classList.add("active");
  }
};

btn_TonggleMenu.addEventListener("click", tonggleShowMenu);
overlay.addEventListener("click", closeMenuMb);
btn_close_menumb.addEventListener("click", closeMenuMb);
