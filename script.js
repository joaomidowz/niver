// Carrossel
const swiperWrapper = document.querySelector(".swiper-wrapper");
for (let i = 1; i <= 9; i++) {
    const slide = document.createElement("div");
    slide.className = "swiper-slide";
    slide.innerHTML = `
    <img
      src="imagens/carousel-${i}.jpg"
      alt="Foto ${i}"
      class="rounded-xl shadow-lg w-[90%] h-60 object-cover mx-auto"
    />
  `;
    swiperWrapper.appendChild(slide);
}

new Swiper(".mySwiper", {
    loop: true,
    spaceBetween: 4,
    slidesPerView: 1.5,
    centeredSlides: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints: {
        640: { slidesPerView: 2.2 },
    },
});

// Formulário
const form = document.getElementById("form-confirmacao");
const mensagem = document.getElementById("mensagem");
const pixCard = document.getElementById("pix-card");
const select = document.getElementById("pizza-select");
const inputOutros = document.getElementById("input-outros");
const nomeInput = document.querySelector('input[name="entry.1560410878"]');

// Gatinho Entregas (Calabresa)
const gatoMoto = document.createElement("img");
gatoMoto.src = "imagens/gato moto.GIF";
gatoMoto.alt = "Pizza!";
gatoMoto.className = "mt-4 w-96 mx-auto hidden";
select.parentNode.appendChild(gatoMoto);

// Gatinho Entregas (Doce)
const gatoDoce = document.createElement("img");
gatoDoce.src = "imagens/doce.jpeg";
gatoDoce.alt = "Doce?";
gatoDoce.className = "mt-4 w-96 mx-auto hidden";
select.parentNode.appendChild(gatoDoce);

// Pizza Select
select.addEventListener("change", () => {
    if (select.value === "Outros") {
        inputOutros.classList.remove("hidden");
    } else {
        inputOutros.classList.add("hidden");
        inputOutros.value = "";
    }

    if (select.value === "Calabresa") {
        gatoMoto.classList.remove("hidden");
    } else if (select.value === "Doce???") {
        gatoDoce.classList.remove("hidden");
    } else {
        gatoMoto.classList.add("hidden");
        gatoDoce.classList.add("hidden");
    }
});

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    if (select.value === "Outros" && inputOutros.value.trim() !== "") {
        formData.set("entry.1498978415", "Outros");
        formData.set("entry.618167997", inputOutros.value.trim());
    }

    try {
        await fetch(
            "https://docs.google.com/forms/d/e/1FAIpQLSeMAiUrBqitelvsId3mAPvVUX-X10wKbmvr-PA76SJFzHBWhQ/formResponse",
            {
                method: "POST",
                mode: "no-cors",
                body: formData,
            }
        );

        form.reset();
        form.style.display = "none";
        mensagem.classList.remove("hidden");
        pixCard.classList.remove("hidden");
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    } catch (error) {
        alert("Erro ao enviar. Tente novamente.");
    }
});

// Contador regressivo
const targetDate = new Date("2025-06-07T19:15:00");
setInterval(() => {
    const now = new Date();
    const diff = targetDate - now;
    const el = document.getElementById("countdown");
    if (diff <= 0) return (el.textContent = "🎉 É hoje! 🎉");
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hrs = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const min = Math.floor((diff / (1000 * 60)) % 60);
    const seg = Math.floor((diff / 1000) % 60);
    el.textContent = `Faltam ${days}d ${hrs}h ${min}min ${seg}s para a festa!`;
}, 1000);
