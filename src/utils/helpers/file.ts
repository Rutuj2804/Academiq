export const calculateFileSize = (s: number) => {
    if (s < 1024) {
        return s + " bytes";
    } else if (s < 1024 * 1024) {
        var sKB = (s / 1024).toFixed(2);
        return sKB + " KB";
    } else {
        var sGB = (s / (1024 * 1024)).toFixed(2);
        return sGB + " GB";
    }
};
