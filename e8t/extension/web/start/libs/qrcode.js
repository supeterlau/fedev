const qrdata = document.getElementById("qrdata")
const qrcode = document.getElementById("qrcode")
const qr =   new QRCode(qrcode, {
  width: 128,
  height: 128,
  colorDark : "#000000",
  colorLight : "#ffffff",
  correctLevel : QRCode.CorrectLevel.H
});

qrdata.oninput = (el) => {
  let value = el.target.value
  console.log(value)
  qr.clear(); // clear the code.
  if(value) {
    qrcode.style.display == 'none' ? qrcode.style.display = 'block' : ''
    console.log('show qrcode')
    qr.makeCode(value); // make another code.
  } else {
    qrcode.style.display = 'none'
  }
}