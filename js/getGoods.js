(function () {
    const links = document.querySelectorAll(".navigation-link");

    const getData = () => {
        fetch("https://wildberries-6d7ad-default-rtdb.firebaseio.com/db.json")
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                localStorage.setItem("goods", JSON.stringify(data));
            });
    };

    links.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            getData();
        });
    });
})();