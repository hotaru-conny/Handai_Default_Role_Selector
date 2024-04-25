const input = document.getElementById("idInput");
input.addEventListener("input", saveNewRoleID);

function saveNewRoleID(){
    const id = document.getElementById("idInput").value;
    chrome.storage.sync.set({'handai_default_role_id': id}, function () {
        console.log("ID saved: " + id);
    });
}

document.addEventListener("DOMContentLoaded", function() {
    chrome.storage.sync.get('handai_default_role_id', function(data) {
        var id = data['handai_default_role_id'];
        input.value = id;
    });
});