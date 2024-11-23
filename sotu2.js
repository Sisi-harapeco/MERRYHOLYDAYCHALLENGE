const challenges = [
    "오늘의 감사한 일 적기", "좋아하는 노래 추천하기", "하루 목표 세우기",
    "산책하면서 사진 찍기", "기분 좋았던 순간 떠올리기", "친구에게 칭찬 메시지 보내기",
    "책 추천하기", "기억에 남는 음식 이야기 적기", "웃긴 일화 공유하기",
    "새로운 취미 찾기", "오늘의 명언 생각하기", "일찍 잠자기 도전",
    "올해 배운 것 적어보기", "감동적인 순간 떠올리기", "즐거운 영화 추천하기",
    "좋아하는 풍경 그림 그리기", "하루 10분 스트레칭 도전하기", "다음 여행지 계획 세우기"
];

const calendar = document.getElementById('calendar');
const popup = document.getElementById('popup');
const challengeTitle = document.getElementById('challengeTitle');
const challengeInput = document.getElementById('challengeInput');
const saveButton = document.getElementById('saveButton');
const closeButton = document.getElementById('closeButton');
const fileInput = document.getElementById('fileInput');
const previewImage = document.getElementById('previewImage');
const today = new Date().getDate();
const data = {}; // 날짜별 데이터를 저장하는 객체

// 캘린더 생성
for (let i = 1; i <= 25; i++) {
    const day = document.createElement('div');
    day.textContent = i;
    day.classList.add(i <= today ? "available" : "locked");
    day.addEventListener('click', () => openPopup(i));
    calendar.appendChild(day);
}

// 팝업 열기
function openPopup(day) {
    if (day > today) return alert("아직 열 수 없는 날짜입니다!");

    const currentData = data[day] || {};
    challengeTitle.textContent = currentData.title || challenges[Math.floor(Math.random() * challenges.length)];
    challengeInput.value = currentData.text || "";

    if (currentData.image) {
        previewImage.src = currentData.image;
        previewImage.style.display = "block";
    } else {
        previewImage.style.display = "none";
    }

    popup.style.display = "block";

    saveButton.onclick = () => {
        const reader = new FileReader();

        reader.onload = () => {
            data[day] = {
                title: challengeTitle.textContent,
                text: challengeInput.value,
                image: reader.result
            };
            document.querySelectorAll('.calendar div')[day - 1].classList.add('completed');
            popup.style.display = "none";
        };

        if (fileInput.files[0]) {
            reader.readAsDataURL(fileInput.files[0]);
        } else {
            data[day] = {
                title: challengeTitle.textContent,
                text: challengeInput.value
            };
            document.querySelectorAll('.calendar div')[day - 1].classList.add('completed');
            popup.style.display = "none";
        }
    };
}

// 팝업 닫기
closeButton.onclick = () => {
    popup.style.display = "none";
};
