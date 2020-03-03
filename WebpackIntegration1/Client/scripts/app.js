/// <reference path="../../node_modules/@types/jquery/index.d.ts" />
import '../styles/main.scss';
// import 'bootstrap';
import 'bootstrap/js/dist/dropdown';
import { getText } from "./lib";
$("#fillthis").text(getText());
setTimeout(function () {
    fetch("https://httpbin.org/ip")
        .then(function (response) { return response.json(); })
        .then(function (response) {
        console.log(response);
        $("#fillthis").text(response.origin);
    })
        .catch(function (err) { return console.error(err); });
}, 3000);
Promise.resolve("myPromise").then(console.log);
console.log("Testing!!");
//# sourceMappingURL=app.js.map