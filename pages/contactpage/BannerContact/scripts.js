const ListRadio = document.querySelectorAll(
  ".formItem .listFild li .customRadio"
);
ListRadio.forEach(function (radio) {
  radio.addEventListener("click", function () {
    this.parentElement.children[0].checked = true;
  });
});
