import React from 'react'
import { DarkMode, LightMode } from '@mui/icons-material';
import { ThemeContext } from 'context/themeContext';

const ToggleMode = (props:any) => {
    const { color } =  props;
    const { mode, toggleMode } = React.useContext(ThemeContext)

    return (
        <div style={{ cursor: "pointer", color:color && mode === "dark" ? "black" : "white" }} onClick={toggleMode}>

            {
                mode === "light" ? <DarkMode /> : <LightMode />
            }
        </div>
    )
}

export default ToggleMode;