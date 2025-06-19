document.addEventListener('DOMContentLoaded', function() {
    // Анимация для карточек наград на главной
    const rewardItems = document.querySelectorAll('.reward-item');
    if (rewardItems.length > 0) {
        let delay = 0;
        rewardItems.forEach(item => {
            item.style.animationDelay = `${delay}s`;
            delay += 0.2;
        });
    }
    
    // Параллакс эффект для героя/
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        window.addEventListener('mousemove', function(e) {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            heroImage.style.transform = `translate(-${x * 20}px, -${y * 20}px)`;
        });
    }
    
    // Анимация появления элементов при скролле
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.info-card, .reward-item, .calendar-day');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Инициализация
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
    
    // Добавляем классы для анимации
    const infoCards = document.querySelectorAll('.info-card');
    infoCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = `all 0.5s ease ${index * 0.1}s`;
    });
    
    const calendarDays = document.querySelectorAll('.calendar-day');
    calendarDays.forEach((day, index) => {
        day.style.opacity = '0';
        day.style.transform = 'scale(0.8)';
        day.style.transition = `all 0.3s ease ${index * 0.05}s`;
    });
});