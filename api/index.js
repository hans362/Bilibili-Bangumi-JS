const http = require('http');
const url = require('url');
const express = require('express');
const app = express();

const myhost = "api.bilibili.com";

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

function nodePostGetRequest(HOST, PORT, method, bodydata, callBackFunction, path, cookie, ressss) {
    var body = bodydata;
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
            getsuccess(resultObject, ressss);
        });
        req.on('error', function (e) {
            console.log('-----error-------', e);
        });
    });
    req.write(bodyString);
    req.end();
}

function getsuccess(data, res) {
    res.send(data);
}

app.get('/api', (req, res) => {
    const type = req.query.type || "1";
    const pn = req.query.pn || "1";
    const ps = req.query.ps || "10";
    const vmid = req.query.vmid || "66745436";
    const num = 28;
    const mycookie = req.query.cookies || "cookies";
    let URL = new Url();
    let mypath = URL.getUrl("/x/space/bangumi/follow/list", { type: type, pn: pn, ps: ps, vmid: vmid });
    console.log(mypath);
    nodePostGetRequest(myhost, 80, 'GET', null, getsuccess, mypath, mycookie, res);
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on ${port}, http://localhost:${port}`));
