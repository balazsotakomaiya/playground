import { render, screen, act, fireEvent } from '@testing-library/react';
import App from "./App.tsx";
import { expect } from "vitest";

describe('<App />', () => {
    beforeEach(() => {
        vi.useFakeTimers()
    })
    afterEach(() => {
        vi.restoreAllMocks()
    })

    test('starts stopwatch on start button press', async () => {
        render(<App />);

        const timeElement = screen.getByRole('timer', { name: /Elapsed time on stopwatch/ });
        expect(timeElement.textContent).toBe("00:00.00");

        const startButton = screen.getByRole('button', { name: /start/i })
        expect(startButton).toBeInTheDocument();

        await act(async () => {
            fireEvent.click(startButton);
            vi.advanceTimersToNextTimer();
        });

        const stopButton = screen.getByRole('button', { name: /stop/i })
        expect(stopButton).toBeInTheDocument();

        await act(async () => {
            vi.advanceTimersByTime(1000);
        });

        expect(timeElement.textContent).toBe("00:01.00");
    });
});
