const axios = require('axios');
const express = require('express');
const app = express();

const apiHost = "api.bilibili.com";

app.get('/api', (req, res) => {
    const pn = req.query.pn || "1";
    const ps = req.query.ps || "12";
    const vmid = req.query.vmid;
    const cookies = "SESSDATA=" + (process.env.COOKIES || "No cookies.");
    axios.get("https://" + apiHost + "/x/space/bangumi/follow/list?type=1&follow_status=0&pn=" + pn + "&ps=" + ps + "&vmid=" + vmid, {
        headers: {
            Cookie: cookies
        }
    }).then((resp) => {
        res.header("Access-Control-Allow-Origin", "*").send(resp.data);
    }).catch((err) => {
        console.log(err);
        res.header("Access-Control-Allow-Origin", "*").send(err);
    });
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`[INFO] Server running on ${port}, http://localhost:${port}`));