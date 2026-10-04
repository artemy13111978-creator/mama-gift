const app = document.getElementById("app");
const hearts = document.getElementById("hearts");

let currentPhoto = 0;
let slideshowTimer = null;
let heartTimer = null;


/* =================================
   МУЗЫКА
================================= */

const MUSIC_URL =
  "https://raw.githubusercontent.com/artemy13111978-creator/mama-gift/main/Alex_Lim_Igor_Krutojj_-_Vokzal_80103811.mp3";


/* =================================
   ВСЕ 30 ФОТОГРАФИЙ
================================= */

const photoNames = [
  "-jxZR5ON-bk.jpg",
  "0mQWsyT4z8U.jpg",
  "2z40PRdeQ3g.jpg",
  "4GOhFiulpEY.jpg",

  "B-XifswYr4PPq0YGHsfYYHo6RSADrk3I_QbfAJF4VuL7O3H945jkJWLjMS85wMTChbWlAZpuXAPHhHgYt3KROBWl.jpg",

  "Ei90-9C55srOzeM5Zb9RUwqyyzS14i54Mglyc5rzxGoucgJZP-odd5ALA2aSwdxR83y-48z4NMFigoZ4cta3IhuC.jpg",

  "HUJBh6v-6FJALJmTpWPrSvotnEF9lDHJSJKVM7pYOnbteeGk2v-a8Dm7_pv4XTtK9JRsXfakGRFHntch07VBtZYE.jpg",

  "IDMRmUO8mlY.jpg",

  "IEN08pE7DLk6AWUz2KxTzpkMHYYO6B6pNLK7T3wHC_OA-FZkcGFYe8vRldtyiMWUH8uwIBYYPO_oykGR07Xqy2uh.jpg",

  "Jf2sISJ5xJUqwWqZfiVGhKpsd6AFHxMnuDTnmSvq5_hKBI9t4nhHsooRvcwmcTP1pDZJWVRg9GSL8TKGLJUOFDcU.jpg",

  "UBZ0GaKjV0t-WuXvjqgiruUm0uOX88VeXg3iMbIP03Y_B5TW9DGqpmcgaMB5U2QlykTKQt8L7gm5HjaCQeC2aOfj.jpg",

  "UJjItYDTZRsj4Wtkz5h7xlvO834ciUL483SuYXxm96V8ybY3RgMXs_2MXhDpUAoqa8vDeoxpd1ARjGFDizOQkB4D.jpg",

  "UNaO-aVAj-mwBej-LniRGLV-04Vor9tGFcmHyj7tCFW02EIO8S3Xqbzdv85Z32z80F791wFrLj9sid1zHSbKtg6A.jpg",

  "V7uf1vzBEj0A9DGLiNDhEYj8Que-9DUUdThksWH_lEMupUbmpZkrRoOJB_mGMHnhaCwOU2V2Y05IqLNkORmALGUs.jpg",

  "VNQ_lxQT_syPsdaWqlQJN59wDYoaBeKY9Z2bG8d5sMOJqv1fN7n1hyFhyerSbmzxH-Xzk9oyitiUXnTOouoND2ck.jpg",

  "WInIpn0QC3j104ObWCVDAHm7JP6_UB4-rtM-ym7IfHgu2Lh5ZBnmCrJLgSRaPK2NEduvSyPiZllczC1OifT1POFt.jpg",

  "_-21.jpg",

  "_-71.jpg",

  "_BfND5AaMZ-FuiTlcESdcoPL2WI0odfE-DnRYUrTnq9s3pdGT4HRRAIUatmLOH6aOvVeyqaiwqpJrxcqwymp_P78.jpg",

  "bLdReRdafK6os2y8Mj6TPFfmLfMvyCrgxkAVEOytrTVikzVHrB4lnscJU_SrldWQDe_THLNyfkKumHGoALZtf-M-.jpg",

  "bT2Bb9BWcYHnAUaP_xelX7rtXmo1qlcuqX_WKsy9UopmyNGcCsNgZk0jsHpa_cOpoVZMpWeHjDuSiCnjRLKM_aJV.jpg",

  "c46eSRE8CrFqW2p9tXV3VI18AAibslMWcpfTA977Mo0hDmHqEf6Cm48HazQgfg8S4oqBmZuBhX71tBU6P2-JUhVz.jpg",

  "d1gLT2qglwzUgBEW-nPADANzMLfHD3Xcqi7BdCLJEXC6MC3GR_GlY6q9f9um6IUyklsPu3UR6EDRH5597tdQuotG.jpg",

  "evRFnk2T-NBPB1KPgFCLAvWecoArXjm22bKimthmnxs_a2wdpN9LxvTvj9C2lr2MTymV9x0H0GZHZ_9OmTrBlcu4.jpg",

  "jJIFuzcovQw.jpg",

  "kwZt1PD7NXixjDdjvBKa-Cx_OoH3hhxz5tFuJILdDBrxKIJTE2Qh7J7ewYVEjMwa6GJI-rOazn1bznC-R3ae9SWj.jpg",

  "t_EyGNXhTgY.jpg",

  "vIACbFg7k_HGkK7cR-xvulYGb1O3_YMzZ3YB31txWV6qYRJ_0VK_Fz2iPaTXyfCtJQfgqZz0W84bJmE4_-jO-ZCl.jpg",

  "wLYWLYe1e0Bj2MhxbGpuXcHy7K13fb34Hv2YQxTVtKdnsKYoAyc1rSEraAPTXxy7iEh0SAuN1cYsvEeNafDd6Vz3.jpg",

  "yWIubKScQoK75DceiSakE98T89jkRnsp_N_ZpTLY10JSDCbWvk1Zu23itrEO6g0yZnwCl7Ltgc-JIvMIO8oJY4RK.jpg"
];


const photos = photoNames.map(function (name) {

  return (
    "https://raw.githubusercontent.com/" +
    "artemy13111978-creator/mama-gift/main/" +
    encodeURIComponent(name)
  );

});


/* =================================
   СЕРДЕЧКИ
================================= */

function createHeart() {

  if (!hearts) {
    return;
  }

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
    18 + Math.random() * 22 + "px";

  heart.style.animationDuration =
    5 + Math.random() * 5 + "s";

  heart.style.setProperty(
    "--move",
    (Math.random() - 0.5) * 180 + "px"
  );

  hearts.appendChild(heart);

  setTimeout(function () {
    heart.remove();
  }, 10000);
}


function startHearts() {

  if (heartTimer) {
    clearInterval(heartTimer);
  }

  createHeart();

  heartTimer =
    setInterval(
      createHeart,
      900
    );
}


/* =================================
   ПЕРВЫЙ ЭКРАН
================================= */

document
  .getElementById("openButton")
  .addEventListener(
    "click",
    function () {

      showLetterIntro();

    }
  );


/* =================================
   ПЕРВАЯ СТРАНИЦА ПИСЬМА
================================= */

function showLetterIntro() {

  app.innerHTML = `

    <section class="letter">

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

      <button
        id="letterButton"
        type="button"
      >
        Открыть письмо 💌
      </button>

    </section>

  `;

  startHearts();
}


/* =================================
   ПОЛНОЕ ПИСЬМО
================================= */

function showLetter() {

  app.innerHTML = `

    <section class="letter">

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
          Оставайся всегда рядом,
          пожалуйста ❤️
        </p>

      </div>

      <div class="signature">
        С любовью ❤️
      </div>

      <button
        id="memoriesButton"
        type="button"
      >
        Наши воспоминания 📸
      </button>

    </section>

  `;

  startHearts();
}


/* =================================
   ВОСПОМИНАНИЯ
================================= */

function showMemories() {

  app.innerHTML = `

    <section class="memories">

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
          src="${MUSIC_URL}"
          type="audio/mpeg"
        >

      </audio>

      <div id="slideshow">

        <img
          id="slideImage"
          src=""
          alt="Наше воспоминание"
        >

        <div class="photoCounter"></div>

      </div>

    </section>

  `;


  const music =
    document.getElementById("music");


  if (music) {

    music.volume = 0.7;

    music.play().catch(
      function () {
        console.log(
          "Автозапуск музыки заблокирован."
        );
      }
    );

  }


  document.getElementById(
    "loadingText"
  ).textContent =
    "Здесь наши самые тёплые моменты ❤️";


  currentPhoto = 0;

  showPhoto();

  startSlideshow();

  startHearts();

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


  if (!image) {
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


/* =================================
   СЛАЙД-ШОУ
================================= */

function startSlideshow() {

  if (slideshowTimer) {

    clearInterval(
      slideshowTimer
    );

  }


  /*
    7 секунд на фотографию.
    30 фотографий =
    красивое спокойное слайд-шоу.
  */

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

          showFinalScreen();

          return;

        }


        showPhoto();

      },
      7000
    );

}


/* =================================
   ФИНАЛ
================================= */

function showFinalScreen() {

  if (slideshowTimer) {

    clearInterval(
      slideshowTimer
    );

    slideshowTimer = null;

  }


  app.innerHTML = `

    <section class="final-screen">

      <div class="final-cake">
        🎂
      </div>

      <div class="final-heart">
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

      <button
        id="secretButton"
        type="button"
      >
        А здесь ещё кое-что для тебя… ❤️
      </button>

    </section>

  `;

  startHearts();
}


/* =================================
   СЕКРЕТ
================================= */

function showSecret() {

  app.innerHTML = `

    <section class="secret-screen">

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

    </section>

  `;

  startHearts();
}


/* =================================
   ОБРАБОТКА КНОПОК
================================= */

document.addEventListener(
  "click",
  function (event) {

    if (
      event.target.id ===
      "letterButton"
    ) {

      showLetter();

    }


    if (
      event.target.id ===
      "memoriesButton"
    ) {

      showMemories();

    }


    if (
      event.target.id ===
      "secretButton"
    ) {

      showSecret();

    }

  }
);
