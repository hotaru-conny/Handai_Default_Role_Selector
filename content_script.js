// 保存されたIDを取得する関数
async function getTargetID() {
    await chrome.storage.sync.get('handai_default_role_id', function(data) {
        if(typeof data.messages == "undefined"){
            return null;
        }else{
            return data['handai_default_role_id'];
        }
    });
}

// 指定したIDを含む<tr>を検索し、指定されたIDが含まれるかどうかを判定してradioボタンをチェックする関数
function selectRadioButton(targetID) {
    if(targetID == null) return;
    const trElements = document.querySelectorAll("tr");
    trElements.forEach((tr) => {
        const tdElements = tr.querySelectorAll("td");
        const containsID = Array.from(tdElements).some((td) => {
            //Stringにキャストしないと正常に比較できない
            return String(td.textContent.trim()) == String(targetID);
        });
        if (containsID) {
            const radio = tr.querySelector("input[type=radio][name=role]");
            if (radio) {
                radio.checked = true;
                radio.dispatchEvent(new Event("change"));

                //OKボタンをアクティブに
                document.querySelector("input[type=button][id=ok]").disabled = false;
            }
        }
    });
}

// ページが読み込まれた時に実行
window.onload = async function () {
    // 保存されたIDを取得して、selectRadioButton関数に渡す
    await chrome.storage.sync.get('handai_default_role_id', function(data) {
        var id = data['handai_default_role_id'];
        if(typeof id != "undefined"){
            selectRadioButton(id);
        }
    });
};
