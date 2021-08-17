console.log("This is project 6");

//utility function
// 1. utility function to get Dom element from  string
function getElementFromString(string) {
    let div = document.createElement("div");
    div.innerHTML = string;
    return div.firstChild;
}

// Initialize number of parameters
let addedParamCount = 0;

// Hide the parameter box initially
let parametersBox = document.getElementById("parametersBox");
parametersBox.style.display = "none";

// if the user clicks on params box,hide the json box
let paramsRadio = document.getElementById("paramsRadio");
paramsRadio.addEventListener("click", () => {
    document.getElementById("requestJsonBox").style.display = "none";
    document.getElementById("parametersBox").style.display = "block";
});

// if the user clicks on json box,hide the params box

let jsonRadio = document.getElementById("jsonRadio");
jsonRadio.addEventListener("click", () => {
    document.getElementById("parametersBox").style.display = "none";
    document.getElementById("requestJsonBox").style.display = "block";
});

//If the user clicks on + button add more parameters
let addParam = document.getElementById("addParam");
addParam.addEventListener("click", () => {
    let params = document.getElementById("params");
    let string = `<div class="row g-2 my-2">
                            <label for="url" class="col-sm-2 col-form-label">Parameter ${addedParamCount + 2
        }</label>
                            <div class="col-md-4">
                                <input type="text" class="form-control" id="parameterKey${addedParamCount + 2
        }" placeholder="Enter Parameter ${addedParamCount + 2
        } Key" />
                            </div>
                            <div class="col-md-4">
                                <input type="text" class="form-control" id="parameterValue${addedParamCount + 2
        }"
                                    placeholder="Enter Parameter ${addedParamCount + 2
        } Value" />
                            </div>
                            <div class="col-md-2">
                                <button class="btn btn-primary deleteParam"  type="button">-</button>
                            </div>
                    </div>`;
    // Convert the element string from the DOM node
    let paramElement = getElementFromString(string);
    // console.log(paramElement);
    params.appendChild(paramElement);
    // Add event listner to remove the parameter on clicking - button
    let deleteParam = document.getElementsByClassName("deleteParam");
    for (item of deleteParam) {
        item.addEventListener("click", (e) => {
            e.target.parentElement.parentElement.remove();
        });
    }
    addedParamCount++;
});

//if the user click on submit button
let submit = document.getElementById("submit");
submit.addEventListener("click", () => {

    // Show please wait in response box to patience from the user
    document.getElementById("responsePrism").innerHTML  =
        "Please wait... Fetching response...";

    // fetch all the values tha entered by user
    let url = document.getElementById("url").value;
    let requestType = document.querySelector(
        "input[name='requestType']:checked"
    ).value;
    let contentType = document.querySelector(
        "input[name='contentType']:checked"
    ).value;

    // Log all the values inthe console
    console.log("URL is ", url);
    console.log("requestType is ", requestType);
    console.log("contentType is ", contentType);

    // If user has used param insTEAD Of jsonRadio,collect the params as object
    if (contentType == "params") {
        data = {};
        for (i = 0; i < addedParamCount + 1; i++) {
            if (document.getElementById("parameterKey" + (i + 1)) != undefined){
                let key = document.getElementById("parameterKey" + (i + 1)).value;
                let value = document.getElementById("parameterValue" + (i + 1)).value;
                data[key] = value;
            }
        }
        data = JSON.stringify(data);

    }

    else{
        data = document.getElementById('requestJsontext').value;

    }
    console.log("URL is ", url);
    console.log("requestType is ", requestType);
    console.log("contentType is ", contentType);
    console.log("data is ", data);


    if (requestType == 'GET') {
        fetch(url,{
            method: 'GET'
            
        })
        .then(response => response.text())
        .then((text)  =>{
            // document.getElementById("responseJsontext").value = text
            document.getElementById("responsePrism").innerHTML = text
            Prism.highlightAll();
           
        });
    }
    else{
        fetch(url,{
            method: 'POST',
            body: data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              }
            
        })
        .then(response => response.text())
        .then((text)  =>{
            // document.getElementById("responseJsontext").value = text
            document.getElementById("responsePrism").innerHTML = text;
            Prism.highlightAll();
        });
    }
});
