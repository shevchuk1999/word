export const evaluation = {
    absent: { value: 'absent', color: 'dimgrey', icon: '⬜', order: 2},
    present: { value: 'present', color: '#c9b458', icon: '🟨', order: 1},
    correct: { value: 'correct', color: '#6aaa64', icon: '🟩', order: 0}
}

export const gameStatus = {
    IN_PROGRESS: 0,
    WIN: 1,
    FAIL: 2,
}
export let statisticRow = {
    0:{ countWin: 0 },
    1:{ countWin: 0 },
    2:{ countWin: 0 },
    3:{ countWin: 0 },
    4:{ countWin: 0 },
}
