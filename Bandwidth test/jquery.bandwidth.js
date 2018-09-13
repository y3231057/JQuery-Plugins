(function ($) {
    $.fn._speedTest = function (options) {
        function test() {
            var stest = $.extend({
                fileUrl: null,
                fileSize: null,
                domId: null,
                bgColor: null,
                noSignalColor: null,
                signalColor: null,
                height: null
            }, options), duration, startTime, endTime, speedMbps;

            if (stest.height == 'null' || stest.height == "undefined") {
                stest.height = 80;
            }
            if (stest.noSignalColor == 'null' || stest.noSignalColor == "undefined") {
                stest.noSignalColor = "#494D50";
            }
            if (stest.signalColor == 'null' || stest.signalColor == "undefined") {
                stest.signalColor = "#D1DEE8";
            }
            var proportion = stest.height / 80;
            startTime = (new Date()).getTime();
            $.ajax({
                url: stest.fileUrl + "?spdt=" + startTime,
                type: "GET",
                success: function (data) {
                    endTime = (new Date()).getTime();
                    duration = (endTime - startTime) / 1000;
                    speedMbps = (stest.fileSize * 8 / duration / 1024).toFixed(2);
                    var control = "<div id=\"signal-div\" style=\"position:relative; width:" + 140 * proportion +
                        "px; height:" + 80 * proportion + "px; background-color: " + stest.bgColor + ";\" title=\""
                        + speedMbps + "&nbsp; Mbps\">";
                    for (var i = 5; i > 0; i--) {
                        var height = (1 + i) * 10 * proportion;
                        var left = (i * 20 - 5) * proportion;
                        var bgcolor = stest.noSignalColor;
                        if ((i === 5 && speedMbps >= 40) || (i === 4 && speedMbps >= 20) ||
                        (i === 3 && speedMbps >= 10) || (i === 2 && speedMbps >= 5) ||
                        (i === 1 && speedMbps >= 2.5)) {
                            bgcolor = stest.signalColor;
                        }
                        control += "<label id=\"signal-" + i + "\" style=\"width:6px; height:"
                            + height + "px; position: absolute; background-color: " + bgcolor + "; left:"
                            + left + "px; bottom:0; margin:0; border-radius: 6px;\"></label>";
                    }
                    control += "</div>";
                    $("#" + stest.domId).html(control);
                },
                error: function (ex) {
                    var errorHtml = "<div style=\"position:relative; width:" + 140 * proportion +
                        "px; height:" + 80 * proportion + "px; background-color: " + stest.bgColor + ";\">";
                    errorHtml += "<div style=\"width: " + 38 * proportion + "px;height: " + 38 * proportion +
                        "px;position: absolute;background-color: #E4694F;z-index: 1;right: " + Math.round(14 * proportion) +
                        "px;bottom: 0;border-radius: 100%;\">";
                    errorHtml += "<label style=\"position: absolute;width: " + 32 * proportion + "px;height: " + 32 * proportion +
                        "px;background-color: #0E0E0E;border-radius: 100%;left: " + Math.round(3 * proportion) + "px;top: " + Math.round(3 * proportion) +
                        "px;text-align: center;line-height: " + 32 * proportion + "px;color: #E4694F;font-size: " + 30 * proportion + "px;\">!</label>";
                    errorHtml += "</div>";
                    for (var i = 0; i < 5; i++) {
                        var custom = "bottom:0;";
                        var backgroudColor = "#56626A";
                        var left = (15 + i * 20) * proportion;
                        var height = (20 + i * 10) * proportion;
                        if (i === 4) {
                            custom = "top: " + 20 * proportion + "px;";
                            backgroudColor = "#494D50";
                            height = 20 * proportion;
                        }
                        errorHtml += "<label style=\"width:6px;height:" + height + "px;position: absolute;background-color: " +
                            backgroudColor + ";left:" + left + "px;" + custom + "margin:0;border-radius: 6px;\"></label>";
                    }
                    errorHtml += "</div>";
                    $("#" + stest.domId).html(errorHtml);
                }
            });
        }

        return this.each(function () {
            test();
            setInterval(function () {
                test();
            }, 15000);
        });
    };
}(jQuery));
