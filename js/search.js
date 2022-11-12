(function () {
    const input = document.querySelector('.search-block > input');
    const searchBtn = document.querySelector('.search-block > button');
    
    searchBtn.addEventListener('click', function () {
        console.log(input.value);
    });
})();