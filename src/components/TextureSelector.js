import React, { useEffect, useState } from 'react'
import { useStore } from '../hooks/useStore';
import { useKeyBoard } from '../hooks/useKeyBoard';
import { dirtImg, grassImg, glassImg, logImg, woodImg } from '../images/images'

const images = {
    dirt: dirtImg,
    grass: grassImg,
    glass: glassImg,
    wood: woodImg,
    log: logImg,
}

const TextureSelector = () => {
    const [visible, setVisible] = useState(false);
    const [activeTexture, setTexture] = useStore(state => [state.texture, state.setTexture]);
    const { dirt, grass, glass, wood, log } = useKeyBoard();

    useEffect(() => {
        const textures = { dirt, grass, glass, wood, log };
        const pressedTexture = Object.entries(textures).find(([k, v]) => v);
        if (pressedTexture) {
            console.log('Pressing', pressedTexture);
            setTexture(pressedTexture[0]);
        }
    }, [dirt, grass, glass, wood, log, setTexture]);

    console.log('dirt', dirt);

    useEffect(() => {
        const visibilityTimeOut = setTimeout(() => {
            setVisible(false);
        }, 2000);
        setVisible(true);
        return () => {
            clearTimeout(visibilityTimeOut);
        }
    }, [activeTexture]);

    return visible && (
        <div className='absolute centered texture-selector'>
            {Object.entries(images).map(([k, src]) => {
                return (<img
                    key={k}
                    src={src}
                    alt={k}
                    className={`${k === activeTexture ? 'active' : ''}`}
                />)
            })}
        </div>
    )
}

export default TextureSelector;