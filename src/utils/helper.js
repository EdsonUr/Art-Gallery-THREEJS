import { useState, useEffect } from 'react';

export const PlayerControls = () => {
    const keys = {
        KeyW: 'forward',
        KeyS: 'backward',
        KeyA: 'left',
        KeyD: 'right',
        Space: 'jump',
        ShiftLeft: 'sprint'
    };

    const mapKeyToAction = (keyCode) => keys[keyCode];

    const [movement, setMovement] = useState({
        forward: false,
        backward: false,
        left: false,
        right: false,
        jump: false,
        sprint: false
    });

    useEffect(() => {
        const handleKeyDown = (e) => {
            const action = mapKeyToAction(e.code);
            if (action) {
                setMovement((prev) => ({
                    ...prev,
                    [action]: true
                }));
            }
        };

        const handleKeyUp = (e) => {
            const action = mapKeyToAction(e.code);
            if (action) {
                setMovement((prev) => ({
                    ...prev,
                    [action]: false
                }));
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    return movement;
};
