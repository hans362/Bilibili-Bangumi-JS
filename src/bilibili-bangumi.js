var bangumiJson = (apiUrl || "https://bilibili-bangumi-js.vercel.app/api") + "?vmid=" + userId + "&token=" + new Date().getTime() + Math.random();

function getPage(pageNum) {
    $.getJSON(bangumiJson + "&pn=" + pageNum, function (data) {
        if (pageNum == 1) {
            $(".bgm-collection").empty();
        } else {
            $(".bgm-navigator").remove();
        }
        $.each(data.data.list, function (index, value) {
            var total = 0;
            if (value.is_finish) {
                total = value.total_count;
            } else if (!value.is_started || value.new_ep.index_show == '即将开播') {
                total = 0;
            } else {
                total = value.new_ep.title;
                if (!$.isNumeric(total)) total = value.total_count;
            }
            if (total < 0) total = 0;
            var ep = 0;
            if (!value.is_started) {
                ep = 0;
            } else if (value.progress.indexOf('已看完') >= 0) {
                ep = total;
            } else if (typeof value.progress !== 'undefined' && value.progress.indexOf('PV') == -1) {
                ep = value.progress.substring(value.progress.indexOf('第') + 1, value.progress.indexOf('话'));
                if (!$.isNumeric(ep)) ep = total;
            } else {
                ep = 0;
            }
            var percentage = ep / total * 100;
            var cover = value.cover.replace('http', 'https');
            $(".bgm-collection").append(`
            <a class="bgm-item" href="${value.url}" target="_blank">
                <img class="bgm-item-thumb" src="${cover}" referrerpolicy="no-referrer"></img>
                <div class="bgm-item-info">
                    <span class="bgm-item-title main">${value.title}</span>
                    <span class="bgm-item-title">${value.evaluate}</span>
                    <div class="bgm-item-statusBar-container">
                        <div class="bgm-item-statusBar" style="width:${percentage}%"></div>
                        <span class="bgm-item-percentage">进度：${ep} / ${total}</span>
                    </div>
                </div>
            </a>
            `)
        });
        if (pageNum < Math.ceil(data.data.total / 20)) {
            $(".bgm-container").append(`
            <div class="bgm-navigator">
                <a href="javascript:getPage(${pageNum + 1});" class="bgm-btn">加载更多</a>
            </div>
            `)
        }
    });
}

getPage(1);