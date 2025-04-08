export interface Social {
    icon: string;
    text: string;
    link: string;
}

const socials = [
    { icon: 'fa-brands fa-instagram', text: 'Instagram', link: 'https://www.instagram.com/studprofkom.cv.ua/' },
    { icon: 'fa-brands fa-facebook', text: 'Facebook', link: 'https://www.facebook.com/studprofkom.cv.ua/' },
    { icon: 'fab fa-telegram', text: 'Telegram', link: 'https://t.me/studprofkom_cv_ua' },
    { icon: 'fab fa-youtube', text: 'YouTube', link: 'https://www.youtube.com/@line5581' },
    { icon: 'fab fa-tiktok', text: 'TikTok', link: 'https://www.tiktok.com/@fedkovych_students' },
];

export const getSocials = () => {
    return socials;
}