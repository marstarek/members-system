
import { useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import useTheme from "../hooks/UseTheme";


export default function Switcher() {
    const [colorTheme, setTheme] = useTheme();
    const [darkSide, setDarkSide] = useState(
        colorTheme === "light" ? true : false
    );

    const toggleDarkMode = (checked) => {
        setTheme(colorTheme);
        setDarkSide(checked);
    };

    return (
        <>
            <DarkModeSwitch
                style={{ marginBottom: "0" }}
                className="fill-current bg-transparent w-[1.5rem] h-[1.5rem] hover:bg-transparent active:bg-transparent "
                checked={darkSide}
                onChange={toggleDarkMode}
                size={30} moonColor='#212529' sunColor='#DBA24E'
            />
        </>
    );
}