document.addEventListener("DOMContentLoaded", function () {
    fetch('./script/srilankanwildlife.json')
        .then(response => response.json())
        .then(data => {
            // Populate the intro section
            populateIntro(data.sections.find(section => section.type === 'intro'));

            // Populate the habitats section
            populateLocations(data.sections.find(section => section.type === 'locations'));

            // Store data in localStorage
            localStorage.setItem('srilankanwildlifeData', JSON.stringify(data));
        })
        .catch(error => console.error('Error fetching JSON:', error));
});

function populateIntro(introData) {
    var introSection = document.querySelector(".intro");
    var introImage = document.createElement("img");
    introImage.src = introData.imageSrc;
    introImage.alt = introData.altText;
    introSection.appendChild(introImage);

    var introText = document.createElement("div");
    introText.classList.add("intro-text");
    var heading = document.createElement("h3");
    heading.textContent = introData.content.title;
    var paragraph = document.createElement("p");
    paragraph.textContent = introData.content.description;
    introText.appendChild(heading);
    introText.appendChild(paragraph);
    introSection.appendChild(introText);
};

function populateLocations(locationsData){
    var locationsSection = document.querySelector(".locations");

    locationsData.locations.forEach(location => {
        var locationContainer = document.createElement("div");
        locationContainer.classList.add("location-container");

        var heading = document.createElement("h2");
        heading.classList.add("section-heading");
        heading.textContent = location.name;
        locationContainer.appendChild(heading);

        var introParagraph = document.createElement("p");
        introParagraph.classList.add("section-intro");
        introParagraph.textContent = location.intro;
        locationContainer.appendChild(introParagraph);

        var sectionContainer = document.createElement("div");
        sectionContainer.classList.add("section-container");

        location.images.forEach(imageData => {
            var box = document.createElement("div");
            box.classList.add("box");

            var image = document.createElement("img");
            image.src = imageData.src;
            image.alt = imageData.alt;

            box.appendChild(image);
            sectionContainer.appendChild(box);
        });

        var mapFrame = document.createElement("div");
        mapFrame.classList.add("box");

        var mapIframe = document.createElement("iframe");
        mapIframe.src = location.mapSrc;
        mapIframe.width = "400";
        mapIframe.height = "325";
        mapIframe.style.border = "0";
        mapIframe.allowFullscreen = "";
        mapIframe.loading = "lazy";
        mapIframe.referrerpolicy = "no-referrer-when-downgrade";

        mapFrame.appendChild(mapIframe);
        sectionContainer.appendChild(mapFrame);

        locationContainer.appendChild(sectionContainer);
        locationsSection.appendChild(locationContainer);
})}