(function() {
    'use strict'

    // 変更されない値（定数）
    const GAME_TIME = 3

    // 変更される値
    const state = {
        time: GAME_TIME,
        count: 0,
        ranking: [0, 0, 0]
    }

    // 各要素の取得
    const time = document.querySelector('.js-time')
    const gauge = document.querySelector('.js-gauge')
    const count = document.querySelector('.js-count')
    const ranking = document.querySelector('.js-ranking')
    const btn = document.querySelector('.js-button')

    // 各関数
    // --------------------------------

    // 残り時間の表示
    const setTime = () => {
        if (state.time === 0) time.textContent = 'Finish !'
        else time.textContent = `残り：${state.time}秒`
    }

    // 現在の連打数の表示
    const setCount = () => {
        count.textContent = state.count
    }

    // ベストスコアの表示
    const setRanking = () => {
        state.ranking.forEach((n, i) => {
            ranking.innerHTML += `<li>${i + 1}位：${n}</li>`
        })
    }

    // ゲーム開始
    const startGame = () => {
        if (state.time === 0) {
            resetGame()
            return
        }

        if (state.count === 0) {
            btn.textContent = 'PUSH !'
            setGauge()
            setCountTime()
        }

        state.count++
        setCount()
    }

    // 残り時間を計算
    const setCountTime = () => {
        const run = setInterval(() => {
            state.time--
            setTime()

            if (state.time === 0) {
                finishGame()
                clearInterval(run)
            }
        }, 1000)
    }

    // 残り時間に合わせてゲージを表示
    const setGauge = () => {
        if (state.count === 0) {
            gauge.style.transition = `width ${GAME_TIME}s linear`
            gauge.style.width = `0`
        } else {
            gauge.style.transition = null
            gauge.style.width = `100%`
        }
    }

    // ゲーム終了時の処理
    const finishGame = () => {
        btn.textContent = 'RESET'
        ranking.textContent = ''
        state.ranking.push(state.count)
        state.ranking.sort((a, b) => b - a).length = 3
        setRanking()
    }

    // ゲームを初期化
    const resetGame = () => {
        setGauge()
        state.time = GAME_TIME
        state.count = 0
        setTime()
        setCount()
        btn.textContent = 'START'
    }

    // ページが読み込まれた時の処理
    window.addEventListener('load', () => {
        setTime()
        setCount()
        setRanking()
    }, false)

    // ボタンがクリックされた時の処理
    btn.addEventListener('click', startGame, false)
})()
