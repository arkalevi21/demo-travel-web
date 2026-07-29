'use strict';

/**
 * =========================================================
 * TOURLY TRAVEL AGENCY - INTERACTIVE SCRIPT
 * =========================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  /**
   * -------------------------------------------------------
   * 1. NAVBAR & MOBILE MENU TOGGLE
   * -------------------------------------------------------
   */
  const overlay = document.querySelector("[data-overlay]");
  const navOpenBtn = document.querySelector("[data-nav-open-btn]");
  const navbar = document.querySelector("[data-navbar]");
  const navCloseBtn = document.querySelector("[data-nav-close-btn]");
  const navLinks = document.querySelectorAll("[data-nav-link]");

  const navElemArr = [navOpenBtn, navCloseBtn, overlay];

  const toggleNavbar = function () {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("nav-active");
  };

  navElemArr.forEach(elem => {
    if (elem) elem.addEventListener("click", toggleNavbar);
  });

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      if (navbar.classList.contains("active")) {
        toggleNavbar();
      }
    });
  });

  /**
   * -------------------------------------------------------
   * 2. HEADER STICKY & GO TO TOP BUTTON
   * -------------------------------------------------------
   */
  const header = document.querySelector("[data-header]");
  const goTopBtn = document.querySelector("[data-go-top]");

  window.addEventListener("scroll", function () {
    if (window.scrollY >= 150) {
      header?.classList.add("active");
      goTopBtn?.classList.add("active");
    } else {
      header?.classList.remove("active");
      goTopBtn?.classList.remove("active");
    }
  });

  /**
   * -------------------------------------------------------
   * 3. SCROLL PROGRESS BAR
   * -------------------------------------------------------
   */
  const progressBar = document.querySelector("[data-scroll-progress-bar]");
  
  if (progressBar) {
    window.addEventListener("scroll", () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = `${Math.min(progress, 100)}%`;
    });
  }

  /**
   * -------------------------------------------------------
   * 4. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
   * -------------------------------------------------------
   */
  const revealElements = document.querySelectorAll("[data-reveal]");

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute("data-reveal-delay") || 0;
        setTimeout(() => {
          entry.target.classList.add("revealed");
        }, parseInt(delay));
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  });

  revealElements.forEach(elem => revealObserver.observe(elem));

  /**
   * -------------------------------------------------------
   * 5. TOAST NOTIFICATION SYSTEM
   * -------------------------------------------------------
   */
  const toastContainer = document.querySelector("[data-toast-container]");

  function showToast(message, iconName = 'checkmark-circle-outline') {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <ion-icon name="${iconName}"></ion-icon>
      <span>${message}</span>
    `;

    toastContainer.appendChild(toast);

    // Trigger show animation
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    // Auto dismiss
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  }

  /**
   * -------------------------------------------------------
   * 6. DESTINATION & PACKAGE FILTER TABS
   * -------------------------------------------------------
   */
  // Destination Filter Tabs
  const destFilterBtns = document.querySelectorAll("[data-dest-filter]");
  const destItems = document.querySelectorAll("[data-dest-item]");

  destFilterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      destFilterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filterVal = btn.getAttribute("data-dest-filter");

      destItems.forEach(item => {
        const category = item.getAttribute("data-dest-item");
        if (filterVal === "all" || category === filterVal) {
          item.style.display = "block";
          item.style.animation = "fadeIn 0.4s ease forwards";
        } else {
          item.style.display = "none";
        }
      });
    });
  });

  // Package Filter Tabs
  const pkgFilterBtns = document.querySelectorAll("[data-pkg-filter]");
  const pkgItems = document.querySelectorAll("[data-pkg-item]");

  pkgFilterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      pkgFilterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filterVal = btn.getAttribute("data-pkg-filter");

      pkgItems.forEach(item => {
        const category = item.getAttribute("data-pkg-item");
        if (filterVal === "all" || category === filterVal) {
          item.style.display = "block";
          item.style.animation = "fadeIn 0.4s ease forwards";
        } else {
          item.style.display = "none";
        }
      });
    });
  });

  // Single-Month Animated Badge Carousel
  const monthDisplayText = document.querySelector("[data-month-display]");
  const monthPanes = document.querySelectorAll("[data-month-content]");
  const monthNavPrev = document.querySelector('[data-month-nav="prev"]');
  const monthNavNext = document.querySelector('[data-month-nav="next"]');

  const monthsData = [
    { id: "juli", label: "Juli 2026" },
    { id: "agustus", label: "Agustus 2026" },
    { id: "september", label: "September 2026" }
  ];

  let currentMonthIdx = 0;
  let isAnimating = false;

  function changeMonth(direction) {
    if (isAnimating || !monthDisplayText) return;
    isAnimating = true;

    const outClass = direction === 'next' ? 'slide-out-left' : 'slide-out-right';
    const inAnimation = direction === 'next' ? 'slideInLeft 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards' : 'slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards';

    // Slide out current text
    monthDisplayText.classList.add(outClass);

    setTimeout(() => {
      // Calculate new index
      if (direction === 'next') {
        currentMonthIdx = (currentMonthIdx + 1) % monthsData.length;
      } else {
        currentMonthIdx = (currentMonthIdx - 1 + monthsData.length) % monthsData.length;
      }

      const activeMonth = monthsData[currentMonthIdx];

      // Update text & slide in
      monthDisplayText.innerHTML = `<ion-icon name="calendar-clear-outline"></ion-icon> ${activeMonth.label}`;
      monthDisplayText.classList.remove(outClass);
      monthDisplayText.style.animation = 'none';
      void monthDisplayText.offsetWidth; // trigger reflow
      monthDisplayText.style.animation = inAnimation;

      // Switch active month content pane
      monthPanes.forEach(pane => {
        if (pane.getAttribute("data-month-content") === activeMonth.id) {
          pane.classList.add("active");
        } else {
          pane.classList.remove("active");
        }
      });

      setTimeout(() => {
        isAnimating = false;
      }, 300);
    }, 180);
  }

  monthNavPrev?.addEventListener("click", () => changeMonth('prev'));
  monthNavNext?.addEventListener("click", () => changeMonth('next'));

  // Date Filters inside each Month Pane
  monthPanes.forEach(pane => {
    const filterBtns = pane.querySelectorAll("[data-schedule-filter]");
    const items = pane.querySelectorAll("[data-schedule-item]");

    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const filterVal = btn.getAttribute("data-schedule-filter");

        items.forEach(item => {
          const category = item.getAttribute("data-schedule-item");
          if (filterVal === "all" || category === filterVal) {
            item.style.display = "flex";
            item.style.animation = "fadeIn 0.4s ease forwards";
          } else {
            item.style.display = "none";
          }
        });
      });
    });
  });

  // Mobile Schedule Expand / Collapse Toggle
  monthPanes.forEach(pane => {
    const expandBtn = pane.querySelector("[data-schedule-expand]");
    const expandText = expandBtn?.querySelector("span");
    const expandIcon = expandBtn?.querySelector("ion-icon");

    expandBtn?.addEventListener("click", () => {
      const isExpanded = pane.classList.contains("expanded");
      if (isExpanded) {
        pane.classList.remove("expanded");
        if (expandText) {
          const monthName = pane.getAttribute("data-month-content");
          const totalTrips = monthName === "agustus" ? "16" : "11";
          expandText.textContent = `Lihat Semua Trip ${monthName.charAt(0).toUpperCase() + monthName.slice(1)} (${totalTrips} Trip)`;
        }
        if (expandIcon) expandIcon.setAttribute("name", "chevron-down-outline");
        pane.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        pane.classList.add("expanded");
        if (expandText) expandText.textContent = "Sembunyikan Jadwal";
        if (expandIcon) expandIcon.setAttribute("name", "chevron-up-outline");
      }
    });
  });

  /**
   * -------------------------------------------------------
   * 7. LIVE SEARCH FILTERING & SUGGESTIONS
   * -------------------------------------------------------
   */
  const liveSearchInput = document.querySelector("[data-live-search]");
  const searchForm = document.querySelector("[data-search-form]");
  const suggestionsContainer = document.querySelector("[data-search-suggestions]");

  // Daftar destinasi Arthenis Travel Surabaya untuk suggestions
  const destinationSuggestions = [
    "Bromo Midnight", "Kawah Ijen Blue Fire", "Labuan Bajo Phinisi",
    "Nusa Penida Bali", "Malang & Batu Tour", "Raja Ampat",
    "Sumba Overland", "Jogja Cultural Tour", "Belitung Beach"
  ];

  if (liveSearchInput && suggestionsContainer) {
    liveSearchInput.addEventListener("input", function(e) {
      const query = this.value.toLowerCase().trim();
      
      // Filter destinations & packages
      destItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(query) ? "block" : "none";
      });

      pkgItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(query) ? "block" : "none";
      });

      // Show suggestions
      if (query.length > 1) {
        const matches = destinationSuggestions.filter(s => 
          s.toLowerCase().includes(query)
        ).slice(0, 5);

        if (matches.length > 0) {
          suggestionsContainer.innerHTML = matches.map(s => `
            <div class="search-suggestion-item" data-suggestion="${s}">
              <ion-icon name="location-outline"></ion-icon>
              ${s}
            </div>
          `).join('');
          suggestionsContainer.classList.add('active');

          // Click handler for suggestions
          suggestionsContainer.querySelectorAll('.search-suggestion-item').forEach(sug => {
            sug.addEventListener('click', function() {
              liveSearchInput.value = this.getAttribute('data-suggestion');
              suggestionsContainer.classList.remove('active');
              // Trigger filter
              liveSearchInput.dispatchEvent(new Event('input'));
            });
          });
        } else {
          suggestionsContainer.classList.remove('active');
        }
      } else {
        suggestionsContainer.classList.remove('active');
      }
    });

    // Close suggestions on outside click
    document.addEventListener('click', function(e) {
      if (!liveSearchInput.contains(e.target) && !suggestionsContainer.contains(e.target)) {
        suggestionsContainer.classList.remove('active');
      }
    });
  }

  if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const destValue = liveSearchInput?.value || "Selected destination";
      openBookingModal(destValue);
    });
  }

  /**
   * -------------------------------------------------------
   * 8. WISHLIST / BOOKMARK TOGGLE
   * -------------------------------------------------------
   */
  const wishlistBtns = document.querySelectorAll("[data-wishlist-btn]");

  wishlistBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      btn.classList.toggle("active");

      const heartIcon = btn.querySelector("ion-icon");
      const itemName = btn.getAttribute("data-item-name") || "Destination";

      if (btn.classList.contains("active")) {
        heartIcon?.setAttribute("name", "heart");
        showToast(`"${itemName}" telah ditambahkan ke wishlist!`, 'heart');
      } else {
        heartIcon?.setAttribute("name", "heart-outline");
        showToast(`"${itemName}" dihapus dari wishlist`, 'heart-dislike-outline');
      }
    });
  });

  /**
   * -------------------------------------------------------
   * 9. HERO STATS COUNTER ANIMATION
   * -------------------------------------------------------
   */
  const statNumbers = document.querySelectorAll("[data-count]");

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute("data-count"));
        const customSuffix = entry.target.getAttribute("data-suffix");
        const suffix = customSuffix !== null ? customSuffix : (target > 100 ? '+' : '');
        const duration = 2000;
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(eased * target);
          
          entry.target.textContent = current.toLocaleString('id-ID') + suffix;
          
          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            entry.target.textContent = target.toLocaleString('id-ID') + suffix;
            entry.target.classList.add('counted');
          }
        }
        
        requestAnimationFrame(updateCounter);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(num => counterObserver.observe(num));

  /**
   * -------------------------------------------------------
   * 10. DATE INPUTS DEFAULT VALUES
   * -------------------------------------------------------
   */
  const checkinInput = document.querySelector("#checkin");
  const checkoutInput = document.querySelector("#checkout");
  const modalDateInput = document.querySelector("#modal-date");

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const formatDate = (date) => date.toISOString().split('T')[0];

  if (checkinInput) {
    checkinInput.min = formatDate(today);
    checkinInput.value = formatDate(tomorrow);
  }
  
  if (checkoutInput) {
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);
    checkoutInput.min = formatDate(tomorrow);
    checkoutInput.value = formatDate(nextWeek);
  }

  if (modalDateInput) {
    modalDateInput.min = formatDate(today);
    modalDateInput.value = formatDate(tomorrow);
  }

  // Update checkout min date when checkin changes
  if (checkinInput && checkoutInput) {
    checkinInput.addEventListener("change", function() {
      const checkinDate = new Date(this.value);
      const nextDay = new Date(checkinDate);
      nextDay.setDate(nextDay.getDate() + 1);
      checkoutInput.min = formatDate(nextDay);
      if (new Date(checkoutInput.value) <= checkinDate) {
        checkoutInput.value = formatDate(nextDay);
      }
    });
  }

  /**
   * -------------------------------------------------------
   * 11. BOOKING MODAL DIALOG
   * -------------------------------------------------------
   */
  const bookingModal = document.querySelector("[data-booking-modal]");
  const modalCloseBtns = document.querySelectorAll("[data-modal-close]");
  const modalDestinationInput = document.querySelector("[data-modal-destination]");
  const bookingForm = document.querySelector("[data-booking-form]");
  const bookBtns = document.querySelectorAll("[data-book-btn]");

  function openBookingModal(destinationName = "Pesan Tour Umum") {
    if (!bookingModal) return;
    if (modalDestinationInput) {
      modalDestinationInput.value = destinationName;
    }
    bookingModal.classList.add("active");
    document.body.classList.add("modal-active");
  }

  function closeBookingModal() {
    if (!bookingModal) return;
    bookingModal.classList.remove("active");
    document.body.classList.remove("modal-active");
  }

  bookBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const destName = btn.getAttribute("data-destination") || "Destinasi Pilihan";
      openBookingModal(destName);
    });
  });

  modalCloseBtns.forEach(btn => {
    btn.addEventListener("click", closeBookingModal);
  });

  // Click outside modal to close
  if (bookingModal) {
    bookingModal.addEventListener("click", function(e) {
      if (e.target === this) {
        closeBookingModal();
      }
    });
  }

  if (bookingForm) {
    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const dest = document.querySelector("#modal-destination")?.value || "Open Trip";
      const name = document.querySelector("#modal-name")?.value || "Tamu";
      const phone = document.querySelector("#modal-phone")?.value || "";
      const guests = document.querySelector("#modal-guests")?.value || "2";
      const date = document.querySelector("#modal-date")?.value || "";
      
      const message = `Halo Admin Arthenis Travel Surabaya,\nSaya mau booking / tanya paket trip:\n\n` +
                      `📌 *Destinasi:* ${dest}\n` +
                      `👤 *Nama:* ${name}\n` +
                      `📱 *WhatsApp:* ${phone}\n` +
                      `👥 *Jumlah Peserta:* ${guests} pax\n` +
                      `📅 *Rencana Tanggal:* ${date}\n\n` +
                      `Mohon informasi ketersediaan seat dan rincian pembayarannya. Terima kasih!`;
      
      const waUrl = `https://wa.me/6282230557434?text=${encodeURIComponent(message)}`;
      
      closeBookingModal();
      showToast(`Terima kasih Kak ${name}! Mengalihkan ke WhatsApp Admin Arthenis Travel...`, "logo-whatsapp");
      
      setTimeout(() => {
        window.open(waUrl, "_blank");
      }, 800);
      
      bookingForm.reset();
    });
  }

  /**
   * -------------------------------------------------------
   * 12. LIGHTBOX PHOTO GALLERY
   * -------------------------------------------------------
   */
  const lightboxModal = document.querySelector("[data-lightbox-modal]");
  const lightboxImg = document.querySelector("[data-lightbox-img]");
  const lightboxCaption = document.querySelector("[data-lightbox-caption]");
  const lightboxCounter = document.querySelector("[data-lightbox-counter]");
  const lightboxCloseBtns = document.querySelectorAll("[data-lightbox-close]");
  const lightboxPrevBtn = document.querySelector("[data-lightbox-prev]");
  const lightboxNextBtn = document.querySelector("[data-lightbox-next]");
  const galleryItems = document.querySelectorAll("[data-gallery-item]");

  let currentGalleryIndex = 0;

  function updateLightbox(index) {
    if (galleryItems.length === 0) return;
    currentGalleryIndex = (index + galleryItems.length) % galleryItems.length;

    const item = galleryItems[currentGalleryIndex];
    const src = item.getAttribute("data-src") || item.querySelector("img")?.src;
    const caption = item.getAttribute("data-caption") || "Travel Photo";

    if (lightboxImg) {
      lightboxImg.src = src;
      lightboxImg.alt = caption;
    }
    if (lightboxCaption) lightboxCaption.textContent = caption;
    if (lightboxCounter) lightboxCounter.textContent = `${currentGalleryIndex + 1} / ${galleryItems.length}`;
  }

  function openLightbox(index) {
    if (!lightboxModal) return;
    updateLightbox(index);
    lightboxModal.classList.add("active");
    document.body.classList.add("modal-active");
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.remove("active");
    document.body.classList.remove("modal-active");
  }

  galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => openLightbox(index));
  });

  lightboxCloseBtns.forEach(btn => btn.addEventListener("click", closeLightbox));

  // Click outside to close
  if (lightboxModal) {
    lightboxModal.addEventListener("click", function(e) {
      if (e.target === this) {
        closeLightbox();
      }
    });
  }

  lightboxPrevBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    updateLightbox(currentGalleryIndex - 1);
  });

  lightboxNextBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    updateLightbox(currentGalleryIndex + 1);
  });

  // Keyboard navigation for lightbox
  document.addEventListener("keydown", (e) => {
    if (lightboxModal?.classList.contains("active")) {
      if (e.key === "ArrowLeft") {
        updateLightbox(currentGalleryIndex - 1);
      } else if (e.key === "ArrowRight") {
        updateLightbox(currentGalleryIndex + 1);
      }
    }
  });

  /**
   * -------------------------------------------------------
   * 13. NEWSLETTER SUBSCRIPTION
   * -------------------------------------------------------
   */
  const newsletterForm = document.querySelector("[data-newsletter-form]");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      if (emailInput?.value) {
        showToast("Berhasil berlangganan newsletter Tourly! 🎉", "mail-open-outline");
        emailInput.value = "";
      }
    });
  }

  /**
   * -------------------------------------------------------
   * 14. GLOBAL ESCAPE KEY LISTENER
   * -------------------------------------------------------
   */
  /**
   * -------------------------------------------------------
   * 17. INTERACTIVE TRIP DETAIL MODAL & GALLERY SLIDER
   * -------------------------------------------------------
   */
  const tripModal = document.querySelector("[data-trip-detail-modal]");
  const tripModalCloseBtns = document.querySelectorAll("[data-trip-detail-close]");
  const modalTitle = document.querySelector("[data-modal-title]");
  const modalDate = document.querySelector("[data-modal-date]");
  const modalPrice = document.querySelector("[data-modal-price]");
  const modalDesc = document.querySelector("[data-modal-desc]");
  const modalMp = document.querySelector("[data-modal-mp]");
  const modalWaDirect = document.querySelector("[data-modal-wa-direct]");
  const modalSlideImgs = document.querySelectorAll(".modal-slide-img");
  const modalDots = document.querySelectorAll(".modal-slider-dots .dot");
  const slidePrevBtn = document.querySelector('[data-modal-slide="prev"]');
  const slideNextBtn = document.querySelector('[data-modal-slide="next"]');

  let currentSlideIdx = 0;
  let activeTripInfo = {};

  function setSlide(index) {
    if (modalSlideImgs.length === 0) return;
    currentSlideIdx = (index + modalSlideImgs.length) % modalSlideImgs.length;
    modalSlideImgs.forEach((img, i) => {
      img.classList.toggle("active", i === currentSlideIdx);
    });
    modalDots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentSlideIdx);
    });
  }

  slidePrevBtn?.addEventListener("click", () => setSlide(currentSlideIdx - 1));
  slideNextBtn?.addEventListener("click", () => setSlide(currentSlideIdx + 1));
  modalDots.forEach((dot, i) => dot.addEventListener("click", () => setSlide(i)));

  function openTripDetailModal(card) {
    if (!tripModal) return;

    const title = card.getAttribute("data-trip-title") || card.querySelector(".schedule-title")?.textContent || "Trip Arthenis Travel";
    const date = card.getAttribute("data-trip-date") || card.querySelector(".schedule-date-badge")?.textContent || "Akhir Pekan";
    const price = card.getAttribute("data-trip-price") || card.querySelector(".schedule-price")?.textContent || "Hubungi Admin";
    const desc = card.getAttribute("data-trip-desc") || card.querySelector(".schedule-desc")?.textContent || "Perjalanan Open Trip seru bersama Arthenis Tour & Travel Surabaya.";
    const mp = card.getAttribute("data-trip-mp") || "Lamongan • Gresik • Surabaya • Sidoarjo";

    const img1 = card.getAttribute("data-trip-img1") || card.querySelector(".schedule-card-img img")?.getAttribute("src") || "./assets/images/popular-1.jpg";
    const img2 = card.getAttribute("data-trip-img2") || "./assets/images/popular-2.jpg";
    const img3 = card.getAttribute("data-trip-img3") || "./assets/images/popular-3.jpg";

    if (modalTitle) modalTitle.textContent = title;
    if (modalDate) modalDate.innerHTML = `<ion-icon name="calendar-outline"></ion-icon> ${date}`;
    if (modalPrice) modalPrice.textContent = price;
    if (modalDesc) modalDesc.textContent = desc;
    if (modalMp) modalMp.textContent = mp;

    if (modalSlideImgs[0]) modalSlideImgs[0].src = img1;
    if (modalSlideImgs[1]) modalSlideImgs[1].src = img2;
    if (modalSlideImgs[2]) modalSlideImgs[2].src = img3;

    setSlide(0);

    activeTripInfo = { title, date, price, mp };

    tripModal.classList.add("active");
    tripModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-active");
  }

  function closeTripDetailModal() {
    if (!tripModal) return;
    tripModal.classList.remove("active");
    tripModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-active");
  }

  tripModalCloseBtns.forEach(btn => btn.addEventListener("click", closeTripDetailModal));

  // Open Trip Detail Modal ONLY when clicking explicit 'Lihat Detail' button
  document.addEventListener("click", (e) => {
    const detailBtn = e.target.closest("[data-trip-detail-trigger]");
    if (detailBtn) {
      const card = detailBtn.closest(".schedule-card");
      if (card) openTripDetailModal(card);
    }
  });

  // Direct WA booking from modal
  modalWaDirect?.addEventListener("click", () => {
    const text = `Halo Admin Arthenis Travel, saya berminat pesan seat:\n\n📌 *${activeTripInfo.title || "Open Trip"}*\n📅 Tanggal: ${activeTripInfo.date || "-"}\n💰 Harga: ${activeTripInfo.price || "-"}\n📍 Meeting Point: ${activeTripInfo.mp || "Surabaya"}\n\nMohon info ketersediaan seat & cara pendaftaran. Terima kasih!`;
    window.open(`https://wa.me/6282230557434?text=${encodeURIComponent(text)}`, "_blank");
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeBookingModal();
      closeTripDetailModal();
      closeLightbox();
      if (navbar?.classList.contains("active")) toggleNavbar();
    }
  });

  /**
   * -------------------------------------------------------
   * 15. SMOOTH SCROLL FOR NAV LINKS
   * -------------------------------------------------------
   */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerOffset = 100;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });

  /**
   * -------------------------------------------------------
   * 16. FAQ ACCORDION TOGGLE
   * -------------------------------------------------------
   */
  const faqItems = document.querySelectorAll("[data-faq-item]");

  faqItems.forEach(item => {
    const btn = item.querySelector("[data-faq-toggle]");
    btn?.addEventListener("click", () => {
      const isActive = item.classList.contains("active");
      faqItems.forEach(i => i.classList.remove("active"));
      if (!isActive) {
        item.classList.add("active");
      }
    });
  });
  /**
   * -------------------------------------------------------
   * 18. FORCE AUTOPLAY HERO VIDEO BACKGROUND
   * -------------------------------------------------------
   */
  const heroVideo = document.querySelector(".hero-video-bg");
  if (heroVideo) {
    heroVideo.muted = true;
    const playPromise = heroVideo.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        const startVideo = () => {
          heroVideo.play();
          document.removeEventListener("click", startVideo);
          document.removeEventListener("touchstart", startVideo);
          document.removeEventListener("scroll", startVideo);
        };
        document.addEventListener("click", startVideo);
        document.addEventListener("touchstart", startVideo);
        document.addEventListener("scroll", startVideo);
      });
    }
  }

});