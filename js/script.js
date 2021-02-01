String.prototype.isEmpty = function () {
    return (this.length === 0 || !this.trim());
}

function ajax(method, url, data, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState !== XMLHttpRequest.DONE) return;
        if (xhr.status === 200) {
            success(xhr.response, xhr.responseType);
        } else {
            error(xhr.status, xhr.response, xhr.responseType);
        }
    };
    xhr.send(data);
}

function handleFormSubmission(e) {
    let nameEl = e.target.name;
    let emailEl = e.target.email;
    let messageEl = e.target.message;

    if (!nameEl.value.isEmpty() && !emailEl.value.isEmpty() && !messageEl.value.isEmpty()) {
        var data = new FormData(e.target);
        ajax(form.method, form.action, data, success, error);
    } else {
        alert("Invalid input!");
    }

    return false;
}

function app() {
    document.getElementById('sendmessage').onsubmit = handleFormSubmission;
}

app();