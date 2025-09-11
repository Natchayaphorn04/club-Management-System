// ตัวแปรสำหรับการจัดการสถานะ
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let selectedActivity = null;

// เริ่มต้นแอปพลิเคชัน
function init() {
    showPage('home');
    renderClubs();
    renderActivities();
    renderCalendar();
}

// การนำทางระหว่างหน้า
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.add('hidden'));
    document.getElementById(pageId + '-page').classList.remove('hidden');

    // อัพเดตสถานะของปุ่มนำทาง
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('text-yellow-300'));

    // หาปุ่มนำทางที่ถูกต้องและเน้น
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        if ((pageId === 'home' && btn.textContent.includes('หน้าหลัก')) ||
            (pageId === 'clubs' && btn.textContent.includes('รายชื่อชมรม')) ||
            (pageId === 'activities' && btn.textContent.includes('กิจกรรม'))) {
            btn.classList.add('text-yellow-300');
        }
    });
}

// ฟังก์ชัน AI แนะนำชมรม
function generateClubRecommendations() {
    const interest = document.getElementById('interest-input').value.toLowerCase();
    const recommendationsDiv = document.getElementById('ai-recommendations');
    const clubsDiv = document.getElementById('recommended-clubs');

    if (!interest.trim()) {
        alert('กรุณาใส่ความสนใจของคุณ');
        return;
    }

    // ตรรกะ AI แบบง่ายๆ ตามคำหลัก
    let recommendations = [];

    if (interest.includes('ดนตรี') || interest.includes('เพลง') || interest.includes('music')) {
        recommendations.push(clubsData.find(club => club.category === 'music'));
    }
    if (interest.includes('กีฬา') || interest.includes('ฟุตบอล') || interest.includes('แบดมินตัน') || interest.includes('sport')) {
        recommendations = recommendations.concat(clubsData.filter(club => club.category === 'sports'));
    }
    if (interest.includes('ศิลปะ') || interest.includes('วาด') || interest.includes('art')) {
        recommendations.push(clubsData.find(club => club.category === 'art'));
    }
    if (interest.includes('เทคโนโลยี') || interest.includes('โปรแกรม') || interest.includes('tech') || interest.includes('คอม')) {
        recommendations.push(clubsData.find(club => club.category === 'tech'));
    }
    if (interest.includes('วิชาการ') || interest.includes('เรียน') || interest.includes('academic')) {
        recommendations.push(clubsData.find(club => club.category === 'academic'));
    }
    if (interest.includes('อาสา') || interest.includes('ช่วยเหลือ') || interest.includes('volunteer') || interest.includes('สังคม') || interest.includes('ชุมชน')) {
        recommendations = recommendations.concat(clubsData.filter(club => club.category === 'volunteer'));
    }

    // ลบรายการที่ซ้ำและค่า null
    recommendations = [...new Set(recommendations)].filter(Boolean);

    if (recommendations.length === 0) {
        recommendations = clubsData.slice(0, 3); // แสดง 3 ชมรมแรกเป็นค่าเริ่มต้น
    }

    clubsDiv.innerHTML = recommendations.map(club => `
        <div class="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center fade-in cursor-pointer hover:bg-white/30 transition-all" onclick="viewClubDetails(${club.id})">
            <div class="text-3xl mb-2">${getClubIcon(club.category)}</div>
            <h5 class="font-semibold">${club.name}</h5>
            <p class="text-sm opacity-80 mt-1">${club.description.substring(0, 50)}...</p>
            <div class="mt-2 text-xs opacity-70">คลิกเพื่อดูรายละเอียด</div>
        </div>
    `).join('');

    recommendationsDiv.classList.remove('hidden');
}

// ฟังก์ชันดึงไอคอนตามหมวดหมู่
function getClubIcon(category) {
    return categoryConfig[category]?.icon || '🏛️';
}

// ฟังก์ชันแสดงปฏิทิน
function renderCalendar() {
    document.getElementById('calendar-month').textContent = `${monthNames[currentMonth]} ${currentYear + 543}`;

    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const calendarGrid = document.getElementById('calendar-grid');
    calendarGrid.innerHTML = '';

    // หัวข้อวัน
    dayHeaders.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'text-center font-semibold text-gray-600 py-2';
        dayHeader.textContent = day;
        calendarGrid.appendChild(dayHeader);
    });

    // ช่องว่างสำหรับวันก่อนเดือนเริ่ม
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        calendarGrid.appendChild(emptyDay);
    }

    // วันในเดือน
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day text-center py-2 cursor-pointer rounded-lg relative';

        // ตรวจสอบว่ามีกิจกรรมในวันนี้หรือไม่
        const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const dayActivities = activitiesData.filter(activity => activity.date === dateStr);

        if (dayActivities.length > 0) {
            dayElement.classList.add('bg-blue-100', 'text-blue-800', 'font-semibold', 'hover:bg-blue-200');
            dayElement.innerHTML = `
                <div class="font-bold">${day}</div>
                <div class="text-xs mt-1">
                    ${dayActivities.map(activity => `
                        <div class="bg-blue-600 text-white px-1 py-0.5 rounded text-xs mb-1 truncate"
                            onclick="event.stopPropagation(); showActivityDetails('${activity.id}')"
                            title="${activity.name}">
                            ${activity.name.length > 10 ? activity.name.substring(0, 10) + '...' : activity.name}
                        </div>
                    `).join('')}
                </div>
            `;
            dayElement.onclick = () => showDayActivities(dateStr);
        } else {
            dayElement.textContent = day;
        }

        calendarGrid.appendChild(dayElement);
    }
}

function changeMonth(direction) {
    currentMonth += direction;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    } else if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar();
}

// ฟังก์ชันแสดงรายชื่อชมรม
function renderClubs() {
    const clubsGrid = document.getElementById('clubs-grid');
    clubsGrid.innerHTML = clubsData.map(club => `
        <div class="club-card card-hover bg-white rounded-2xl shadow-lg overflow-hidden" data-category="${club.category}">
            <div class="h-48 bg-gradient-to-br ${getClubGradient(club.category)} flex items-center justify-center">
                <div class="text-center text-white">
                    <div class="text-6xl mb-4">${getClubIcon(club.category)}</div>
                    <h3 class="text-xl font-bold">${club.name}</h3>
                </div>
            </div>
            <div class="p-6">
                <div class="mb-4">
                    <span class="inline-block bg-${getClubColor(club.category)}-100 text-${getClubColor(club.category)}-800 text-xs px-2 py-1 rounded-full">
                        ${getCategoryName(club.category)}
                    </span>
                </div>
                <p class="text-gray-600 mb-4">${club.description}</p>
                <div class="mb-4">
                    <h4 class="font-semibold text-gray-800 mb-2">ประวัติ</h4>
                    <p class="text-sm text-gray-600">${club.history}</p>
                </div>
                <div class="border-t pt-4">
                    <h4 class="font-semibold text-gray-800 mb-2">ติดต่อ</h4>
                    <div class="flex space-x-3">
                        <a href="#" class="text-blue-600 hover:text-blue-800">
                            <i class="fab fa-facebook text-xl"></i>
                        </a>
                        <a href="#" class="text-pink-600 hover:text-pink-800">
                            <i class="fab fa-instagram text-xl"></i>
                        </a>
                        <a href="#" class="text-green-600 hover:text-green-800">
                            <i class="fab fa-line text-xl"></i>
                        </a>
                    </div>
                    <div class="text-xs text-gray-500 mt-2">
                        <div>FB: ${club.contact.facebook}</div>
                        <div>IG: ${club.contact.instagram}</div>
                        <div>Line: ${club.contact.line}</div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function filterClubs(category) {
    const clubCards = document.querySelectorAll('.club-card');
    const filterBtns = document.querySelectorAll('.filter-btn');

    // อัพเดตปุ่มกรองที่ใช้งาน
    filterBtns.forEach(btn => btn.classList.remove('ring-2', 'ring-white'));
    event.target.classList.add('ring-2', 'ring-white');

    clubCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
            card.classList.add('fade-in');
        } else {
            card.style.display = 'none';
        }
    });
}

function getClubGradient(category) {
    return categoryConfig[category]?.gradient || 'from-gray-400 to-gray-600';
}

function getClubColor(category) {
    return categoryConfig[category]?.color || 'gray';
}

function getCategoryName(category) {
    return categoryConfig[category]?.name || 'อื่นๆ';
}

// ฟังก์ชันแสดงกิจกรรม
function renderActivities() {
    const openActivities = activitiesData.filter(activity => activity.status === 'open');
    const closingActivities = activitiesData.filter(activity => activity.status === 'closing');
    const closedActivities = activitiesData.filter(activity => activity.status === 'closed');

    document.getElementById('open-activities').innerHTML = renderActivityCards(openActivities, 'green');
    document.getElementById('closing-activities').innerHTML = renderActivityCards(closingActivities, 'orange');
    document.getElementById('closed-activities').innerHTML = renderActivityCards(closedActivities, 'gray');
}

function renderActivityCards(activities, color) {
    return activities.map(activity => `
        <div class="card-hover bg-white rounded-2xl shadow-lg p-6">
            <div class="flex justify-between items-start mb-4">
                <h3 class="text-xl font-bold text-gray-800">${activity.name}</h3>
                <span class="bg-${color}-100 text-${color}-800 text-xs px-2 py-1 rounded-full">
                    ${getStatusText(activity.status)}
                </span>
            </div>
            <p class="text-gray-600 mb-3">${activity.description}</p>
            <div class="space-y-2 text-sm text-gray-500 mb-4">
                <div><i class="fas fa-users mr-2"></i>${activity.club}</div>
                <div><i class="fas fa-calendar mr-2"></i>วันที่จัด: ${formatDate(activity.date)}</div>
                <div><i class="fas fa-clock mr-2"></i>ปิดรับสมัคร: ${formatDate(activity.deadline)}</div>
            </div>
            ${activity.status !== 'closed' ? `
                <button onclick="openRegistrationModal(${activity.id})"
                        class="w-full bg-${color}-600 hover:bg-${color}-700 text-white py-2 px-4 rounded-lg transition-colors font-medium">
                    <i class="fas fa-user-plus mr-2"></i>สมัครเข้าร่วม
                </button>
            ` : `
                <button disabled class="w-full bg-gray-300 text-gray-500 py-2 px-4 rounded-lg cursor-not-allowed">
                    <i class="fas fa-lock mr-2"></i>ปิดรับสมัครแล้ว
                </button>
            `}
        </div>
    `).join('');
}

function getStatusText(status) {
    return activityStatus[status]?.text || 'ไม่ทราบสถานะ';
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// ฟังก์ชันจัดการ Modal
function openRegistrationModal(activityId) {
    selectedActivity = activitiesData.find(activity => activity.id === activityId);
    const modal = document.getElementById('registration-modal');
    const modalContent = document.getElementById('modal-content');

    modalContent.innerHTML = `
        <div class="space-y-4">
            <div>
                <h4 class="font-semibold text-gray-800">${selectedActivity.name}</h4>
                <p class="text-gray-600">${selectedActivity.description}</p>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg">
                <div class="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <span class="font-medium">ชมรม:</span>
                        <div>${selectedActivity.club}</div>
                    </div>
                    <div>
                        <span class="font-medium">วันที่จัด:</span>
                        <div>${formatDate(selectedActivity.date)}</div>
                    </div>
                </div>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">ชื่อ-นามสกุล</label>
                <input type="text" id="student-name" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="กรอกชื่อ-นามสกุล">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">รหัสนักศึกษา</label>
                <input type="text" id="student-id" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="กรอกรหัสนักศึกษา">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">เบอร์โทรศัพท์</label>
                <input type="tel" id="student-phone" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="กรอกเบอร์โทรศัพท์">
            </div>
        </div>
    `;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closeModal() {
    const modal = document.getElementById('registration-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    selectedActivity = null;
}

function confirmRegistration() {
    const name = document.getElementById('student-name').value;
    const studentId = document.getElementById('student-id').value;
    const phone = document.getElementById('student-phone').value;

    if (!name || !studentId || !phone) {
        alert('กรุณากรอกข้อมูลให้ครบถ้วน');
        return;
    }

    alert(`สมัครกิจกรรม "${selectedActivity.name}" เรียบร้อยแล้ว!\n\nชื่อ: ${name}\nรหัสนักศึกษา: ${studentId}\nเบอร์โทร: ${phone}\n\nทางชมรมจะติดต่อกลับภายใน 3 วันทำการ`);
    closeModal();
}

// ฟังก์ชันกิจกรรมบนปฏิทิน
function showDayActivities(dateStr) {
    const dayActivities = activitiesData.filter(activity => activity.date === dateStr);
    if (dayActivities.length === 0) return;

    const modal = document.getElementById('registration-modal');
    const modalContent = document.getElementById('modal-content');

    modalContent.innerHTML = `
        <div class="space-y-4">
            <h4 class="text-xl font-bold text-gray-800">กิจกรรมวันที่ ${formatDate(dateStr)}</h4>
            <div class="space-y-3 max-h-96 overflow-y-auto">
                ${dayActivities.map(activity => `
                    <div class="border rounded-lg p-4 hover:bg-gray-50">
                        <div class="flex justify-between items-start mb-2">
                            <h5 class="font-semibold text-gray-800">${activity.name}</h5>
                            <span class="bg-${getActivityStatusColor(activity.status)}-100 text-${getActivityStatusColor(activity.status)}-800 text-xs px-2 py-1 rounded-full">
                                ${getStatusText(activity.status)}
                            </span>
                        </div>
                        <p class="text-gray-600 text-sm mb-2">${activity.description}</p>
                        <div class="text-xs text-gray-500 mb-3">
                            <div><i class="fas fa-users mr-1"></i>${activity.club}</div>
                            <div><i class="fas fa-clock mr-1"></i>ปิดรับสมัคร: ${formatDate(activity.deadline)}</div>
                        </div>
                        ${activity.status !== 'closed' ? `
                            <button onclick="registerFromCalendar(${activity.id})"
                                    class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded text-sm transition-colors">
                                <i class="fas fa-user-plus mr-1"></i>สมัครเข้าร่วม
                            </button>
                        ` : `
                            <button disabled class="w-full bg-gray-300 text-gray-500 py-2 px-3 rounded text-sm cursor-not-allowed">
                                <i class="fas fa-lock mr-1"></i>ปิดรับสมัครแล้ว
                            </button>
                        `}
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function showActivityDetails(activityId) {
    const activity = activitiesData.find(a => a.id == activityId);
    if (!activity) return;

    openRegistrationModal(activityId);
}

function registerFromCalendar(activityId) {
    closeModal();
    setTimeout(() => {
        openRegistrationModal(activityId);
    }, 100);
}

function getActivityStatusColor(status) {
    return activityStatus[status]?.color || 'gray';
}

// ฟังก์ชันดูรายละเอียดชมรม
function viewClubDetails(clubId) {
    const club = clubsData.find(c => c.id === clubId);
    if (!club) return;

    // เปลี่ยนไปหน้าชมรมและเน้นชมรมที่เลือก
    showPage('clubs');

    // เลื่อนไปยังการ์ดชมรมและเน้น
    setTimeout(() => {
        const clubCards = document.querySelectorAll('.club-card');
        clubCards.forEach(card => {
            card.classList.remove('ring-4', 'ring-blue-400');
        });

        const targetCard = Array.from(clubCards).find(card =>
            card.querySelector('h3').textContent === club.name
        );

        if (targetCard) {
            targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            targetCard.classList.add('ring-4', 'ring-blue-400');

            // ลบการเน้นหลังจาก 3 วินาที
            setTimeout(() => {
                targetCard.classList.remove('ring-4', 'ring-blue-400');
            }, 3000);
        }
    }, 100);
}

// เริ่มต้นแอปพลิเคชันเมื่อหน้าโหลดเสร็จ
document.addEventListener('DOMContentLoaded', init);