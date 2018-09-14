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
                stest.height = 36;
            }
            if (stest.noSignalColor == 'null' || stest.noSignalColor == "undefined") {
                stest.noSignalColor = "#494D50";
            }
            if (stest.signalColor == 'null' || stest.signalColor == "undefined") {
                stest.signalColor = "#D1DEE8";
            }
            var proportion = stest.height / 36;
            startTime = (new Date()).getTime();
            $.ajax({
                url: stest.fileUrl + "?spdt=" + startTime,
                type: "GET",
                success: function (data) {
                    endTime = (new Date()).getTime();
                    duration = (endTime - startTime) / 1000;
                    speedMbps = (stest.fileSize * 8 / duration / 1024).toFixed(2);
                    var control = "<div id=\"signal-div\" style=\"position:relative; width:" + 36 * proportion +
                        "px; height:" + 36 * proportion + "px; background-color: " + stest.bgColor + ";\" title=\""
                        + speedMbps + "&nbsp; Mbps\">";
                    for (var i = 5; i > 0; i--) {
                        var height = (i * 3 + 2) * proportion;
                        var left = (i * 5 + 2) * proportion;
                        var bgcolor = stest.noSignalColor;
                        var opacity = 0.5;
                        if ((i === 5 && speedMbps >= 40) || (i === 4 && speedMbps >= 20) ||
                        (i === 3 && speedMbps >= 10) || (i === 2 && speedMbps >= 5) ||
                        (i === 1 && speedMbps >= 2.5)) {
                            bgcolor = stest.signalColor;
                            opacity = 1;
                        }
                        control += "<label id=\"signal-" + i + "\" style=\"width:" + 2 * proportion + "px; height:"
                            + height + "px; position: absolute; background-color: " + bgcolor + "; left:" + left + "px; bottom:"
                            + 9 * proportion + "px; margin:0; border-radius: " + proportion + "px;opacity:" + opacity + ";\"></label>";
                    }
                    control += "</div>";
                    $("#" + stest.domId).html(control);
                },
                error: function (ex) {
                    var errorHtml = "<div style=\"position:relative; width:" + 36 * proportion +
                        "px; height:" + 36 * proportion + "px; background-color: " + stest.bgColor + ";\">";
                    errorHtml += "<div style=\"width: " + 10.9 * proportion + "px;height: " + 10.9 * proportion +
                        "px;position: absolute;background-color: #E4694F;z-index: 1;right: 0px;bottom: " + 9 * proportion + "px;border-radius: 100%;\">";
                    errorHtml += "<label style=\"position: absolute;width: " + 9 * proportion + "px;height: " + 9 * proportion +
                        "px;background-color: " + stest.bgColor + ";border-radius: 100%;left: " + Math.round(0.5 * proportion) + "px;top: " + Math.round(0.5 * proportion) +
                        "px;text-align: center;line-height: " + 9 * proportion + "px;color: #E4694F;font-weight: normal;font-size: " + proportion + "px;\">!</label>";
                    errorHtml += "</div>";
                    for (var i = 0; i < 5; i++) {
                        var custom = "bottom:" + 9 * proportion + "px;";
                        var left = (i * 5 + 7) * proportion;
                        var height = (i * 3 + 5) * proportion;
                        if (i === 4) {
                            custom = "top: " + 10 * proportion + "px;";
                            height = 5 * proportion;
                        }
                        errorHtml += "<label style=\"width:" + 2 * proportion + "px;height:" + height + "px;position: absolute;background-color: " +
                            stest.noSignalColor + ";left:" + left + "px;" + custom + "margin:0;border-radius: " + proportion + "px;\"></label>";
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
