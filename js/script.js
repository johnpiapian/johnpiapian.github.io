String.prototype.isEmpty = function() {
    return (this.length === 0 || !this.trim());
};

function sendEmail(_name, _email, _message) { 
    Email.send({
        SecureToken : "<your generated token>",
        To : 'recipient@example.com',
        From : "sender@example.com",
        Subject : "Test Email",
        Body : "<html><h2>Header</h2><strong>Bold text</strong><br></br><em>Italic</em></html>"
    }).then(
        message => alert("mail sent successfully")
    );    
} 

function handleFormSubmission(e){

    let nameEl = e.target.name;
    let emailEl = e.target.email;
    let messageEl = e.target.message;

    if(!nameEl.value.isEmpty() && !emailEl.value.isEmpty() && !messageEl.value.isEmpty()){
        // window.atob('am9obnBpYXBpYW5AZ21haWwuY29t')
        sendEmail(nameEl.value, emailEl.value, messageEl.value);
    }else{
        console.log("Invalid form!");
    }

    return false;
}

function app(){
    let formEl = document.getElementById('sendmessage');

    formEl.onsubmit = handleFormSubmission;
}


app();