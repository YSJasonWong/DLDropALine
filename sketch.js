// let Type = "Intuition";
// let Name = "葉問";
// let Title = "葉偉信《葉問》:";
// let Text = "世上沒有怕老婆的男人，只有尊重老婆的男人。";
let lines = 1,
  boldText = [], instruction;
let logoSetWhite, logoSetBlack, font_monserate, notoSans;
let fileInput,
  colorCheckbox,
  titlePicker,
  bgPicker,
  typeBox,
  NameBox,
  titleBox,
  textBox;
let OGimage,
  imageX = 0,
  imageY = 0,
  imageScale = 1;

function preload() {
  font_monserate = loadFont("fonts/Montserrat-Medium.ttf");
  notoSerif = loadFont("fonts/MSungHK-Xbold.OTF");
  notoSans = loadFont("fonts/DFHeiHK-W9.otf");
  logoSetWhite = loadImage("images/DropALine_whiteLogo.png");
  logoSetBlack = loadImage("images/DropALine_BlackLogo.png");
  //OGimage = loadImage("images/image.jpeg");
}

function setup() {
  createCanvas(1080, 1350);
  instruction = createP("1. 選擇影像檔案 （按鍵盤 ← → 調整大小 ）（拖曳滑鼠調整位置）<br>2. ⁠ ✓選擇反白顏色<br>3. ⁠選擇背景及標題顏色<br>4. ⁠輸入相關字詞<br>5. ⁠在字詞之間加入\"/\"以分隔字行<br>6. 按Enter鍵儲存");
  instruction.style('color', 'white');
  instruction.position(0, 1600);
  fileInput = createFileInput(handleImage);
  fileInput.position(0, 1350);
  colorCheckbox = createCheckbox();
  colorCheckbox.position(0, 1375);
  titlePicker = createColorPicker("white");
  titlePicker.position(500, 1400);
  bgPicker = createColorPicker("black");
  bgPicker.position(600, 1400);
  typeBox = createInput();
  typeBox.size(150, 35);
  typeBox.position(0, 1400);
  typeBox.attribute("placeholder", "Type");
  nameBox = createInput();
  nameBox.size(200, 35);
  nameBox.position(0, 1450);
  nameBox.attribute("placeholder", "Name");
  titleBox = createInput();
  titleBox.size(300, 35);
  titleBox.position(0, 1500);
  titleBox.attribute("placeholder", "Title");
  textBox = createInput();
  textBox.size(1000, 50);
  textBox.position(0, 1550);
  textBox.attribute("placeholder", "Text");
  imageX = width / 2;
  imageY = height / 2;
  imageMode(CENTER);
  noSmooth();
}

function draw() {
  background(bgPicker.color());
  renewText();
  transformImage();
  if (OGimage) {
    image(
      OGimage,
      imageX,
      imageY,
      OGimage.width * imageScale,
      OGimage.height * imageScale
    );
  }
  // type
  push();
  fill(colorCheckbox.checked() ? 0 : 255);
  textSize(30);
  textFont(font_monserate);
  text(typeBox.value(), 52, 1249.7);
  pop();
  // name
  push();
  fill(colorCheckbox.checked() ? 0 : 255);
  textFont(notoSerif);
  textSize(25);
  text(nameBox.value(), 52, 1293.8);
  pop();
  // smallText
  push();
  fill(colorCheckbox.checked() ? 0 : 255);
  textFont(notoSerif);
  textSize(35);
  textAlign(RIGHT);
  textLeading(35);
  for (let i = 0; i < lines; i++) {
    text(orientSentence(textBox.value()), width - 235 - 194 * i, 64);
  }
  pop();
  // boldText
  push();
  fill(colorCheckbox.checked() ? 0 : 255);
  textFont(notoSerif);
  textSize(133);
  textAlign(RIGHT);
  textLeading(130);
  for (let i = 0; i < lines; i++) {
    text(orientSentence(boldText[i]), width - 94.92 - 194 * i, 145);
  }
  pop();
  // title
  push();
  fill(titlePicker.color());
  textFont(notoSans);
  textSize(30);
  textAlign(RIGHT);
  textLeading(30);
  text(orientSentence(titleBox.value()), width - 40, 64);
  pop();
  if (!colorCheckbox.checked()) {
    image(logoSetWhite, width / 2, height / 2, width, height);
  } else {
    image(logoSetBlack, width / 2, height / 2, width, height);
  }
}

function handleImage(file) {
  if (file.type === "image") {
    OGimage = createImg(file.data, "");
    OGimage.hide();
  } else {
    img = null;
  }
}

function renewText() {
  lines = 1;
  for (let i = 0; i < textBox.value().length; i++) {
    if (textBox.value()[i] == "/") {
      lines++;
    }
  }
  boldText = [];
  boldText = textBox.value().split("/");
}

function orientSentence(inputText) {
  let outputText = "";
  for (let i = 0; i < inputText.length; i++) {
    if (inputText[i] != "/") {
      outputText += inputText[i];
      outputText += "\n";
    }
  }
  return outputText;
}

function transformImage() {
  if (keyIsPressed) {
    if (key == "ArrowRight") {
      imageScale += 0.01;
    }
    if (key == "ArrowLeft") {
      imageScale -= 0.01;
    }
  }
}

function mouseDragged() {
  if (mouseX > 0 && mouseY > 0 && mouseX < width && mouseY < height) {
    imageX += mouseX - pmouseX;
    imageY += mouseY - pmouseY;
  }
}

function keyPressed() {
  if (key == 'Enter') {
    saveCanvas('DL_DropALine_.jpg');
  }
}
