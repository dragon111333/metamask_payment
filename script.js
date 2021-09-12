var d = document;

d.querySelector("#access_acount").addEventListener("click",async ()=>{
    if(typeof ethereum != undefined ){
        await ethereum.request({method:"eth_requestAccounts"});
        d.querySelector("#acc_about").innerHTML = "บัญชีของคุณ : "+ethereum.selectedAddress;
    }
});

ethereum.on("accountsChanged",(acc)=>{
    d.querySelector("#acc_about").innerHTML = "บัญชีของคุณ : "+ethereum.selectedAddress;
});

d.querySelector("#donate_btn").addEventListener("click",()=>{
    let price = d.querySelector("#donate_input").value;
    if(price==""){setAlert("โปรดกรอกจำนวนให้ถูกต้อง","danger");return;}
    ethereum.request({
        method:"eth_sendTransaction",
        params: [{
            from:ethereum.selectedAddress,
            to:"0xFc102e94230788513F71579B4B863d8fF89BeB25",
            value:convertToWei(Number(price))// 1eth = 10^18 wei
        }]
    })
    .then((txtHash)=>{
        setAlert("ขอบคุณที่สนับสนุนเรา! (txtHash :"+txtHash+" )","success");
    })
    .catch((err)=>{
        console.log(err);
        switch(err.code){
            case -32602:
                setAlert("โปรดเชื่อมต่อกับWallet!","danger");
                break;
            default :
                setAlert("เกิดข้อผิดพลาดไม่ทราบสาเหตุ!","danger");
                break;
        }
    })
});

function convertToWei(price){
    return "0x"+Number(price*1e+18).toString(16);
}

function setAlert(txt,alertColor){
    let alertBox = d.querySelector("#alert_box");
    alertBox.style = "display:block";
    alertBox.innerHTML = txt;
    alertBox.className = "alert alert-"+alertColor;
}
