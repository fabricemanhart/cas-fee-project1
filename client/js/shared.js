export function formatDate(dateString, handleAnytime) {
    if (handleAnytime && dateString === "any time")
        return "any time";

    if (!dateString || dateString === "any time") {
        return null;
    }
    return moment(dateString).format("DD.MM.YYYY");
}

export function normalizeDate(date) {

    if (!date) {
        return "any time";
    }

    if (!moment(date, "DD.MM.YYYY", true).isValid()) {
        return null;
    }

    let parsedDate = moment(date); // Chrome Datepicker
    if (parsedDate.isValid()) {
        return parsedDate;
    } else {
        let parsedDate = moment(date, "DD.MM.YYYY"); // FireFox input field
        return parsedDate;
    }
}

export function generateGuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == "x" ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export function getUrlParameter(parameter) {
    var params = window.location.search.substr(1).split("&");

    for (var i = 0; i < params.length; i++) {
        var p = params[i].split("=");
        if (p[0] == parameter) {
            return decodeURIComponent(p[1]);
        }
    }
    return null;
}

export function changeTheme(event) {
    var dropdown = event.currentTarget;
    var css = dropdown.options[dropdown.selectedIndex].value;
    document.cookie = `theme=${css}`;
    setTheme();
}

export function setTheme(dropdown) {
    let defaultCss = "css/simple.css";
    let css = document.cookie.split('=')[1];
    document.getElementById("style").setAttribute("href", css || defaultCss);
    dropdown.value = css || defaultCss;
}