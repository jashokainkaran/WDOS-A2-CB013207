document.addEventListener("DOMContentLoaded", function () {
    fetch('./script/animals.json')
        .then(response => response.json())
        .then(data => {
            populateIntro(data.sections.find(section => section.type === 'intro'));
            populateAnimalsSection(data.sections.find(section => section.type === 'animalsSection'));
            populateNationalParksSection(data.sections.find(section => section.type === 'nationalParks'));

            // Store data in localStorage
            localStorage.setItem('animalsData', JSON.stringify(data));
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
    paragraph.innerHTML = introData.content.description;
    introText.appendChild(heading);
    introText.appendChild(paragraph);
    introSection.appendChild(introText);
}

function populateAnimalsSection(sectionData) {
    var section = document.querySelector(".animalsSection");
    var sectionContainer = document.createElement("div");
    sectionContainer.classList.add("section-container");

    var heading = document.createElement("h2");
    heading.classList.add("section-heading");
    heading.textContent = sectionData.heading;
    section.appendChild(heading);

    var introParagraph = document.createElement("p");
    introParagraph.classList.add("section-intro");
    introParagraph.textContent = sectionData.intro;
    section.appendChild(introParagraph);

    sectionData.items.forEach(item => {
        var box = document.createElement("div");
        box.classList.add("box");

        var image = document.createElement("img");
        image.src = item.imageSrc;
        image.alt = item.altText;

        var title = document.createElement("h4");
        title.textContent = item.title;

        var paragraph = document.createElement("p");
        paragraph.textContent = item.description;

        box.appendChild(image);
        box.appendChild(title);
        box.appendChild(paragraph);
        sectionContainer.appendChild(box);
    });

    section.appendChild(sectionContainer);
}

function populateNationalParksSection(sectionData) {
    var section = document.querySelector(".nationalParks");
    var sectionContainer = document.createElement("div");
    sectionContainer.classList.add("section-container");

    var heading = document.createElement("h2");
    heading.classList.add("section-heading");
    heading.textContent = sectionData.heading;
    section.appendChild(heading);

    var introParagraph = document.createElement("p");
    introParagraph.classList.add("section-intro");
    introParagraph.textContent = sectionData.intro;
    section.appendChild(introParagraph);

    sectionData.items.forEach(item => {
        var box = document.createElement("div");
        box.classList.add("box");

        var image = document.createElement("img");
        image.src = item.imageSrc;
        image.alt = item.altText;

        var title = document.createElement("h4");
        title.textContent = item.title;

        var paragraph = document.createElement("p");
        paragraph.textContent = item.description;

        box.appendChild(image);
        box.appendChild(title);
        box.appendChild(paragraph);
        sectionContainer.appendChild(box);
    });

    section.appendChild(sectionContainer);
}
