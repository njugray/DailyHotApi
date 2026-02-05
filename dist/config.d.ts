export type Config = {
    PORT: number;
    DISALLOW_ROBOT: boolean;
    CACHE_TTL: number;
    REQUEST_TIMEOUT: number;
    ALLOWED_DOMAIN: string;
    ALLOWED_HOST: string;
    USE_LOG_FILE: boolean;
    RSS_MODE: boolean;
    REDIS_HOST: string;
    REDIS_PORT: number;
    REDIS_PASSWORD: string;
    REDIS_DB: number;
    ZHIHU_COOKIE: string;
    FILTER_WEIBO_ADVERTISEMENT: boolean;
};
export declare const config: Config;
//# sourceMappingURL=config.d.ts.map