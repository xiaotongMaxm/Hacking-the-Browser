let filenames = [
  "Color1.png",
  "Color2.png"
];

let imgs = document.getElementsByTagName('img');

for (imgElt of imgs){
  let r = Math.floor(Math.random() * filenames.length);
  let file = 'ChangeImages/' + filenames[r];
  let url = chrome.extension.getURL(file);
  imgElt.src = url;
}
