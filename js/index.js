var ProductNameInput = document.getElementById("ProductName");
var ProductPriceInput = document.getElementById("ProductPrice");
var ProductcategoryInput = document.getElementById("ProductCategory");
var ProductDescriptionInput = document.getElementById("ProductDesciption");
var ProductImageInput = document.getElementById("Productimage");
var searchInput = document.getElementById("search");
var addbtn = document.getElementById("addBtn");
var updatebtn = document.getElementById("updateBtn");
var currentIndex = 0;

var productList = [];
if (localStorage.getItem("productContainer") !== null) {
  productList = JSON.parse(localStorage.getItem("productContainer"));
  displayProduct();
}

function addProduct() {
  if (
    validation(ProductNameInput) &&
    validation(ProductPriceInput) &&
    validation(ProductcategoryInput) &&
    validation(ProductDescriptionInput)
  ) {
    var product = {
      name: ProductNameInput.value.trim(),
      price: ProductPriceInput.value,
      category: ProductcategoryInput.value.trim(),
      description: ProductDescriptionInput.value.trim(),
      image: ProductImageInput.files[0]
        ? `imgs/${ProductImageInput.files[0]?.name}`
        : "imgs/img.jpg",
    };

    productList.push(product);
    localStorage.setItem("productContainer", JSON.stringify(productList));
    clearForm();
    displayProduct();
    Swal.fire({
      title: "success",
      text: "product added succssfully👍",
      icon: "success",
      confirmButtonText: "ok",
    });
  } else {
    Swal.fire({
      title: "Error!",
      text: "poduct failed to added😒",
      icon: "error",
      confirmButtonText: "ok",
    });
  }
}

function clearForm() {
  ProductNameInput.value = null;
  ProductPriceInput.value = null;
  ProductcategoryInput.value = null;
  ProductDescriptionInput.value = null;
  ProductImageInput.value = null;
  ProductNameInput.classList.remove("is-valid", "is-invalid");
  ProductPriceInput.classList.remove("is-valid", "is-invalid");
  ProductcategoryInput.classList.remove("is-valid", "is-invalid");
  ProductDescriptionInput.classList.remove("is-valid", "is-invalid");
}

function displayProduct() {
  var serchValue = searchInput.value;
  var box = "";
  for (let i = 0; i < productList.length; i++) {
    if (productList[i].name.toLowerCase().includes(serchValue.toLowerCase())) {
      box += `
        <div class="col-md-3">
            <div class="card mb-3">
                  <img src="${productList[i].image}" class="card-img-top" alt="${productList[i].name}" />
                  <div class="card-body">
                    <h4 class="card-title">${productList[i].name.split(" ", 1).join(" ")}</h4>
                    <h6 class="card-text">${productList[i].price}</h6>
                    <h6 class="card-text">${productList[i].category.split(" ", 1).join(" ")}</h6>
                    <h6 class="card-text">${productList[i].description.split(" ", 1).join(" ")}</h6>
                  </div>
                  <div class="card-footer text-center">
                    <button onclick="deleteProduct(${i})" class="btn btn-outline-danger btn-sm my-3"> <i class="fa-solid fa-trash"></i> Delete</button>
                    <button onclick="setProduct(${i})" class="btn btn-outline-warning btn-sm"><i class="fa-solid fa-edit"></i> update</button>
                  </div>
                </div>
          </div>
        `;
    }
  }
  document.getElementById("rowData").innerHTML = box;
}

function deleteProduct(i) {
  productList.splice(i, 1);
  localStorage.setItem("productContainer", JSON.stringify(productList));
  displayProduct();
}

function setProduct(i) {
  currentIndex = i;
  ProductNameInput.value = productList[i].name;
  ProductPriceInput.value = productList[i].price;
  ProductcategoryInput.value = productList[i].category;
  ProductDescriptionInput.value = productList[i].description;

  addbtn.classList.add("d-none");
  updatebtn.classList.remove("d-none");
}

function updateProduct() {
  var product = {
    name: ProductNameInput.value,
    price: ProductPriceInput.value,
    category: ProductcategoryInput.value,
    description: ProductDescriptionInput.value,
    image: ProductImageInput.files[0]
      ? `imgs/${ProductImageInput.files[0]?.name}`
      : "imgs/img.jpg",
  };

  productList.splice(currentIndex, 1, product);
  localStorage.setItem("productContainer", JSON.stringify(productList));
  displayProduct();
  clearForm();
  addbtn.classList.remove("d-none");
  updatebtn.classList.add("d-none");
}

function validation(element) {
  var text = element.value;
  var regex = {
    ProductName: /^[A-Z][a-z]{2,10}$/,
    ProductPrice: /^\d{1,10}(\.\d{1,2})?$/,
    ProductCategory: /^(TV|LAPTOP|MOBILE|PHONE)$/,
    ProductDesciption: /^[\w\w\s]{3,150}$/,
  };

  if (regex[element.id].test(text)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    element.nextElementSibling.classList.add("d-none");
    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    element.nextElementSibling.classList.remove("d-none");
    return false;
  }
}
