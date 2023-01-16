export let AUDIODATA = {
	BGMMAIN: "sound/newYear/bgm.mp3",
	PRESS: "sound/newyear/press.mp3",
	OPEN: "sound/newyear/open.mp3",
	FADE: "sound/newyear/fade.mp3"
}

let bgm = new Audio()
bgm.src = AUDIODATA.BGMMAIN

let se_open = new Audio()
se_open.src = AUDIODATA.OPEN

let se_press = new Audio()
se_press.src = AUDIODATA.PRESS

let se_fade = new Audio()
se_fade.src = AUDIODATA.FADE

export function playSeOpen() {
	se_open.currentTime = 0
	se_open.volume = 100 / 100
	se_open.play()

	return se_open
}

export function playSeFade() {
	se_fade.currentTime = 0
	se_fade.volume = 100 / 100
	se_fade.play()

	return se_fade
}

export function playSePress() {
	se_press.currentTime = 0
	se_press.volume = 75 / 100
	se_press.play()

	return se_press
}

export function playBGM(continuate = true) {
	if (!continuate) bgm.currentTime = 0
	bgm.volume = 60 / 100
	bgm.loop = true
	bgm.play()
	return bgm
}

export function stopBGM() {
	if (!bgm) return
	bgm.pause()
	bgm.currentTime = 0
}
