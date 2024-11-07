export function detectDevice(userAgent: string): "Mobile" | "Desktop" {
    const mobileDevices = ['android', 'iphone', 'ipad', 'ipod', 'blackberry', 'windows phone', 'opera mini', 'mobile'];

    if (mobileDevices.some(device => userAgent.toLowerCase().includes(device))) {
        return 'Mobile';
    } else {
        return 'Desktop';
    }
}

export function generateRandomId(length: number) {
    const characters =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let randomId = "";

    length = length ?? 8;
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomId += characters.charAt(randomIndex);
    }

    return randomId;
}