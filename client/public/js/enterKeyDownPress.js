document.onkeydown = function (e) {
    if (e.key == "Enter" && document.getElementById("search").value != "") {
        try {
            e.preventDefault();
            $("body").toggleClass("loading");

            const keyword = document.getElementById("search").value;

            window.location.href =
                "http://localhost:8000/searchResult?keyword=" +
                keyword +
                "&page=1";
        } catch (error) {
            console.log(error);
            $("body").toggleClass("loading");
        }
    }
};
