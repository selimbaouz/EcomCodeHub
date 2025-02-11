import React from 'react';
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
 

const ToggleMode = () => {
    const {systemTheme, theme, setTheme} = useTheme();
    const currentTheme = theme === "system" ? systemTheme : theme;

    return (
        <button type='button' onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")} className='z-50 relative'>
            {currentTheme === "dark" ? (
                <Sun className="size-6 text-foreground transition-all group-hover:text-primary ease-in-out hover:scale-125" />
            ) : (
                <Moon className="size-6 text-foreground transition-all group-hover:text-primary ease-in-out hover:scale-125" />
            )}
            <span className="sr-only">Toggle theme</span>
        </button>
    );
};

export default ToggleMode;