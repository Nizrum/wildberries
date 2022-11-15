(function () {
    const cartBtn = document.querySelector(".button-cart");
    const cart = document.getElementById("modal-cart");
    const closeBtn = cart.querySelector(".modal-close");
    const goodsContainer = document.querySelector(".long-goods-list");
    const cartTable = document.querySelector(".cart-table__goods");
    const cartTotal = document.querySelector(".card-table__total");
    const modalForm = document.querySelector(".modal-form");
    const modalInputName = document.querySelector(".modal-input_name");
    const modalInputPhone = document.querySelector(".modal-input_phone");

    const deleteCartItem = (id) => {
        const cartArr = JSON.parse(localStorage.getItem("cart"));

        const newCart = cartArr.filter((good) => good.id !== id);

        localStorage.setItem("cart", JSON.stringify(newCart));
        renderCartGoods(JSON.parse(localStorage.getItem("cart")));
    };

    const plusCartItem = (id) => {
        const cartArr = JSON.parse(localStorage.getItem("cart"));

        const newCart = cartArr.map((good) => {
            if (good.id === id) {
                good.count++;
            }
            return good;
        });

        localStorage.setItem("cart", JSON.stringify(newCart));
        renderCartGoods(JSON.parse(localStorage.getItem("cart")));
    };

    const minusCartItem = (id) => {
        const cartArr = JSON.parse(localStorage.getItem("cart"));

        const newCart = cartArr.map((good) => {
            if (good.id === id) {
                if (good.count > 1) {
                    good.count--;
                }
            }
            return good;
        });

        localStorage.setItem("cart", JSON.stringify(newCart));
        renderCartGoods(JSON.parse(localStorage.getItem("cart")));
    };

    const addToCart = (id) => {
        const goods = JSON.parse(localStorage.getItem("goods"));
        const clickedGood = goods.find((good) => good.id === id);
        const cartArr = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];

        if (cartArr.some((good) => good.id === clickedGood.id)) {
            cartArr.map((good) => {
                if (good.id === clickedGood.id) {
                    good.count++;
                }
                return good;
            });
        } else {
            clickedGood.count = 1;
            cartArr.push(clickedGood);
        }

        localStorage.setItem("cart", JSON.stringify(cartArr));
    };

    const renderCartGoods = (goods) => {
        cartTable.innerHTML = "";
        goods.forEach((good) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${good.name}</td>
                <td>${good.price}$</td>
                <td><button class="cart-btn-minus"">-</button></td>
                <td>${good.count}</td>
                <td><button class=" cart-btn-plus"">+</button></td>
                <td>${+good.price * +good.count}$</td>
                <td><button class="cart-btn-delete"">x</button></td>
            `;

            cartTable.appendChild(tr);

            tr.addEventListener("click", (event) => {
                if (event.target.classList.contains("cart-btn-minus")) {
                    minusCartItem(good.id);
                } else if (event.target.classList.contains("cart-btn-plus")) {
                    plusCartItem(good.id);
                } else if (event.target.classList.contains("cart-btn-delete")) {
                    deleteCartItem(good.id);
                }
            });
        });
        cartTotal.textContent = goods.reduce((total, good) => total + good.price * good.count, 0) + '$';
    };

    const sendForm = () => {
        const cartArr = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];

        fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            body: JSON.stringify({
                cart: cartArr,
                name: modalInputName.value,
                phone: modalInputPhone.value,
            }),
        }).then(() => {
            cart.style.display = "";
            localStorage.setItem("cart", JSON.stringify([]));
        });
    };

    modalForm.addEventListener("submit", (event) => {
        event.preventDefault();
        sendForm();
    });

    cartBtn.addEventListener("click", () => {
        const cartArray = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
        renderCartGoods(cartArray);
        cart.style.display = "flex";
    });

    closeBtn.addEventListener("click", () => {
        cart.style.display = "";
    });

    if (goodsContainer) {
        goodsContainer.addEventListener("click", (event) => {
            if (event.target.closest(".add-to-cart")) {
                const buttonToCart = event.target.closest(".add-to-cart");
                const goodId = buttonToCart.dataset.id;
                addToCart(goodId);
            }
        });
    }
})();
