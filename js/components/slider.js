/**
 * ============================================
 * BANNER SLIDER COMPONENT
 * ============================================
 * จัดการ banner slider บนหน้า home
 */

const Slider = {
    currentSlide: 0,
    totalSlides: 4,
    autoPlayInterval: null,
    autoPlayDelay: 5000, // 5 วินาที

    /**
     * Initialize Slider
     */
    init() {
        console.log('🎬 Initializing Slider...');
        this.render();
        this.startAutoPlay();
        console.log('✅ Slider initialized');
    },

    /**
     * Render Slider HTML
     */
    render() {
        const container = document.getElementById('slider-container');
        if (!container) {
            console.error('❌ Slider container not found');
            return;
        }

        container.innerHTML = `
            <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <!-- Header -->
                <div class="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                    <div class="flex items-center">
                        <div class="w-8 h-8 bg-gradient-to-br from-pink-300 to-purple-400 rounded-lg flex items-center justify-center mr-2">
                            <i class="fas fa-fire text-white text-xs"></i>
                        </div>
                        <div>
                            <h3 class="font-bold text-gray-800 text-sm">กิจกรรมแนะนำ</h3>
                            <p class="text-xs text-gray-500">เลื่อนดูกิจกรรมที่น่าสนใจ</p>
                        </div>
                    </div>
                    <button onclick="Navigation.showPage('activities')" class="text-indigo-400 hover:text-indigo-500 text-xs font-medium">
                        ดูทั้งหมด →
                    </button>
                </div>

                <div class="relative">
                    <!-- Slider Container -->
                    <div class="overflow-hidden">
                        <div id="banner-slider" class="flex transition-transform duration-500 ease-in-out">
                            ${this.renderSlides()}
                        </div>
                    </div>

                    <!-- Navigation Arrows -->
                    <button onclick="Slider.previousSlide()"
                            class="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-700 hover:text-indigo-600 w-8 h-8 rounded-full transition-all shadow-md z-10 flex items-center justify-center">
                        <i class="fas fa-chevron-left text-xs"></i>
                    </button>
                    <button onclick="Slider.nextSlide()"
                            class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-700 hover:text-indigo-600 w-8 h-8 rounded-full transition-all shadow-md z-10 flex items-center justify-center">
                        <i class="fas fa-chevron-right text-xs"></i>
                    </button>
                </div>

                <!-- Dots Indicator -->
                <div class="flex justify-center py-3 space-x-1.5 bg-gray-50">
                    ${this.renderDots()}
                </div>
            </div>
        `;

        this.updateSlider();
    },

    /**
     * Render Slide Items
     */
    renderSlides() {
        const slides = [
            {
                image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1200&h=400&fit=crop',
                title: 'คอนเสิร์ตดนตรีประจำปี',
                subtitle: 'ชมรมดนตรีสากล',
                description: 'เข้าร่วมการแสดงดนตรีสุดยิ่งใหญ่ประจำปี พบกับนักดนตรีมากมาย',
                activityId: 1,
                gradient: 'from-indigo-700/80 via-purple-600/70 to-pink-500/60',
                buttonColor: 'from-pink-400 to-purple-500'
            },
            {
                image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&h=400&fit=crop',
                title: 'แข่งขันฟุตบอลระหว่างคณะ',
                subtitle: 'ชมรมฟุตบอล',
                description: 'ร่วมเชียร์และสนับสนุนทีมของคุณในการแข่งขันฟุตบอลสุดมันส์',
                activityId: 2,
                gradient: 'from-emerald-600/80 via-teal-500/70 to-cyan-400/60',
                buttonColor: 'from-emerald-400 to-teal-500'
            },
            {
                image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1200&h=400&fit=crop',
                title: 'นิทรรศการศิลปกรรม',
                subtitle: 'ชมรมศิลปกรรม',
                description: 'ชมผลงานศิลปกรรมสุดสร้างสรรค์จากนักศึกษาและศิลปินรุ่นใหม่',
                activityId: 3,
                gradient: 'from-violet-600/80 via-purple-500/70 to-fuchsia-400/60',
                buttonColor: 'from-violet-400 to-fuchsia-500'
            },
            {
                image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=1200&h=400&fit=crop',
                title: 'Workshop การเขียนโปรแกรม',
                subtitle: 'ชมรมเทคโนโลยี',
                description: 'เรียนรู้การเขียนโปรแกรมจากพื้นฐานไปจนถึงขั้นสูงกับผู้เชี่ยวชาญ',
                activityId: 4,
                gradient: 'from-blue-600/80 via-indigo-500/70 to-violet-400/60',
                buttonColor: 'from-blue-400 to-indigo-500'
            }
        ];

        return slides.map((slide, index) => `
            <div class="min-w-full h-48 md:h-56 relative group">
                <img src="${slide.image}"
                    alt="${slide.title}"
                    class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
                <div class="absolute inset-0 bg-gradient-to-r ${slide.gradient}"></div>
                <div class="absolute inset-0 flex items-center">
                    <div class="text-white px-5 md:px-8 max-w-2xl">
                        <div class="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-2.5 py-0.5 mb-2 text-xs">
                            <i class="fas fa-star text-yellow-400 mr-1.5 text-[10px]"></i>
                            <span>${slide.subtitle}</span>
                        </div>
                        <h3 class="text-xl md:text-2xl font-bold mb-1.5 leading-tight">${slide.title}</h3>
                        <p class="text-xs md:text-sm mb-3 opacity-90 line-clamp-2">${slide.description}</p>
                        <div class="flex flex-wrap gap-2">
                            <button onclick="Modals.handleRegistrationClick(${slide.activityId})"
                                    class="bg-gradient-to-r ${slide.buttonColor} hover:opacity-90 text-white px-3 py-1.5 rounded-lg font-medium transition-all shadow-md text-xs">
                                <i class="fas fa-user-plus mr-1"></i>สมัคร
                            </button>
                            <button onclick="ActivitiesPage.showActivityDetails(${slide.activityId})"
                                    class="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white px-3 py-1.5 rounded-lg font-medium transition-all text-xs">
                                <i class="fas fa-info-circle mr-1"></i>รายละเอียด
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    },

    /**
     * Render Dots
     */
    renderDots() {
        let dots = '';
        for (let i = 0; i < this.totalSlides; i++) {
            dots += `<button onclick="Slider.goToSlide(${i})"
                            class="slide-dot transition-all duration-300 ${i === 0 ? 'w-8 h-2.5 bg-gradient-to-r from-indigo-400 to-pink-400 rounded-full' : 'w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400 rounded-full'}">
                    </button>`;
        }
        return dots;
    },

    /**
     * Update Slider Position
     */
    updateSlider() {
        const slider = document.getElementById('banner-slider');
        if (!slider) return;

        const translateX = -this.currentSlide * 100;
        slider.style.transform = `translateX(${translateX}%)`;

        // Update dots
        document.querySelectorAll('.slide-dot').forEach((dot, index) => {
            if (index === this.currentSlide) {
                dot.classList.remove('w-2.5', 'h-2.5', 'bg-gray-300');
                dot.classList.add('w-8', 'h-2.5', 'bg-gradient-to-r', 'from-indigo-400', 'to-pink-400');
            } else {
                dot.classList.remove('w-8', 'bg-gradient-to-r', 'from-indigo-400', 'to-pink-400');
                dot.classList.add('w-2.5', 'h-2.5', 'bg-gray-300');
            }
        });
    },

    /**
     * Next Slide
     */
    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateSlider();
        this.resetAutoPlay();
    },

    /**
     * Previous Slide
     */
    previousSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateSlider();
        this.resetAutoPlay();
    },

    /**
     * Go to Specific Slide
     */
    goToSlide(slideIndex) {
        this.currentSlide = slideIndex;
        this.updateSlider();
        this.resetAutoPlay();
    },

    /**
     * Start Auto Play
     */
    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoPlayDelay);
    },

    /**
     * Stop Auto Play
     */
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    },

    /**
     * Reset Auto Play
     */
    resetAutoPlay() {
        this.stopAutoPlay();
        this.startAutoPlay();
    },

    /**
     * Pause on Hover (Optional)
     */
    setupHoverPause() {
        const slider = document.getElementById('banner-slider');
        if (!slider) return;

        slider.addEventListener('mouseenter', () => {
            this.stopAutoPlay();
        });

        slider.addEventListener('mouseleave', () => {
            this.startAutoPlay();
        });
    }
};

// Export
window.Slider = Slider;