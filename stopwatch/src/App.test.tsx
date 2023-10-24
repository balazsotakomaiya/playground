import { render, screen, act, fireEvent } from '@testing-library/react';
import App from "./App.tsx";
import { expect } from "vitest";

describe('<App />', () => {
    let timeElement: HTMLElement;
    let startButton: HTMLElement;

    beforeEach(() => {
        vi.useFakeTimers()

        render(<App />);

        timeElement = screen.getByRole('timer', { name: /Elapsed time on stopwatch/ });
        expect(timeElement.textContent).toBe("00:00.00");

        startButton = screen.getByRole('button', { name: /start/i })
        expect(startButton).toBeInTheDocument();
    })

    afterEach(() => {
        vi.restoreAllMocks()
    })

    test('that the stopwatch can be STARTED', async () => {
        // Start the stopwatch
        await act(async () => {
            fireEvent.click(startButton);
            vi.advanceTimersToNextTimer();
        });

        // 1 second has passed
        await act(async () => {
            vi.advanceTimersByTime(1000);
        });

        expect(timeElement.textContent).toBe("00:01.00");
    });

    test('that the stopwatch can be STOPPED', async () => {
        // Start the stopwatch
        await act(async () => {
            fireEvent.click(startButton);
            vi.advanceTimersToNextTimer();
        });

        // 1 second has passed
        await act(async () => {
            vi.advanceTimersByTime(1000);
        });

        expect(timeElement.textContent).toBe("00:01.00");

        const stopButton = screen.getByRole('button', { name: /stop/i })
        expect(stopButton).toBeInTheDocument();

        await act(async () => {
            // stop the stopwatch
            fireEvent.click(stopButton);

            // 2 seconds have passed
            vi.advanceTimersByTime(1000);
        })

        expect(timeElement.textContent).toBe("00:01.00");
    });

    test('that the stopwatch can be RESET', async () => {
        // Start the stopwatch
        await act(async () => {
            fireEvent.click(startButton);
            vi.advanceTimersToNextTimer();
        });

        // 1 second has passed
        await act(async () => {
            vi.advanceTimersByTime(1000);
        });

        expect(timeElement.textContent).toBe("00:01.00");

        const stopButton = screen.getByRole('button', { name: /stop/i })
        expect(stopButton).toBeInTheDocument();

        await act(async () => {
            // stop the stopwatch
            fireEvent.click(stopButton);

            // 2 seconds have passed
            vi.advanceTimersByTime(1000);
        })

        expect(timeElement.textContent).toBe("00:01.00");

        const resetButton = screen.getByRole('button', { name: /reset/i })
        expect(resetButton).toBeInTheDocument();

        // Reset the stopwatch
        await act(async () => {
            fireEvent.click(resetButton);
        })

        // Assert that the time has been reset
        expect(timeElement.textContent).toBe("00:00.00");
    });

    test('that the stopwatch can CAPTURE LAP', async () => {
        // Start the stopwatch
        await act(async () => {
            fireEvent.click(startButton);
            vi.advanceTimersToNextTimer();
        });

        // 1 second has passed
        await act(async () => {
            vi.advanceTimersByTime(1000);
        });

        expect(timeElement.textContent).toBe("00:01.00");

        const lapButton = screen.getByRole('button', { name: /lap/i })
        expect(lapButton).toBeInTheDocument();

        // Capture lap
        await act(async () => {
            fireEvent.click(lapButton);
        })

        // Assert that the lap has been captured
        const lapElement = screen.getByRole('listitem', { name: /lap 1/i })
        expect(lapElement).toBeInTheDocument();
        expect(lapElement.textContent).toBe("Lap 1 00:01.00");

        // 4 seconds have passed
        await act(async () => {
            vi.advanceTimersByTime(4000);
        });

        // Assert that there exists a current lap
        const currentLapElement = screen.getByRole('listitem', { name: /lap 2/i })
        expect(currentLapElement).toBeInTheDocument();
        expect(currentLapElement.textContent).toBe("Lap 2 00:04.00");
    });

    test('that the stopwatch cannot be STARTED MULTIPLE TIMES', async () => {
        // Start the stopwatch
        await act(async () => {
            fireEvent.click(startButton);
            vi.advanceTimersToNextTimer();
        });

        // Expect that the button does not exist
        expect(screen.queryByRole('button', { name: /start/i })).not.toBeInTheDocument();
    })

    test('that the stopwatch cannot be STOPPED MULTIPLE TIMES', async () => {
        // Start the stopwatch
        await act(async () => {
            fireEvent.click(startButton);
            vi.advanceTimersToNextTimer();
        });

        // 1 second has passed
        await act(async () => {
            vi.advanceTimersByTime(1000);
        });

        const stopButton = screen.getByRole('button', { name: /stop/i })
        expect(stopButton).toBeInTheDocument();

        // stop the stopwatch
        await act(async () => {
            fireEvent.click(stopButton);
        })

        // Expect that the button does not exist
        expect(screen.queryByRole('button', { name: /stop/i })).not.toBeInTheDocument();
    })
});
