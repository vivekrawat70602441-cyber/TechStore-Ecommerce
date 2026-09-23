import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

dns.resolveSrv("_mongodb._tcp.ecommerce0.edrmr6s.mongodb.net", (error, addresses) => {
    if (error) {
        console.error("❌ DNS Error:", error);
        return;
    }

    console.log("✅ DNS Resolved:");
    console.log(addresses);
});