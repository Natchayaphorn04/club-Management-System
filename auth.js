// ฟังก์ชันเข้าสู่ระบบ
async function login(username, password, remember = false) {
    try {
        // ตรวจสอบว่ามี backend หรือไม่
        const isBackendAvailable = await checkBackendAvailability();
        if (isBackendAvailable) {
            // เข้าสู่ระบบผ่าน API
            const response = await authAPI.login(username, password);
            
            if (response.success) {
                // เก็บ token
                if (remember) {
                    localStorage.setItem('authToken', response.token);
                } else {
                    sessionStorage.setItem('authToken', response.token);
                }
                
                return { success: true, user: response.user };
            } else {
                return { success: false, message: response.message };
            }
        } else {
            // ใช้ระบบ authentication แบบจำลอง
            return await mockLogin(username, password, remember);
        }
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, message: 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ' };
    }
}

// ระบบ login แบบจำลอง
async function mockLogin(username, password, remember = false) {
    // ข้อมูลผู้ใช้สำหรับทดสอบ
    const mockUsers = [
        {
            id: 1,
            username: 'admin',
            password: 'admin123', // ในระบบจริงต้องเป็น hash
            role: 'admin',
            name: 'ผู้ดูแลระบบ'
        },
        {
            id: 2,
            username: 'manager',
            password: 'manager123',
            role: 'manager',
            name: 'ผู้จัดการ'
        }
    ];
    
    // หน่วงเวลาเพื่อจำลอง API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // ตรวจสอบข้อมูลผู้ใช้
    const user = mockUsers.find(u => u.username === username && u.password === password);
    
    if (user) {
        // สร้าง mock token
        const token = createMockToken(user);
        
        // เก็บ token
        if (remember) {
            localStorage.setItem('authToken', token);
        } else {
            sessionStorage.setItem('authToken', token);
        }
        
        return {
            success: true,
            user: {
                id: user.id,
                username: user.username,
                role: user.role,
                name: user.name
            }
        };
    } else {
        return {
            success: false,
            message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง'
        };
    }
}

// สร้าง mock JWT token
function createMockToken(user) {
    const header = {
        alg: 'HS256',
        typ: 'JWT'
    };
    
    const payload = {
        id: user.id,
        username: user.username,
        role: user.role,
        name: user.name,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 ชั่วโมง
    };
    
    const signature = 'mock-signature';
    
    return btoa(JSON.stringify(header)) + '.' + 
    btoa(JSON.stringify(payload)) + '.' + 
    signature;
}

// ออกจากระบบ
async function logout() {
    try {
        // ลบ token
        localStorage.removeItem('authToken');
        sessionStorage.removeItem('authToken');
        
        // ถ้ามี backend ให้เรียก logout API
        const isBackendAvailable = await checkBackendAvailability();
        if (isBackendAvailable) {
            await authAPI.logout();
        }
        
        return { success: true };
    } catch (error) {
        console.error('Logout error:', error);
        return { success: false, message: 'เกิดข้อผิดพลาดในการออกจากระบบ' };
    }
}

// ตรวจสอบสถานะการเข้าสู่ระบบ
function isAuthenticated() {
    const token = getAuthToken();
    if (!token) return false;
    
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const now = Math.floor(Date.now() / 1000);
        
        // ตรวจสอบว่า token หมดอายุหรือไม่
        return payload.exp > now;
    } catch (error) {
        console.error('Token validation error:', error);
        return false;
    }
}

// ดึง token จาก storage
function getAuthToken() {
    return localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
}

// ดึงข้อมูลผู้ใช้จาก token
function getCurrentUser() {
    const token = getAuthToken();
    if (!token) return null;
    
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return {
            id: payload.id,
            username: payload.username,
            role: payload.role,
            name: payload.name
        };
    } catch (error) {
        console.error('Get user error:', error);
        return null;
    }
}

// ตรวจสอบสิทธิ์
function hasPermission(requiredRole) {
    const user = getCurrentUser();
    if (!user) return false;
    
    const roleHierarchy = {
        'user': 1,
        'manager': 2,
        'admin': 3
    };
    
    const userLevel = roleHierarchy[user.role] || 0;
    const requiredLevel = roleHierarchy[requiredRole] || 0;
    
    return userLevel >= requiredLevel;
}

// ตรวจสอบว่า backend พร้อมใช้งานหรือไม่
async function checkBackendAvailability() {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 วินาที timeout
        
        const response = await fetch(API_BASE_URL + '/health', {
            method: 'GET',
            signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        return response.ok;
    } catch (error) {
        return false;
    }
}

// Middleware สำหรับตรวจสอบการเข้าสู่ระบบ
function requireAuth(redirectUrl = 'login.html') {
    if (!isAuthenticated()) {
        window.location.href = redirectUrl;
        return false;
    }
    return true;
}

// Middleware สำหรับตรวจสอบสิทธิ์ admin
function requireAdmin(redirectUrl = 'index.html') {
    if (!requireAuth()) return false;
    
    if (!hasPermission('admin')) {
        alert('คุณไม่มีสิทธิ์เข้าถึงหน้านี้');
        window.location.href = redirectUrl;
        return false;
    }
    
    return true;
}

// Auto-logout เมื่อ token หมดอายุ
function setupAutoLogout() {
    setInterval(() => {
        if (!isAuthenticated() && 
            (window.location.pathname.includes('admin.html') || 
            window.location.pathname.includes('manager.html'))) {
            alert('การเข้าสู่ระบบหมดอายุ กรุณาเข้าสู่ระบบใหม่');
            logout();
            window.location.href = 'login.html';
        }
    }, 60000); // ตรวจสอบทุก 1 นาที
}

// ตั้งค่า session timeout warning
function setupSessionWarning() {
    const token = getAuthToken();
    if (!token) return;
    
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const expiryTime = payload.exp * 1000;
        const warningTime = expiryTime - (5 * 60 * 1000); // เตือน 5 นาทีก่อนหมดอายุ
        const now = Date.now();
        
        if (warningTime > now) {
            setTimeout(() => {
                if (isAuthenticated()) {
                    const extend = confirm('การเข้าสู่ระบบจะหมดอายุในอีก 5 นาที คุณต้องการต่ออายุหรือไม่?');
                    if (extend) {
                        // รีเฟรช token หรือต่ออายุ
                        refreshToken();
                    }
                }
            }, warningTime - now);
        }
    } catch (error) {
        console.error('Session warning setup error:', error);
    }
}

// รีเฟรช token
async function refreshToken() {
    try {
        const isBackendAvailable = await checkBackendAvailability();
        
        if (isBackendAvailable) {
            const response = await apiRequest('/auth/refresh', {
                method: 'POST'
            });
            
            if (response.success) {
                localStorage.setItem('authToken', response.token);
                setupSessionWarning(); // ตั้งค่าเตือนใหม่
                return true;
            }
        } else {
            // สำหรับ mock system ให้สร้าง token ใหม่
            const user = getCurrentUser();
            if (user) {
                const newToken = createMockToken(user);
                localStorage.setItem('authToken', newToken);
                setupSessionWarning();
                return true;
            }
        }
        
        return false;
    } catch (error) {
        console.error('Token refresh error:', error);
        return false;
    }
}

// เริ่มต้นระบบ authentication
function initAuth() {
    setupAutoLogout();
    setupSessionWarning();
}

// เริ่มต้นเมื่อโหลดหน้า
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', initAuth);
}

// Export สำหรับใช้ในไฟล์อื่น
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        login,
        logout,
        isAuthenticated,
        getCurrentUser,
        hasPermission,
        requireAuth,
        requireAdmin,
        refreshToken
    };
}