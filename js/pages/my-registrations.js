/**
 * ============================================
 * MY REGISTRATIONS PAGE
 * ============================================
 * หน้าแสดงประวัติการสมัครกิจกรรม
 */

const MyRegistrationsPage = {
    init() {
        console.log('Initializing My Registrations Page...');
        this.render();
    },

    render() {
        const container = document.getElementById('my-registrations-container');
        if (!container) return;

        const currentUser = App.getState('currentUser');

        if (!currentUser) {
            container.innerHTML = `
                <div class="text-center py-12">
                    <i class="fas fa-lock text-gray-400 text-6xl mb-4"></i>
                    <h3 class="text-xl font-semibold text-gray-700 mb-2">กรุณาเข้าสู่ระบบ</h3>
                    <p class="text-gray-500 mb-4">เข้าสู่ระบบเพื่อดูประวัติการสมัครกิจกรรม</p>
                    <button onclick="Auth.showLoginModal()"
                            class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors">
                        <i class="fas fa-sign-in-alt mr-2"></i>เข้าสู่ระบบ
                    </button>
                </div>
            `;
            return;
        }

        const registrations = RegistrationService.getByUser(currentUser.studentId);
        const activeRegistrations = registrations.filter(r => r.status !== 'cancelled');
        const cancelledRegistrations = registrations.filter(r => r.status === 'cancelled');

        if (registrations.length === 0) {
            container.innerHTML = `
                <div class="text-center py-12">
                    <i class="fas fa-calendar-times text-gray-400 text-6xl mb-4"></i>
                    <h3 class="text-xl font-semibold text-gray-700 mb-2">ยังไม่มีประวัติการสมัคร</h3>
                    <p class="text-gray-500 mb-4">คุณยังไม่ได้สมัครกิจกรรมใดๆ</p>
                    <button onclick="Navigation.showPage('activities')"
                            class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors">
                        <i class="fas fa-calendar-alt mr-2"></i>ดูกิจกรรม
                    </button>
                </div>
            `;
            return;
        }

        // สร้างสถิติ
        const stats = RegistrationService.getStats();

        container.innerHTML = `
            <!-- Stats Cards -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div class="bg-white rounded-lg shadow p-4 text-center">
                    <div class="text-3xl font-bold text-blue-600">${registrations.length}</div>
                    <div class="text-gray-600 text-sm">ทั้งหมด</div>
                </div>
                <div class="bg-white rounded-lg shadow p-4 text-center">
                    <div class="text-3xl font-bold text-yellow-600">${registrations.filter(r => r.status === 'pending').length}</div>
                    <div class="text-gray-600 text-sm">รอยืนยัน</div>
                </div>
                <div class="bg-white rounded-lg shadow p-4 text-center">
                    <div class="text-3xl font-bold text-green-600">${registrations.filter(r => r.status === 'confirmed').length}</div>
                    <div class="text-gray-600 text-sm">ยืนยันแล้ว</div>
                </div>
                <div class="bg-white rounded-lg shadow p-4 text-center">
                    <div class="text-3xl font-bold text-red-600">${registrations.filter(r => r.status === 'cancelled').length}</div>
                    <div class="text-gray-600 text-sm">ยกเลิก</div>
                </div>
            </div>

            <!-- Active Registrations -->
            ${activeRegistrations.length > 0 ? `
                <div class="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
                    <div class="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
                        <h2 class="text-white text-xl font-semibold">
                            <i class="fas fa-list mr-2"></i>กิจกรรมที่สมัคร (${activeRegistrations.length} รายการ)
                        </h2>
                    </div>
                    <div class="divide-y divide-gray-200">
                        ${activeRegistrations.map(reg => this.renderRegistrationCard(reg)).join('')}
                    </div>
                </div>
            ` : ''}

            <!-- Cancelled Registrations -->
            ${cancelledRegistrations.length > 0 ? `
                <div class="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div class="bg-gradient-to-r from-gray-500 to-gray-600 px-6 py-4">
                        <h2 class="text-white text-xl font-semibold">
                            <i class="fas fa-times-circle mr-2"></i>รายการที่ยกเลิก (${cancelledRegistrations.length} รายการ)
                        </h2>
                    </div>
                    <div class="divide-y divide-gray-200">
                        ${cancelledRegistrations.map(reg => this.renderRegistrationCard(reg)).join('')}
                    </div>
                </div>
            ` : ''}
        `;
    },

    renderRegistrationCard(registration) {
        const statusConfig = {
            'pending': { text: 'รอยืนยัน', class: 'bg-yellow-100 text-yellow-800', icon: 'fa-clock' },
            'confirmed': { text: 'ยืนยันแล้ว', class: 'bg-green-100 text-green-800', icon: 'fa-check-circle' },
            'cancelled': { text: 'ยกเลิกแล้ว', class: 'bg-red-100 text-red-800', icon: 'fa-times-circle' }
        };
        const status = statusConfig[registration.status] || statusConfig.pending;

        const regDate = new Date(registration.registeredAt).toLocaleDateString('th-TH', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        const activityDate = registration.activityDate ?
            new Date(registration.activityDate).toLocaleDateString('th-TH', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }) : 'ไม่ระบุ';

        return `
            <div class="p-6 hover:bg-gray-50 transition-colors">
                <div class="flex flex-col md:flex-row justify-between items-start gap-4">
                    <div class="flex-1">
                        <h3 class="text-lg font-semibold text-gray-800">${registration.activityName}</h3>
                        <p class="text-gray-600 text-sm mt-1">
                            <i class="fas fa-users mr-1"></i>${registration.clubName}
                        </p>
                        <div class="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
                            <span>
                                <i class="fas fa-calendar mr-1"></i>วันจัดกิจกรรม: ${activityDate}
                            </span>
                            <span>
                                <i class="fas fa-clock mr-1"></i>สมัครเมื่อ: ${regDate}
                            </span>
                        </div>
                    </div>
                    <div class="flex flex-col items-end gap-2">
                        <span class="px-3 py-1 rounded-full text-sm font-medium ${status.class}">
                            <i class="fas ${status.icon} mr-1"></i>${status.text}
                        </span>
                        ${registration.status === 'pending' ? `
                            <button onclick="MyRegistrationsPage.cancelRegistration(${registration.id})"
                                    class="text-red-600 hover:text-red-800 text-sm transition-colors">
                                <i class="fas fa-times mr-1"></i>ยกเลิกการสมัคร
                            </button>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    },

    cancelRegistration(registrationId) {
        if (!confirm('คุณต้องการยกเลิกการสมัครนี้หรือไม่?')) return;

        const currentUser = App.getState('currentUser');
        if (!currentUser) {
            alert('กรุณาเข้าสู่ระบบ');
            return;
        }

        const result = RegistrationService.cancel(registrationId, currentUser.studentId);

        if (result.success) {
            if (typeof Helpers !== 'undefined') {
                Helpers.showNotification('ยกเลิกการสมัครเรียบร้อยแล้ว', 'success');
            }
            this.render();
        } else {
            alert(result.message);
        }
    }
};

// Export to window
window.MyRegistrationsPage = MyRegistrationsPage;
