// ข้อมูลชมรม
const clubsData = [
    {
        id: 1,
        name: "ชมรมดนตรีสากล",
        category: "music",
        description: "ชมรมสำหรับผู้ที่รักในการเล่นดนตรีสากล ทั้งเครื่องดนตรีและการร้องเพลง",
        history: "ก่อตั้งขึ้นในปี 2010 โดยนักศึกษาที่มีความหลงใหลในดนตรี ปัจจุบันมีสมาชิกกว่า 150 คน",
        logo: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop&crop=center",
        contact: {
            facebook: "MusicClubUni",
            instagram: "@musicclub_uni",
            line: "@musicclub"
        },
        image: "music",
        pastActivities: [
            "คอนเสิร์ตดนตรีประจำปี 2023",
            "การแสดงดนตรีคลาสสิก",
            "Workshop การเล่นกีตาร์",
            "การประกวดร้องเพลงสากล",
            "งานแสดงดนตรีจาซ"
        ]
    },
    {
        id: 2,
        name: "ชมรมฟุตบอล",
        category: "sports",
        description: "ชมรมกีฬาฟุตบอลที่เปิดโอกาสให้นักศึกษาได้พัฒนาทักษะและสร้างมิตรภาพ",
        history: "เป็นหนึ่งในชมรมเก่าแก่ที่สุดของมหาวิทยาลัย ก่อตั้งมาตั้งแต่ปี 1995",
        logo: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=150&h=150&fit=crop&crop=center",
        contact: {
            facebook: "FootballClubUni",
            instagram: "@football_uni",
            line: "@footballclub"
        },
        image: "sports",
        pastActivities: [
            "แข่งขันฟุตบอลระหว่างคณะ 2023",
            "ทัวร์นาเมนต์ฟุตบอล 7 คน",
            "การแข่งขันกับมหาวิทยาลัยอื่น",
            "ค่ายฝึกซ้อมฟุตบอล",
            "กิจกรรมแฟนคลับเชียร์บอลโลก"
        ]
    },
    {
        id: 3,
        name: "ชมรมศิลปกรรม",
        category: "art",
        description: "ชมรมสำหรับผู้ที่สนใจในงานศิลปะ การวาดภาพ และงานประดิษฐ์",
        history: "ก่อตั้งในปี 2005 เพื่อส่งเสริมความสามารถทางศิลปะของนักศึกษา",
        logo: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=150&h=150&fit=crop&crop=center",
        contact: {
            facebook: "ArtClubUni",
            instagram: "@artclub_uni",
            line: "@artclub"
        },
        image: "art",
        pastActivities: [
            "นิทรรศการศิลปกรรมประจำปี",
            "การประกวดวาดภาพสีน้ำมัน",
            "Workshop การทำงานประติมากรรม",
            "การแสดงศิลปะดิจิทัล",
            "งานจิตรกรรมฝาผนัง"
        ]
    },
    {
        id: 4,
        name: "ชมรมเทคโนโลยี",
        category: "tech",
        description: "ชมรมสำหรับผู้ที่สนใจเทคโนโลยี การเขียนโปรแกรม และนวัตกรรม",
        history: "ก่อตั้งในปี 2015 เพื่อตอบสนองความต้องการของยุคดิจิทัล",
        logo: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=150&h=150&fit=crop&crop=center",
        contact: {
            facebook: "TechClubUni",
            instagram: "@techclub_uni",
            line: "@techclub"
        },
        image: "tech",
        pastActivities: [
            "Hackathon ประจำปี 2023",
            "Workshop การเขียนโปรแกรม Python",
            "การแข่งขันพัฒนา Mobile App",
            "สัมมนาเทคโนโลยี AI",
            "โครงการพัฒนาเว็บไซต์มหาวิทยาลัย"
        ]
    },
    {
        id: 5,
        name: "ชมรมวิชาการ",
        category: "academic",
        description: "ชมรมที่มุ่งเน้นการพัฒนาทักษะทางวิชาการและการเรียนรู้",
        history: "ก่อตั้งในปี 2008 เพื่อส่งเสริมความเป็นเลิศทางวิชาการ",
        logo: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=150&h=150&fit=crop&crop=center",
        contact: {
            facebook: "AcademicClubUni",
            instagram: "@academic_uni",
            line: "@academicclub"
        },
        image: "academic",
        pastActivities: [
            "สัมมนาวิชาการประจำปี",
            "การประกวดตอบปัญหาวิชาการ",
            "โครงการติวเตอร์ฟรี",
            "การบรรยายพิเศษจากผู้เชี่ยวชาญ",
            "งานวิจัยนักศึกษา"
        ]
    },
    {
        id: 6,
        name: "ชมรมแบดมินตัน",
        category: "sports",
        description: "ชมรมกีฬาแบดมินตันสำหรับผู้ที่ต้องการพัฒนาทักษะและออกกำลังกาย",
        history: "ก่อตั้งในปี 2012 และได้รับรางวัลระดับมหาวิทยาลัยหลายครั้ง",
        logo: "https://images.unsplash.com/photo-1544717684-3923b1787c40?w=150&h=150&fit=crop&crop=center",
        contact: {
            facebook: "BadmintonClubUni",
            instagram: "@badminton_uni",
            line: "@badmintonclub"
        },
        image: "sports",
        pastActivities: [
            "การแข่งขันแบดมินตันภายในมหาวิทยาลัย",
            "ทัวร์นาเมนต์แบดมินตันเปิด",
            "ค่ายฝึกสอนแบดมินตันเบื้องต้น",
            "การแข่งขันระหว่างมหาวิทยาลัย",
            "การจัดแข่งขันสำหรับชุมชน"
        ]
    },
    {
        id: 7,
        name: "ชมรมอาสาสมัคร",
        category: "volunteer",
        description: "ชมรมที่มุ่งเน้นการทำงานอาสาและช่วยเหลือสังคม เพื่อสร้างประโยชน์ให้กับชุมชน",
        history: "ก่อตั้งในปี 2007 เพื่อปลูกฝังจิตสำนึกการให้และการช่วยเหลือผู้อื่น มีกิจกรรมอาสาสม่ำเสมอ",
        logo: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=150&h=150&fit=crop&crop=center",
        contact: {
            facebook: "VolunteerClubUni",
            instagram: "@volunteer_uni",
            line: "@volunteerclub"
        },
        image: "volunteer",
        pastActivities: [
            "โครงการช่วยเหลือผู้ประสบภัย",
            "กิจกรรมบริจาคโลหิต",
            "การทำความสะอาดชุมชน",
            "ค่ายอาสาพัฒนาโรงเรียน",
            "โครงการอาหารกลางวันเด็กยากจน"
        ]
    },
    {
        id: 8,
        name: "ชมรมอาสาพัฒนาชุมชน",
        category: "volunteer",
        description: "ชมรมที่ทำงานร่วมกับชุมชนท้องถิ่นเพื่อพัฒนาคุณภาพชีวิตและสิ่งแวดล้อม",
        history: "ก่อตั้งในปี 2013 โดยนักศึกษาที่ต้องการสร้างการเปลี่ยนแปลงเชิงบวกให้กับสังคม",
        logo: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=150&h=150&fit=crop&crop=center",
        contact: {
            facebook: "CommunityDevClub",
            instagram: "@communitydev_uni",
            line: "@communitydev"
        },
        image: "volunteer",
        pastActivities: [
            "โครงการพัฒนาชุมชนแออัด",
            "การปลูกป่าชุมชน",
            "โครงการธนาคารขยะ",
            "การสอนอาชีพให้ผู้สูงอายุ",
            "โครงการพลังงานทดแทนในชุมชน"
        ]
    }
];

// ข้อมูลกิจกรรม
const activitiesData = [
    {
        id: 1,
        name: "คอนเสิร์ตดนตรีประจำปี",
        club: "ชมรมดนตรีสากล",
        date: "2025-09-15",
        status: "open",
        description: "คอนเสิร์ตใหญ่ประจำปีของชมรมดนตรี เปิดให้สมัครเข้าร่วมแสดง",
        deadline: "2025-09-30"
    },
    {
        id: 2,
        name: "แข่งขันฟุตบอลระหว่างคณะ",
        club: "ชมรมฟุตบอล",
        date: "2025-09-20",
        status: "closing",
        description: "การแข่งขันฟุตบอลระหว่างคณะ เหลือเวลาสมัครอีกไม่กี่วัน",
        deadline: "2025-09-25"
    },
    {
        id: 3,
        name: "นิทรรศการศิลปกรรม",
        club: "ชมรมศิลปกรรม",
        date: "2025-09-15",
        status: "closed",
        description: "นิทรรศการแสดงผลงานศิลปกรรมของสมาชิก",
        deadline: "2025-10-10"
    },
    {
        id: 4,
        name: "Workshop การเขียนโปรแกรม",
        club: "ชมรมเทคโนโลยี",
        date: "2024-02-10",
        status: "open",
        description: "เวิร์คช็อปสอนการเขียนโปรแกรมสำหรับผู้เริ่มต้น",
        deadline: "2024-02-05"
    },
    {
        id: 5,
        name: "การแข่งขันแบดมินตัน",
        club: "ชมรมแบดมินตัน",
        date: "2024-01-28",
        status: "closing",
        description: "การแข่งขันแบดมินตันประจำปี เหลือเวลาสมัครอีก 3 วัน",
        deadline: "2024-01-26"
    },
    {
        id: 6,
        name: "สัมมนาวิชาการ",
        club: "ชมรมวิชาการ",
        date: "2024-01-20",
        status: "closed",
        description: "สัมมนาวิชาการประจำปี หัวข้อ 'อนาคตของการศึกษา'",
        deadline: "2024-01-15"
    }
];

// ข้อมูลเดือนภาษาไทย
const monthNames = [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
];

// ข้อมูลวันในสัปดาห์
const dayHeaders = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'];

// ข้อมูลสีและไอคอนสำหรับแต่ละหมวดหมู่

const categoryConfig = {
    music: {
        gradient: 'from-blue-400 to-purple-600',
        color: 'blue',
        name: 'ดนตรี'
    },
    sports: {
        gradient: 'from-green-400 to-blue-600',
        color: 'green',
        name: 'กีฬา'
    },
    art: {
        gradient: 'from-purple-400 to-pink-600',
        color: 'pink',
        name: 'ศิลปะ'
    },
    tech: {
        gradient: 'from-indigo-400 to-purple-600',
        color: 'indigo',
        name: 'เทคโนโลยี'
    },
    academic: {
        gradient: 'from-yellow-400 to-orange-600',
        color: 'yellow',
        name: 'วิชาการ'
    },
    volunteer: {
        gradient: 'from-red-400 to-pink-600',
        color: 'red',
        name: 'อาสาสมัคร'
    }
}; 

// ข้อมูลสถานะกิจกรรม
const activityStatus = {
    open: {
        text: 'เปิดรับสมัคร',
        color: 'green'
    },
    closing: {
        text: 'ใกล้ปิดรับ',
        color: 'orange'
    },
    closed: {
        text: 'ปิดรับแล้ว',
        color: 'gray'
    }
};