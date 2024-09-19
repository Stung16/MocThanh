const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// timmer
const animationDuration = 3000;

const frameDuration = 1000 / 60;

const totalFrames = Math.round(animationDuration / frameDuration);

const easeOutQuad = (t) => t * (2 - t);

const animateCountUp = (el) => {
  let frame = 0;
  const countTo = parseInt(el.innerHTML, 10);

  const counter = setInterval(() => {
    frame++;

    const progress = easeOutQuad(frame / totalFrames);

    const currentCount = Math.round(countTo * progress);

    if (parseInt(el.innerHTML, 10) !== currentCount) {
      el.innerHTML = currentCount;
    }

    if (frame === totalFrames) {
      clearInterval(counter);
    }
  }, frameDuration);
};

const countupEls = $$(".number");
countupEls.forEach(animateCountUp);
/*




*/
// getAllCity
const handleGetDestrict = async (city) => {
  try {
    const response = await fetch(
      `https://mocthanh.okhub-tech.com/wp-json/okhub/v1/child-categories?parent=${city}`,
      {
        method: "GET",
      }
    );
    return await response.json();
  } catch (error) {
    console.warn("Something went wrong.", err);
  }
};
const handleGetResultFilter = async (city, district) => {
  try {
    loading.style.display = "block";
    const response = await fetch(
      `https://mocthanh.okhub-tech.com/wp-json/okhub/v1/filter-agents?city=${city}&district=${district}`,
      {
        method: "GET",
      }
    );
    return await response.json();
  } catch (error) {
    console.warn("Something went wrong.", err);
  } finally {
    loading.style.display = "none";
  }
};
const handleRenderSelect = function (data, fatherEl) {
  const html = data
    ?.map?.(function (item) {
      return `<li class="dropdown__select-option" role="option" data-value=${item.slug}>
                          ${item?.name}
                        </li>`;
    })
    .join("");
  fatherEl.innerHTML = html;
};
const handleRenderResult = function (data, fatherEl) {
  const html = data
    ?.map?.(function (item) {
      return `<div class="resultItem">
                  <p class="titleResult">${item?.title}</p>
                  <ul class="resultInfor">
                    <li>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="21"
                        height="20"
                        viewBox="0 0 21 20"
                        fill="none"
                      >
                        <path
                          d="M10.7754 2C9.05211 2.00197 7.39999 2.66484 6.18145 3.84321C4.9629 5.02159 4.27743 6.61924 4.2754 8.28571C4.27333 9.64756 4.73334 10.9724 5.58485 12.0571C5.58485 12.0571 5.76212 12.2829 5.79108 12.3154L10.7754 18L15.7621 12.3126C15.7881 12.2823 15.9659 12.0571 15.9659 12.0571L15.9665 12.0554C16.8176 10.9712 17.2774 9.64693 17.2754 8.28571C17.2734 6.61924 16.5879 5.02159 15.3693 3.84321C14.1508 2.66484 12.4987 2.00197 10.7754 2ZM10.7754 10.5714C10.3079 10.5714 9.85092 10.4374 9.46223 10.1862C9.07353 9.93506 8.77058 9.57808 8.59168 9.16042C8.41278 8.74276 8.36597 8.28318 8.45717 7.83979C8.54837 7.39641 8.77349 6.98913 9.10405 6.66947C9.43461 6.34981 9.85577 6.13211 10.3143 6.04392C10.7728 5.95572 11.248 6.00099 11.6799 6.17399C12.1118 6.34699 12.481 6.63996 12.7407 7.01584C13.0004 7.39172 13.139 7.83364 13.139 8.28571C13.1382 8.89169 12.889 9.47263 12.4459 9.90112C12.0028 10.3296 11.402 10.5707 10.7754 10.5714Z"
                          fill="#A68556"
                        />
                      </svg>
                      <p>
                        ${item?.dia_chi}
                      </p>
                    </li>
                    <li>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="21"
                        height="20"
                        viewBox="0 0 21 20"
                        fill="none"
                      >
                        <path
                          d="M10.7754 2C9.05211 2.00197 7.39999 2.66484 6.18145 3.84321C4.9629 5.02159 4.27743 6.61924 4.2754 8.28571C4.27333 9.64756 4.73334 10.9724 5.58485 12.0571C5.58485 12.0571 5.76212 12.2829 5.79108 12.3154L10.7754 18L15.7621 12.3126C15.7881 12.2823 15.9659 12.0571 15.9659 12.0571L15.9665 12.0554C16.8176 10.9712 17.2774 9.64693 17.2754 8.28571C17.2734 6.61924 16.5879 5.02159 15.3693 3.84321C14.1508 2.66484 12.4987 2.00197 10.7754 2ZM10.7754 10.5714C10.3079 10.5714 9.85092 10.4374 9.46223 10.1862C9.07353 9.93506 8.77058 9.57808 8.59168 9.16042C8.41278 8.74276 8.36597 8.28318 8.45717 7.83979C8.54837 7.39641 8.77349 6.98913 9.10405 6.66947C9.43461 6.34981 9.85577 6.13211 10.3143 6.04392C10.7728 5.95572 11.248 6.00099 11.6799 6.17399C12.1118 6.34699 12.481 6.63996 12.7407 7.01584C13.0004 7.39172 13.139 7.83364 13.139 8.28571C13.1382 8.89169 12.889 9.47263 12.4459 9.90112C12.0028 10.3296 11.402 10.5707 10.7754 10.5714Z"
                          fill="#A68556"
                        />
                      </svg>
                      <p>${item?.phone}</p>
                    </li>
                    <li>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="21"
                        height="20"
                        viewBox="0 0 21 20"
                        fill="none"
                      >
                        <path
                          d="M10.7754 2C9.05211 2.00197 7.39999 2.66484 6.18145 3.84321C4.9629 5.02159 4.27743 6.61924 4.2754 8.28571C4.27333 9.64756 4.73334 10.9724 5.58485 12.0571C5.58485 12.0571 5.76212 12.2829 5.79108 12.3154L10.7754 18L15.7621 12.3126C15.7881 12.2823 15.9659 12.0571 15.9659 12.0571L15.9665 12.0554C16.8176 10.9712 17.2774 9.64693 17.2754 8.28571C17.2734 6.61924 16.5879 5.02159 15.3693 3.84321C14.1508 2.66484 12.4987 2.00197 10.7754 2ZM10.7754 10.5714C10.3079 10.5714 9.85092 10.4374 9.46223 10.1862C9.07353 9.93506 8.77058 9.57808 8.59168 9.16042C8.41278 8.74276 8.36597 8.28318 8.45717 7.83979C8.54837 7.39641 8.77349 6.98913 9.10405 6.66947C9.43461 6.34981 9.85577 6.13211 10.3143 6.04392C10.7728 5.95572 11.248 6.00099 11.6799 6.17399C12.1118 6.34699 12.481 6.63996 12.7407 7.01584C13.0004 7.39172 13.139 7.83364 13.139 8.28571C13.1382 8.89169 12.889 9.47263 12.4459 9.90112C12.0028 10.3296 11.402 10.5707 10.7754 10.5714Z"
                          fill="#A68556"
                        />
                      </svg>
                      <p>${item?.gio_lam}</p>
                    </li>
                  </ul>
                  <a class="resultLink" href=${item?.link_google_map}
                    >Chỉ đường tới đây
                    <span
                      ><svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="13"
                        height="12"
                        viewBox="0 0 13 12"
                        fill="none"
                      >
                        <g clip-path="url(#clip0_1295_17127)">
                          <path
                            d="M7.13383 1.43885C7.07036 1.32604 6.92746 1.28601 6.81463 1.34948L6.8031 1.35597C6.6903 1.41944 6.65027 1.56234 6.71374 1.67517C6.75674 1.75164 6.83627 1.79467 6.91823 1.79467C6.95714 1.79467 6.9966 1.78495 7.03293 1.76453L7.04446 1.75804C7.15727 1.69457 7.1973 1.55167 7.13383 1.43885Z"
                            fill="white"
                          />
                          <path
                            d="M12.2067 2.13114L10.1442 0.0686431C10.0772 0.00161185 9.97638 -0.0184272 9.88882 0.017854C9.80125 0.0541119 9.74414 0.139588 9.74414 0.23437V0.843745H8.75976C8.39793 0.843745 8.03925 0.892284 7.69368 0.988026C7.56895 1.0226 7.49585 1.15174 7.53039 1.27647C7.56496 1.40121 7.69406 1.47426 7.81884 1.43976C8.12364 1.35531 8.44024 1.31249 8.75976 1.31249H9.97851C10.108 1.31249 10.2129 1.20756 10.2129 1.07812V0.800198L11.7096 2.29687L10.2129 3.79354V3.51562C10.2129 3.38617 10.108 3.28124 9.97851 3.28124H8.75976C7.9068 3.28124 7.21289 3.97516 7.21289 4.82812V7.87668C6.78356 7.07421 6.08767 6.4349 5.24414 6.07818V4.82812C5.24414 3.85694 5.63146 2.95296 6.33478 2.28271C6.42848 2.19342 6.43204 2.04506 6.34274 1.95135C6.25342 1.85765 6.10506 1.85406 6.01138 1.94339C5.21435 2.70297 4.77539 3.72745 4.77539 4.82812V5.91393C4.43235 5.81739 4.07074 5.76562 3.69726 5.76562H2.80663V5.15624C2.80663 5.06146 2.74952 4.97599 2.66196 4.93971C2.57439 4.90342 2.47354 4.92351 2.40653 4.99049L0.344033 7.053C0.25251 7.14452 0.25251 7.29292 0.344033 7.38447L2.40653 9.44697C2.47356 9.51398 2.57437 9.53407 2.66196 9.49776C2.74954 9.46148 2.80663 9.37603 2.80663 9.28122V8.67185H3.69726C4.29173 8.67185 4.77539 9.1555 4.77539 9.74997V11.7656C4.77539 11.895 4.88031 12 5.00976 12H7.44726C7.57671 12 7.68164 11.895 7.68164 11.7656V4.82812C7.68164 4.23365 8.16529 3.74999 8.75976 3.74999H9.74414V4.35937C9.74414 4.45415 9.80125 4.53963 9.88882 4.57591C9.97638 4.61219 10.0772 4.59215 10.1442 4.52512L12.2067 2.46262C12.2983 2.37107 12.2983 2.22267 12.2067 2.13114ZM7.21289 11.5312H6.55664V9.96276C6.55664 9.83332 6.45171 9.72839 6.32226 9.72839C6.19282 9.72839 6.08789 9.83332 6.08789 9.96276V11.5312H5.24414V9.75C5.24414 8.89703 4.55022 8.20312 3.69726 8.20312H2.57226C2.44281 8.20312 2.33788 8.30805 2.33788 8.4375V8.71542L0.841213 7.21875L2.33788 5.72207V5.99999C2.33788 6.12944 2.44281 6.23437 2.57226 6.23437H3.69726C5.63578 6.23437 7.21289 7.81148 7.21289 9.75V11.5312Z"
                            fill="white"
                          />
                          <path
                            d="M6.48797 8.89191C6.44438 8.84809 6.38391 8.82324 6.32227 8.82324C6.26063 8.82324 6.20016 8.84809 6.15656 8.89191C6.11297 8.93551 6.08789 8.99574 6.08789 9.05762C6.08789 9.11926 6.11297 9.17973 6.15656 9.22332C6.20016 9.26691 6.26063 9.29199 6.32227 9.29199C6.38391 9.29199 6.44438 9.26691 6.48797 9.22332C6.53156 9.17973 6.55664 9.11926 6.55664 9.05762C6.55664 8.99574 6.53156 8.93551 6.48797 8.89191Z"
                            fill="white"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1295_17127">
                            <rect
                              width="12"
                              height="12"
                              fill="white"
                              transform="translate(0.275391)"
                            />
                          </clipPath>
                        </defs></svg></span
                  ></a>
                </div>`;
    })
    .join("");
  fatherEl.innerHTML = html;
};
const loading = $(".loading");
let isLoading = false;

const handleSlectOptions = function (data) {
  const list_dropDownSeclectCity = $(".list-dropdown_city");
  const resultFilterEl = $(".resultFilter");
  const list_dropDownSeclectDistrict = $(".list-dropdown_district");
  const dropdown_City = $(".dropdown_city");
  const dropdown_destric = $(".dropdown_district");
  let cityValue = "";
  let districtValue = "";
  //check
  if (list_dropDownSeclectCity && list_dropDownSeclectDistrict) {
    // renderSelectCity
    handleRenderSelect(data, list_dropDownSeclectCity);
    const labelCity = dropdown_City.querySelector(".dropdown__filter-selected");
    const optionsCity = Array.from(
      dropdown_City.querySelectorAll(".dropdown__select-option")
    );
    const toggle = dropdown_City.querySelector(".dropdown__switch");
    dropdown_City.addEventListener("click", () => {
      document.querySelectorAll(".dropdown__switch").forEach((otherToggle) => {
        if (otherToggle !== toggle) {
          otherToggle.checked = false; // Đóng các dropdown khác
        }
      });
    });

    // selectCity
    optionsCity.forEach((option) => {
      option.addEventListener("click", async () => {
        cityValue = option.dataset.value;
        labelCity.textContent = option.textContent.trim(); // Cập nhật nội dung của label
        dropdown_destric.style.display = "block";
        handleRenderSelect(
          await handleGetDestrict(option.dataset.value),
          list_dropDownSeclectDistrict
        );
        const labelDistrict = dropdown_destric.querySelector(
          ".dropdown__filter-selected"
        );
        const optionsDistrict = Array.from(
          dropdown_destric.querySelectorAll(".dropdown__select-option")
        );
        const toggle = dropdown_destric.querySelector(".dropdown__switch");
        dropdown_destric.addEventListener("click", () => {
          document
            .querySelectorAll(".dropdown__switch")
            .forEach((otherToggle) => {
              if (otherToggle !== toggle) {
                otherToggle.checked = false; // Đóng các dropdown khác
              }
            });
        });

        // selectDistrict
        optionsDistrict.forEach((option) => {
          option.addEventListener("click", async () => {
            districtValue = option.dataset.value;
            labelDistrict.textContent = option.textContent.trim(); // Cập nhật nội dung của label
            const resultFilter = await handleGetResultFilter(
              cityValue,
              districtValue
            );
            resultFilterEl.style.display = "flex";
            resultFilterEl.innerHTML = "";
            if (resultFilter?.length) {
              handleRenderResult(resultFilter, resultFilterEl);
            } else {
              const notificationResult = document.createElement("h4");
              notificationResult.classList.add("noResult");
              notificationResult.textContent = resultFilter?.message;
              resultFilterEl.appendChild(notificationResult);
            }
          });
        });
        setTimeout(() => {
          toggle.checked = false; // Đóng dropdown sau khi chọn với một chút delay nhỏ
        }, 100); // Delay để đảm bảo sự kiện click hoàn tất
      });
    });
  }
};
loading.style.display = "block";

fetch("https://mocthanh.okhub-tech.com/wp-json/okhub/v1/agent_category")
  .then(function (response) {
    // The API call was successful!
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(response);
    }
  })
  .then(function (data) {
    handleSlectOptions(data);
  })
  .catch(function (err) {
    // There was an error
    console.warn("Something went wrong.", err);
  })
  .finally(function () {
    loading.style.display = "none";
  });

$$(".dropdown").forEach((dropdown) => {
  const toggle = dropdown.querySelector(".dropdown__switch");
  dropdown.addEventListener("click", () => {
    document.querySelectorAll(".dropdown__switch").forEach((otherToggle) => {
      if (otherToggle !== toggle) {
        otherToggle.checked = false; // Đóng các dropdown khác
      }
    });
  });
  // Đóng dropdown khi click bên ngoài
  document.addEventListener("click", (e) => {
    const element = e.target;
    const isDropdownChild = element.closest(".dropdown");

    if (!isDropdownChild) {
      document.querySelectorAll(".dropdown__switch").forEach((otherToggle) => {
        otherToggle.checked = false; // Đóng tất cả dropdown nếu click ra ngoài
      });
    }
  });
});
