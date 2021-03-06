const isObject = function (a) {
    return (!!a) && (a.constructor === Object);
};

export const fetchData = async (myUrl, Mymethod, text) => {
    let setting = {};
    let res;
    let url = myUrl + "/";

    let method = Mymethod;
    if (method === "POST" || method === 'PUT') {
        setting.method = method;
        setting.body = text; // body data type must match "Content-Type" header
        setting.headers = { 'Content-Type': 'application/json' };
        res = await fetch(url, setting);
        // let lastParamIndx = url.lastIndexOf('/') + 1;
        // let urlWithoutParam = url.slice(0, lastParamIndx);
        // url = urlWithoutParam;
        // setting = {};
        // setting.method = "GET";
        // res = await fetch(url, setting);

    } else if (method === "DELETE") {
        setting.method = method
        res = await fetch(url, setting); // delete
        // let lastParamIndx = url.lastIndexOf('/') + 1;
        // let urlWithoutParam = url.slice(0, lastParamIndx);
        // url = urlWithoutParam;
        // setting = {};
        // setting.method = "GET";
        // res = await fetch(url, setting);

    }
    else {
        setting.method = method;
        res = await fetch(url, setting); // method === "GET"
    };
    console.log("res . . . . . ", res)
    let body;
    if (method !== "DELETE") {
        body = await res.json();
    } else {
        body = [{}]
    }
    console.log("body . . . . . ", body)


    // save into Local Storage
    if (!localStorage.getItem("data")) {
        let data = [];
        data.push({ "method": method, "url": myUrl, "body": text });
        localStorage.setItem("data", JSON.stringify(data));
    } else {
        let data = JSON.parse(localStorage.getItem("data"));
        data.push({ "method": method, "url": myUrl, "body": text })
        localStorage.setItem("data", JSON.stringify(data));
    };

    if (isObject(body)) {
        body = [body]
    };
    

    return { "body": body, "headers": res.headers };
};
