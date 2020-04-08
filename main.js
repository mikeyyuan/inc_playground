var cookies = 0;
var cursors = 0;
var multiplier = 1;

function cookieClick(){
    cookies = cookies + ( 1 * multiplier );
    document.getElementById("cookies").innerHTML = cookies;
};

function buyCursor(){
    var cursorCost = Math.floor(10 * Math.pow(1.1,cursors));
    if(cookies >= cursorCost){
        cursors = cursors + 1;
        cookies = cookies - cursorCost
        document.getElementById('cursors').innerHTML = cursors;
        document.getElementById('cookies').innerHTML = cookies;
    };
    var nextCost = Math.floor(10 * Math.pow(1.1,cursors));
    document.getElementById('cursorCost').innerHTML = nextCost;
};

function buyPrestiege(){
    var prestigeCost = Math.floor(1000 * Math.pow(1.3,prestige));
    if(cookies >= prestigeCost){
        cursors = cursors + 1;
        cookies = cookies - cursorCost
        document.getElementById('cursors').innerHTML = cursors;
        document.getElementById('cookies').innerHTML = cookies;
    };
    var nextCost = Math.floor(10 * Math.pow(1.1,cursors));
    document.getElementById('cursorCost').innerHTML = nextCost;
};

// function save(){
//     var save = {
//         cookies: cookies,
//         cursors: cursors,
//         prestige: prestige
//     }
// }

window.setInterval(function(){
    cookieClick(cursors);
    // localStorage.setItem("save", JSON.stringify(save));
}, 1000);