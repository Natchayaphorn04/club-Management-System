/**
 * ============================================
 * CLUBS PAGE - Blue & Pink Theme
 * ============================================
 * จัดการหน้าแสดงรายชื่อชมรม
 */

const ClubsPage = {
    currentFilter: 'all',
    currentTypeFilter: 'all-types',
    searchQuery: '',

    /**
     * Initialize Clubs Page
     */
    init() {
        console.log('🎭 Initializing Clubs Page...');
        this.renderFilters();
        this.renderClubs();
        this.updateStats();
        console.log('✅ Clubs Page initialized');
    },

    /**
     * Get category config with icons and colors
     */
    getCategoryConfig() {
        return [
            {
                key: 'all',
                name: 'ทั้งหมด',
                icon: 'fas fa-layer-group',
                gradient: 'from-indigo-500 via-purple-500 to-pink-500',
                color: 'purple',
                description: 'แสดงชมรมทั้งหมด'
            },
            {
                key: 'volunteer',
                name: 'จิตอาสา',
                icon: 'fas fa-hand-holding-heart',
                gradient: 'from-rose-500 to-red-600',
                color: 'red',
                description: 'ชมรมจิตอาสาและบำเพ็ญประโยชน์'
            },
            {
                key: 'culture',
                name: 'ศิลปวัฒนธรรม',
                icon: 'fas fa-palette',
                gradient: 'from-violet-500 to-purple-600',
                color: 'purple',
                description: 'ชมรมศิลปะและวัฒนธรรม'
            },
            {
                key: 'sports',
                name: 'กีฬา',
                icon: 'fas fa-futbol',
                gradient: 'from-emerald-500 to-green-600',
                color: 'green',
                description: 'ชมรมกีฬาและนันทนาการ'
            }
        ];
    },

    /**
     * Get type config with icons
     */
    getTypeConfig() {
        return [
            {
                key: 'all-types',
                name: 'ทุกประเภท',
                icon: 'fas fa-th-large',
                gradient: 'from-gray-500 to-slate-600',
                color: 'gray',
                description: 'แสดงทุกประเภท'
            },
            {
                key: 'central',
                name: 'ส่วนกลาง',
                icon: 'fas fa-university',
                gradient: 'from-blue-500 to-indigo-600',
                color: 'blue',
                description: 'ชมรมส่วนกลางของมหาวิทยาลัย'
            },
            {
                key: 'faculty',
                name: 'ส่วนคณะ',
                icon: 'fas fa-building',
                gradient: 'from-cyan-500 to-teal-600',
                color: 'teal',
                description: 'ชมรมประจำคณะ'
            }
        ];
    },

    /**
     * Count clubs by category/type
     */
    getClubCounts() {
        const counts = {
            all: clubsData.length,
            volunteer: clubsData.filter(c => c.category === 'volunteer').length,
            culture: clubsData.filter(c => c.category === 'culture').length,
            sports: clubsData.filter(c => c.category === 'sports').length,
            'all-types': clubsData.length,
            central: clubsData.filter(c => c.type === 'central').length,
            faculty: clubsData.filter(c => c.type === 'faculty').length
        };
        return counts;
    },

    /**
     * Render Category Filters - New Design
     */
    renderFilters() {
        const container = document.getElementById('club-filters');
        if (!container) return;

        const categories = this.getCategoryConfig();
        const types = this.getTypeConfig();
        const counts = this.getClubCounts();

        container.innerHTML = `
            <div class="w-full space-y-4">
                <!-- Search Bar -->
                <div class="relative max-w-md mx-auto">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i class="fas fa-search text-gray-400 text-sm"></i>
                    </div>
                    <input type="text"
                           id="club-search-input"
                           placeholder="ค้นหาชมรม..."
                           onkeyup="ClubsPage.handleSearch(this.value)"
                           class="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all duration-200 text-gray-700">
                    <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <span id="search-count" class="text-xs text-gray-400"></span>
                    </div>
                </div>

                <!-- Filters Container -->
                <div class="grid md:grid-cols-2 gap-4">
                    <!-- Category Filters Section -->
                    <div class="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
                        <!-- Header -->
                        <div class="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 px-4 py-2.5">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center space-x-2">
                                    <div class="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center">
                                        <i class="fas fa-filter text-white text-xs"></i>
                                    </div>
                                    <span class="text-white font-semibold text-sm">หมวดหมู่</span>
                                </div>
                                <div class="bg-white/20 px-2 py-1 rounded-lg">
                                    <span class="text-white text-xs font-medium">${counts.all} ชมรม</span>
                                </div>
                            </div>
                        </div>

                        <!-- Category Buttons -->
                        <div class="p-3">
                            <div class="grid grid-cols-4 gap-2">
                                ${categories.map(cat => `
                                    <button onclick="ClubsPage.filterByCategory('${cat.key}')"
                                            data-category="${cat.key}"
                                            class="category-filter-btn group relative overflow-hidden rounded-xl p-2 transition-all duration-200 ${cat.key === this.currentFilter
                                                ? `bg-gradient-to-br ${cat.gradient} text-white shadow-md`
                                                : 'bg-gray-50 hover:bg-gray-100 text-gray-600 hover:shadow-sm'}">

                                        <div class="relative z-10 flex flex-col items-center space-y-1">
                                            <!-- Icon -->
                                            <div class="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${cat.key === this.currentFilter
                                                ? 'bg-white/20'
                                                : `bg-gradient-to-br ${cat.gradient}`}">
                                                <i class="${cat.icon} text-xs ${cat.key === this.currentFilter ? 'text-white' : 'text-white'}"></i>
                                            </div>

                                            <!-- Text -->
                                            <div class="text-center">
                                                <div class="font-medium text-xs leading-tight">${cat.name}</div>
                                                <div class="text-[10px] ${cat.key === this.currentFilter ? 'text-white/70' : 'text-gray-400'}">
                                                    ${counts[cat.key]}
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                `).join('')}
                            </div>
                        </div>
                    </div>

                    <!-- Type Filters Section -->
                    <div class="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
                        <!-- Header -->
                        <div class="bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2.5">
                            <div class="flex items-center space-x-2">
                                <div class="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center">
                                    <i class="fas fa-sitemap text-white text-xs"></i>
                                </div>
                                <span class="text-white font-semibold text-sm">ประเภท</span>
                            </div>
                        </div>

                        <!-- Type Buttons -->
                        <div class="p-3">
                            <div class="grid grid-cols-3 gap-2">
                                ${types.map(type => `
                                    <button onclick="ClubsPage.filterByType('${type.key}')"
                                            data-type="${type.key}"
                                            class="type-filter-btn group relative overflow-hidden rounded-xl p-2 transition-all duration-200 ${type.key === this.currentTypeFilter
                                                ? `bg-gradient-to-br ${type.gradient} text-white shadow-md`
                                                : 'bg-gray-50 hover:bg-gray-100 text-gray-600 hover:shadow-sm'}">

                                        <div class="relative z-10 flex flex-col items-center space-y-1">
                                            <!-- Icon -->
                                            <div class="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${type.key === this.currentTypeFilter
                                                ? 'bg-white/20'
                                                : `bg-gradient-to-br ${type.gradient}`}">
                                                <i class="${type.icon} text-xs ${type.key === this.currentTypeFilter ? 'text-white' : 'text-white'}"></i>
                                            </div>

                                            <!-- Text -->
                                            <div class="text-center">
                                                <div class="font-medium text-xs leading-tight">${type.name}</div>
                                                <div class="text-[10px] ${type.key === this.currentTypeFilter ? 'text-white/70' : 'text-gray-400'}">
                                                    ${counts[type.key]}
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Active Filters Display -->
                <div id="active-filters" class="flex flex-wrap items-center justify-center gap-2">
                    ${this.renderActiveFilters()}
                </div>
            </div>
        `;
    },

    /**
     * Render active filter tags
     */
    renderActiveFilters() {
        const categories = this.getCategoryConfig();
        const types = this.getTypeConfig();

        const activeCategory = categories.find(c => c.key === this.currentFilter);
        const activeType = types.find(t => t.key === this.currentTypeFilter);

        let html = '';

        if (this.currentFilter !== 'all' || this.currentTypeFilter !== 'all-types' || this.searchQuery) {
            html += `
                <div class="flex items-center gap-1.5 text-xs text-gray-500">
                    <i class="fas fa-filter text-[10px]"></i>
                    <span>กรอง:</span>
                </div>
            `;

            if (this.currentFilter !== 'all') {
                html += `
                    <span class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r ${activeCategory.gradient} text-white rounded-full text-xs font-medium shadow-sm">
                        <i class="${activeCategory.icon} text-[10px]"></i>
                        ${activeCategory.name}
                        <button onclick="ClubsPage.filterByCategory('all')" class="hover:bg-white/20 rounded-full transition-colors">
                            <i class="fas fa-times text-[10px]"></i>
                        </button>
                    </span>
                `;
            }

            if (this.currentTypeFilter !== 'all-types') {
                html += `
                    <span class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r ${activeType.gradient} text-white rounded-full text-xs font-medium shadow-sm">
                        <i class="${activeType.icon} text-[10px]"></i>
                        ${activeType.name}
                        <button onclick="ClubsPage.filterByType('all-types')" class="hover:bg-white/20 rounded-full transition-colors">
                            <i class="fas fa-times text-[10px]"></i>
                        </button>
                    </span>
                `;
            }

            if (this.searchQuery) {
                html += `
                    <span class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-600 text-white rounded-full text-xs font-medium shadow-sm">
                        <i class="fas fa-search text-[10px]"></i>
                        "${this.searchQuery}"
                        <button onclick="ClubsPage.clearSearch()" class="hover:bg-white/20 rounded-full transition-colors">
                            <i class="fas fa-times text-[10px]"></i>
                        </button>
                    </span>
                `;
            }

            html += `
                <button onclick="ClubsPage.resetAllFilters()" class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-100 text-red-600 hover:bg-red-200 rounded-full text-xs font-medium transition-colors">
                    <i class="fas fa-undo text-[10px]"></i>
                    ล้างทั้งหมด
                </button>
            `;
        }

        return html;
    },

    /**
     * Update stats display
     */
    updateStats() {
        const visibleClubs = document.querySelectorAll('.club-card:not([style*="display: none"])').length;
        const totalClubs = clubsData.length;

        const searchCount = document.getElementById('search-count');
        if (searchCount) {
            if (this.searchQuery || this.currentFilter !== 'all' || this.currentTypeFilter !== 'all-types') {
                searchCount.textContent = `${visibleClubs} จาก ${totalClubs} ชมรม`;
            } else {
                searchCount.textContent = '';
            }
        }
    },

    /**
     * Render Clubs Grid
     */
    renderClubs() {
        const container = document.getElementById('clubs-grid');
        if (!container) return;

        container.innerHTML = clubsData.map(club => `
            <div class="club-card card-hover bg-white rounded-2xl shadow-lg overflow-hidden" data-category="${club.category}" data-type="${club.type}">
                <!-- Club Header with Logo -->
                <div class="h-48 bg-gradient-to-br ${Helpers.getClubGradient(club.category)} relative flex items-center justify-center">
                    <div class="absolute inset-0 bg-black bg-opacity-10"></div>
                    <div class="relative z-10 text-center text-white">
                        <div class="mx-auto mb-4">
                            <img src="${club.logo}"
                                alt="${club.name} logo"
                                class="w-20 h-20 rounded-full border-4 border-white shadow-lg object-cover mx-auto"
                                onerror="this.style.display='none'">
                        </div>
                        <h3 class="text-xl font-bold">${club.name}</h3>
                    </div>
                </div>

                <!-- Club Content -->
                <div class="p-6">
                <!-- Category & Type Badges -->
                    <div class="mb-4 flex items-center gap-2 flex-wrap">
                        <span class="inline-flex items-center bg-gradient-to-r from-${Helpers.getClubColor(club.category)}-100 to-${Helpers.getClubColor(club.category)}-50 text-${Helpers.getClubColor(club.category)}-700 text-xs px-3 py-1.5 rounded-full font-medium border border-${Helpers.getClubColor(club.category)}-200">
                            <span class="mr-1.5">${Helpers.getClubIcon(club.category)}</span>
                            ${Helpers.getCategoryName(club.category)}
                        </span>
                        <span class="inline-flex items-center bg-gradient-to-r from-${Helpers.getTypeColor(club.type)}-100 to-${Helpers.getTypeColor(club.type)}-50 text-${Helpers.getTypeColor(club.type)}-700 text-xs px-3 py-1.5 rounded-full font-medium border border-${Helpers.getTypeColor(club.type)}-200">
                            <span class="mr-1.5">${Helpers.getTypeIcon(club.type)}</span>
                            ${Helpers.getTypeName(club.type)}
                        </span>
                    </div>

                    <!-- Description -->
                    <p class="text-gray-600 mb-4 line-clamp-2">${club.description}</p>

                    <!-- History -->
                    <div class="mb-4">
                        <h4 class="font-semibold text-gray-800 mb-2 flex items-center">
                            <i class="fas fa-history text-indigo-500 mr-2"></i>ประวัติ
                        </h4>
                        <p class="text-sm text-gray-600 line-clamp-3">${club.history}</p>
                    </div>

                    <!-- Past Activities -->
                    ${club.pastActivities && club.pastActivities.length > 0 ? `
                        <div class="mb-4">
                            <h4 class="font-semibold text-gray-800 mb-2 flex items-center">
                                <i class="fas fa-calendar-check text-green-500 mr-2"></i>กิจกรรมที่ผ่านมา
                            </h4>
                            <ul class="text-sm text-gray-600 space-y-1">
                                ${club.pastActivities.slice(0, 3).map(activity => `
                                    <li class="flex items-start">
                                        <i class="fas fa-check-circle text-green-500 mr-2 mt-1 flex-shrink-0"></i>
                                        <span class="line-clamp-1">${activity}</span>
                                    </li>
                                `).join('')}
                                ${club.pastActivities.length > 3 ? `
                                    <li class="text-indigo-600 cursor-pointer hover:text-indigo-800 flex items-center" onclick="ClubsPage.showAllActivities(${club.id})">
                                        <i class="fas fa-plus-circle mr-2"></i>
                                        ดูเพิ่มเติม (${club.pastActivities.length - 3} รายการ)
                                    </li>
                                ` : ''}
                            </ul>
                        </div>
                    ` : ''}

                    <!-- Contact -->
                    <div class="border-t border-gray-100 pt-4">
                        <h4 class="font-semibold text-gray-800 mb-3 flex items-center">
                            <i class="fas fa-address-book text-pink-500 mr-2"></i>ติดต่อ
                        </h4>
                        <div class="flex space-x-2 mb-3">
                            <a href="https://facebook.com/${club.contact.facebook}" target="_blank"
                               class="w-10 h-10 bg-blue-100 hover:bg-blue-600 text-blue-600 hover:text-white rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110">
                                <i class="fab fa-facebook-f"></i>
                            </a>
                            <a href="https://instagram.com/${club.contact.instagram.replace('@', '')}" target="_blank"
                               class="w-10 h-10 bg-pink-100 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500 text-pink-600 hover:text-white rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110">
                                <i class="fab fa-instagram"></i>
                            </a>
                            <a href="https://line.me/ti/p/${club.contact.line}" target="_blank"
                               class="w-10 h-10 bg-green-100 hover:bg-green-500 text-green-600 hover:text-white rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110">
                                <i class="fab fa-line"></i>
                            </a>
                        </div>
                        <div class="text-xs text-gray-500 space-y-1">
                            <div class="flex items-center"><i class="fab fa-facebook text-blue-500 mr-2 w-4"></i> ${club.contact.facebook}</div>
                            <div class="flex items-center"><i class="fab fa-instagram text-pink-500 mr-2 w-4"></i> ${club.contact.instagram}</div>
                            <div class="flex items-center"><i class="fab fa-line text-green-500 mr-2 w-4"></i> ${club.contact.line}</div>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    },

    /**
     * Handle search input
     */
    handleSearch(query) {
        this.searchQuery = query.toLowerCase().trim();
        this.applyFilters();
        this.updateActiveFiltersDisplay();
        this.updateStats();
    },

    /**
     * Clear search
     */
    clearSearch() {
        const searchInput = document.getElementById('club-search-input');
        if (searchInput) {
            searchInput.value = '';
        }
        this.searchQuery = '';
        this.applyFilters();
        this.updateActiveFiltersDisplay();
        this.updateStats();
    },

    /**
     * Filter Clubs by Category
     */
    filterByCategory(category) {
        console.log('🔍 Filtering clubs by category:', category);

        this.currentFilter = category;
        this.renderFilters();
        this.applyFilters();
        this.updateStats();
    },

    /**
     * Filter Clubs by Type
     */
    filterByType(type) {
        console.log('🔍 Filtering clubs by type:', type);

        this.currentTypeFilter = type;
        this.renderFilters();
        this.applyFilters();
        this.updateStats();
    },

    /**
     * Update active filters display
     */
    updateActiveFiltersDisplay() {
        const container = document.getElementById('active-filters');
        if (container) {
            container.innerHTML = this.renderActiveFilters();
        }
    },

    /**
     * Apply all filters
     */
    applyFilters() {
        const clubCards = document.querySelectorAll('.club-card');
        const category = this.currentFilter || 'all';
        const type = this.currentTypeFilter || 'all-types';
        const search = this.searchQuery || '';

        let visibleCount = 0;

        clubCards.forEach(card => {
            const cardCategory = card.dataset.category;
            const cardType = card.dataset.type;
            const clubName = card.querySelector('h3').textContent.toLowerCase();
            const clubDesc = card.querySelector('.text-gray-600').textContent.toLowerCase();

            const categoryMatch = category === 'all' || cardCategory === category;
            const typeMatch = type === 'all-types' || cardType === type;
            const searchMatch = !search || clubName.includes(search) || clubDesc.includes(search);

            if (categoryMatch && typeMatch && searchMatch) {
                card.style.display = 'block';
                card.classList.add('fade-in');
                visibleCount++;
            } else {
                card.style.display = 'none';
                card.classList.remove('fade-in');
            }
        });

        // Show empty state if no results
        this.showEmptyState(visibleCount === 0);
    },

    /**
     * Show/hide empty state
     */
    showEmptyState(show) {
        const container = document.getElementById('clubs-grid');
        if (!container) return;

        let emptyState = container.querySelector('.empty-state-message');

        if (show) {
            if (!emptyState) {
                emptyState = document.createElement('div');
                emptyState.className = 'empty-state-message col-span-full';
                emptyState.innerHTML = `
                    <div class="text-center py-10">
                        <div class="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-indigo-100 to-pink-100 rounded-full flex items-center justify-center">
                            <i class="fas fa-search text-2xl text-gray-400"></i>
                        </div>
                        <h3 class="text-lg font-bold text-gray-700 mb-1">ไม่พบชมรมที่ตรงกับเงื่อนไข</h3>
                        <p class="text-gray-500 text-sm mb-4">ลองปรับเปลี่ยนตัวกรองหรือคำค้นหา</p>
                        <button onclick="ClubsPage.resetAllFilters()"
                                class="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-indigo-600 to-pink-500 text-white rounded-lg text-sm font-medium hover:shadow-md transition-all duration-200">
                            <i class="fas fa-undo text-xs"></i>
                            ล้างตัวกรอง
                        </button>
                    </div>
                `;
                container.appendChild(emptyState);
            }
        } else if (emptyState) {
            emptyState.remove();
        }
    },

    /**
     * Reset all filters
     */
    resetAllFilters() {
        this.currentFilter = 'all';
        this.currentTypeFilter = 'all-types';
        this.searchQuery = '';

        const searchInput = document.getElementById('club-search-input');
        if (searchInput) {
            searchInput.value = '';
        }

        this.renderFilters();
        this.applyFilters();
        this.updateStats();
    },

    /**
     * Show All Activities of a Club
     */
    showAllActivities(clubId) {
        const club = clubsData.find(c => c.id === clubId);
        if (!club || !club.pastActivities) return;

        const modal = document.getElementById('registration-modal');
        const content = document.getElementById('registration-content');

        if (!modal || !content) return;

        content.innerHTML = `
            <div class="space-y-6">
                <div class="flex items-center gap-4">
                    <div class="w-16 h-16 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-2xl flex items-center justify-center">
                        <i class="fas fa-calendar-check text-white text-2xl"></i>
                    </div>
                    <div>
                        <h4 class="text-xl font-bold text-gray-800">${club.name}</h4>
                        <p class="text-gray-500">กิจกรรมที่ผ่านมาทั้งหมด</p>
                    </div>
                </div>

                <div class="max-h-96 overflow-y-auto space-y-3 pr-2">
                    ${club.pastActivities.map((activity, index) => `
                        <div class="flex items-start p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:shadow-md transition-all duration-200">
                            <div class="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-indigo-500 to-pink-500 text-white rounded-xl flex items-center justify-center font-bold text-sm mr-4">
                                ${index + 1}
                            </div>
                            <div class="flex-1">
                                <p class="text-gray-800">${activity}</p>
                            </div>
                            <div class="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center ml-3">
                                <i class="fas fa-check text-green-500"></i>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <div class="flex justify-end pt-4 border-t border-gray-100">
                    <button onclick="Modals.closeRegistration()"
                            class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-pink-500 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200">
                        <i class="fas fa-times"></i>
                        ปิด
                    </button>
                </div>
            </div>
        `;

        modal.classList.remove('hidden');
        modal.classList.add('flex');
    },

    /**
     * Search Clubs (legacy support)
     */
    searchClubs(query) {
        this.handleSearch(query);
    },

    /**
     * Reset Filters (legacy support)
     */
    resetFilters() {
        this.resetAllFilters();
    }
};

// Export
window.ClubsPage = ClubsPage;
