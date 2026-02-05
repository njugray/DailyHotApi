import app from "../dist/app.js";
export default async (req, res) => {
    try {
        const protocol = req.headers["x-forwarded-proto"] || "http";
        const host = req.headers["x-forwarded-host"] || req.headers.host || "localhost";
        const url = `${protocol}://${host}${req.url}`;
        let body = undefined;
        if (req.method !== "GET" && req.method !== "HEAD") {
            body = typeof req.body === "string" ? req.body : JSON.stringify(req.body);
        }
        // 转换 headers，处理数组值
        const headers = {};
        for (const [key, value] of Object.entries(req.headers)) {
            if (Array.isArray(value)) {
                headers[key] = value.join(", ");
            }
            else if (typeof value === "string") {
                headers[key] = value;
            }
        }
        headers["host"] = host;
        const response = await app.fetch(new Request(url, {
            method: req.method,
            headers: headers,
            body: body,
        }));
        res.status(response.status);
        response.headers.forEach((value, key) => {
            res.setHeader(key, value);
        });
        const responseBody = await response.text();
        res.end(responseBody);
    }
    catch (error) {
        console.error("Error in handler:", error);
        res.status(500).json({
            error: "Internal Server Error",
            message: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
