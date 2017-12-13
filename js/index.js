let xhr = new XMLHttpRequest();
let data = null;
let list = document.getElementById("list"),
    header = document.getElementById("header"),
    aList = header.getElementsByTagName("a"),
    liList = list.getElementsByTagName("li");

xhr.open("GET", "Data/product.json");
xhr.onreadystatechange = function () {
    if (xhr.status === 200 && xhr.readyState === 4) {
        data = JSON.parse(xhr.responseText);
        list.innerHTML = bindData(data);
    }
};
xhr.send(null);

function bindData(data) {
    let str = ``;
    data.forEach((item) => {
        str += `
                <li>
                    <a href="javascript:;">
                        <img src="${item.img}" alt="img">
                        <p>${item.title}</p>
                        <p class="hot">${item.hot}</p>
                        <del>￥999</del>
                        <span>￥${item.price}</span>
                        <p class="time">上架时间${item.time}</p>
                    </a>
                </li>
                `;
    });
    return str;
}

for (let i = 0; i < aList.length; i++) {
    aList[i].falg = -1;
    aList[i].onclick = function () {
        this.falg *= -1;
        mysort.call(this, this.getAttribute("sort-attr"));
        follow.call(this);
        clear.call(this);

    }
}

function mysort(attr) {
    if (attr === "time") {
        data.sort((a, b) => {
            return (new Date(a[attr]) - new Date(b[attr])) * this.falg;
        });
    } else {
        data.sort((a, b) => {
            return (a[attr] - b[attr]) * this.falg;
        });
    }
    list.innerHTML = bindData(data);
}

function follow() {
    let up = this.children[0];
    let down = this.children[1];
    if (this.falg > 0) {
        up.classList.add("bg");
        down.classList.remove("bg");
    } else {
        up.classList.remove("bg");
        down.classList.add("bg");
    }
}

function clear() {
    for (let i = 0; i < aList.length; i++) {
        if (aList[i] !== this) {
            aList[i].children[0].classList.remove("bg");
            aList[i].children[1].classList.remove("bg");
            aList[i].falg = -1;
        }
    }
}