/**
 * ============================================
 * REGISTRATION SERVICE
 * ============================================
 * จัดการการสมัครกิจกรรมและบันทึกลง localStorage
 */

const RegistrationService = {
    STORAGE_KEY: 'activity_registrations',

    /**
     * Get all registrations from localStorage
     */
    getAll() {
        const data = localStorage.getItem(this.STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    },

    /**
     * Save registrations to localStorage
     */
    save(registrations) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(registrations));
    },

    /**
     * Register user for activity
     */
    register(activityId, userData) {
        const registrations = this.getAll();

        // ตรวจสอบว่าสมัครซ้ำหรือไม่
        const isDuplicate = registrations.some(
            r => r.activityId === activityId &&
                 r.studentId === userData.studentId &&
                 r.status !== 'cancelled'
        );

        if (isDuplicate) {
            return { success: false, message: 'คุณได้สมัครกิจกรรมนี้แล้ว' };
        }

        // ดึงข้อมูลกิจกรรม
        const activity = activitiesData.find(a => a.id === activityId);
        if (!activity) {
            return { success: false, message: 'ไม่พบกิจกรรม' };
        }

        // สร้างข้อมูลการสมัคร
        const registration = {
            id: Date.now(),
            activityId: activityId,
            activityName: activity.name,
            clubName: activity.club,
            activityDate: activity.date,
            studentId: userData.studentId,
            fullName: userData.fullName,
            email: userData.email || '',
            phone: userData.phone || '',
            faculty: userData.faculty || '',
            major: userData.major || '',
            registeredAt: new Date().toISOString(),
            status: 'pending' // pending, confirmed, cancelled
        };

        registrations.push(registration);
        this.save(registrations);

        return { success: true, registration: registration };
    },

    /**
     * Get registrations by user
     */
    getByUser(studentId) {
        const registrations = this.getAll();
        return registrations.filter(r => r.studentId === studentId);
    },

    /**
     * Get active registrations by user (not cancelled)
     */
    getActiveByUser(studentId) {
        const registrations = this.getAll();
        return registrations.filter(
            r => r.studentId === studentId && r.status !== 'cancelled'
        );
    },

    /**
     * Get registrations by activity
     */
    getByActivity(activityId) {
        const registrations = this.getAll();
        return registrations.filter(r => r.activityId === activityId);
    },

    /**
     * Get active registrations by activity (not cancelled)
     */
    getActiveByActivity(activityId) {
        const registrations = this.getAll();
        return registrations.filter(
            r => r.activityId === activityId && r.status !== 'cancelled'
        );
    },

    /**
     * Cancel registration
     */
    cancel(registrationId, studentId) {
        const registrations = this.getAll();
        const index = registrations.findIndex(
            r => r.id === registrationId && r.studentId === studentId
        );

        if (index === -1) {
            return { success: false, message: 'ไม่พบการสมัคร' };
        }

        registrations[index].status = 'cancelled';
        registrations[index].cancelledAt = new Date().toISOString();
        this.save(registrations);

        return { success: true };
    },

    /**
     * Confirm registration (for admin)
     */
    confirm(registrationId) {
        const registrations = this.getAll();
        const index = registrations.findIndex(r => r.id === registrationId);

        if (index === -1) {
            return { success: false, message: 'ไม่พบการสมัคร' };
        }

        registrations[index].status = 'confirmed';
        registrations[index].confirmedAt = new Date().toISOString();
        this.save(registrations);

        return { success: true };
    },

    /**
     * Check if user registered for activity
     */
    isRegistered(activityId, studentId) {
        const registrations = this.getAll();
        return registrations.some(
            r => r.activityId === activityId &&
                 r.studentId === studentId &&
                 r.status !== 'cancelled'
        );
    },

    /**
     * Get registration count by activity
     */
    getCountByActivity(activityId) {
        const registrations = this.getAll();
        return registrations.filter(
            r => r.activityId === activityId && r.status !== 'cancelled'
        ).length;
    },

    /**
     * Get total registration count
     */
    getTotalCount() {
        const registrations = this.getAll();
        return registrations.filter(r => r.status !== 'cancelled').length;
    },

    /**
     * Get pending registration count
     */
    getPendingCount() {
        const registrations = this.getAll();
        return registrations.filter(r => r.status === 'pending').length;
    },

    /**
     * Delete registration permanently (for admin)
     */
    delete(registrationId) {
        const registrations = this.getAll();
        const index = registrations.findIndex(r => r.id === registrationId);

        if (index === -1) {
            return { success: false, message: 'ไม่พบการสมัคร' };
        }

        registrations.splice(index, 1);
        this.save(registrations);

        return { success: true };
    },

    /**
     * Get statistics
     */
    getStats() {
        const registrations = this.getAll();
        return {
            total: registrations.length,
            pending: registrations.filter(r => r.status === 'pending').length,
            confirmed: registrations.filter(r => r.status === 'confirmed').length,
            cancelled: registrations.filter(r => r.status === 'cancelled').length
        };
    }
};

// Export to window
window.RegistrationService = RegistrationService;
