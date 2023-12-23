
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAppTheme } from "../redux/memberSlice";

export default function useTheme() {
    const [theme, setTheme] = useState(localStorage.theme);
    const dispatch = useDispatch()
const cv = () => {
    dispatch(setAppTheme(theme));
}

    const colorTheme = theme === "light" ? "dark" : "light";
    useEffect(() => {
        const root = window.document.documentElement;
        root.setAttribute('data-theme', theme)
        root.setAttribute('data-theme', colorTheme)
        // cv()
        localStorage.setItem('theme', theme);
    }, [theme, colorTheme]);

    return [colorTheme, setTheme]
}