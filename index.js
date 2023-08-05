const canvas = document.querySelector("canvas");
const targetInput = document.querySelector("#target");
const encryptionInput = document.querySelector("#encryption");
const saveButton = document.querySelector("button");
let target;
let encryption;

canvas.width = 300;
canvas.height = 300;

targetInput.onchange = (e) => {
  const img = new SimpleImage(targetInput);
  img.setSize(300, 300);
  target = img;
};

encryptionInput.onchange = (e) => {
  const img = new SimpleImage(encryptionInput);
  img.setSize(300, 300);
  encryption = img;
};

saveButton.onclick = save;

function save() {
  const img = new SimpleImage(300, 300);
  for (let i = 0; i < 300; i++) {
    for (let j = 0; j < 300; j++) {
      const targetPixel = target.getPixel(i, j);
      const encryptionPixel = encryption.getPixel(i, j);
      const pixel = img.getPixel(i, j);
      pixel.setRed(
        getValue(targetPixel.getRed()) / 16 + getValue(encryptionPixel.getRed())
      );
      pixel.setGreen(
        getValue(targetPixel.getGreen()) / 16 +
          getValue(encryptionPixel.getGreen())
      );
      pixel.setBlue(
        getValue(targetPixel.getBlue()) / 16 +
          getValue(encryptionPixel.getBlue())
      );
    }
  }
  img.drawTo(canvas);
  let url = canvas
    .toDataURL("image/png")
    .replace("image/png", "image/octet-stream");
  window.location.href = url;
}

function getValue(x) {
  return x - (x % 16);
}
