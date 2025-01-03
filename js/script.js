// **Reusable components
String.prototype.isEmpty = function () {
    return (this.length === 0 || !this.trim());
}

/**
 * @param {"enter the id of the element"} id 
 * @param {"you may further specify the type using"} tagName 
 * @returns null or the element
 */
function $get(id, tagName = null) {
    if (id != null && tagName != null && document.getElementById(id) !== null) {
        if (document.getElementById(id).tagName === tagName.toUpperCase()) {
            return document.getElementById(id);
        }
    } else if (id !== null) {
        return document.getElementById(id);
    }
    return null;
}

function $createElement(tagName, textContent = null, attributes = [], childs = []) {
    let res;

    if (tagName != null) {
        // Create DOM element
        res = document.createElement(tagName);

        if (textContent != null) {
            res.textContent = textContent;
        }

        // Assignment attributes
        attributes.forEach(element => {
            res.setAttribute(element[0], element[1]);
        });

        childs.forEach(element => {
            res.appendChild(element);
        });
    }

    return res;
}

// **General Functions
function createArticleElement(title, imgName, hashTag, description, liveHref, sourceHref) {
    let h1El = $createElement('h1', title);
    let headerEl = $createElement('header', null, [], [h1El]);

    let imgEl = $createElement('img', null, [['src', `imgs/${imgName}`], ['alt', imgName]]);
    let sectionEl = $createElement('section', null, [['class', 'image-container']], [imgEl]);

    let p1 = $createElement('p', hashTag, [['class', 'hash-tag']]);
    let p2 = $createElement('p', description, [['class', 'description']]);

    // Handle empty source or live links
    let classLink1 = (liveHref.isEmpty()) ? ['class', 'unavail'] : ['class', ''];
    let link1 = $createElement('a', 'Live', [['target', '_blank'], ['href', liveHref], classLink1]);
    if (liveHref.isEmpty()) { link1.setAttribute("onclick", "return false;"); }

    // Handle empty source or live links
    let classLink2 = (sourceHref.isEmpty()) ? ['class', 'unavail'] : ['class', ''];
    let link2 = $createElement('a', 'Source code', [['target', '_blank'], ['href', sourceHref], classLink2]);
    if (sourceHref.isEmpty()) { link2.setAttribute("onclick", "return false;"); }

    let linksEl = $createElement('div', null, [['class', 'links']], [link1, link2]);
    let footerEl = $createElement('footer', null, [], [p1, p2, linksEl]);

    let articleEl = $createElement('article', null, [['class', 'project-item']], [headerEl, sectionEl, footerEl]);

    return articleEl;
}

// if the limit is -1(no limit) then load everything
function loadProjects(containerElement, limit = -1) {
    fetch('js/data.json')
        .then(res => res.json())
        .then(res => {
            res.forEach(e => {
                if (limit == 0) return;
                containerElement.appendChild(createArticleElement(e.title, e.imgName, e.hashTag, e.description, e.liveHref, e.sourceHref));
                if (limit != null) limit--;
            });
        })
        .catch(e => {
            console.log(`Error occurred: ${e}`);
        });
}

// Copyright year
function getYear() {
    return new Date().getFullYear();
}

// **Event handlers
async function handleFormSubmission(e) {
    // Prevent redirection
    e.preventDefault();

    let form = e.target;
    let data = new FormData(form);

    if (!form.name.value.isEmpty() && !form.email.value.isEmpty() && !form.message.value.isEmpty()) {
        fetch(form.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            alert("Thanks for your submission!");
            form.reset()
        }).catch(error => {
            alert("Oops! There was a problem submitting your form");
        });
    } else {
        alert("Invalid input!");
    }

    return false;
}

function handleScrollToElement(e) {
    // make sure it is linkToElement so that it doesn't conflict with other links
    if (!e.target.classList.contains("linkToElement")) return;

    // prevent page reload
    e.preventDefault();

    let targetElementId = e.target.getAttribute("href");
    let targetElement = $get(targetElementId.substring(1));

    // Scroll to the element using scrollTo
    window.scrollTo({ top: targetElement.offsetTop - 100, behavior: "smooth"});
}

function scrollHandler(e) {
    // remove current class from all linkToElement links
    document.querySelectorAll(`nav ul li a.linkToElement`).forEach(link => {
        link.classList.remove("current");
    });
    
    document.querySelectorAll("section.item").forEach(section => {
        let scrollY = window.scrollY;
        let sectionTop = section.offsetTop - 200;
        let sectionBottom = sectionTop + section.offsetHeight;

        if (scrollY >= sectionTop && scrollY <= sectionBottom) {
            let link = document.querySelector(`nav ul li a[href="#${section.getAttribute("id")}"]`);
            link.classList.add("current");
        }
    });
}

function init() {
    // Load projects
    if ($get('project-container', 'section') != null) {
        loadProjects($get('project-container', 'section'));
    }

    // Load sample projects (home page)
    if ($get('project-container-sample', 'section') != null) {
        loadProjects($get('project-container-sample', 'section'), 4);
    }

    // Insert copyright year
    $get('copyright-date').textContent = getYear();
}

function eventListeners() {
    // Form submission. Validation is required as not all pages have sendmessage form
    if ($get('sendmessage') != null) $get('sendmessage').onsubmit = handleFormSubmission;

    // Scroll to element
    if ($get('menu-links') != null) $get('menu-links').onclick = handleScrollToElement;

    // Scroll event
    window.onscroll = scrollHandler;
}   

// **Main
(function app() {
    init(); // initialize the app
    eventListeners(); // add event listeners
})();