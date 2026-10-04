const app = document.getElementById("app");

let photos = [];
let currentPhoto = 0;
let slideshowTimer = null;
let photoDuration = 7100;
let slideshowStarted = false;


/* =========================
   GITHUB
========================= */

const GITHUB_API =
  "https://api.github.com/repos/artemy13111978-creator/mama-gift/contents/?ref=main";

const IMAGE_EXTENSIONS = [
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif"
];


/* =========================
   ПЕРВЫЙ ЭКРАН
========================= */

document
  .getElementById("openButton")
  .addEventListener("click", function () {

    app.innerHTML = `

      <div class="letter">

        <div class="flower">💗</div>

        <h1>Мамочка ❤️</h1>

        <p>
          У меня для тебя есть<br>
          кое-что очень важное...
        </p>

        <button id="letterButton">
          Открыть письмо 💌
        </button>

      </div>

    `;

  });


/* =========================
   КНОПКИ
========================= */

document.addEventListener("click", function (event) {


  /* ОТКРЫТЬ ПИСЬМО */

  if (event.target.id === "letterButton") {

    app.innerHTML = `

      <div class="letter">

        <div class="flower">🌷</div>

        <h1>Мамочка ❤️</h1>

        <div class="letterText">

          <p>
            Мам, я тебя очень сильно люблю.
          </p>

          <p>
            Спасибо тебе за всё!!!
          </p>

          <p>
            Оставайся всегда рядом, пожалуйста ❤️
          </p>

        </div>

        <div class="signature">
          С любовью ❤️
        </div>

        <button id="memoriesButton">
          Наши воспоминания 📸
        </button>

      </div>

    `;

  }


  /* =========================
     НАШИ ВОСПОМИНАНИЯ
  ========================= */

  if (event.target.id === "memoriesButton") {

    app.innerHTML = `

      <div class="memories">

        <div class="heart">
          📸
        </div>

        <h1>
          Наши воспоминания
        </h1>

        <p id="loadingText">
          Загружаю наши фотографии ❤️
        </p>

        <audio
          id="music"
          controls
          preload="auto"
        >

          <source
            src="https://raw.githubusercontent.com/artemy13111978-creator/mama-gift/main/Alex_Lim_Igor_Krutojj_-_Vokzal_80103811.mp3"
            type="audio/mpeg"
          >

        </audio>

        <div id="slideshow"></div>

      </div>

    `;


    const music =
      document.getElementById("music");


    music.volume = 0.7;


    /* Когда музыка начинает играть —
       запускаем фотографии */

    music.addEventListener(
      "play",
      function () {

        if (!slideshowStarted) {

          startSlideshow(music);

        }

      }
    );


    /* Пытаемся запустить музыку */

    music.play().catch(function () {

      console.log(
        "Нажми Play, чтобы включить музыку."
      );

    });


    loadPhotosFromGitHub();

  }

});


/* =========================
   ЗАГРУЗКА ФОТО
========================= */

async function loadPhotosFromGitHub() {

  const loadingText =
    document.getElementById("loadingText");


  try {

    const response =
      await fetch(
        GITHUB_API,
        {
          headers: {
            "Accept":
              "application/vnd.github+json"
          }
        }
      );


    if (!response.ok) {

      throw new Error(
        "GitHub ошибка: " +
        response.status
      );

    }


    const files =
      await response.json();


    photos = files

      .filter(function (file) {

        if (file.type !== "file") {
          return false;
        }


        const name =
          file.name.toLowerCase();


        return IMAGE_EXTENSIONS.some(
          function (extension) {

            return name.endsWith(
              extension
            );

          }
        );

      })


      .sort(function (a, b) {

        return a.name.localeCompare(
          b.name,
          undefined,
          {
            numeric: true,
            sensitivity: "base"
          }
        );

      })


      .map(function (file) {

        return file.download_url;

      });


    /* =========================
       ФОТО НЕ НАЙДЕНЫ
    ========================= */

    if (photos.length === 0) {

      loadingText.textContent =
        "Фотографии не найдены 😔";

      return;

    }


    /* =========================
       ФОТО НАЙДЕНЫ
    ========================= */

    loadingText.textContent =
      "Здесь наши самые тёплые моменты ❤️";


    currentPhoto = 0;


    showFirstPhoto();


    const music =
      document.getElementById("music");


    if (
      music &&
      !music.paused
    ) {

      startSlideshow(music);

    }

  }


  catch (error) {

    console.error(error);


    loadingText.innerHTML = `
      Не получилось загрузить фотографии 😔
      <br><br>
      Проверь интернет-соединение.
    `;

  }

}


/* =========================
   ПЕРВАЯ ФОТОГРАФИЯ
========================= */

function showFirstPhoto() {

  const slideshow =
    document.getElementById("slideshow");


  if (
    !slideshow ||
    photos.length === 0
  ) {

    return;

  }


  slideshow.innerHTML = `

    <img
      id="slideImage"
      alt="Фотография"
    >

    <div class="photoCounter"></div>

  `;


  showPhoto();

}


/* =========================
   ЗАПУСК СЛАЙД-ШОУ
========================= */

function startSlideshow(music) {

  if (
    slideshowStarted ||
    photos.length <= 1
  ) {

    return;

  }


  slideshowStarted = true;


  clearInterval(
    slideshowTimer
  );


  /* =========================
     ВЫЧИСЛЯЕМ ВРЕМЯ
     
     Например:
     3:33 = 213 секунд

     213 / 30 =
     примерно 7.1 сек на фото
  ========================= */

  if (
    music &&
    Number.isFinite(music.duration) &&
    music.duration > 0
  ) {

    photoDuration =
      (
        music.duration * 1000
      ) /
      photos.length;

  }

  else {

    photoDuration = 7100;

  }


  slideshowTimer =
    setInterval(
      function () {

        currentPhoto++;


        /* =========================
           ПОСЛЕДНЕЕ ФОТО
        ========================= */

        if (
          currentPhoto >=
          photos.length
        ) {

          clearInterval(
            slideshowTimer
          );

          slideshowTimer = null;

          currentPhoto =
            photos.length - 1;

          return;

        }


        showPhoto();

      },
      photoDuration
    );

}


/* =========================
   ПОКАЗ ФОТО
========================= */

function showPhoto() {

  const image =
    document.getElementById(
      "slideImage"
    );


  const counter =
    document.querySelector(
      ".photoCounter"
    );


  if (
    !image ||
    photos.length === 0
  ) {

    return;

  }


  image.style.opacity = "0";


  setTimeout(
    function () {

      image.src =
        photos[currentPhoto];


      image.style.opacity = "1";


      if (counter) {

        counter.textContent =
          (currentPhoto + 1) +
          " / " +
          photos.length;

      }

    },
    300
  );

}
