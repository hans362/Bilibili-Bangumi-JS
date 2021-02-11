var bangumiJson = (apiUrl || "https://bilibili-bangumi-api.vercel.app/api") + "?vmid=" + userId + "&token=" + new Date().getTime() + Math.random();

$.getJSON(bangumiJson, function (data) {
    $.each(data.data.list, function (index, value) {
        var percentage = value.follow_status / value.formal_ep_count * 100;
        $("#bgm-collection").append(`
        <a class="bgm-item" href="${value.url}" target="_blank">
            <div class="bgm-item-thumb"
                style="background-image:url(${value.cover})"></div>
            <div class="bgm-item-info">
                <span class="bgm-item-title main">${value.title}</span>
                <span class="bgm-item-title">${value.title}</span>
                <div class="bgm-item-statusBar-container">
                    <div class="bgm-item-statusBar" style="width:${percentage}%"></div>
                    进度：${value.follow_status} / ${value.formal_ep_count}
                </div>
            </div>
        </a>
        `)
    });
});
