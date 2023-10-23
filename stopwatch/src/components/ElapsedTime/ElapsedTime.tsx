import React, { useState } from "react";
import { ElapsedTime } from "../../types.ts";
import { formatTime } from "../../utils.ts";

type ClockMode = 'digital' | 'analog'

interface Props {
    time: ElapsedTime
}

const ElapsedTime: React.FC<Props> = ({ time }) => {
    const [mode, setMode] = useState<ClockMode>('digital')

    return (
        <div>
            {formatTime(time)}
        </div>
    )
}

export default ElapsedTime
