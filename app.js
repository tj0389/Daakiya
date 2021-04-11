let parameterbox=document.getElementById("parametersBox");
parameterbox.style.display="none";
document.getElementById("responseJsonBox").style.display="none";
let addparamcount=0;

function block(){
    // document.getElementById("urlfull").style.display="none";
    // document.getElementById("content").style.display="none";
    // document.getElementById("request").style.display="none";
    // document.getElementById("parametersBox").style.display="none";
    // document.getElementById("requestJsonBox").style.display="none";
    // document.getElementById("ss").style.display="none";
    document.getElementById("responseJsonBox").style.display="block";
}

function convertstringtodomelement(string){
    let div=document.createElement('div');
    div.innerHTML=string;
    return div.firstElementChild;
}

let paramsRadio=document.getElementById("paramsRadio");
paramsRadio.addEventListener('click',()=>{
    document.getElementById("requestJsonBox").style.display="none";
    parameterbox.style.display="block";
})

let jsonRadio=document.getElementById("jsonRadio");
jsonRadio.addEventListener('click',()=>{
    document.getElementById("requestJsonBox").style.display="block";
    parameterbox.style.display="none";
})

let addParam=document.getElementById('addParam');
addParam.addEventListener('click',()=>{
    let params=document.getElementById('params');
    let string=`<div class="form-row my-2">
                <div class="col-sm-2 col-form-label"></div>
                <div class="col-md-4">
                    <input type="text" class="form-control" id="parameterKey${addparamcount+2}" placeholder="Parameter Key">
                </div>
                <div class="col-md-4">
                    <input type="text" class="form-control" id="parameterValue${addparamcount+2}" placeholder="Parameter Value">
                </div>
                <button class="btn btn-primary deleteparam">-</button>
            </div>`;
    let ele=convertstringtodomelement(string);
    // console.log(ele);
    params.appendChild(ele);

    let deleteparam=document.getElementsByClassName("deleteparam");
    // console.log(deleteparam);
    for (item of deleteparam){
        // console.log(item);
        item.addEventListener('click',(e)=>{
                e.target.parentElement.remove();
        })
    }
    addparamcount+=1;
})

let submit = document.getElementById('submit');
submit.addEventListener('click', () => {

    // submit.style.display="none";

    let url = document.getElementById("url").value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;

    // console.log(url);

    if (url=="")
        alert("URL cannot be leave Empty");
    else{
        block();
        document.getElementById('responsePrism').innerHTML = "Please wait.. Fetching response...";

        if (contentType == 'params') {
            data = {};
            for (let i = 0; i < addparamcount + 1; i++) {
                if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                    let key = document.getElementById('parameterKey' + (i + 1)).value;
                    let value = document.getElementById('parameterValue' + (i + 1)).value;
                    data[key] = value; 
                }
            }
            data = JSON.stringify(data);
        }
        else {
            data = document.getElementById('requestJsonText').value;
        }

        if (requestType=='GET'){
            fetch(url).then((response)=>{
                if (response.ok)
                    return response.text();
                else
                    throw new Error('Something went wrong Please Reload');
                }).then((text) =>{
                    // document.getElementById('responseJsonText').value = text;
                    document.getElementById('responsePrism').innerHTML = text;
                    Prism.highlightAll();
                }).catch((error)=>{
                    // document.getElementById('responsePrism').innerHTML = "Your response will appear here";
                    alert("Please add Correct Data or Reload the Page");
                    document.getElementById("responseJsonBox").style.display="none";
                });    
        }
        else{
            fetch(url, {
                method: 'POST', 
                body: data,
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }  
            })
            .then((response)=>{
                if (response.ok)
                    return response.text();
                else{
                    // document.getElementById('responseJsonText').value = ;
                    console.log(error);
                }
            })  
            .then(text =>{
                // document.getElementById('responseJsonText').value = text;
                document.getElementById('responsePrism').innerHTML = text;
                Prism.highlightAll();
            }).catch(()=>{
                // document.getElementById('responsePrism').innerHTML = "Your response will appear here";
                alert("Please add Correct Data or Reload the Page");
                document.getElementById("responseJsonBox").style.display="none";
            });
        }
        // console.log('URL is ', url);
        // console.log('requestType is ', requestType);
        // console.log('contentType is ', contentType);
        // console.log('data is ', data);
    }
    
});

   