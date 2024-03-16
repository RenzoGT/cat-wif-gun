let imgContainer = document.getElementById("img-container");

function criaCanva() {
  let controler = 1;

  let stage = new Konva.Stage({
    container: "img-container",
    width: window.innerWidth,
    height: window.innerHeight,
  });

  let layer = new Konva.Layer();

  let imageObj = new Image();

  let gun = new Konva.Image({
    x: 50,
    y: 50,
    image: imageObj,
    width: 250,
    height: 300,
  });

  let handler = new Konva.Transformer({
    nodes: [gun],
    keepRatio: true,
    enabledAnchors: ["top-left", "top-right", "bottom-left", "bottom-right"],
  });

  imageObj.onload = function () {
    gun.draggable("true");
    layer.add(gun);
  };

  gun.on("click", () => {
    if (controler == 1) {
      layer.add(handler);
      handler.moveToTop();
      controler++;
      console.log("primeiro add");
    } else {
      if (controler % 2 == 0) {
        handler.moveToBottom();
        controler++;
        console.log("SOME");
      } else {
        handler.moveToTop();
        console.log("aparece");
        controler++;
      }
    }
  });

  gun.on("touchstart", () => {
    if (controler == 1) {
      layer.add(handler);
      handler.moveToTop();
      controler++;
      console.log("primeiro add");
    } else {
      if (controler % 2 == 0) {
        handler.moveToBottom();
        controler++;
        console.log("SOME");
      } else {
        handler.moveToTop();
        console.log("aparece");
        controler++;
      }
    }
  });

  imageObj.src = "/assets/gun.png";

  let btn = document.getElementById("addImg");
  let inputFile = document.getElementById("imgNova");

  btn.addEventListener("click", () => {
    inputFile.click();
  });

  inputFile.addEventListener("change", () => {
    let [file] = inputFile.files;
    if (file) {
      let bcImg = new Image();
      bcImg.onload = function () {
        let img = new Konva.Image({
          // x: 0,
          // y: 0,
          image: bcImg,
          // width: bcImg,
          // height: bcImg,
        });

        layer.add(img);
        gun.moveToTop();
        handler.moveToTop();

        if (this.width > 500) {
          this.width = this.width / 2;
          this.height = this.height / 2;
        }

        imgContainer.style.width = this.width + "px";
        imgContainer.style.height = this.height + "px";
        document.querySelector("canvas").parentElement.style.width = "100%";
        document.querySelector("canvas").parentElement.style.height = "100%";

        document.querySelector("canvas").width = this.width;
        document.querySelector("canvas").height = this.height;

        document.querySelector("canvas").style.width = this.width + "px";
        document.querySelector("canvas").style.height = this.height + "px";
      };
      bcImg.src = URL.createObjectURL(file);

      btn.style.display = "none";
      document.getElementById("downloadImg").style.display = "block";
    }
    inputFile.value = "";
  });

  function downloadURI(uri, name) {
    let link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;
  }

  document.getElementById("downloadImg").addEventListener("click", () => {
    handler.moveToBottom();
    imgContainer.classList.add("hide-border");
    setTimeout(() => {
      html2canvas(document.querySelector("#img-container")).then((canvas) => {
        imgContainer.classList.remove("hide-border");
        let dataURL = canvas.toDataURL({ pixelRatio: 3 });
        downloadURI(dataURL, "catscanthreat.png");
        handler.moveToTop();
      });
    }, 500);
  });

  stage.add(layer);

  let flipGun = document.querySelector("#flip");

  flipGun.addEventListener("click", () => {
    gun.to({
      scaleX: -gun.scaleX(),
    });
  });
}

criaCanva();

let remove = document.querySelector("#remove");
remove.addEventListener("click", () => {
  imgContainer.children[0].remove();
  if (window.innerWidth > 600) {
    imgContainer.style.width = "35rem";
    imgContainer.style.height = "35rem";
  } else {
    imgContainer.style.width = "22rem";
    imgContainer.style.height = "22rem";
  }

  document.getElementById("downloadImg").style.display = "none";
  document.getElementById("addImg").style.display = "block";

  clearEvents("flip");
  clearEvents("downloadImg");
  clearEvents("addImg");
  clearEvents("imgNova");

  criaCanva();
});

function clearEvents(id) {
  let old_element = document.getElementById(id);
  let new_element = old_element.cloneNode(true);
  old_element.parentNode.replaceChild(new_element, old_element);
}
