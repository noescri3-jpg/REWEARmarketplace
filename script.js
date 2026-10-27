// ===============================
// REWEAR - FUNCIONS PRINCIPALS
// ===============================


// ===============================
// FAVORITS ♡
// ===============================

let favorites = JSON.parse(localStorage.getItem("rewearFavorites")) || [];

const favoriteButtons = document.querySelectorAll(".heart");

favoriteButtons.forEach(function(button) {

    const productCard = button.closest(".product-card");

    if (!productCard) {
        return;
    }

    const brand = productCard.querySelector(".brand")?.textContent.trim() || "";
    const name = productCard.querySelector("h3")?.textContent.trim() || "";

    const productId = brand + "-" + name;

    // Recuperar estat dels preferits
    if (favorites.some(function(product) {
        return product.id === productId;
    })) {

        button.classList.add("active");
        button.textContent = "♥";

    }


    button.addEventListener("click", function(event) {

        event.preventDefault();
        event.stopPropagation();

        const existingIndex = favorites.findIndex(function(product) {
            return product.id === productId;
        });


        // TREURE DELS PREFERITS
        if (existingIndex !== -1) {

            favorites.splice(existingIndex, 1);

            button.classList.remove("active");
            button.textContent = "♡";

        }

        // AFEGIR ALS PREFERITS
        else {

            favorites.push({
                id: productId,
                brand: brand,
                name: name,
                html: productCard.innerHTML
            });

            button.classList.add("active");
            button.textContent = "♥";

        }


        localStorage.setItem(
            "rewearFavorites",
            JSON.stringify(favorites)
        );

    });

});


// ===============================
// BUSCADOR 🔍
// ===============================

const searchButton = document.querySelector(".search-button");

if (searchButton) {

    searchButton.addEventListener("click", function() {

        const overlay = document.createElement("div");

        overlay.className = "conscious-overlay";

        overlay.innerHTML = `

            <div class="conscious-window">

                <p>REWEAR</p>

                <h2>
                    Què estàs buscant?
                </h2>

                <p class="conscious-text">
                    Busca una peça, una marca o qualsevol
                    paraula que vulguis trobar.
                </p>

                <input
                    type="text"
                    class="conscious-textarea"
                    id="search-input"
                    placeholder="Ex. vestit, Nike, jaqueta..."
                >

                <div class="conscious-buttons">

                    <button
                        type="button"
                        class="conscious-button conscious-back"
                        id="search-back"
                    >
                        Tancar
                    </button>

                    <button
                        type="button"
                        class="conscious-button conscious-continue"
                        id="search-submit"
                    >
                        Buscar
                    </button>

                </div>

            </div>

        `;

        document.body.appendChild(overlay);


        // TANCAR

        document
            .getElementById("search-back")
            .addEventListener("click", function() {

                overlay.remove();

            });


        // BUSCAR

        document
            .getElementById("search-submit")
            .addEventListener("click", function() {

                const search = document
                    .getElementById("search-input")
                    .value
                    .trim()
                    .toLowerCase();

                overlay.remove();

                if (!search) {
                    return;
                }

                const products = document.querySelectorAll(".product-card");

                let found = false;

                products.forEach(function(product) {

                    const productText = product.textContent.toLowerCase();

                    if (productText.includes(search)) {

                        product.style.display = "";

                        found = true;

                    } else {

                        product.style.display = "none";

                    }

                });

                if (!found) {

                    alert("No hem trobat cap producte amb aquest nom.");

                }

            });

    });

}

// ===============================
// MODE DE COMPRA CONSCIENT 🧠
// ===============================

const buyButton = document.querySelector(".buy-button");

if (buyButton) {

    buyButton.addEventListener("click", function() {

        const overlay = document.createElement("div");

        overlay.className = "conscious-overlay";

        overlay.innerHTML = `

            <div class="conscious-window">

                <p>REWEAR</p>

                <h2>
                    Mode de compra conscient
                </h2>

                <p class="conscious-text">
                    Abans de continuar, atura't un moment
                    i pensa en aquesta compra.
                </p>

                <p class="conscious-question">
                    Per què vols comprar aquest producte?
                </p>

                <textarea
                    class="conscious-textarea"
                    placeholder="Escriu breument per què vols comprar-lo..."
                ></textarea>

                <div class="conscious-buttons">

                    <button
                        type="button"
                        class="conscious-button conscious-back"
                        id="conscious-back"
                    >
                        Tornar enrere
                    </button>

                    <button
                        type="button"
                        class="conscious-button conscious-continue"
                        id="conscious-continue"
                    >
                        D'acord, continuar
                    </button>

                </div>

            </div>

        `;

        document.body.appendChild(overlay);


        // ===============================
        // TORNAR ENRERE
        // ===============================

        document
            .getElementById("conscious-back")
            .addEventListener("click", function() {

                overlay.remove();

            });


        // ===============================
        // CONTINUAR
        // ===============================

        document
            .getElementById("conscious-continue")
            .addEventListener("click", function() {

                overlay.innerHTML = `

                    <div class="conscious-window checkout-window">

                        <p>REWEAR · COMPRA</p>

                        <h2>
                            Finalitza la teva compra
                        </h2>

                        <p class="checkout-description">
                            Introdueix les dades necessàries
                            per completar la compra.
                        </p>


                        <div class="checkout-form">

                            <div class="checkout-field">

                                <label>
                                    Nom i cognoms
                                </label>

                                <input
                                    type="text"
                                    placeholder="Nom i cognoms"
                                >

                            </div>


                            <div class="checkout-field">

                                <label>
                                    Adreça
                                </label>

                                <input
                                    type="text"
                                    placeholder="Carrer i número"
                                >

                            </div>


                            <div class="checkout-row">

                                <div class="checkout-field">

                                    <label>
                                        Ciutat
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="Barcelona"
                                    >

                                </div>


                                <div class="checkout-field">

                                    <label>
                                        Codi postal
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="08001"
                                    >

                                </div>

                            </div>


                            <div class="checkout-field">

                                <label>
                                    Número de targeta
                                </label>

                                <input
                                    type="text"
                                    placeholder="0000 0000 0000 0000"
                                    maxlength="19"
                                >

                            </div>


                            <div class="checkout-row">

                                <div class="checkout-field">

                                    <label>
                                        Caducitat
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="MM/AA"
                                    >

                                </div>


                                <div class="checkout-field">

                                    <label>
                                        CVV
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="000"
                                        maxlength="3"
                                    >

                                </div>

                            </div>

                        </div>


                        <div class="conscious-buttons">

                            <button
                                type="button"
                                class="conscious-button conscious-back"
                                id="checkout-back"
                            >
                                Tornar enrere
                            </button>

                            <button
                                type="button"
                                class="conscious-button conscious-continue"
                                id="confirm-purchase"
                            >
                                Confirmar compra
                            </button>

                        </div>

                    </div>

                `;


                // ===============================
                // TORNAR AL MODE CONSCIENT
                // ===============================

                document
                    .getElementById("checkout-back")
                    .addEventListener("click", function() {

                        overlay.remove();

                    });


                // ===============================
                // CONFIRMAR COMPRA
                // ===============================

                document
                    .getElementById("confirm-purchase")
                    .addEventListener("click", function() {

                        overlay.innerHTML = `

                            <div class="conscious-window confirmation-window">

                                <div class="confirmation-icon">
                                    ✓
                                </div>

                                <h2>
                                    Compra confirmada
                                </h2>

                                <p class="confirmation-text">
                                    La teva comanda s'ha registrat
                                    correctament.
                                </p>

                                <button
                                    type="button"
                                    class="confirmation-button"
                                    id="confirmation-close"
                                >
                                    Tornar a REWEAR
                                </button>

                            </div>

                        `;


                        document
                            .getElementById("confirmation-close")
                            .addEventListener("click", function() {

                                overlay.remove();

                            });

                    });

            });

    });

}

// ===============================
// MOSTRAR PREFERITS ❤️
// ===============================

const favoriteMenuButton = document.querySelector(".favorite-button");

if (favoriteMenuButton) {

    favoriteMenuButton.addEventListener("click", function() {

        const favorites = JSON.parse(
            localStorage.getItem("rewearFavorites")
        ) || [];


        const overlay = document.createElement("div");

        overlay.className = "conscious-overlay";


        // SI NO HI HA PREFERITS

        if (favorites.length === 0) {

            overlay.innerHTML = `

                <div class="conscious-window">

                    <p>REWEAR</p>

                    <h2>
                        Els teus preferits
                    </h2>

                    <p class="conscious-text">
                        Encara no tens cap peça guardada
                        als teus preferits.
                    </p>

                    <div class="conscious-buttons">

                        <button
                            type="button"
                            class="conscious-button conscious-back"
                            id="close-favorites"
                        >
                            Tancar
                        </button>

                    </div>

                </div>

            `;

        }


        // SI HI HA PREFERITS

        else {

            let productsHTML = "";

            favorites.forEach(function(product) {

                productsHTML += `

                    <div class="favorite-product">

                        <div class="favorite-product-info">

                            <p class="brand">
                                ${product.brand}
                            </p>

                            <h3>
                                ${product.name}
                            </h3>

                        </div>

                        <button
                            type="button"
                            class="remove-favorite"
                            data-id="${product.id}"
                        >
                            ♥
                        </button>

                    </div>

                `;

            });


            overlay.innerHTML = `

                <div class="conscious-window favorites-window">

                    <p>REWEAR</p>

                    <h2>
                        Els teus preferits
                    </h2>

                    <p class="conscious-text">
                        Les peces que has guardat
                        per tornar-hi més tard.
                    </p>

                    <div class="favorites-list">

                        ${productsHTML}

                    </div>

                    <div class="conscious-buttons">

                        <button
                            type="button"
                            class="conscious-button conscious-back"
                            id="close-favorites"
                        >
                            Tancar
                        </button>

                    </div>

                </div>

            `;

        }


        document.body.appendChild(overlay);


        // TANCAR

        document
            .getElementById("close-favorites")
            .addEventListener("click", function() {

                overlay.remove();

            });


        // ELIMINAR PREFERIT

        const removeButtons =
            overlay.querySelectorAll(".remove-favorite");


        removeButtons.forEach(function(button) {

            button.addEventListener("click", function() {

                const id = button.dataset.id;

                let updatedFavorites = JSON.parse(
                    localStorage.getItem("rewearFavorites")
                ) || [];


                updatedFavorites = updatedFavorites.filter(
                    function(product) {
                        return product.id !== id;
                    }
                );


                localStorage.setItem(
                    "rewearFavorites",
                    JSON.stringify(updatedFavorites)
                );


                overlay.remove();

                favoriteMenuButton.click();

            });

        });

    });

}

// ===============================
// FAVORITS DEL PRODUCTE ❤️
// ===============================

const productDetailHeart =
    document.querySelector(".product-detail-heart");

const favoriteLargeButton =
    document.querySelector(".favorite-large-button");


if (productDetailHeart || favoriteLargeButton) {

    const brandElement =
        document.getElementById("product-brand");

    const nameElement =
        document.getElementById("product-name");


    if (brandElement && nameElement) {

        const brand =
            brandElement.textContent.trim();

        const name =
            nameElement.textContent.trim();

        const productId =
            brand + "-" + name;


        let favorites = JSON.parse(
            localStorage.getItem("rewearFavorites")
        ) || [];


        function updateProductFavorite() {

            const isFavorite = favorites.some(function(product) {
                return product.id === productId;
            });


            if (productDetailHeart) {

                if (isFavorite) {

                    productDetailHeart.classList.add("active");
                    productDetailHeart.textContent = "♥";

                } else {

                    productDetailHeart.classList.remove("active");
                    productDetailHeart.textContent = "♡";

                }

            }


            if (favoriteLargeButton) {

                if (isFavorite) {

                    favoriteLargeButton.classList.add("active");
                    favoriteLargeButton.textContent =
                        "♥ Afegit als preferits";

                } else {

                    favoriteLargeButton.classList.remove("active");
                    favoriteLargeButton.textContent =
                        "♡ Afegir als favorits";

                }

            }

        }


        function toggleProductFavorite() {

            favorites = JSON.parse(
                localStorage.getItem("rewearFavorites")
            ) || [];


            const existingIndex =
                favorites.findIndex(function(product) {
                    return product.id === productId;
                });


            if (existingIndex !== -1) {

                favorites.splice(existingIndex, 1);

            } else {

                favorites.push({
                    id: productId,
                    brand: brand,
                    name: name
                });

            }


            localStorage.setItem(
                "rewearFavorites",
                JSON.stringify(favorites)
            );


            updateProductFavorite();

        }


        if (productDetailHeart) {

            productDetailHeart.addEventListener(
                "click",
                function(event) {

                    event.preventDefault();

                    toggleProductFavorite();

                }
            );

        }


        if (favoriteLargeButton) {

            favoriteLargeButton.addEventListener(
                "click",
                function(event) {

                    event.preventDefault();

                    toggleProductFavorite();

                }
            );

        }


        updateProductFavorite();

    }

}