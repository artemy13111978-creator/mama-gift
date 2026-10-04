const app = document.getElementById("app");

let photos = [];
let currentPhoto = 0;
let slideshowTimer = null;
let photoDuration = 7100;
let slideshowStarted = false;


/* =================================
   GITHUB
================================= */

const GITHUB_API =
  "https://api.github.com/repos/artemy13111978-creator/mama-gift/contents/?ref=main";

const IMAGE_EXTENSIONS = [
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif"
];


/* =================================
   ЛЕТЯЩИЕ СЕРДЕЧКИ
================================= */

function createHeart() {

  const container =
    document.getElementById("hearts");

  if (!container) return;

  const heart =
    document.createElement("span");

  heart.className =
    "flying-heart";

  heart.textContent =
    Math.random() > 0.5
      ? "❤️"
      : "💕";

  heart.style.left =
    Math.random() * 100 + "%";

  heart.style.fontSize =
    (18 + Math.random() * 22) + "px";

  heart.style.animationDuration =
    (5 + Math.random() * 5) + "s";

  heart.style.setProperty(
    "--move",
    ((Math.random() - 0.5) * 180) + "px"
  );

  container.appendChild(heart);

  setTimeout(
    function () {
      heart.remove();
    },
    10000
  );
}


function startHeartAnimation() {

  createHeart();

  setInterval(
    createHeart,
    900
  );

}


/* =================================
   КРАСИВОЕ ОТКРЫТИЕ ПОДАРКА
================================= */

document
  .getElementById("openButton")
  .addEventListener(
    "click",
    function () {

      const gift =
        document.querySelector(".gift");

      if (!gift) return;


      gift.classList.add(
        "gift-opening"
      );


      for (
        let i = 0;
        i < 12;
        i++
      ) {

        setTimeout(
          function () {
            createHeart();
          },
          i * 100
        );

      }


      setTimeout(
        function () {

          showLetter();

        },
        900
      );

    }
  );


/* =================================
   ПИСЬМО
================================= */

function showLetter() {

  app.innerHTML = `

    <div class="letter">

      <div class="flower">
        💗
      </div>

      <h1>
        Мамочка ❤️
      </h1>

      <p>
        У меня для тебя есть<br>
        кое-что очень важное...
      </p>

      <button id="letterButton">
        Открыть письмо 💌
      </button>

    </div>

  `;

  startHeartAnimation();

}


/* =================================
   КНОПКИ
================================= */

document.addEventListener(
  "click",
  function (event) {


    if (
      event.target.id ===
      "letterButton"
    ) {

      event.target.disabled =
        true;

      app.innerHTML = `

        <div class="letter">

          <div class="flower">
            🌷
          </div>

          <h1>
            Мамочка ❤️
          </h1>

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

      startHeartAnimation();

    }


    /* =============================
       ВОСПОМИНАНИЯ
    ============================= */

    if (
      event.target.id ===
      "memoriesButton"
    ) {

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
        document.getElementById(
          "music"
        );


      music.volume = 0.7;


      music.addEventListener(
        "play",
        function () {

          if (
            !slideshowStarted
          ) {

            startSlideshow(music);

          }

        }
      );


      music.addEventListener(
        "ended",
        function () {

          clearInterval(
            slideshowTimer
          );

          slideshowTimer = null;

        }
      );


      music
        .play()
        .catch(
          function () {

            console.log(
              "Автозапуск музыки заблокирован."
            );

          }
        );


      loadPhotosFromGitHub();

      startHeartAnimation();

    }

  }
);


/* =================================
   ФОТОГРАФИИ
================================= */

async function loadPhotosFromGitHub() {

  const loadingText =
    document.getElementById(
      "loadingText"
    );


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

      .filter(
        function (file) {

          if (
            file.type !== "file"
          ) {

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

        }
      )

      .sort(
        function (a, b) {

          return a.name.localeCompare(
            b.name,
            undefined,
            {
              numeric: true,
              sensitivity: "base"
            }
          );

        }
      )

      .map(
        function (file) {

          return file.download_url;

        }
      );


    if (
      photos.length === 0
    ) {

      loadingText.textContent =
        "Фотографии не найдены 😔";

      return;

    }


    loadingText.textContent =
      "Здесь наши самые тёплые моменты ❤️";


    currentPhoto = 0;

    showFirstPhoto();


    const music =
      document.getElementById(
        "music"
      );


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


/* =================================
   ПЕРВАЯ ФОТОГРАФИЯ
================================= */

function showFirstPhoto() {

  const slideshow =
    document.getElementById(
      "slideshow"
    );


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


/* =================================
   СЛАЙД-ШОУ
================================= */

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


  if (
    music &&
    Number.isFinite(
      music.duration
    ) &&
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


          setTimeout(
            showFinalScreen,
            1000
          );

          return;

        }


        showPhoto();

      },
      photoDuration
    );

}


/* =================================
   ПОКАЗ ФОТО
================================= */

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


  image.style.opacity =
    "0";


  setTimeout(
    function () {

      image.src =
        photos[currentPhoto];


      image.style.opacity =
        "1";


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


/* =================================
   ФИНАЛ
================================= */

function showFinalScreen() {

  clearInterval(
    slideshowTimer
  );

  slideshowTimer = null;


  app.innerHTML = `

    <div class="final-screen">

      <div class="final-cake">
        🎂
      </div>

      <div class="heart">
        ❤️
      </div>

      <div class="final-title">
        Мамочка, с праздником! 🎉
      </div>

      <div class="final-text">

        <p>
          Спасибо тебе за всё,
          что ты для меня делаешь.
        </p>

        <p>
          Я очень тебя люблю ❤️
        </p>

        <p>
          И хочу, чтобы ты всегда
          улыбалась и была счастлива!
        </p>

      </div>

      <button id="secretButton">
        А здесь ещё кое-что для тебя… ❤️
      </button>

    </div>

  `;


  startHeartAnimation();

}


/* =================================
   СЕКРЕТНЫЙ СЮРПРИЗ
================================= */

document.addEventListener(
  "click",
  function (event) {

    if (
      event.target.id ===
      "secretButton"
    ) {

      app.innerHTML = `

        <div class="secret-screen">

          <div class="secret-heart">
            ❤️
          </div>

          <div class="secret-title">
            Самое главное...
          </div>

          <div class="secret-message">

            <p>
              Мамочка, что бы ни случилось,
              я всегда буду рядом.
            </p>

            <p>
              Ты для меня самый родной
              и дорогой человек.
            </p>

            <p>
              Я тебя очень-очень люблю! ❤️
            </p>

            <p>
              Спасибо, что ты у меня есть.
            </p>

            <p>
              Твой сын ❤️
            </p>

          </div>

          <div class="final-cake">
            🎂💕🎈
          </div>

        </div>

      `;

      startHeartAnimation();

    }

  }
);
