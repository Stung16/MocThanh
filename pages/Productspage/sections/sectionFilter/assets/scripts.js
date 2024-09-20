const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

function isIOS() {
  const userAgent = navigator.userAgent;
  return /iPhone|iPad|iPod/i.test(userAgent);
}
// khai bao
const btn_TonggleFilter = $(".tonggle-filter");
const overlayFilter = $(".overlayFilter");
const btn_close_menuFilter = $(".btn_close_menuFilter");
const filter_cotent = $(".filter-cotent");

const tonggleShowFilter = () => {
  if (btn_TonggleFilter && overlayFilter && btn_close_menuFilter) {
    overlayFilter.classList.add("active");
    filter_cotent.classList.add("active");
  }
};
const closeContentFilter = () => {
  if (btn_TonggleFilter && overlayFilter && btn_close_menuFilter) {
    overlayFilter.classList.remove("active");
    filter_cotent.classList.remove("active");
  }
};
btn_TonggleFilter?.addEventListener("click", tonggleShowFilter);
overlayFilter?.addEventListener("click", closeContentFilter);
btn_close_menuFilter?.addEventListener("click", closeContentFilter);

//
//
//
//
// handleNavProduuct
const product_Items = $$(".product_Item-sell");
const listCategoryProduct = $(".listCategory");
const list_btnSeeMore = listCategoryProduct.querySelectorAll(".btn_seeMore");
const handleRenderProduct = function (data, title) {
  const html = `<div class="listProduct-item">
            <div class="header-productItem">
              <div
                class="productItem-label"
                data-aos="fade-right"
                data-aos-duration="800"
                data-aos-once="true"
              >
                ${title}
              </div>
            </div>
            <div
              class="listProduct"
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-once="true"
            >
            ${data?.products
              ?.map(function (product) {
                return `<div class="productItem">
                <img src="https://mocthanh.okhub-tech.com/wp-content/uploads/2024/09/product1.png" alt="" />
                <div class="productItem-infor">
                  <span>${product?.primary_category?.name}</span>
                  <p>${product?.title}</p>
                </div>
              </div>`;
              })
              .join("")}
            </div>
            <div class="group-btn">
                <div class='btn-item_prev prevBtn ${
                  +data?.current_page === 1 ? "disable" : "active"
                }'>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="53"
                    height="53"
                    viewBox="0 0 53 53"
                    fill="none"
                    class="circle"
                  >
                    <circle
                      cx="26.2275"
                      cy="26.5"
                      r="25.5"
                      stroke="url(#paint0_linear_959_78386)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_959_78386"
                        x1="-3.37465"
                        y1="26.5"
                        x2="52.2275"
                        y2="26.5"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#32890E" />
                        <stop offset="1" stop-color="#C39B0D" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <img class="arrowL" src="https://mocthanh.okhub-tech.com/wp-content/uploads/2024/09/Container-1.png" alt="" />
                </div>
                <div class="btn-item_next nextBtn ${
                  +data?.current_page + 1 <= +data?.total_pages
                    ? "active"
                    : "disable"
                }">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="53"
                    height="53"
                    viewBox="0 0 53 53"
                    fill="none"
                    class="circle"
                  >
                    <circle
                      cx="26.2275"
                      cy="26.5"
                      r="25.5"
                      stroke="url(#paint0_linear_959_78386)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_959_78386"
                        x1="-3.37465"
                        y1="26.5"
                        x2="52.2275"
                        y2="26.5"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#32890E" />
                        <stop offset="1" stop-color="#C39B0D" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <img
                    class="arrowR"
                    src="https://mocthanh.okhub-tech.com/wp-content/uploads/2024/09/Container-1.png"
                    style="rotate: 180deg"
                    alt=""
                  />
                </div>
              </div>
          </div>`;
  listCategoryProduct.innerHTML = html;
  if (!isIOS())
    AOS.init({
      disable: "mobile",
    });
};
// fnc getDataformApi
const getProduct = async function (slug, orderSlug, orderBySlug, pageSlug) {
  try {
    const response = await fetch(
      `https://mocthanh.okhub-tech.com/wp-json/okhub/v1/products?category=${slug}&page=1&per_page=9&orderby=${orderBySlug}&order=${orderSlug}&page=${pageSlug}`,
      {
        method: "GET",
      }
    );
    return await response.json();
  } catch (error) {
    console.warn("Something went wrong.", error);
  }
};

const handleGetProductBySlug = async function (
  title,
  slug,
  pageSlug = 1,
  orderSlug = "DESC",
  orderBySlug = "date"
) {
  const result = await getProduct(slug, orderSlug, orderBySlug, pageSlug);
  listCategoryProduct.innerHTML = "";
  handleRenderProduct(result, title);
  const prevBtn = $(".prevBtn");
  const nextBtn = $(".nextBtn");

  prevBtn?.addEventListener("click", function () {
    handleGetProductBySlug(
      title,
      slug,
      --pageSlug,
      (orderSlug = "DESC"),
      (orderBySlug = "date")
    );
  });
  nextBtn?.addEventListener("click", function () {
    handleGetProductBySlug(
      title,
      slug,
      ++pageSlug,
      (orderSlug = "DESC"),
      (orderBySlug = "date")
    );
  });
};

product_Items.forEach(function (item) {
  item.addEventListener("click", function () {
    product_Items.forEach((link) => link.classList.remove("active"));
    this.classList.add("active");
    localStorage.setItem(
      "ProductType",
      JSON.stringify([this.innerText.trim(), this.dataset.slug])
    );
    handleGetProductBySlug(this.innerText.trim(), this.dataset.slug);
  });
});
list_btnSeeMore.forEach(function (item) {
  item.addEventListener("click", function (e) {
    e.preventDefault();
    product_Items.forEach((link) => link.classList.remove("active"));
    product_Items.forEach((nav) => {
      if (item.dataset.slug === nav.dataset.slug) {
        nav.classList.add("active");
        localStorage.setItem(
          "ProductType",
          JSON.stringify([nav.innerText.trim(), nav.dataset.slug])
        );
        handleGetProductBySlug(nav.innerText.trim(), nav.dataset.slug);
      }
    });
  });
});

//
//
// filterOption
const btnOptionFilter = $(".btn-optionFilter");
const labelOptionFilter = btnOptionFilter?.querySelector(".title-button");
const listOptionFilter = btnOptionFilter?.querySelector(".listOptionFilter");
const listfilterChoosemb = $$(".optionFilterMb");
// filter optionMb
const closeOptionFiter = () => {
  if (listOptionFilter) {
    listOptionFilter.style.display = "none";
    listOptionFilter.innerHTML = "";
  }
};
const tonggleShowListOptins = (e) => {
  e.stopPropagation();

  if (listOptionFilter.innerHTML === "") {
    listOptionFilter.style.display = "flex";
    const html = `
                <li data-order="DESC" data-type="date">Mới nhất</li>
                <li data-order="ASC" data-type="date">Cũ nhất</li>
                <li data-order="ASC" data-type="title">Tên từ A-z</li>
                <li data-order="DESC" data-type="title">Tên từ z-a</li>
            `;
    listOptionFilter.innerHTML = html;
    const options = $$(".listOptionFilter li");
    options.forEach(function (option) {
      option.addEventListener("click", (e) => {
        e.stopPropagation();
        labelOptionFilter.innerText = option.innerText.trim();
        const productType = JSON.parse(localStorage.getItem("ProductType"));
        handleGetProductBySlug(
          productType?.[0],
          productType?.[1],
          (pageSlug = 1),
          (orderSlug = option.dataset.order),
          (orderBySlug = option.dataset.type)
        );
        closeOptionFiter();
      });
    });
  } else {
    closeOptionFiter();
  }
};
btnOptionFilter?.addEventListener("click", tonggleShowListOptins);
document.addEventListener("click", closeOptionFiter);
listfilterChoosemb?.forEach(function (option) {
  option.addEventListener("change", function (e) {
    const productType = JSON.parse(localStorage.getItem("ProductType"));
    handleGetProductBySlug(
      productType?.[0],
      productType?.[1],
      (pageSlug = 1),
      (orderSlug = this.value),
      (orderBySlug = this.dataset.type)
    );
    closeContentFilter();
  });
});
// ghép api
window.addEventListener("load", function () {
  localStorage.removeItem("ProductType");
});
const swiper = new Swiper(".swiper", {
  // Optional parameters
  speed: 400,
  spaceBetween: 0,
  slidesPerView: "auto", // Number of slides to show
  // direction: "vertical",
  loop: true,

  // Navigation arrows
  navigation: {
    nextEl: ".btn-item_prev",
    prevEl: ".btn-item_next",
  },
});
