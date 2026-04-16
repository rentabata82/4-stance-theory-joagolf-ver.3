const questions = [
    { text: "Q1 アドレスはどちらが楽？", a: "膝をやや伸ばす", b: "膝をやや曲げる", type: "AB" },
    { text: "Q2 インパクトのイメージはどちらが自然？", a: "前足で踏ん張る", b: "後ろ足で踏ん張る", type: "AB" },
    { text: "Q3 クラブの握り方はどちらが自然？", a: "指で握る", b: "手のひらで握る", type: "AB" },
    { text: "Q4 「お先」のパターはどちらが安定する？", a: "左足軸", b: "右足軸", type: "AB" },
    { text: "Q5 スイング中(特にテークバック)どちらが自然？", a: "脇を締める", b: "脇を開ける", type: "AB" },
    { text: "Q6 スタンスはどちらが振りやすい？", a: "広め", b: "狭め", type: "CP" },
    { text: "Q7 グリップはどちらが振りやすい？", a: "斜めに握る", b: "横から真っ直ぐ握る", type: "CP" },
    { text: "Q8 走る時の腕の振り方はどちらが自然？", a: "前でやや交差", b: "体の横でまっすぐ", type: "CP" },
    { text: "Q9 背もたれにもたれる時どこが支点？", a: "みぞおちの裏", b: "首の付け根", type: "AB" },
    { text: "Q10 ビンの蓋を開ける時どちらが使いやすい？", a: "親・人差・中指", b: "親・中・薬指", type: "12" },
    { text: "Q11 うちわで仰ぐ時どちらが自然？", a: "手首中心", b: "肘から動かす", type: "AB" },
    { text: "Q12 紙を斜めにする方が文字が書きやすい？", a: "はい", b: "いいえ", type: "CP" },
    { text: "Q13 直立した時の手の甲の向きは？", a: "正面寄り", b: "横向き寄り", type: "CP" }
];

const results = {
    A1: { 
        id: "rabbit", 
        name: "🐰 ふわ飛びうさぎタイプ（A1）", 
        features: ["前重心でつま先内側に乗りやすい", "上半身主導で体を上に使う", "2軸で斜めに、幅広く動くのが自然", "ゆったりしたリズムで大きく動くのが得意"], 
        swing: ["テークバックは上に引き上げるような動き", "切り返しは“ためすぎず”自然に流れる", "ダウンスイングは空間を使って振るタイプ", "コンパクトにまとめるよりも“広く使う”方が安定"], 
        notes: ["コンパクトにまとめすぎると動きが詰まりやすい", "下半身主導を意識しすぎると違和感が出る", "タメを作ろうとしすぎると本来のリズムが崩れる"], 
        advice: ["「上に伸びるイメージ」で振るのが◎", "スイングは“横”より“斜め上”の意識", "リズム重視でゆったり振ると本来の力が出る"] 
    },
    A2: { 
        id: "flamingo", 
        name: "🦩 スリムなフラミンゴタイプ（A2）", 
        features: ["前重心でつま先内側", "上半身重心で縦に伸びる", "1軸でまっすぐコンパクト", "背筋が伸びた動きが自然"], 
        swing: ["テークバックは縦方向", "軸を崩さず回る", "コンパクトで効率的な動き"], 
        notes: ["大きく振ろうとしすぎるとブレる", "横に広げすぎると軸が崩れる"], 
        advice: ["「真上に伸びる」意識", "コンパクトでOK", "軸キープ最優先"] 
    },
    B1: { 
        id: "duck", 
        name: "🦆 しずかなアヒルタイプ（B1）", 
        features: ["後ろ重心（かかと寄り）", "下半身重心", "1軸でまっすぐ", "背筋は伸びたまま、膝で重心を落とす"], 
        swing: ["下に沈む動きが自然", "ためを作りやすい", "コンパクトで安定型", "上半身は静か、下で動く"], 
        notes: ["上に伸びようとすると不自然になる", "大きく振ろうとするとバランス崩れる"], 
        advice: ["「下で支える」意識", "膝を使って沈む", "上は静かに"] 
    },
    B2: { 
        id: "bear", 
        name: "🐻 ゆったりくまタイプ（B2）", 
        features: ["後ろ重心（かかと外側）", "下半身主導", "2軸で斜めに広く使う", "どっしり安定型"], 
        swing: ["テークバックは低く広く", "体全体で動く", "ダイナミックなスイング"], 
        notes: ["コンパクトにしすぎると力が出ない", "上半身主導になるとミス出やすい"], 
        advice: ["「下でどっしり」", "広く使う", "リズムゆったり"] 
    }
};


let currentStep = 0;
let userAnswers = [];

const quizSection = document.getElementById('quiz-area');
const resultSection = document.getElementById('result-area');
const qText = document.getElementById('question-text');
const btnA = document.getElementById('choice-a');
const btnB = document.getElementById('choice-b');
const textA = document.getElementById('text-a');
const textB = document.getElementById('text-b');
const progressCore = document.getElementById('progress-core');
const progressText = document.getElementById('progress-text');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

document.getElementById('start-btn').addEventListener('click', () => {
    document.getElementById('intro').style.display = 'none';
    quizSection.style.display = 'block';
    showQuestion();
});

function showQuestion() {
    const q = questions[currentStep];
    qText.innerText = q.text;
    textA.innerText = q.a; 
    textB.innerText = q.b;
    
    btnA.classList.toggle('selected', userAnswers[currentStep] === 'A');
    btnB.classList.toggle('selected', userAnswers[currentStep] === 'B');

    prevBtn.disabled = currentStep === 0;
    nextBtn.disabled = userAnswers[currentStep] === undefined;

    const percent = ((currentStep + 1) / questions.length) * 100;
    progressCore.style.width = percent + "%";
    progressText.innerText = `Q ${currentStep + 1} / ${questions.length}`;
}

function handleAnswer(choice) {
    userAnswers[currentStep] = choice;
    if (currentStep < questions.length - 1) {
        currentStep++;
        showQuestion();
    } else {
        showResult();
    }
}

btnA.addEventListener('click', () => handleAnswer('A'));
btnB.addEventListener('click', () => handleAnswer('B'));

prevBtn.addEventListener('click', () => {
    if (currentStep > 0) { currentStep--; showQuestion(); }
});

nextBtn.addEventListener('click', () => {
    if (currentStep < questions.length - 1) { currentStep++; showQuestion(); }
});

function showResult() {
    quizSection.style.display = 'none';
    resultSection.style.display = 'block';

    let scores = { A: 0, B: 0, cross: 0, parallel: 0, type1: 0, type2: 0 };

    userAnswers.forEach((ans, i) => {
        const type = questions[i].type;
        if (type === "AB") ans === 'A' ? scores.A++ : scores.B++;
        if (type === "CP") ans === 'A' ? scores.cross++ : scores.parallel++;
        if (type === "12") ans === 'A' ? scores.type1++ : scores.type2++;
    });

    const isA = scores.A >= scores.B;
    const isCross = scores.cross >= scores.parallel;
    const isType1Input = scores.type1 >= scores.type2;

    let key = "";
    let subNote = "";

    if (isA) {
        key = isCross ? "A1" : "A2";
        if (key === "A1" && !isType1Input) subNote = "A2タイプの可能性もあります！";
        else if (key === "A2" && isType1Input) subNote = "A1タイプの可能性もあります！";
    } else {
        key = isCross ? "B2" : "B1";
        if (key === "B1" && !isType1Input) subNote = "B2タイプの可能性もあります！";
        else if (key === "B2" && isType1Input) subNote = "B1タイプの可能性もあります！";
    }

    const data = results[key];

    const shareText = encodeURIComponent(`私のゴルフスイングは【${data.name}】でした！\nあなたの身体特性に合った理想的なスイングタイプをチェックしよう！\n#ゴルフスイング診断 #4スタンス理論 #JoaGOLFstudio`);
    const shareUrl = encodeURIComponent(window.location.href);

    // 【追加】LINE用のテキストセット形式
    const lineText = `私の診断結果は【${data.name}】でした！\n${window.location.href}`;
    const lineUrl = `https://line.me/R/msg/text/?${encodeURIComponent(lineText)}`;

    /* --- script.js の showResult 関数内を修正 --- */

    resultSection.innerHTML = `
        <div class="result-container">
            <div class="type-header">
                <img src="images/${data.id}.jpeg" alt="${data.id}" class="type-image">
                <h2 class="type-title">${data.name}</h2>
                <p class="probability-text">の可能性が高いです！</p>
                ${subNote ? `<div class="sub-note-text"><p style="color:#d9534f; font-weight:bold; margin:0;">※${subNote}</p></div>` : ""}
            </div>

            <div class="result-details">
                ${createBlock("■ 特徴", data.features)}
                ${createBlock("■ スイング傾向", data.swing)}
                ${createBlock("■ 注意点", data.notes)}
                ${createBlock("■ アドバイス", data.advice)}
            </div>

            <a href="https://rentabata82.github.io/Joa-GOLF-studio-store-v1/" target="_blank" rel="noopener noreferrer" class="main-btn" style="text-decoration: none; background-color:#cc217f; margin-top: 40px; display: block; line-height: 1.4;">
                タイプ別のスイング指導は<br>JoaGOLF studioへ！
            </a>

            <button id="show-all-types" class="main-btn" style="background:#cc217f; margin-top:20px;">他のスイングタイプも見る</button>
            
            <div id="all-types-list" style="display:none; margin-top: 60px; text-align: left;">
                <hr style="margin: 60px 0; border: 0; border-top: 2px solid #eee;">
                <h2 style="text-align:center; margin-bottom: 40px;">全タイプ一覧</h2>
                
                ${Object.keys(results).map(typeKey => {
                    const item = results[typeKey];
                    return `
                        <div class="type-full-card" style="margin-bottom: 80px;">
                            <div class="type-header">
                                <img src="images/${item.id}.jpeg" alt="${item.id}" class="type-image">
                                <h2 class="type-title">${item.name}</h2>
                            </div>
                            <div class="result-details">
                                ${createBlock("■ 特徴", item.features)}
                                ${createBlock("■ スイング傾向", item.swing)}
                                ${createBlock("■ 注意点", item.notes)}
                                ${createBlock("■ アドバイス", item.advice)}
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>

            <button class="main-btn" style="background:#cc217f; margin-top:20px;" onclick="location.reload()">最初からやり直す</button>

            <div class="share-section" style="margin: 50px 0 20px; padding: 20px; background: #fdfdfd; border-radius: 12px; border: 1px solid #eee;">
                <p style="font-weight: bold; margin-bottom: 15px; font-size: 0.9rem;">結果を友達に共有する！</p>
                <div style="display: flex; justify-content: center; gap: 10px; flex-wrap: wrap;">
                    <button id="copy-url-btn" class="main-btn" style="margin:0; flex:1; min-width:100px; background-color:#cc217f; font-size:0.85rem; padding:12px 5px; border:none; color:white;">URLコピー</button>
                    <a href="${lineUrl}" target="_blank" class="main-btn" style="margin:0; flex:1; min-width:100px; background-color:#06C755; font-size:0.85rem; padding:12px 5px; text-decoration:none; color:white;">LINE送る</a>
                    <a href="https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}" target="_blank" class="main-btn" style="margin:0; flex:1; min-width:100px; background-color:#000000; font-size:0.85rem; padding:12px 5px; text-decoration:none; color:white;">Xでポスト</a>
                </div>
            </div>
        </div>
    `;

    // 「他のスイングタイプについても見る」のクリック処理
    document.getElementById('show-all-types').addEventListener('click', function() {
        document.getElementById('all-types-list').style.display = 'block';
        this.style.display = 'none';
        document.getElementById('all-types-list').scrollIntoView({ behavior: 'smooth' });
    });

    /// URLコピーボタンのイベント
    document.getElementById('copy-url-btn').addEventListener('click', () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            // --- ここからデザイン用の書き換え ---
            const toast = document.createElement('div');
            toast.className = 'copy-toast';
            toast.innerText = "URLをコピーしました！";
            document.body.appendChild(toast);

        // 表示
        setTimeout(() => toast.classList.add('show'), 10);

        // 2秒後に消して削除
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 500);
        }, 2000);
        // --- ここまで ---
    });
});

    window.scrollTo(0, 0);
}

function createBlock(title, list) {
    return `<div class="detail-block"><h3>${title}</h3><ul>${list.map(t => `<li>${t}</li>`).join('')}</ul></div>`;
}