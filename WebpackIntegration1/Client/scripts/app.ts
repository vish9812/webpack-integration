/// <reference path="../../node_modules/@types/jquery/index.d.ts" />

import '../styles/main.scss';
// import 'bootstrap';
import 'bootstrap/js/dist/dropdown';
import { getText } from "./lib";

$("#fillthis").text(getText());

setTimeout(() => {
    fetch("https://httpbin.org/ip")
        .then(response => response.json())
        .then(response => {
            console.log(response);
            $("#fillthis").text(response.origin);
        })
        .catch(err => console.error(err));
}, 3000);

Promise.resolve("myPromise").then(console.log);

console.log("Testing!!");
