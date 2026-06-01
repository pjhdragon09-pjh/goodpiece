// 1. 문항 데이터 정의
const questions = [
    { q: "새로운 섬에 도착했을 때 당신은 어떻게 행동하냐?", a: "마을 사람들에게 고기 맛집이나 정보를 물어본다!", b: "조용히 구석에서 지도를 보며 관찰한다.", type: "E" },
    { q: "해적단 연회 도중, 마지막 고기 한 점이 남았다면?", a: "눈치 보지 않고 분위기를 띄우며 내가 홀라당 먹는다!", b: "남들이 먹는 걸 구경하다가 뼈다귀라도 슬쩍 챙긴다.", type: "E" },
    { q: "선원들과 다 함께 노는 주말, 당신의 이상적인 휴식은?", a: "주변 해적단까지 다 불러서 밤새 대형 파티를 연다.", b: "방에서 혼자 자거나 밀짚모자를 수선하며 보낸다.", type: "E" },
    
    { q: "로그포스가 이상한 하늘을 가리키고 있다. 당신의 생각은?", a: "하늘 섬이 있는 게 분명해! 당장 하늘로 날아갈 방법을 찾자!", b: "기계 고장이다. 근처 정상적인 바다로 기수를 돌린다.", type: "N" },
    { q: "보물상자를 발견했다. 열기 직전 당신의 상상이?", a: "세상을 지배할 악마의 열매나 고대 병기가 들어있을 거야!", b: "금은보화나 현금, 혹은 비상식량이 들어있겠지.", type: "N" },
    { q: "부선장이 갑자기 '우주 해적이 쳐들어오면 어쩌지?'라고 한다면?", a: "재밌겠다! 우주선 탈 준비랑 레이저 총을 구상한다.", b: "쓸데없는 소리 말고 돛이나 제대로 묶으라고 소리친다.", type: "N" },

    { q: "적 해적단이 쳐들어왔는데, 보스가 엄청 뚱뚱하고 웃기게 생겼다.", a: "겉모습에 방심하지 않고 현상금과 기술을 냉정히 분석한다.", b: "비주얼이 너무 내 취향이라 웃참하느라 제대로 못 싸운다.", type: "T" },
    { q: "동료가 도저히 이룰 수 없을 것 같은 엉뚱한 꿈을 말할 때 당신은?", a: "그게 현실적으로 실현 가능한지 확률부터 계산해 본다.", b: "가슴이 웅장해진다! 멋지다며 눈물을 흘리고 같이 기뻐한다.", type: "F" },
    { q: "전투 중 동료가 다쳤다. 당신이 먼저 건넬 말이나 행동은?", a: "어디가 얼마나 다쳤인지 상처를 확인하고 약을 찾는다.", b: "괜찮냐며 안아주고 눈물을 흘리며 공감해 준다.", type: "F" },

    { q: "다음 목적지인 섬으로 출항하기 전, 당신의 준비 상태는?", a: "항해 경로, 필요한 식량 일수, 예산을 철저히 기록해 둔다.", b: "바람이 부는 대로, 기록지침(로그포스)이 끌리는 대로 그냥 간다.", type: "J" },
    { q: "해군 군함이 쫓아오고 있다! 당신의 탈출 전략은?", a: "미리 준비해 둔 3가지 도주 경로 중 최적의 루트를 실행한다.", b: "일단 전속력으로 도망치면서 임기응변으로 대처한다.", type: "P" },
    { q: "해적단 내부 규칙이나 당번(요리, 청소)을 정할 때 당신은?", a: "요일별로 공평하게 시간표를 짜서 벽에 붙여두어야 한다.", b: "귀찮다. 눈앞에 보이는 사람이 주먹구구식으로 처리한다.", type: "P" }
];

// 2. 캐릭터 매칭 및 고화질 실제 일러스트 데이터베이스
const characters = {
    "ESFP": { 
        name: "밀짚모자 루피", 
        img: "https://api-sports.io", // 루피 공식 일러스트 예시 (외부 접근이 안정적인 CDN 경로)
        desc: "생각보다 몸이 먼저 움직이는 고기 마니아 주인공! 대책은 없지만 엄청난 낙천성과 행동력으로 동료들을 이끄는 마성의 대장입니다.", 
        food: "🍖🍖🍖🍖🍖", gag: "🤡🤡🤡🤡", ability: "고무고무 열매 (기어 5 신형태 가능)", warning: "배고프면 아군도 물어뜯을 수 있음." 
    },
    "ENFP": { 
        name: "천냥광대 버기", 
        img: "https://nocookie.net", // 버기 위키 공식 이미지
        desc: "말만 앞서고 겁은 많지만, 엄청난 허풍과 우주의 기운이 도는 운빨로 사황의 자리까지 올라간 진정한 세계관 최고의 개그 캐릭터입니다.", 
        food: "🍖🍖", gag: "🤡🤡🤡🤡🤡", ability: "동강동강 열매 (도망치기 마스터)", warning: "멋있는 척 금지, 당신은 뼛속까지 개그캐입니다." 
    },
    "ISFP": { 
        name: "기어4 탱크맨 루피", 
        img: "https://nocookie.net", // 탱크맨 위키 이미지
        desc: "평소엔 조용하지만 먹을 것 앞에서는 돌변합니다! 배부르게 먹고 바닥에 누워 뒹굴거릴 때 가장 큰 행복을 느끼는 평화주의 식탐 요정입니다.", 
        food: "🍖🍖🍖🍖🍖", gag: "🤡🤡🤡", ability: "음식 고속 소화 및 축적 능력", warning: "다이어트 계획은 내일부터 세우세요." 
    },
    "ESTP": { 
        name: "역병의 퀸", 
        img: "https://nocookie.net", // 퀸 위키 이미지
        desc: "거구의 몸집을 가졌지만 흥이 넘쳐흐릅니다! 위기 상황에서도 춤과 노래, 펑크 스텝을 참지 못하는 백수해적단의 최고의 분위기 메이커입니다.", 
        food: "🍖🍖🍖🍖", gag: "🤡🤡🤡🤡", ability: "사이보그 개조 및 전염병 유포", warning: "살이 너무 찌면 인기가 없어지니 팥죽은 적당히." 
    },
    "ENTP": { 
        name: "사이보그 프랑키", 
        img: "https://nocookie.net", // 프랑키 위키 이미지
        desc: "팬티만 입고 다니는 변태(?) 같지만 정이 넘치는 최고의 조선공! 언제 어디서나 포즈를 취하며 '수퍼~~!'를 외치는 유쾌한 돌아이입니다.", 
        food: "🍖🍖🍖", gag: "🤡🤡🤡🤡", ability: "콜라 에너지 충전 레이저포", warning: "바지가 없어도 당당함을 유지할 것." 
    },
    "INFP": { 
        name: "토니토니 쵸파", 
        img: "https://nocookie.net", // 쵸파 위키 이미지
        desc: "솜사탕을 무지 좋아하는 순수한 겁쟁이 선의! 칭찬을 들으면 화를 내면서도 몸을 베베 꼬며 기쁨을 감추지 못하는 해적단의 힐링 마스코트입니다.", 
        food: "🍖🍖🍖", gag: "🤡🤡", ability: "럼블볼 7단 변신 (뚱뚱한 가드 포인트 포함)", warning: "숨을 때 숨바꼭질 방향을 반대로 하지 마세요." 
    },
    "ISFJ": { 
        name: "바다의 협객 징베", 
        img: "https://nocookie.net", // 징베 위키 이미지
        desc: "듬직하고 진중한 고래상어 어인입니다. 평소에는 대단히 엄격하고 진지하지만, 가끔 너무 진지해서 상황을 썰렁하게 만드는 반전 아재 개그의 소유자입니다.", 
        food: "🍖🍖🍖", gag: "🤡", ability: "어인 공수도 일격 필살", warning: "젊은이들의 드립을 이해하려고 너무 애쓰지 마세요." 
    },
    "ESTJ": { 
        name: "잡食왕 와포루", 
        img: "https://nocookie.net", // 와포루 위키 이미지
        desc: "입에 걸리는 건 뭐든지 먹어치우는 전형적인 탐욕 개그 캐릭터! 이기적이지만 미워할 수 없는 잔머리와 생존력으로 자수성가하는 타입입니다.", 
        food: "🍖🍖🍖🍖🍖", gag: "🤡🤡🤡", ability: "우걱우걱 열매 (무엇이든 먹어서 변형)", warning: "식비 감당이 안 되어 파산할 위험이 있습니다." 
    }
};

function getCharacter(mbti) {
    if (characters[mbti]) return characters[mbti];
    const fallbackMap = { "I": "ISFP", "E": "ESFP", "N": "ENFP", "F": "INFP", "T": "ENTP", "J": "ISFJ" };
    return characters[fallbackMap[mbti]] || characters["ENFP"];
}

// 3. 상태 관리 변수
let currentIdx = 0;
let scores = { E: 0, I: 0, N: 0, S: 0, T: 0, F: 0, J: 0, P: 0 };

const pages = {
    landing: document.getElementById('landing-page'),
    question: document.getElementById('question-page'),
    loading: document.getElementById('loading-page'),
    result: document.getElementById('result-page')
};

// 4. 초기화 및 로컬스토리지 연동
window.addEventListener('DOMContentLoaded', () => {
    checkStorage();
});

function checkStorage() {
    const savedState = localStorage.getItem('op_mbti_progress');
    const savedResult = localStorage.getItem('op_mbti_last_result');

    document.getElementById('resume-btn').classList.toggle('hidden', !savedState);
    document.getElementById('last-result-btn').classList.toggle('hidden', !savedResult);
}

function showPage(pageId) {
    Object.values(pages).forEach(p => p.classList.remove('active'));
    pages[pageId].classList.add('active');
}

// 5. 이벤트 리스너
document.getElementById('start-btn').addEventListener('click', () => startTest(false));
document.getElementById('resume-btn').addEventListener('click', () => startTest(true));
document.getElementById('last-result-btn').addEventListener('click', () => {
    const lastResult = localStorage.getItem('op_mbti_last_result');
    if (lastResult) displayResult(lastResult);
});
document.getElementById('restart-btn').addEventListener('click', () => {
    localStorage.removeItem('op_mbti_progress');
    checkStorage();
    showPage('landing');
});

function startTest(isResume) {
    if (isResume) {
        const data = JSON.parse(localStorage.getItem('op_mbti_progress'));
        currentIdx = data.currentIdx;
        scores = data.scores;
    } else {
        currentIdx = 0;
        scores = { E: 0, I: 0, N: 0, S: 0, T: 0, F: 0, J: 0, P: 0 };
    }
    showPage('question');
    nextQuestion();
}

function nextQuestion() {
    if (currentIdx >= questions.length) {
        processResult();
        return;
    }

    localStorage.setItem('op_mbti_progress', JSON.stringify({ currentIdx, scores }));

    const currentQ = questions[currentIdx];
    document.getElementById('q-number').innerText = `Q. ${String(currentIdx + 1).padStart(2, '0')}`;
    document.getElementById('q-text').innerText = currentQ.q;
    document.getElementById('ans-a').innerText = currentQ.a;
    document.getElementById('ans-b').innerText = currentQ.b;
    
    document.getElementById('progress-bar').style.width = `${(currentIdx / questions.length) * 100}%`;
}

document.getElementById('ans-a').addEventListener('click', () => handleAnswer(true));
document.getElementById('ans-b').addEventListener('click', () => handleAnswer(false));

function handleAnswer(isA) {
    const currentQ = questions[currentIdx];
    const type = currentQ.type;
    const opposition = { 'E': 'I', 'N': 'S', 'T': 'F', 'J': 'P' };

    if (isA) scores[type]++;
    else scores[opposition[type]]++;

    currentIdx++;
    nextQuestion();
}

// 6. 결과 처리 및 룰렛 연출
function processResult() {
    showPage('loading');
    const loadingMsgs = ["현상금 계산 중...", "로그포스 맞추는 중...", "연회 고기 굽는 중... 🍖"];
    let msgIdx = 0;
    
    const interval = setInterval(() => {
        msgIdx = (msgIdx + 1) % loadingMsgs.length;
        document.getElementById('loading-message').innerText = loadingMsgs[msgIdx];
    }, 800);

    setTimeout(() => {
        clearInterval(interval);
        let mbti = "";
        mbti += scores.E >= scores.I ? "E" : "I";
        mbti += scores.N >= scores.S ? "N" : "S";
        mbti += scores.T >= scores.F ? "T" : "F";
        mbti += scores.J >= scores.P ? "J" : "P";

        localStorage.setItem('op_mbti_last_result', mbti);
        localStorage.removeItem('op_mbti_progress');

        displayResult(mbti);
    }, 2500);
}

// 7. 결과 렌더링
function displayResult(mbti) {
    const charData = getCharacter(mbti);
    
    document.getElementById('res-img').src = charData.img;
    document.getElementById('res-img').alt = charData.name;
    document.getElementById('res-name').innerText = charData.name;
    document.getElementById('res-mbti').innerText = mbti;
    document.getElementById('res-desc').innerText = charData.desc;
    document.getElementById('stat-food').innerText = charData.food;
    document.getElementById('stat-gag').innerText = charData.gag;
    document.getElementById('res-ability').innerText = charData.ability;
    document.getElementById('res-warning').innerText = charData.warning;

    checkStorage();
    showPage('result');
}
