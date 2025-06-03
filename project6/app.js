document.addEventListener("DOMContentLoaded", () => {
    let aboutButtonElement = document.getElementById("aboutButton");
    let timeTovisitButtonElement = document.getElementById("timeToVisitButton");
    let attractionsButtonElement = document.getElementById("attractionsButton");

    let aboutTabElement = document.getElementById("aboutTab");
    let timeTovisitTabElement = document.getElementById("timeToVisitTab");
    let attractionsTabElement = document.getElementById("attractionsTab");

    timeTovisitTabElement.style.display = "none";
    attractionsTabElement.style.display = "none";

    aboutButtonElement.addEventListener("click", onClickAboutTab);
    timeTovisitButtonElement.addEventListener("click", onClickTimeToVisitTab);
    attractionsButtonElement.addEventListener("click", onClickAttractionsTab);

    function onClickAboutTab() {
        aboutTabElement.style.display="block";
        timeTovisitTabElement.style.display = "none";
        attractionsTabElement.style.display = "none";

        aboutButtonElement.classList.add("selected-button");
        timeTovisitButtonElement.classList.remove("selected-button");
        attractionsButtonElement.classList.remove("selected-button");
    }

    function onClickTimeToVisitTab() {
        aboutTabElement.style.display = "none";
        timeTovisitTabElement.style.display="block";
        attractionsTabElement.style.display = "none";

        aboutButtonElement.classList.remove("selected-button");
        timeTovisitButtonElement.classList.add("selected-button");
        attractionsButtonElement.classList.remove("selected-button");
    }

    function onClickAttractionsTab() {
        aboutTabElement.style.display = "none";
        timeTovisitTabElement.style.display = "none";
        attractionsTabElement.style.display="block";

        aboutButtonElement.classList.remove("selected-button");
        timeTovisitButtonElement.classList.remove("selected-button");
        attractionsButtonElement.classList.add("selected-button");
    }
});
