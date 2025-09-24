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

// **Event handlers
function handleScrollToElement(e) {
  // make sure it is linkToElement so that it doesn't conflict with other links
  if (!e.target.classList.contains('linkToElement')) return;

  // prevent page reload
  e.preventDefault();

  const targetElementId = e.target.getAttribute('href');
  const targetElement = document.getElementById(targetElementId.substring(1));

  if (!targetElement) return;

  const elementTop = targetElement.offsetTop;
  const elementHeight = targetElement.offsetHeight;
  const windowHeight = window.innerHeight;
  const navbarOffset = 80;

  const scrollPosition = (elementHeight <= windowHeight - navbarOffset) ?
    (elementTop - (windowHeight / 2) + (elementHeight / 2)) :
    (elementTop - navbarOffset);

  window.scrollTo({
    top: scrollPosition,
    behavior: 'smooth'
  });
}

function scrollHandler(e) {
    const navLinks = document.querySelectorAll('nav ul li a.linkToElement');
    const sections = document.querySelectorAll("section[data-scroll-spy='true']");
    const offset = 100; // offset before is considered in viewport

    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    let currentSectionId = null;

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + scrollY;
        const sectionBottom = sectionTop + section.offsetHeight;

        // Section enters viewport when top < bottom of viewport minus offset
        if ((sectionTop <= scrollY + viewportHeight - offset) && (sectionBottom >= scrollY)) {
            currentSectionId = section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.toggle('current', link.getAttribute('href') === `#${currentSectionId}`);
    });
}

function init() {

  // General
  {
    $get('copyright-date').textContent = new Date().getFullYear();
  }

  // Load projects
  {
    // All projects (projects page)
    if ($get('project-container', 'section') != null) {
      loadProjects($get('project-container', 'section'));
    }

    // Load sample projects (home page)
    if ($get('project-container-sample', 'section') != null) {
      loadProjects($get('project-container-sample', 'section'), 4);
    }
  }

  // Navigation
  {
    // Scroll to element when clicking the link
    if ($get('menu-links') != null) $get('menu-links').onclick = handleScrollToElement;

    // Highlight current section in the menu when scrolling
    window.onscroll = scrollHandler; 
  }
}

// **Initialize
init();