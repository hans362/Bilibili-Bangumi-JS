const http = require('http');
const url = require('url');
const express = require('express');
const app = express();

const apiHost = "api.bilibili.com";

class Url {
    getParam(data) {
        let url = '';
        for (var k in data) {
            let value = data[k] !== undefined ? data[k] : '';
            url += `&${k}=${encodeURIComponent(value)}`
        }
        return url ? url.substring(1) : ''
    }
    getUrl(url, data) {
        return url += (url.indexOf('?') < 0 ? '?' : '') + this.getParam(data)
    }
}

function nodePostGetRequest(HOST, PORT, method, bodyData, callBackFunction, path, cookie, result) {
    var body = bodyData;
    var bodyString = JSON.stringify(body);
    var headers = {
        'Content-Type': 'application/json',
        'Content-Length': bodyString.length,
        'Cookie': cookie
    };
    var options = {
        host: HOST,
        port: PORT,
        path: path,
        method: method,
        headers: headers
    };
    var req = http.request(options, function (res) {
        res.setEncoding('utf-8');
        var responseString = '';
        res.on('data', function (data) {
            responseString += data;
        });
        res.on('end', function () {
            let resultObject = JSON.parse(responseString);
            getSuccess(resultObject, result);
        });
        req.on('error', function (e) {
            console.log('[Error] ', e);
        });
    });
    req.write(bodyString);
    req.end();
}

function getSuccess(data, res) {
    res.set('Access-Control-Allow-Origin', '*');
    res.send(data);
}

app.get('/api', (req, res) => {
    const type = req.query.type || "1";
    const pn = req.query.pn || "1";
    const ps = req.query.ps || "10";
    const vmid = req.query.vmid;
    const userCookie = process.env.COOKIES || "No cookies.";
    let URL = new Url();
    let apiPath = URL.getUrl("/x/space/bangumi/follow/list", { type: type, pn: pn, ps: ps, vmid: vmid });
    nodePostGetRequest(apiHost, 80, 'GET', null, getSuccess, apiPath, userCookie, res);
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`[INFO] Server running on ${port}, http://localhost:${port}`));
