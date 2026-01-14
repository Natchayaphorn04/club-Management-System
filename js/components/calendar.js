/**
 * ============================================
 * CALENDAR COMPONENT
 * ============================================
 * จัดการปฏิทินและการแสดงกิจกรรม
 */

const Calendar = {
    currentMonth: new Date().getMonth(),
    currentYear: new Date().getFullYear(),

    /**
     * Initialize Calendar
     */
    init() {
        console.log('📅 Initializing Calendar...');
        this.render();
        console.log('✅ Calendar initialized');
    },

    /**
     * Render Calendar Container
     */
    render() {
        const container = document.getElementById('calendar-section');
        if (!container) {
            console.error('❌ Calendar section not found');
            return;
        }

        container.innerHTML = `
            <div class="space-y-4">
                <!-- Mini Calendar Card -->
                <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div class="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-indigo-50/70 to-pink-50/70">
                        <div class="flex items-center">
                            <i class="fas fa-calendar-alt text-indigo-400 mr-2"></i>
                            <span class="font-bold text-gray-700 text-sm">ปฏิทิน</span>
                        </div>
                        <div class="flex items-center space-x-1">
                            <button onclick="Calendar.changeMonth(-1)" class="w-7 h-7 flex items-center justify-center hover:bg-white rounded-md transition-colors">
                                <i class="fas fa-chevron-left text-gray-400 hover:text-indigo-500 text-xs"></i>
                            </button>
                            <span id="calendar-month" class="text-xs font-medium text-gray-600 min-w-[100px] text-center"></span>
                            <button onclick="Calendar.changeMonth(1)" class="w-7 h-7 flex items-center justify-center hover:bg-white rounded-md transition-colors">
                                <i class="fas fa-chevron-right text-gray-400 hover:text-indigo-500 text-xs"></i>
                            </button>
                        </div>
                    </div>
                    <div class="p-3">
                        <div id="calendar-grid" class="grid grid-cols-7 gap-0.5"></div>
                    </div>
                </div>

                <!-- Recent Activities Card -->
                <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div class="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                        <div class="flex items-center">
                            <div class="w-7 h-7 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center mr-2">
                                <i class="fas fa-bolt text-white text-xs"></i>
                            </div>
                            <span class="font-bold text-gray-700 text-sm">กิจกรรมล่าสุด</span>
                        </div>
                        <button onclick="Navigation.showPage('activities')" class="text-indigo-400 hover:text-indigo-500 text-xs font-medium">
                            ดูทั้งหมด →
                        </button>
                    </div>
                    <div id="recent-activities" class="p-3 space-y-2 max-h-[300px] overflow-y-auto custom-scrollbar">
                        <!-- กิจกรรมจะแสดงที่นี่ -->
                    </div>
                </div>
            </div>
        `;

        this.renderCalendar();
        this.renderRecentActivities();
    },

    /**
     * Render Calendar Grid
     */
    renderCalendar() {
        const monthElement = document.getElementById('calendar-month');
        const gridElement = document.getElementById('calendar-grid');

        if (!monthElement || !gridElement) {
            console.warn('⚠️ Calendar elements not found, retrying...');
            setTimeout(() => this.renderCalendar(), 100);
            return;
        }

        // Update month title
        monthElement.textContent = `${monthNames[this.currentMonth]} ${this.currentYear + 543}`;

        // Clear grid
        gridElement.innerHTML = '';

        // Render day headers
        dayHeaders.forEach((day, index) => {
            const header = document.createElement('div');
            const isWeekend = index === 0 || index === 6; // Sunday or Saturday
            header.className = `text-center font-medium py-1 text-[10px] ${isWeekend ? 'text-pink-400' : 'text-gray-500'}`;
            header.textContent = day;
            gridElement.appendChild(header);
        });

        // Calculate calendar data
        const firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay();
        const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();

        // Empty cells before first day
        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            gridElement.appendChild(emptyDay);
        }

        // Render days
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = this.createDayElement(day);
            gridElement.appendChild(dayElement);
        }
    },

    /**
     * Create Day Element
     */
    createDayElement(day) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';

        const dateStr = `${this.currentYear}-${String(this.currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const dayActivities = activitiesData.filter(activity => activity.date === dateStr);

        // Check if this is today
        const today = new Date();
        const isToday = today.getFullYear() === this.currentYear &&
                       today.getMonth() === this.currentMonth &&
                       today.getDate() === day;

        if (isToday) {
            dayElement.classList.add('today');
            dayElement.textContent = day;
        } else if (dayActivities.length > 0) {
            dayElement.classList.add('has-activity');
            dayElement.innerHTML = `<span class="text-indigo-500 font-medium">${day}</span>`;
            dayElement.onclick = () => this.showDayActivities(dateStr);
        } else {
            dayElement.classList.add('text-gray-600', 'hover:text-indigo-500');
            dayElement.textContent = day;
        }

        return dayElement;
    },

    /**
     * Change Month
     */
    changeMonth(direction) {
        this.currentMonth += direction;
        
        if (this.currentMonth > 11) {
            this.currentMonth = 0;
            this.currentYear++;
        } else if (this.currentMonth < 0) {
            this.currentMonth = 11;
            this.currentYear--;
        }
        
        this.renderCalendar();
    },

    /**
     * Show Day Activities Modal
     */
    showDayActivities(dateStr) {
        const dayActivities = activitiesData.filter(activity => activity.date === dateStr);
        if (dayActivities.length === 0) return;

        if (typeof Modals !== 'undefined') {
            Modals.showDayActivities(dateStr, dayActivities);
        }
    },

    /**
     * Render Recent Activities
     */
    renderRecentActivities() {
        const container = document.getElementById('recent-activities');
        if (!container) {
            console.warn('⚠️ Recent activities container not found, retrying...');
            setTimeout(() => this.renderRecentActivities(), 100);
            return;
        }

        // เรียงกิจกรรมตามวันที่
        const sortedActivities = [...activitiesData].sort((a, b) => {
            return new Date(a.date) - new Date(b.date);
        });

        // แสดงเฉพาะ 4 รายการแรก
        const recentActivities = sortedActivities.slice(0, 4);

        if (recentActivities.length === 0) {
            container.innerHTML = `
                <div class="text-center py-10 text-gray-500">
                    <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-calendar-times text-3xl text-gray-400"></i>
                    </div>
                    <p class="font-medium">ยังไม่มีกิจกรรมที่กำลังจะมาถึง</p>
                    <p class="text-sm text-gray-400 mt-1">ติดตามกิจกรรมใหม่ๆ ได้เร็วๆ นี้</p>
                </div>
            `;
            return;
        }

        container.innerHTML = recentActivities.map((activity, index) => {
            const daysLeft = Helpers.getDaysUntilEvent(activity.date);
            const statusConfig = Helpers.getActivityStatusConfig(activity.status);
            const isUpcoming = daysLeft >= 0 && daysLeft <= 7;

            // Status colors
            const statusColors = {
                open: 'border-l-emerald-500 bg-emerald-50/50',
                closing: 'border-l-amber-500 bg-amber-50/50',
                closed: 'border-l-gray-400 bg-gray-50/50'
            };

            return `
                <div class="border-l-2 ${statusColors[activity.status] || statusColors.open} rounded-r-lg p-2.5 hover:shadow-sm transition-all cursor-pointer" onclick="ActivitiesPage.showActivityDetails(${activity.id})">
                    <div class="flex items-start justify-between mb-1">
                        <h4 class="font-medium text-gray-800 text-xs line-clamp-1 flex-1">${activity.name}</h4>
                        <span class="text-[10px] px-1.5 py-0.5 rounded ${statusConfig.bgColor} ${statusConfig.textColor} ml-2 flex-shrink-0">
                            ${statusConfig.text}
                        </span>
                    </div>
                    <p class="text-[10px] text-gray-500 mb-1.5">${activity.club}</p>
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2 text-[10px] text-gray-500">
                            <span><i class="fas fa-calendar-day mr-1 text-indigo-400"></i>${Helpers.formatDate(activity.date)}</span>
                            <span class="${daysLeft <= 3 ? 'text-pink-500 font-medium' : ''}">
                                ${daysLeft === 0 ? '🔥 วันนี้' : daysLeft === 1 ? '⚡ พรุ่งนี้' : daysLeft > 0 ? `${daysLeft} วัน` : 'จบแล้ว'}
                            </span>
                        </div>
                        ${activity.status !== 'closed' ? `
                            <button onclick="event.stopPropagation(); Modals.handleRegistrationClick(${activity.id})"
                                    class="text-[10px] bg-indigo-400 hover:bg-indigo-500 text-white px-2 py-1 rounded font-medium">
                                สมัคร
                            </button>
                        ` : ''}
                    </div>
                </div>
            `;
        }).join('');
    },

    /**
     * Refresh Calendar
     */
    refresh() {
        this.renderCalendar();
        this.renderRecentActivities();
    }
};

// Export
window.Calendar = Calendar;