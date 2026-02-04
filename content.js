// Keep lists outside to avoid re-initializing
const TLD_LIST = new Set(["com", "net", "org", "edu", "gov", "mil", "int", "biz", "info", "name", "pro", "co", "io", "ai", "me", "tv", "app", "dev", "tech", "online", "site", "store", "blog", "shop", "club", "news", "work", "link", "live", "world", "global", "ac", "ad", "ae", "af", "ag", "al", "am", "ao", "ar", "as", "at", "au", "aw", "ax", "az", "ba", "bb", "bd", "be", "bf", "bg", "bh", "bi", "bj", "bm", "bn", "bo", "br", "bs", "bt", "bw", "by", "bz", "ca", "cc", "cd", "cf", "cg", "ch", "ci", "ck", "cl", "cm", "cn", "cr", "cu", "cv", "cw", "cx", "cy", "cz", "de", "dj", "dk", "dm", "do", "dz", "ec", "ee", "eg", "er", "es", "et", "eu", "fi", "fj", "fk", "fm", "fo", "fr", "ga", "gb", "gd", "ge", "gf", "gg", "gh", "gi", "gl", "gm", "gn", "gp", "gq", "gr", "gs", "gt", "gu", "gw", "gy", "hk", "hm", "hn", "hr", "ht", "hu", "id", "ie", "il", "im", "in", "iq", "ir", "is", "it", "je", "jm", "jo", "jp", "ke", "kg", "kh", "ki", "km", "kn", "kp", "kr", "kw", "ky", "kz", "la", "lb", "lc", "li", "lk", "lr", "ls", "lt", "lu", "lv", "ly", "ma", "mc", "md", "me", "mg", "mh", "mk", "ml", "mm", "mn", "mo", "mp", "mq", "mr", "ms", "mt", "mu", "mv", "mw", "mx", "my", "mz", "na", "nc", "ne", "nf", "ng", "ni", "nl", "no", "np", "nr", "nu", "nz", "om", "pa", "pe", "pf", "pg", "ph", "pk", "pl", "pm", "pn", "pr", "ps", "pt", "pw", "py", "qa", "re", "ro", "rs", "ru", "rw", "sa", "sb", "sc", "sd", "se", "sg", "sh", "si", "sj", "sk", "sl", "sm", "sn", "so", "sr", "ss", "st", "sv", "sx", "sy", "sz", "tc", "td", "tf", "tg", "th", "tj", "tk", "tl", "tm", "tn", "to", "tr", "tt", "tv", "tw", "tz", "ua", "ug", "uk", "us", "uy", "uz", "va", "vc", "ve", "vg", "vi", "vn", "vu", "wf", "ws", "ye", "yt", "za", "zm", "zw", "xyz"]);
const SUSPICIOUS_TLD_LIST = new Set(["zip", "exe", "scr", "pif", "bat", "cmd", "cpl", "js", "jse", "wsf", "vbs", "vbe", "ps1", "psm1", "gadget", "adult", "anquan", "app", "army", "auction", "best", "bid", "bingo", "blackfriday", "blockbuster", "buzz", "cf", "cfd", "click", "country", "coupon", "coupons", "cyou", "date", "dating", "deal", "deals", "diet", "discount", "download", "fail", "faith", "free", "ga", "gq", "gripe", "help", "icu", "info", "loan", "loans", "ml", "monster", "mov", "motorcycles", "now", "nowruz", "online", "party", "pay", "phishing", "porn", "promo", "qpon", "rest", "review", "reviews", "rich", "rocks", "sex", "sexy", "shop", "shopping", "site", "stream", "su", "sucks", "surf", "tk", "top", "win", "winner", "winners", "work", "wtf", "xxx", "xyz", "zip"]);

let popupEl = null;
let currentLink = null;

function getTokenizerFeatures(link) {
    if (!link || link.includes(" ")) return null;
    try {
        const urlObj = new URL(link);
        const hostname = urlObj.hostname;
        const pathname = urlObj.pathname;
        const parts = hostname.split(".");
        const tld = parts[parts.length - 1].toLowerCase();

        const shannonEntropy = (s) => {
            const freq = {};
            for (let char of s) freq[char] = (freq[char] || 0) + 1;
            return -Object.values(freq).reduce((sum, f) => {
                const p = f / s.length;
                return sum + (p * Math.log2(p));
            }, 0);
        };

        return {
            is_ip: /^(\d{1,3}\.){3}\d{1,3}$/.test(hostname),
            suspicious_ext: SUSPICIOUS_TLD_LIST.has(tld),
            entropy: shannonEntropy(link),
            tld_popular: TLD_LIST.has(tld),
            subdomains: parts.length > 2 ? parts.length - 2 : 0,
            path_len: pathname.length > 1 ? pathname.length - 1 : 0
        };
    } catch (e) { return null; }
}

function init() {
    if (document.getElementById('cyber-scanner-host')) return;

    const host = document.createElement('div');
    host.id = 'cyber-scanner-host';
    // Ensure the host itself doesn't block interactions or take up space
    host.style.cssText = "position: absolute; top: 0; left: 0; width: 0; height: 0; pointer-events: none;";
    document.body.appendChild(host);

    const shadow = host.attachShadow({ mode: 'open' });
    
    const style = document.createElement('style');
    style.textContent = `
        .cyber-popup-container {
            position: fixed;
            z-index: 2147483647;
            pointer-events: none; 
            display: none;
            opacity: 0;
            transition: opacity 0.15s ease;
            background: #0a0a0a;
            color: #fff;
            border: 1px solid #333;
            padding: 15px;
            font-family: 'Segoe UI', Tahoma, sans-serif;
            width: 300px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.8);
            will-change: transform, opacity;
        }
        .theme-danger { border-left: 5px solid #ff0055; }
        .theme-warning { border-left: 5px solid #ffcc00; }
        .theme-safe { border-left: 5px solid #00ff99; }
        .url-box { font-size: 10px; word-break: break-all; color: #888; margin: 10px 0; }
        .text-accent { font-weight: bold; }
    `;
    shadow.appendChild(style);

    popupEl = document.createElement('div');
    popupEl.className = 'cyber-popup-container';
    shadow.appendChild(popupEl);
}

document.addEventListener('mousemove', (e) => {
    const link = e.target.closest('a');
    
    if (!link || !link.href) {
        if (popupEl) {
            popupEl.style.opacity = '0';
            setTimeout(() => { 
                if (popupEl.style.opacity === '0') popupEl.style.display = 'none'; 
            }, 150);
        }
        currentLink = null;
        return;
    }

    init();

    if (currentLink !== link.href) {
        currentLink = link.href;
        const features = getTokenizerFeatures(link.href);
        if (!features) return;

        let score = 0;
        if (features.is_ip) score += 40;
        if (features.suspicious_ext) score += 30;
        if (features.entropy > 4.2) score += 15;
        if (!features.tld_popular) score += 20;

        const type = score > 50 ? "danger" : score > 20 ? "warning" : "safe";
        popupEl.className = `cyber-popup-container theme-${type}`;
        popupEl.innerHTML = `
            <div class="header">THREAT ANALYSIS: <span class="text-accent">${type.toUpperCase()}</span></div>
            <div class="url-box">${link.href}</div>
            <div>Score: ${Math.min(score, 100)}%</div>
            <div style="font-size: 10px; margin-top:5px;">Subdomains: ${features.subdomains} | Path: ${features.path_len}</div>
        `;
    }

    let top = e.clientY + 20;
    let left = e.clientX + 20;

    if (left + 320 > window.innerWidth) left = e.clientX - 320;
    if (top + 180 > window.innerHeight) top = e.clientY - 190;

    popupEl.style.top = `${top}px`;
    popupEl.style.left = `${left}px`;
    popupEl.style.display = 'block';
    
    requestAnimationFrame(() => {
        popupEl.style.opacity = '1';
    });
});