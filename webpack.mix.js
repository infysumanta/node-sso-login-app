let mix = require("laravel-mix");

mix
  .js("./resource/js/app.js", "./public/js/script.js")
  .sass("./resource/css/app.scss", "./public/css/style.css");
