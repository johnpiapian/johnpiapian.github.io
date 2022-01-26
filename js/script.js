// Reusable components
String.prototype.isEmpty = function () {
    return (this.length === 0 || !this.trim());
}

function $get(id, tagName=null){
    if(id != null && tagName != null && document.getElementById(id) !== null){
        if(document.getElementById(id).tagName === tagName.toUpperCase()){
            return document.getElementById(id);
        }
    }else if(id !== null){
        return document.getElementById(id);
    }
    return null;
}

function $createElement(tagName, textContent=null, attributes=[], childs=[]){
    let res;

    if(tagName != null){
        // Create DOM element
        res = document.createElement(tagName);
        
        if(textContent != null){
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

// Event handlers
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

function scrollHandler(){
    let nav = document.getElementsByTagName("NAV")[0];
    let pos = nav.offsetTop;

    if (document.documentElement.scrollTop < pos) {
        nav.classList.remove("scrolled");
    }else{
        nav.classList.add("scrolled");
    }

}

// General Functions
function createArticleElement(title, imgName, hashTag, description, liveHref, sourceHref){
    let h1El = $createElement('h1', title);
    let headerEl = $createElement('header', null, [], [h1El]);

    let imgEl = $createElement('img', null, [['src', `imgs/${imgName}`],['alt', imgName]]);
    let sectionEl = $createElement('section', null, [['class', 'image-container']], [imgEl]);
    
    let p1 = $createElement('p', hashTag, [['class', 'hash-tag']]);
    let p2 = $createElement('p', description, [['class', 'description']]);

    // Handle empty source or live links
    let classLink1 = (liveHref.isEmpty()) ? ['class', 'unavail']: ['class', ''];
    let link1 = $createElement('a', 'Live', [['target', '_blank'], ['href', liveHref], classLink1]);
    if(liveHref.isEmpty()){ link1.setAttribute("onclick", "return false;");}

    // Handle empty source or live links
    let classLink2 = (sourceHref.isEmpty()) ? ['class', 'unavail']: ['class', ''];
    let link2 = $createElement('a', 'Source code', [['target', '_blank'], ['href', sourceHref], classLink2]);
    if(sourceHref.isEmpty()){ link2.setAttribute("onclick", "return false;");}

    let linksEl = $createElement('div', null, [['class', 'links']], [link1, link2]);
    let footerEl = $createElement('footer', null, [], [p1, p2, linksEl]);

    let articleEl = $createElement('article', null, [['class', 'project-item']], [headerEl, sectionEl, footerEl]);

    return articleEl;
}

function loadProjects(){
    fetch('js/data.json')
    .then(res => res.json())
    .then(res => {
        res.forEach(e => {
            $get('project-container', 'section').appendChild(createArticleElement(e.title, e.imgName, e.hashTag, e.description, e.liveHref, e.sourceHref));
        });
    })
    .catch(e => {
        console.log(`Error occurred: ${e}`);
    });
}

// Copyright year
function getYear(){
    return new Date().getFullYear();
}


function app() {

    window.onscroll = scrollHandler;
    // Project loading
    if($get('project-container', 'section') !== null){
        loadProjects();
    }

    // Form submission
    if ($get('sendmessage') !== null) {
        $get('sendmessage').onsubmit = handleFormSubmission;
    }

    // Insert copyright year
    $get('copyright-date').textContent = getYear();
    

    console.log(getYear());
}

app();