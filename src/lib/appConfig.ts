import type { appsettings } from "@prisma/client";
import { get, writable, type Writable } from "svelte/store";
import type { AppSettingKey } from "./types";
import { check } from "prettier";

export let appConfigCache: Writable<appsettings[] | null> = writable(null);

export async function setupAppConfig(appConfig: appsettings[]) {
    appConfigCache.set(appConfig);
}

export function getAppConfig() {
    return appConfigCache;
}

export function getAppSettingValue(key: AppSettingKey): string | null {
    const cache = get(appConfigCache);

    const setting = cache?.find((v) => v.id === key);
    return setting ? setting.value : null;
}

export function getAppSetting(key: AppSettingKey): appsettings | null {
    const cache = get(appConfigCache);
    return cache?.find((v) => v.id === key) ?? null;
}

export function updateAppSetting(key: AppSettingKey, value: string) {
    appConfigCache.update((settings) => {
        return settings
            ? settings.map((setting) =>
                setting.id === key
                    ? { ...setting, value, updated: new Date() }
                    : setting
            )
            : settings;
    });
}