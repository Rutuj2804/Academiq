export const sidebarLayout = {
    0: "LEFT",
    1: "RIGHT",
    2: "MENU_LEFT",
    3: "MENU_RIGHT"
}

export const layoutTheme = {
    0: "LIGHT",
    1: "DARK",
}

export interface SettingsState {
    sidebar: string,
    theme: string
}