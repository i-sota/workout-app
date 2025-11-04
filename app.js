// デフォルトのトレーニングデータ
const defaultWorkoutData = {
    days: {
        1: {
            title: '胸・三頭筋デイ（ジム）',
            badge: 'ジム 60分',
            tip: '週の始まりは大きな筋肉から！胸をしっかり張って、肩甲骨を寄せる意識で。',
            exercises: [
                { name: 'ウォームアップ', details: 'トレッドミル軽めジョギングまたはバイク、肩回し', sets: '5-7分', link: null },
                { name: 'ベンチプレス', details: '胸のメイン種目。バーを胸につける意識で', sets: '4セット × 10-12回', link: null }
            ]
        },
        2: {
            title: '脚・臀部デイ（ジム）',
            badge: 'ジム 60分',
            tip: '脚トレは全身で一番エネルギーを使うので、しっかり栄養補給を！呼吸を止めずに。',
            exercises: [
                { name: 'ウォームアップ', details: 'バイク or トレッドミル、股関節・足首回し', sets: '5-7分', link: null },
                { name: 'スクワット', details: '下半身の王道。膝がつま先より前に出ないように', sets: '4セット × 10-12回', link: null }
            ]
        },
        3: {
            title: 'アクティブレスト（自宅）',
            badge: '自宅 30-60分',
            tip: '週半ばの回復日。激しい運動は避けて、体をリフレッシュさせましょう。',
            exercises: [
                { name: '軽いヨガ・ストレッチ', details: '全身をゆっくり伸ばす', sets: '30-40分', link: null }
            ]
        },
        4: {
            title: '背中・二頭筋デイ（ジム）',
            badge: 'ジム 60分',
            tip: '引く動作は肩甲骨から！背中を意識して、腕だけで引かないように注意。',
            exercises: [
                { name: 'ウォームアップ', details: 'ローイングマシン or バイク、肩甲骨回し', sets: '5-7分', link: null },
                { name: 'デッドリフト', details: '背中全体を鍛える最強種目。フォーム重視で', sets: '4セット × 8-10回', link: null }
            ]
        },
        5: {
            title: '肩・腕デイ（ジム）',
            badge: 'ジム 60分',
            tip: '肩は怪我しやすい部位なので、ウォームアップをしっかりと。重量よりフォーム重視！',
            exercises: [
                { name: 'ウォームアップ', details: '軽い有酸素、肩回し、腕回し', sets: '5-7分', link: null },
                { name: 'ショルダープレス', details: '肩のメイン種目', sets: '4セット × 10-12回', link: null }
            ]
        },
        6: {
            title: '全身 or 体幹強化',
            badge: '選択可 60分',
            tip: '週の疲労度に合わせて柔軟に選択！無理は禁物。',
            exercises: [
                { name: '軽い全身トレーニング', details: '各部位1-2種目ずつ', sets: '60分', link: null }
            ]
        }
    }
};

// グローバル変数
let workoutData = {};
let currentModalAction = null;
let deferredPrompt = null;
let editingDayNum = null;

// 初期化
document.addEventListener('DOMContentLoaded', function() {
    initWorkoutData();
    loadAllData();
    renderToday();
    renderWeek();
    renderEditView();
    updateStats();
    renderHistory();
    loadPhotos();
    loadSettings();
    checkNotificationPermission();
    
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
    });
});

// トレーニングデータの初期化
function initWorkoutData() {
    const savedData = localStorage.getItem('workoutData');
    if (savedData) {
        workoutData = JSON.parse(savedData);
    } else {
        workoutData = JSON.parse(JSON.stringify(defaultWorkoutData));
        saveWorkoutData();
    }
}

// トレーニングデータを保存
function saveWorkoutData() {
    localStorage.setItem('workoutData', JSON.stringify(workoutData));
}

// ビュー切り替え
function switchView(viewName) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    
    document.getElementById(viewName + 'View').classList.add('active');
    
    // 編集ビューの場合は設定タブをアクティブに
    if (viewName === 'edit') {
        document.querySelector('.nav-item:last-child').classList.add('active');
    } else {
        const activeNavIndex = ['today', 'week', 'progress', 'history', 'photos', 'settings'].indexOf(viewName);
        if (activeNavIndex >= 0) {
            document.querySelectorAll('.nav-item')[activeNavIndex].classList.add('active');
        }
    }
    
    if (viewName === 'progress') updateStats();
    if (viewName === 'history') renderHistory();
    if (viewName === 'edit') renderEditView();
}

// 今日のトレーニングを表示
function renderToday() {
    const today = new Date().getDay();
    const dayNum = today === 0 ? 7 : today;
    const content = document.getElementById('todayContent');
    
    if (dayNum === 7) {
        content.innerHTML = `
            <div class="day-header">
                <div class="day-title">今日は休養日</div>
                <div class="day-badge" style="background: #28a745;">休養</div>
            </div>
            <div class="tips">
                <div class="tips-title">💡 休養日のポイント</div>
                <div class="tips-content">
                    しっかり休んで、筋肉を回復させましょう。<br>
                    軽いストレッチや散歩はOKです。<br>
                    栄養と睡眠を十分に取ることが大切です！
                </div>
            </div>
        `;
        return;
    }
    
    const dayData = workoutData.days[dayNum];
    content.innerHTML = renderDayContent(dayNum, dayData, 'today');
}

// 週間ビューを表示
function renderWeek() {
    const content = document.getElementById('weekContent');
    let html = '';
    
    for (let i = 1; i <= 6; i++) {
        const dayData = workoutData.days[i];
        const dayName = ['月', '火', '水', '木', '金', '土'][i - 1];
        html += `
            <div style="margin-bottom: 30px;">
                <h3 style="color: #2563eb; margin-bottom: 15px;">${dayName}曜日</h3>
                ${renderDayContent(i, dayData, 'week')}
            </div>
        `;
    }
    
    content.innerHTML = html;
}

// 編集ビューを表示
function renderEditView() {
    const content = document.getElementById('editContent');
    let html = '';
    
    for (let i = 1; i <= 6; i++) {
        const dayData = workoutData.days[i];
        const dayName = ['月', '火', '水', '木', '金', '土'][i - 1];
        html += `
            <div class="day-edit-card">
                <div class="day-edit-header">
                    <div class="day-edit-title">${dayName}曜日: ${dayData.title}</div>
                    <button class="btn btn-primary btn-small" onclick="openEditDayModal(${i})">編集</button>
                </div>
                <div style="color: #999; font-size: 0.9em;">
                    ${dayData.exercises.length}個のエクササイズ
                </div>
            </div>
        `;
    }
    
    html += `
        <button class="btn btn-danger" onclick="confirmResetWorkout()">デフォルトに戻す</button>
    `;
    
    content.innerHTML = html;
}

// 日のコンテンツをレンダリング
function renderDayContent(dayNum, dayData, context) {
    const dateKey = getDateKey();
    const savedProgress = getSavedProgress(dateKey, dayNum);
    
    let html = `
        <div class="day-header">
            <div class="day-title">${dayData.title}</div>
            <div class="day-badge">${dayData.badge}</div>
        </div>
        <div class="exercise-list">
    `;
    
    dayData.exercises.forEach((exercise, index) => {
        const isCompleted = savedProgress.includes(index);
        const hasLink = exercise.link && exercise.link.trim() !== '';
        html += `
            <div class="exercise-card ${isCompleted ? 'completed' : ''}">
                <div class="exercise-header" onclick="toggleExercise(${dayNum}, ${index}, '${context}')">
                    <div class="exercise-name">
                        ${exercise.name}
                        ${hasLink ? `<span class="exercise-link-icon" onclick="event.stopPropagation(); openVideoModal('${escapeHtml(exercise.name)}', '${escapeHtml(exercise.link)}')">▶</span>` : ''}
                    </div>
                    <div class="check-btn ${isCompleted ? 'checked' : ''}"></div>
                </div>
                <div class="exercise-details">${exercise.details}</div>
                <div class="exercise-sets">${exercise.sets}</div>
            </div>
        `;
    });
    
    html += `
        </div>
        <div class="tips">
            <div class="tips-title">💡 今日のポイント</div>
            <div class="tips-content">${dayData.tip}</div>
        </div>
    `;
    
    return html;
}

// 日の編集モーダルを開く
function openEditDayModal(dayNum) {
    editingDayNum = dayNum;
    const dayData = workoutData.days[dayNum];
    
    document.getElementById('editDayTitle').value = dayData.title;
    document.getElementById('editDayBadge').value = dayData.badge;
    document.getElementById('editDayTip').value = dayData.tip;
    
    renderExercisesList(dayData.exercises);
    
    document.getElementById('editDayModal').classList.add('show');
}

// エクササイズリストを表示
function renderExercisesList(exercises) {
    const list = document.getElementById('editExercisesList');
    let html = '';
    
    exercises.forEach((exercise, index) => {
        html += `
            <div class="exercise-edit-item" id="exercise-${index}">
                <div class="exercise-edit-header">
                    <span class="exercise-edit-title">エクササイズ ${index + 1}</span>
                    <button class="btn btn-danger btn-small" onclick="removeExercise(${index})">削除</button>
                </div>
                <div class="form-group">
                    <label class="form-label">名前</label>
                    <input type="text" class="form-input exercise-name-input" value="${exercise.name}" placeholder="例: ベンチプレス">
                </div>
                <div class="form-group">
                    <label class="form-label">詳細</label>
                    <input type="text" class="form-input exercise-details-input" value="${exercise.details}" placeholder="例: 胸のメイン種目">
                </div>
                <div class="form-group">
                    <label class="form-label">セット数・回数</label>
                    <input type="text" class="form-input exercise-sets-input" value="${exercise.sets}" placeholder="例: 4セット × 10-12回">
                </div>
                <div class="form-group">
                    <label class="form-label">参考リンク（YouTube、Instagram等）</label>
                    <input type="url" class="form-input exercise-link-input" value="${exercise.link || ''}" placeholder="https://www.youtube.com/watch?v=...">
                    <small style="color: #999; font-size: 0.85em; margin-top: 5px; display: block;">YouTubeやInstagramの動画リンクを貼り付けると、トレーニング時に参照できます</small>
                </div>
            </div>
        `;
    });
    
    list.innerHTML = html;
}

// エクササイズを追加
function addExercise() {
    const list = document.getElementById('editExercisesList');
    const currentCount = list.children.length;
    
    const newExercise = document.createElement('div');
    newExercise.className = 'exercise-edit-item';
    newExercise.id = `exercise-${currentCount}`;
    newExercise.innerHTML = `
        <div class="exercise-edit-header">
            <span class="exercise-edit-title">エクササイズ ${currentCount + 1}</span>
            <button class="btn btn-danger btn-small" onclick="removeExercise(${currentCount})">削除</button>
        </div>
        <div class="form-group">
            <label class="form-label">名前</label>
            <input type="text" class="form-input exercise-name-input" placeholder="例: ベンチプレス">
        </div>
        <div class="form-group">
            <label class="form-label">詳細</label>
            <input type="text" class="form-input exercise-details-input" placeholder="例: 胸のメイン種目">
        </div>
        <div class="form-group">
            <label class="form-label">セット数・回数</label>
            <input type="text" class="form-input exercise-sets-input" placeholder="例: 4セット × 10-12回">
        </div>
        <div class="form-group">
            <label class="form-label">参考リンク（YouTube、Instagram等）</label>
            <input type="url" class="form-input exercise-link-input" placeholder="https://www.youtube.com/watch?v=...">
            <small style="color: #999; font-size: 0.85em; margin-top: 5px; display: block;">YouTubeやInstagramの動画リンクを貼り付けると、トレーニング時に参照できます</small>
        </div>
    `;
    
    list.appendChild(newExercise);
}

// エクササイズを削除
function removeExercise(index) {
    const element = document.getElementById(`exercise-${index}`);
    if (element) {
        element.remove();
    }
}

// 日の編集を保存
function saveDayEdit() {
    if (!editingDayNum) return;
    
    const title = document.getElementById('editDayTitle').value.trim();
    const badge = document.getElementById('editDayBadge').value.trim();
    const tip = document.getElementById('editDayTip').value.trim();
    
    if (!title) {
        alert('タイトルを入力してください');
        return;
    }
    
    // エクササイズを収集
    const exercises = [];
    const exerciseItems = document.getElementById('editExercisesList').children;
    
    for (let item of exerciseItems) {
        const name = item.querySelector('.exercise-name-input').value.trim();
        const details = item.querySelector('.exercise-details-input').value.trim();
        const sets = item.querySelector('.exercise-sets-input').value.trim();
        const link = item.querySelector('.exercise-link-input').value.trim();
        
        if (name) {
            exercises.push({ name, details, sets, link: link || null });
        }
    }
    
    if (exercises.length === 0) {
        alert('少なくとも1つのエクササイズを追加してください');
        return;
    }
    
    // データを更新
    workoutData.days[editingDayNum] = {
        title,
        badge: badge || 'トレーニング',
        tip: tip || 'がんばりましょう！',
        exercises
    };
    
    saveWorkoutData();
    closeEditDayModal();
    renderToday();
    renderWeek();
    renderEditView();
    showNotificationBanner('保存しました！');
}

// 編集モーダルを閉じる
function closeEditDayModal() {
    document.getElementById('editDayModal').classList.remove('show');
    editingDayNum = null;
}

// トレーニングデータをデフォルトに戻す
function confirmResetWorkout() {
    showModal(
        'デフォルトに戻す',
        'トレーニング内容をデフォルトに戻しますか？カスタマイズした内容は失われます。',
        resetWorkoutData
    );
}

function resetWorkoutData() {
    workoutData = JSON.parse(JSON.stringify(defaultWorkoutData));
    saveWorkoutData();
    renderToday();
    renderWeek();
    renderEditView();
    showNotificationBanner('デフォルトに戻しました');
}

// エクササイズの完了切り替え
function toggleExercise(dayNum, exerciseIndex, context) {
    const dateKey = getDateKey();
    let progress = JSON.parse(localStorage.getItem('workoutProgress') || '{}');
    
    if (!progress[dateKey]) progress[dateKey] = {};
    if (!progress[dateKey][dayNum]) progress[dateKey][dayNum] = [];
    
    const index = progress[dateKey][dayNum].indexOf(exerciseIndex);
    if (index > -1) {
        progress[dateKey][dayNum].splice(index, 1);
    } else {
        progress[dateKey][dayNum].push(exerciseIndex);
    }
    
    localStorage.setItem('workoutProgress', JSON.stringify(progress));
    
    if (context === 'today') {
        renderToday();
    } else {
        renderWeek();
    }
    
    updateStats();
}

// 統計を更新
function updateStats() {
    const dateKey = getDateKey();
    const progress = JSON.parse(localStorage.getItem('workoutProgress') || '{}');
    const weekData = progress[dateKey] || {};
    
    let totalExercises = 0;
    let completedDays = 0;
    
    for (let day = 1; day <= 6; day++) {
        const dayProgress = weekData[day] || [];
        if (dayProgress.length > 0) {
            completedDays++;
            totalExercises += dayProgress.length;
        }
    }
    
    let totalPossible = 0;
    for (let day = 1; day <= 6; day++) {
        totalPossible += workoutData.days[day].exercises.length;
    }
    
    const percentage = totalPossible > 0 ? Math.round((totalExercises / totalPossible) * 100) : 0;
    
    document.getElementById('weekProgressBar').style.width = percentage + '%';
    document.getElementById('weekProgressBar').textContent = percentage + '%';
    document.getElementById('completedDays').textContent = completedDays;
    document.getElementById('totalExercises').textContent = totalExercises;
    
    const streak = calculateStreak();
    document.getElementById('currentStreak').textContent = streak.current;
    document.getElementById('weekStreak').textContent = streak.weeks;
}

// 連続日数計算
function calculateStreak() {
    const history = JSON.parse(localStorage.getItem('workoutHistory') || '[]');
    let currentStreak = 0;
    let weekStreak = 0;
    
    const today = new Date();
    let checkDate = new Date(today);
    
    for (let i = 0; i < 30; i++) {
        const dateKey = formatDateKey(checkDate);
        const weekData = history.find(h => h.week === dateKey);
        
        if (weekData && weekData.completedDays > 0) {
            currentStreak++;
        } else if (i > 0) {
            break;
        }
        
        checkDate.setDate(checkDate.getDate() - 1);
    }
    
    checkDate = new Date(today);
    for (let i = 0; i < 52; i++) {
        const dateKey = formatDateKey(checkDate);
        const weekData = history.find(h => h.week === dateKey);
        
        if (weekData && weekData.completedDays >= 4) {
            weekStreak++;
        } else if (i > 0) {
            break;
        }
        
        checkDate.setDate(checkDate.getDate() - 7);
    }
    
    return { current: currentStreak, weeks: weekStreak };
}

// 履歴を表示
function renderHistory() {
    const history = JSON.parse(localStorage.getItem('workoutHistory') || '[]');
    const content = document.getElementById('historyList');
    
    if (history.length === 0) {
        content.innerHTML = '<p style="text-align: center; color: #999; padding: 20px;">まだ履歴がありません</p>';
        return;
    }
    
    let html = '';
    history.sort((a, b) => new Date(b.week) - new Date(a.week)).forEach(record => {
        const percentage = record.totalPossible > 0 ? Math.round((record.totalExercises / record.totalPossible) * 100) : 0;
        html += `
            <div class="history-item">
                <div class="history-week">${record.week}</div>
                <div class="history-stats">
                    <span>達成率: ${percentage}%</span>
                    <span>完了日: ${record.completedDays}日</span>
                    <span>総回数: ${record.totalExercises}</span>
                </div>
            </div>
        `;
    });
    
    content.innerHTML = html;
}

// 週が変わったら自動保存
function saveWeekHistory() {
    const dateKey = getDateKey();
    const progress = JSON.parse(localStorage.getItem('workoutProgress') || '{}');
    const history = JSON.parse(localStorage.getItem('workoutHistory') || '[]');
    
    if (history.find(h => h.week === dateKey)) return;
    
    const weekData = progress[dateKey] || {};
    let totalExercises = 0;
    let completedDays = 0;
    let totalPossible = 0;
    
    for (let day = 1; day <= 6; day++) {
        totalPossible += workoutData.days[day].exercises.length;
        const dayProgress = weekData[day] || [];
        if (dayProgress.length > 0) {
            completedDays++;
            totalExercises += dayProgress.length;
        }
    }
    
    if (totalExercises > 0) {
        history.push({
            week: dateKey,
            completedDays,
            totalExercises,
            totalPossible,
            savedAt: new Date().toISOString()
        });
        
        localStorage.setItem('workoutHistory', JSON.stringify(history));
    }
}

// 写真アップロード
function handlePhotoUpload(type, input) {
    const file = input.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const photos = JSON.parse(localStorage.getItem('workoutPhotos') || '{}');
        photos[type] = {
            data: e.target.result,
            date: new Date().toISOString()
        };
        localStorage.setItem('workoutPhotos', JSON.stringify(photos));
        loadPhotos();
    };
    reader.readAsDataURL(file);
}

// 写真を読み込み
function loadPhotos() {
    const photos = JSON.parse(localStorage.getItem('workoutPhotos') || '{}');
    
    ['before', 'after'].forEach(type => {
        const img = document.getElementById(type + 'PhotoImg');
        const preview = document.getElementById(type + 'PhotoPreview');
        const dateEl = document.getElementById(type + 'Date');
        
        if (photos[type]) {
            img.src = photos[type].data;
            img.style.display = 'block';
            preview.style.display = 'none';
            dateEl.textContent = new Date(photos[type].date).toLocaleDateString('ja-JP');
        } else {
            img.style.display = 'none';
            preview.style.display = 'block';
            dateEl.textContent = '未設定';
        }
    });
}

// データエクスポート
function exportData() {
    const data = {
        workoutData: workoutData,
        progress: JSON.parse(localStorage.getItem('workoutProgress') || '{}'),
        history: JSON.parse(localStorage.getItem('workoutHistory') || '[]'),
        photos: JSON.parse(localStorage.getItem('workoutPhotos') || '{}'),
        settings: {
            notificationsEnabled: localStorage.getItem('notificationsEnabled'),
            notificationTime: localStorage.getItem('notificationTime'),
            weekStart: localStorage.getItem('weekStart')
        }
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `workout-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    
    showNotificationBanner('データをエクスポートしました');
}

// データインポート
function importData(input) {
    const file = input.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            
            if (data.workoutData) {
                workoutData = data.workoutData;
                saveWorkoutData();
            }
            if (data.progress) {
                localStorage.setItem('workoutProgress', JSON.stringify(data.progress));
            }
            if (data.history) {
                localStorage.setItem('workoutHistory', JSON.stringify(data.history));
            }
            if (data.photos) {
                localStorage.setItem('workoutPhotos', JSON.stringify(data.photos));
            }
            if (data.settings) {
                if (data.settings.notificationsEnabled) {
                    localStorage.setItem('notificationsEnabled', data.settings.notificationsEnabled);
                }
                if (data.settings.notificationTime) {
                    localStorage.setItem('notificationTime', data.settings.notificationTime);
                }
                if (data.settings.weekStart) {
                    localStorage.setItem('weekStart', data.settings.weekStart);
                }
            }
            
            renderToday();
            renderWeek();
            renderEditView();
            updateStats();
            renderHistory();
            loadPhotos();
            loadSettings();
            
            showNotificationBanner('データをインポートしました');
        } catch (error) {
            alert('無効なファイル形式です');
        }
    };
    reader.readAsText(file);
    input.value = '';
}

// 通知設定
function toggleNotifications() {
    const toggle = document.getElementById('notificationToggle');
    const timeSection = document.getElementById('timePickerSection');
    
    if (toggle.checked) {
        requestNotificationPermission();
        timeSection.style.display = 'flex';
        localStorage.setItem('notificationsEnabled', 'true');
    } else {
        timeSection.style.display = 'none';
        localStorage.setItem('notificationsEnabled', 'false');
        cancelNotifications();
    }
}

function requestNotificationPermission() {
    if ('Notification' in window) {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                showNotificationBanner('通知が有効になりました！');
                scheduleNotifications();
            } else {
                document.getElementById('notificationToggle').checked = false;
                alert('通知が許可されませんでした。ブラウザの設定から許可してください。');
            }
        });
    }
}

function scheduleNotifications() {
    const time = document.getElementById('notificationTime').value;
    localStorage.setItem('notificationTime', time);
    
    if ('serviceWorker' in navigator && 'PushManager' in window) {
        console.log('通知スケジュール設定: ' + time);
    }
}

function cancelNotifications() {
    console.log('通知をキャンセルしました');
}

function showNotificationBanner(message) {
    const banner = document.getElementById('notificationBanner');
    banner.textContent = message;
    banner.classList.add('show');
    setTimeout(() => {
        banner.classList.remove('show');
    }, 3000);
}

function updateNotificationTime() {
    if (document.getElementById('notificationToggle').checked) {
        scheduleNotifications();
    }
}

function updateWeekStart() {
    const value = document.getElementById('weekStart').value;
    localStorage.setItem('weekStart', value);
    renderToday();
    renderWeek();
}

function loadSettings() {
    const notificationsEnabled = localStorage.getItem('notificationsEnabled') === 'true';
    const notificationTime = localStorage.getItem('notificationTime') || '18:00';
    const weekStart = localStorage.getItem('weekStart') || '1';
    
    document.getElementById('notificationToggle').checked = notificationsEnabled;
    document.getElementById('notificationTime').value = notificationTime;
    document.getElementById('weekStart').value = weekStart;
    document.getElementById('timePickerSection').style.display = notificationsEnabled ? 'flex' : 'none';
}

function checkNotificationPermission() {
    if ('Notification' in window && Notification.permission === 'granted') {
        const notificationsEnabled = localStorage.getItem('notificationsEnabled') === 'true';
        if (notificationsEnabled) {
            scheduleNotifications();
        }
    }
}

function installApp() {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                showNotificationBanner('アプリをホーム画面に追加しました！');
            }
            deferredPrompt = null;
        });
    } else {
        alert('ブラウザのメニューから「ホーム画面に追加」を選択してください。');
    }
}

// モーダル関連
function confirmReset() {
    showModal(
        '進捗リセット確認',
        '今週の進捗をリセットしますか？この操作は取り消せません。',
        resetWeekProgress
    );
}

function confirmClearHistory() {
    showModal(
        '履歴削除確認',
        'すべての履歴を削除しますか？この操作は取り消せません。',
        clearHistory
    );
}

function confirmClearPhotos() {
    showModal(
        '写真削除確認',
        'すべての写真を削除しますか？この操作は取り消せません。',
        clearPhotos
    );
}

function showModal(title, body, action) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalBody').textContent = body;
    currentModalAction = action;
    document.getElementById('confirmModal').classList.add('show');
}

function closeModal() {
    document.getElementById('confirmModal').classList.remove('show');
    currentModalAction = null;
}

function executeModalAction() {
    if (currentModalAction) {
        currentModalAction();
    }
    closeModal();
}

function resetWeekProgress() {
    const dateKey = getDateKey();
    const progress = JSON.parse(localStorage.getItem('workoutProgress') || '{}');
    delete progress[dateKey];
    localStorage.setItem('workoutProgress', JSON.stringify(progress));
    renderToday();
    renderWeek();
    updateStats();
    showNotificationBanner('今週の進捗をリセットしました');
}

function clearHistory() {
    localStorage.removeItem('workoutHistory');
    renderHistory();
    showNotificationBanner('履歴を削除しました');
}

function clearPhotos() {
    localStorage.removeItem('workoutPhotos');
    loadPhotos();
    showNotificationBanner('写真を削除しました');
}

// ユーティリティ関数
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// 動画モーダル
function openVideoModal(exerciseName, link) {
    const modal = document.getElementById('videoModal');
    const title = document.getElementById('videoModalTitle');
    const content = document.getElementById('videoModalContent');
    
    title.textContent = exerciseName;
    
    let embedHtml = '';
    
    // YouTube
    if (link.includes('youtube.com') || link.includes('youtu.be')) {
        const videoId = extractYouTubeId(link);
        if (videoId) {
            embedHtml = `
                <div class="video-container">
                    <iframe src="https://www.youtube.com/embed/${videoId}" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen>
                    </iframe>
                </div>
            `;
        }
    }
    // Instagram
    else if (link.includes('instagram.com')) {
        embedHtml = `
            <div style="background: rgba(26, 26, 46, 0.5); padding: 20px; border-radius: 12px; text-align: center;">
                <p style="color: #999; margin-bottom: 15px;">Instagramの投稿を見る:</p>
                <a href="${link}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="display: inline-block; width: auto;">
                    Instagramで開く
                </a>
            </div>
        `;
    }
    // その他のリンク
    else {
        embedHtml = `
            <div style="background: rgba(26, 26, 46, 0.5); padding: 20px; border-radius: 12px; text-align: center;">
                <p style="color: #999; margin-bottom: 15px;">参考リンク:</p>
                <a href="${link}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="display: inline-block; width: auto;">
                    リンクを開く
                </a>
            </div>
        `;
    }
    
    content.innerHTML = embedHtml;
    modal.classList.add('show');
}

function extractYouTubeId(url) {
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
        /youtube\.com\/embed\/([^&\n?#]+)/,
        /youtube\.com\/v\/([^&\n?#]+)/
    ];
    
    for (let pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
            return match[1];
        }
    }
    return null;
}

function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    modal.classList.remove('show');
    // 動画を停止するためにコンテンツをクリア
    setTimeout(() => {
        document.getElementById('videoModalContent').innerHTML = '';
    }, 300);
}

function getDateKey() {
    const now = new Date();
    const day = now.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    const monday = new Date(now);
    monday.setDate(now.getDate() + diff);
    return formatDateKey(monday);
}

function formatDateKey(date) {
    return date.toISOString().split('T')[0];
}

function getSavedProgress(dateKey, dayNum) {
    const progress = JSON.parse(localStorage.getItem('workoutProgress') || '{}');
    return progress[dateKey]?.[dayNum] || [];
}

function loadAllData() {
    const lastSaveDate = localStorage.getItem('lastHistorySave');
    const currentWeek = getDateKey();
    
    if (lastSaveDate && lastSaveDate !== currentWeek) {
        saveWeekHistory();
    }
    
    localStorage.setItem('lastHistorySave', currentWeek);
}

// モーダルの外側クリックで閉じる
document.getElementById('confirmModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

document.getElementById('editDayModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeEditDayModal();
    }
});

document.getElementById('videoModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeVideoModal();
    }
});
