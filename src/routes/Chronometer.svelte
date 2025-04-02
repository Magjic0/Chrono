<script>
    import { time, running } from '$lib/stores.js';

    let interval;
    let startTime = 0;
    let lastUpdate = 0;
    let isRunning = false;
    let pause = false;
    let backgroundInterval;

    function handleVisibilityChange() {
        if (document.hidden) {
            backgroundInterval = setInterval(() => updateTitle(), 1000);
        } else {
            clearInterval(backgroundInterval);
            updateTitle();
        }
    }

    function updateTitle() {
        document.title = formatTitleTime($time);
    }

    function startTimer() {
        if (isRunning && !pause) {
            pause = true;
            clearInterval(interval);
        } else {
            isRunning = true;
            pause = false;
            startTime = Date.now() - $time;
            interval = setInterval(() => {
                lastUpdate = Date.now() - startTime;
                time.set(lastUpdate);
                updateTitle();
            }, 10);
        }
    }

    function resetTimer() {
        clearInterval(interval);
        time.set(0);
        isRunning = false;
        pause = false;
        document.title = "Chronomètre";
    }

    function formatTime(ms) {
        const hours = Math.floor(ms / 3600000);
        const minutes = Math.floor((ms % 3600000) / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        const milliseconds = Math.floor((ms % 1000) / 10);

        if (hours > 0) {
            return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
        } else if (minutes > 0) {
            return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
        } else {
            return `${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
        }
    }

    function formatTitleTime(ms) {
        const hours = Math.floor(ms / 3600000);
        const minutes = Math.floor((ms % 3600000) / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);

        if (hours > 0) {
            return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        } else {
            return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }
    }
</script>

<div class="timer">
    <h1 class="time-display">{formatTime($time)}</h1>
    <div class="startButtons">
        <button class="start btn-secondary" on:click={startTimer}>{isRunning && !pause ? 'Pause' : 'Start'}</button>
        <button class="reset btn-secondary" on:click={resetTimer}>Reset</button>
    </div>
</div>

<style>
    .timer {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 50vw;
        height: 55vh;
        margin: auto;
        background-color: var(--first-color-dark);
        color: white;
        border-radius: 20px;
        position: relative;
        padding: 20px;
    }

    .time-display {
        font-size: 7rem;
        text-align: center;
        white-space: nowrap;
        max-width: 100%;
        overflow: hidden;
    }

    .startButtons {
        gap: 1rem;
        display: flex;
        justify-content: space-around;
        position: absolute;
        top: 69%;
    }

    .btn-secondary {
        background-color: transparent;
        color: var(--font-color-dark);
        border: 2px solid var(--second-color-dark);
        padding: 20px 20px;
        border-radius: 19px;
        font-size: 20px;
        cursor: pointer;
        text-align: center;
        transition: 0.3s;
    }

    .btn-secondary:hover {
        background-color: var(--bg-color-dark);
        color: white;
    }

    @media (max-width: 768px) {
        .time-display {
            font-size: 5rem;
        }

        .timer {
            width: 80vw;
            height: auto;
        }

        .startButtons {
            position: static;
            margin-top: 20px;
        }
    }

    @media (max-width: 480px) {
        .time-display {
            font-size: 4rem;
        }

        .btn-secondary {
            padding: 15px 15px;
            font-size: 18px;
        }
    }
</style>