// データ構造
        const workoutData = {
            days: {
                1: {
                    title: '胸・三頭筋デイ（ジム）',
                    badge: 'ジム 60分',
                    tip: '週の始まりは大きな筋肉から！胸をしっかり張って、肩甲骨を寄せる意識で。',
                    exercises: [
                        { name: 'ウォームアップ', details: 'トレッドミル軽めジョギングまたはバイク、肩回し', sets: '5-7分' },
                        { name: 'ベンチプレス', details: '胸のメイン種目。バーを胸につける意識で', sets: '4セット × 10-12回' },
                        { name: 'インクラインダンベルプレス', details: '胸上部を鍛える。ベンチを30-45度に', sets: '3セット × 10-12回' },
                        { name: 'ケーブルフライ or ペックフライ', details: '胸の形を整える。ストレッチを意識', sets: '3セット × 12-15回' },
                        { name: 'トライセプスプッシュダウン', details: 'ケーブルで三頭筋を集中的に。肘を固定', sets: '3セット × 12-15回' },
                        { name: 'ディップス（マシン or 自重）', details: '胸下部と三頭筋の仕上げ', sets: '3セット × 10-12回' },
                        { name: 'クールダウン・ストレッチ', details: '胸・肩・腕をしっかり伸ばす', sets: '5-10分' }
                    ]
                },
                2: {
                    title: '脚・臀部デイ（ジム）',
                    badge: 'ジム 60分',
                    tip: '脚トレは全身で一番エネルギーを使うので、しっかり栄養補給を！呼吸を止めずに。',
                    exercises: [
                        { name: 'ウォームアップ', details: 'バイク or トレッドミル、股関節・足首回し', sets: '5-7分' },
                        { name: 'スクワット（バーベル or スミスマシン）', details: '下半身の王道。膝がつま先より前に出ないように', sets: '4セット × 10-12回' },
                        { name: 'レッグプレス', details: '太もも全体を高重量で刺激', sets: '3セット × 12-15回' },
                        { name: 'レッグエクステンション', details: '太もも前部を集中的に', sets: '3セット × 12-15回' },
                        { name: 'レッグカール', details: '太もも裏（ハムストリング）を鍛える', sets: '3セット × 12-15回' },
                        { name: 'ヒップスラスト or グルートマシン', details: 'お尻を重点的に鍛える', sets: '3セット × 12-15回' },
                        { name: 'カーフレイズ（マシン）', details: 'ふくらはぎの仕上げ', sets: '3セット × 15-20回' },
                        { name: 'クールダウン・ストレッチ', details: '下半身全体をしっかり伸ばす', sets: '5-10分' }
                    ]
                },
                3: {
                    title: 'アクティブレスト or 軽い有酸素（自宅）',
                    badge: '自宅 60分',
                    tip: '週半ばの回復日。激しい運動は避けて、体をリフレッシュさせましょう。睡眠と栄養も大切に！',
                    exercises: [
                        { name: 'オプションA：軽いヨガ・ストレッチ', details: '全身をゆっくり伸ばし、柔軟性向上と回復を促進。YouTube等のヨガ動画を参考に', sets: '30-40分' },
                        { name: 'オプションB：軽い有酸素運動', details: 'ウォーキング、軽いジョギング、縄跳び、踏み台昇降など。心拍数を上げすぎず、会話できるペースで', sets: '30-40分' },
                        { name: '軽い体幹トレーニング', details: 'プランク、サイドプランク、バードドッグなど軽めに', sets: '各2セット × 30-45秒' },
                        { name: 'フォームローラー or マッサージ', details: '筋膜リリースで疲労回復を促進', sets: '10-15分' }
                    ]
                },
                4: {
                    title: '背中・二頭筋デイ（ジム）',
                    badge: 'ジム 60分',
                    tip: '引く動作は肩甲骨から！背中を意識して、腕だけで引かないように注意。',
                    exercises: [
                        { name: 'ウォームアップ', details: 'ローイングマシン or バイク、肩甲骨回し', sets: '5-7分' },
                        { name: 'デッドリフト or ラックプル', details: '背中全体を鍛える最強種目。フォーム重視で', sets: '4セット × 8-10回' },
                        { name: 'ラットプルダウン', details: '広背筋を広げる。肩甲骨を寄せながら引く', sets: '3セット × 10-12回' },
                        { name: 'シーテッドロウ or ケーブルロウ', details: '背中の厚みを作る。肘を引く意識で', sets: '3セット × 10-12回' },
                        { name: 'ダンベルロウ（片手ずつ）', details: '背中の細部を刺激。可動域を広く', sets: '3セット × 10-12回（片側ずつ）' },
                        { name: 'バーベルカール or EZバーカール', details: '二頭筋のメイン種目。反動を使わずに', sets: '3セット × 10-12回' },
                        { name: 'ハンマーカール', details: '二頭筋と前腕を同時に鍛える', sets: '3セット × 12回' },
                        { name: 'クールダウン・ストレッチ', details: '背中・腕をしっかり伸ばす', sets: '5-10分' }
                    ]
                },
                5: {
                    title: '肩・腕デイ（ジム）',
                    badge: 'ジム 60分',
                    tip: '肩は怪我しやすい部位なので、ウォームアップをしっかりと。重量よりフォーム重視！',
                    exercises: [
                        { name: 'ウォームアップ', details: '軽い有酸素、肩回し、腕回し', sets: '5-7分' },
                        { name: 'ショルダープレス（ダンベル or バーベル）', details: '肩のメイン種目。肩全体を鍛える', sets: '4セット × 10-12回' },
                        { name: 'サイドレイズ', details: '肩の横（三角筋中部）を鍛える。肩幅を広く見せる', sets: '3セット × 12-15回' },
                        { name: 'リアデルトフライ or フェイスプル', details: '肩の後ろ（三角筋後部）を鍛える。姿勢改善にも', sets: '3セット × 12-15回' },
                        { name: 'バーベルカール', details: '二頭筋のボリュームアップ', sets: '3セット × 10-12回' },
                        { name: 'トライセプスエクステンション', details: '三頭筋を集中的に。ダンベル or ケーブルで', sets: '3セット × 12-15回' },
                        { name: 'ケーブルカール＆プッシュダウン（スーパーセット）', details: '二頭筋と三頭筋を交互に。腕のパンプアップ', sets: '3セット × 12-15回ずつ' },
                        { name: 'クールダウン・ストレッチ', details: '肩・腕をゆっくり伸ばす', sets: '5-10分' }
                    ]
                },
                6: {
                    title: '全身 or 体幹強化（自宅 or ジム）',
                    badge: '選択可 60分',
                    tip: '週の疲労度に合わせて柔軟に選択！無理は禁物、来週も継続できることを優先しましょう。',
                    exercises: [
                        { name: 'オプションA：ジムで軽い全身トレーニング', details: '週の仕上げ。普段より軽めの重量で全身バランスよく。各部位1-2種目ずつ、3セット程度', sets: '60分' },
                        { name: 'オプションB：自宅で体幹＋柔軟性トレーニング', details: 'プランク各種、バードドッグ、デッドバグ等の体幹。ヨガやストレッチで柔軟性向上', sets: '30分体幹 + 30分柔軟' },
                        { name: 'オプションC：完全休養', details: '疲れが溜まっていれば、しっかり休むのも大切。軽い散歩やストレッチ程度に', sets: '柔軟に選択' }
                    ]
                }
            }
        };
        
        // 初期化
        let currentModalAction = null;
        let deferredPrompt = null;
        
        // ページ読み込み時の初期化
        document.addEventListener('DOMContentLoaded', function() {
            loadAllData();
            renderToday();
            renderWeek();
            updateStats();
            renderHistory();
            loadPhotos();
            loadSettings();
            checkNotificationPermission();
            
            // PWAインストールプロンプトを捕捉
            window.addEventListener('beforeinstallprompt', (e) => {
                e.preventDefault();
                deferredPrompt = e;
            });
        });
        
        // ビュー切り替え
        function switchView(viewName) {
            document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
            document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
            
            document.getElementById(viewName + 'View').classList.add('active');
            event.target.classList.add('active');
            
            if (viewName === 'progress') updateStats();
            if (viewName === 'history') renderHistory();
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
                        <h3 style="color: #667eea; margin-bottom: 15px;">${dayName}曜日</h3>
                        ${renderDayContent(i, dayData, 'week')}
                    </div>
                `;
            }
            
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
                html += `
                    <div class="exercise-card ${isCompleted ? 'completed' : ''}" onclick="toggleExercise(${dayNum}, ${index}, '${context}')">
                        <div class="exercise-header">
                            <div class="exercise-name">${exercise.name}</div>
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
            
            // 全エクササイズ数
            let totalPossible = 0;
            for (let day = 1; day <= 6; day++) {
                totalPossible += workoutData.days[day].exercises.length;
            }
            
            const percentage = totalPossible > 0 ? Math.round((totalExercises / totalPossible) * 100) : 0;
            
            document.getElementById('weekProgressBar').style.width = percentage + '%';
            document.getElementById('weekProgressBar').textContent = percentage + '%';
            document.getElementById('completedDays').textContent = completedDays;
            document.getElementById('totalExercises').textContent = totalExercises;
            
            // 連続日数計算
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
            
            // 現在の連続日数
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
            
            // 週間連続
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
                content.innerHTML = '<p style="text-align: center; color: #6c757d; padding: 20px;">まだ履歴がありません</p>';
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
            
            // 既に保存済みかチェック
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
        
        // 通知権限をリクエスト
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
        
        // 通知をスケジュール
        function scheduleNotifications() {
            const time = document.getElementById('notificationTime').value;
            localStorage.setItem('notificationTime', time);
            
            // 実際の通知スケジューリングはService Workerで行う
            if ('serviceWorker' in navigator && 'PushManager' in window) {
                // PWA通知の実装
                console.log('通知スケジュール設定: ' + time);
            }
        }
        
        // 通知をキャンセル
        function cancelNotifications() {
            // 通知をキャンセル
            console.log('通知をキャンセルしました');
        }
        
        // 通知バナー表示
        function showNotificationBanner(message) {
            const banner = document.getElementById('notificationBanner');
            banner.textContent = message;
            banner.classList.add('show');
            setTimeout(() => {
                banner.classList.remove('show');
            }, 3000);
        }
        
        // 通知時刻更新
        function updateNotificationTime() {
            if (document.getElementById('notificationToggle').checked) {
                scheduleNotifications();
            }
        }
        
        // 週の開始日更新
        function updateWeekStart() {
            const value = document.getElementById('weekStart').value;
            localStorage.setItem('weekStart', value);
            renderToday();
            renderWeek();
        }
        
        // 設定を読み込み
        function loadSettings() {
            const notificationsEnabled = localStorage.getItem('notificationsEnabled') === 'true';
            const notificationTime = localStorage.getItem('notificationTime') || '18:00';
            const weekStart = localStorage.getItem('weekStart') || '1';
            
            document.getElementById('notificationToggle').checked = notificationsEnabled;
            document.getElementById('notificationTime').value = notificationTime;
            document.getElementById('weekStart').value = weekStart;
            document.getElementById('timePickerSection').style.display = notificationsEnabled ? 'flex' : 'none';
        }
        
        // 通知権限チェック
        function checkNotificationPermission() {
            if ('Notification' in window && Notification.permission === 'granted') {
                const notificationsEnabled = localStorage.getItem('notificationsEnabled') === 'true';
                if (notificationsEnabled) {
                    scheduleNotifications();
                }
            }
        }
        
        // PWAインストール
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
        
        // リセット・削除機能
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
        function getDateKey() {
            const now = new Date();
            const day = now.getDay();
            const diff = day === 0 ? -6 : 1 - day; // 月曜日を週の始まりとする
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
            // 週が変わったら前週のデータを履歴に保存
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
