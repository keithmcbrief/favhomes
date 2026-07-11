/* FavoHomes — site interactions */
(function () {
  "use strict";

  /* ---- Mobile nav toggle ---- */
  var toggle = document.querySelector(".nav__toggle");
  var links = document.querySelector(".nav__links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") links.classList.remove("open");
    });
  }

  /* ---- Favorite (heart) buttons ---- */
  document.querySelectorAll(".card__fav").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      var active = btn.classList.toggle("is-active");
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });
  });

  /* ---- Scroll reveal ---- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---- Listings filter (listings page) ---- */
  var filterType = document.getElementById("filter-type");
  var filterPrice = document.getElementById("filter-price");
  var filterBeds = document.getElementById("filter-beds");
  var countEl = document.getElementById("results-count");
  var listingCards = Array.prototype.slice.call(document.querySelectorAll("[data-listing]"));

  function applyFilters() {
    var type = filterType ? filterType.value : "all";
    var price = filterPrice ? filterPrice.value : "all";
    var beds = filterBeds ? filterBeds.value : "all";
    var shown = 0;

    listingCards.forEach(function (card) {
      var okType = type === "all" || card.dataset.type === type;
      var okBeds = beds === "all" || Number(card.dataset.beds) >= Number(beds);
      var p = Number(card.dataset.price);
      var okPrice = true;
      if (price === "u500") okPrice = p < 500000;
      else if (price === "500-1m") okPrice = p >= 500000 && p < 1000000;
      else if (price === "1m-2m") okPrice = p >= 1000000 && p < 2000000;
      else if (price === "2m") okPrice = p >= 2000000;

      var visible = okType && okBeds && okPrice;
      card.style.display = visible ? "" : "none";
      if (visible) shown++;
    });

    if (countEl) {
      countEl.textContent = shown + (shown === 1 ? " property" : " properties");
    }
  }

  [filterType, filterPrice, filterBeds].forEach(function (el) {
    if (el) el.addEventListener("change", applyFilters);
  });
  if (listingCards.length) applyFilters();

  /* ---- Contact form (demo submit, no backend) ---- */
  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var msg = document.getElementById("form-success");
      if (msg) msg.classList.add("show");
      form.reset();
    });
  }

  /* ---- Newsletter (demo) ---- */
  var news = document.getElementById("newsletter-form");
  if (news) {
    news.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = news.querySelector("input");
      if (input && input.value) {
        input.value = "";
        input.placeholder = "Thanks — you're subscribed!";
      }
    });
  }

  /* ---- Footer year ---- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
