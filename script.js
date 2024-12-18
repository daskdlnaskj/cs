class TreasureMap {
    static getMapPieces() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("找到了地图碎片!");
            }, 800);
        });
    }

    static getInitialClue() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("在古老的图书馆里找到了第一个线索...");
            }, 1000);
        });
    }

    static decodeAncientScript(clue) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!clue) {
                    reject("没有线索可以解码!");
                }
                resolve("解码成功!宝藏在一座古老的神庙中...");
            }, 1500);
        });
    }

    static navigateMaze() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const random = Math.random();
                if (random < 0.3) {
                    reject("迷路了!需要重新开始迷宫之旅...");
                } else {
                    resolve("成功穿越迷宫!");
                }
            }, 1800);
        });
    }

    static searchTemple(location) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const random = Math.random();
                if (random < 0.5) {
                    reject("糟糕!遇到了神庙守卫!");
                }
                resolve("找到了一个神秘的箱子...");
            }, 2000);
        });
    }

    static unlockSecretMechanism() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("解锁了宝箱的秘密机关!");
            }, 1200);
        });
    }

    static openTreasureBox() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("恭喜!你找到了传说中的宝藏!");
            }, 1000);
        });
    }

    static exploreMaze(currentLocation) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const paths = ['left', 'right', 'forward', 'backward'];
                const result = paths[Math.floor(Math.random() * paths.length)];

                if (result === 'backward') {
                    reject("回到了起点!");
                } else if (result === 'left' || result === 'right') {
                    resolve(`你向${result}走，找到了新的线索!`);
                } else {
                    resolve("你继续向前走，前方似乎有些不同...");
                }
            }, 1500);
        });
    }
}

async function startAdventure() {
    const storyElement = document.getElementById("story");
    storyElement.innerHTML = ""; // 清空之前的内容
    try {
        storyElement.innerHTML += `<p>${await TreasureMap.getMapPieces()}</p>`;
        const clue = await TreasureMap.getInitialClue();
        storyElement.innerHTML += `<p>${clue}</p>`;
        const location = await TreasureMap.decodeAncientScript(clue);
        storyElement.innerHTML += `<p>${location}</p>`;

        // 迷宫探索
        let mazeResult = await TreasureMap.exploreMaze(location);
        while (mazeResult !== "你继续向前走，前方似乎有些不同...") {
            storyElement.innerHTML += `<p>${mazeResult}</p>`;
            mazeResult = await TreasureMap.exploreMaze(location);
        }
        storyElement.innerHTML += `<p>${mazeResult}</p>`;

        const box = await TreasureMap.searchTemple(location);
        storyElement.innerHTML += `<p>${box}</p>`;
        storyElement.innerHTML += `<p>${await TreasureMap.unlockSecretMechanism()}</p>`;
        const treasure = await TreasureMap.openTreasureBox();
        storyElement.innerHTML += `<p>${treasure}</p>`;
    } catch (error) {
        storyElement.innerHTML += `<p style="color: red;">任务失败: ${error}</p>`;
    }
}

// 在页面加载时获取图书馆的数据
window.onload = function () {
    loadLibraryInfo();
    loadGuardInfo();
    loadPlayerInfo();
};

// 存储玩家信息
function savePlayerInfo(playerId, nickname, gameHistory) {
    localStorage.setItem('playerId', playerId);
    localStorage.setItem('nickname', nickname);
    localStorage.setItem('gameHistory', JSON.stringify(gameHistory));
}

// 加载玩家信息
function loadPlayerInfo() {
    const playerId = localStorage.getItem('playerId');
    const nickname = localStorage.getItem('nickname');
    const gameHistory = JSON.parse(localStorage.getItem('gameHistory') || '[]');

    console.log('Loaded Player Info:', playerId, nickname, gameHistory);
    // 更新页面上的玩家信息显示
    document.getElementById('playerInfo').textContent = `Player: ${nickname} (ID: ${playerId})`;
    document.getElementById('gameHistory').textContent = `Game History: ${gameHistory.join(', ')}`;
}

// 示例调用
savePlayerInfo('马明厚', 'TreasureHunter', ['Found secret key', 'Discovered hidden door']);

function loadLibraryInfo() {
    fetch('data/library.txt')
        .then(response => response.text())
        .then(data => {
            document.getElementById('libraryInfo').textContent = data;
        })
        .catch(error => {
            console.error('加载图书馆数据失败:', error);
            document.getElementById('libraryInfo').textContent = 'Failed to load library information.';
        });
}

function loadGuardInfo() {
    fetch('data/guard.txt')
        .then(response => response.text())
        .then(data => {
            document.getElementById('guardInfo').textContent = data;
        })
        .catch(error => {
            console.error('加载守卫数据失败:', error);
            document.getElementById('guardInfo').textContent = 'Failed to load guard information.';
        });
}
