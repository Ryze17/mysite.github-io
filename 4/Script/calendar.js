document.addEventListener('DOMContentLoaded', function() {
    // Проверка аутентификации
    const loggedIn = sessionStorage.getItem('loggedIn');
    if (loggedIn !== 'true') {
        window.location.href = 'login.html';
        return;
    }

    // Данные пользователя
    let userData = {
        level: 1,
        xp: 0,
        completedDays: [],
        completedDailyTasks: [],
        completedWeeklyTasks: []
    };

    // Загружаем сохранённые данные
    const savedData = localStorage.getItem('fc25EventData');
    if (savedData) {
        userData = JSON.parse(savedData);
    }

    // Обновляем UI
    updateUserInfo();
    generateCalendar();
    generateTasks();

    // Функция обновления информации пользователя
    function updateUserInfo() {
        document.getElementById('usernameDisplay').textContent = 
            sessionStorage.getItem('username') || 'Игрок';
        
        const nextLevelXP = userData.level * 100;
        const xpPercentage = (userData.xp / nextLevelXP) * 100;
        
        document.getElementById('currentLevel').textContent = userData.level;
        document.getElementById('currentXP').textContent = userData.xp;
        document.getElementById('nextLevelXP').textContent = nextLevelXP;
        document.getElementById('levelProgress').style.width = `${xpPercentage}%`;
    }

    // Функция генерации календаря
    function generateCalendar() {
        const calendarGrid = document.getElementById('calendarGrid');
        calendarGrid.innerHTML = '';
        
        const currentDate = new Date();
        const currentDay = currentDate.getDate();
        
        // Пример заданий для каждого дня
        const dailyTasks = [
            "Сыграть 3 матча в RUSH",
            "Забить 5 голов со штрафного удара",
            "Сделать 50 передач в штрафной соперника",
            "Выиграть 4 матча подряд в Rivals",
            "Оформить хет-трик игроком полузащиты",
            "Сыграть 10 матчей в Ultimate Team",
            "Сыграть в Ultimate Draft",
            "Повысить рейтинг состава минимум на 1 пункт",
            "Сделать 30 обводок за матч",
            "Сыграть с другом 3 товарищеских матча",
            "Использовать 35 финтов за матч",
            "Сыграть 15 матчей в Weekend League",
            "Купить 10 игроков на трансферном рынке",
            "Продать 5 игроков на трансферном рынке",
            "Выполнить 10 заданий SBC",
            "Cыграть 5 матчей в специальной летней форме",
            "Выиграть 3 матча используя минимум 3-ех игроков SUMMER FEST",
            "Не пропустить не одного гола в 5 матчах",
            "Сделать 10 ударов по воротам",
            "Выполнить 20 отборов за матч",
            "Выйти на улицу подышать воздухом хотя-бы 10 минут",
            "В одном матче сохранять владение не менее 65%",
            "Забить 10 голов через себя",
            "Сделать 300 передач",
            "Выиграть 5 матчей подряд",
            "Оформить покер за игрока запаса",
            "Использовать на игрока развитие",
            "Открыть 10 паков",
            "Забить 5 пенальти",
            "Забить гол вратарём"
        ];
        
        // Пример наград для каждого дня
        const dailyRewards = [
            "5,000 монет",
            "Набор с гарантом игрока SUMMER FEST",
            "Набор редких игроков",
            "Форма SUMMER FEST",
            "10,000 монет",
            "Мяч SUMMER FEST",
            "Набор золотых игроков",
            "Выбор 3-ех игроков 86+",
            "15,000 монет",
            "Кумир SUMMER FEST в аренду на 7 дней",
            "Набор с гарантом игрока SUMMER FEST",
            "20,000 монет",
            "Редкий мега-набор",
            "Выбор игрока SUMMER FEST 93+ 1 из 3-ех",
            "25,000 монет",
            "Золотой мега-набор",
            "Набор 3 Кумира 93+",
            "30,000 монет",
            "5 жетонов на бесплатное участие Ultimate Draft",
            "35,000 монет",
            "Набор 50 золотых редких игроков",
            "40,000 монет",
            "Набор 5 игроков SUMMER FEST 93+",
            "45,000 монет",
            "Выбор игрока 97+ в аренду на 30 дней",
            "50,000 монет",
            "Эксклюзивный игрок SUMMER FEST RAFAEL LEAO",
            "Эксклюзиный кумир SUMMER FEST DAVID BACKHAM",
            "75,000 монет",
            "Игрок SUMMER FEST LAMINE YAMAL"
        ];
        
        for (let day = 1; day <= 30; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.innerHTML = `
                <div class="day-number">${day}</div>
                <div class="day-task">${dailyTasks[day-1]}</div>
                <div class="day-reward">${dailyRewards[day-1]}</div>
                <div class="day-xp">+${day*5}</div>
            `;
            
            // Отмечаем пройденные дни
            if (userData.completedDays.includes(day)) {
                dayElement.classList.add('completed');
            }
            
            // Отмечаем текущий день
            if (day === currentDay) {
                dayElement.classList.add('current');
            }
            
            // Добавляем обработчик клика
            dayElement.addEventListener('click', function() {
                if (day <= currentDay && !userData.completedDays.includes(day)) {
                    completeDay(day, day*5);
                    dayElement.classList.add('completed');
                } else if (day > currentDay) {
                    alert(`День ${day} будет доступен позже!`);
                } else {
                    alert(`День ${day} уже завершён!`);
                }
            });
            
            calendarGrid.appendChild(dayElement);
        }
    }
    
    // Функция генерации заданий
    function generateTasks() {
        const dailyTasksList = document.getElementById('dailyTasks');
        const weeklyTasksList = document.getElementById('weeklyTasks');
        
        dailyTasksList.innerHTML = '';
        weeklyTasksList.innerHTML = '';
        
        // Ежедневные задания
        const dailyTasks = [
            { task: "Сыграть 3 матча", xp: 15 },
            { task: "Забить 5 голов", xp: 10 },
            { task: "Сделать 50 точных передач", xp: 10 },
            { task: "Выиграть 2 матча", xp: 20 },
            { task: "Оформить дубль", xp: 15 }
        ];
        
        // Еженедельные задания
        const weeklyTasks = [
            { task: "Выиграть 10 матчей", xp: 50 },
            { task: "Заработать 50,000 монет", xp: 40 },
            { task: "Создать клуб", xp: 30 },
            { task: "Пройти 5 SBC", xp: 60 },
            { task: "Занять место в Weekend League", xp: 70 }
        ];
        
        // Генерация ежедневных заданий
        dailyTasks.forEach((task, index) => {
            const taskElement = createTaskElement(task.task, task.xp, 'daily', index);
            dailyTasksList.appendChild(taskElement);
        });
        
        // Генерация еженедельных заданий
        weeklyTasks.forEach((task, index) => {
            const taskElement = createTaskElement(task.task, task.xp, 'weekly', index);
            weeklyTasksList.appendChild(taskElement);
        });
    }
    
    // Функция создания элемента задания
    function createTaskElement(taskText, xp, type, index) {
        const li = document.createElement('li');
        li.className = 'task-item';
        
        if ((type === 'daily' && userData.completedDailyTasks.includes(index)) || 
            (type === 'weekly' && userData.completedWeeklyTasks.includes(index))) {
            li.classList.add('completed');
        }
        
        li.innerHTML = `
            <div class="task-checkbox"></div>
            <div class="task-content">${taskText}</div>
            <div class="task-xp">+${xp} XP</div>
        `;
        
        li.addEventListener('click', function() {
            const isCompleted = li.classList.contains('completed');
            
            if (!isCompleted) {
                li.classList.add('completed');
                addXP(xp);
                
                if (type === 'daily') {
                    userData.completedDailyTasks.push(index);
                } else {
                    userData.completedWeeklyTasks.push(index);
                }
                
                saveData();
            }
        });
        
        return li;
    }
    
    // Функция завершения дня
    function completeDay(day, xp) {
        if (!userData.completedDays.includes(day)) {
            userData.completedDays.push(day);
            addXP(xp);
            saveData();
            alert(`День ${day} завершён! Получено ${xp} XP.`);
        }
    }
    
    // Функция добавления XP
    function addXP(amount) {
        userData.xp += amount;
        const nextLevelXP = userData.level * 100;
        
        if (userData.xp >= nextLevelXP) {
            userData.xp -= nextLevelXP;
            userData.level++;
            showLevelUpMessage();
        }
        
        updateUserInfo();
        saveData();
    }
    
    // Функция показа сообщения о повышении уровня
    function showLevelUpMessage() {
        const message = document.createElement('div');
        message.className = 'level-up-message';
        message.textContent = `Поздравляем! Вы достигли уровня ${userData.level}!`;
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            message.classList.remove('show');
            setTimeout(() => {
                message.remove();
            }, 500);
        }, 3000);
    }
    
    // Функция сохранения данных
    function saveData() {
        localStorage.setItem('fc25EventData', JSON.stringify(userData));
    }
});