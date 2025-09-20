import { useEffect, useState } from "react";
import requests from "../api/requests";

interface SEOHeadProps {
    pageKey: string;
    title?: string;
    description?: string;
    keywords?: string;
    ogImage?: string;
}

interface SeoData {
    title?: string;
    description?: string;
    keywords?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
}

export default function SEOHead({ pageKey, title, description, keywords, ogImage }: SEOHeadProps) {
    const [seoData, setSeoData] = useState<SeoData>({});

    useEffect(() => {
        async function loadSeoData() {
            try {
                const data = await requests.Seo.get(pageKey);
                setSeoData(data);
            } catch (error) {
                console.error("SEO verileri yüklenemedi:", error);
                // Fallback values
                setSeoData({
                    title: title || "GUL&RA Kuyumcu",
                    description: description || "Premium mücevher ve kuyumculuk hizmetleri",
                    keywords: keywords || "kuyumcu, mücevher, altın, gümüş"
                });
            }
        }

        loadSeoData();
    }, [pageKey, title, description, keywords]);

    useEffect(() => {
        // Update document title
        if (seoData.title || title) {
            document.title = seoData.title || title || "GUL&RA Kuyumcu";
        }

        // Update meta tags
        updateMetaTag("description", seoData.description || description || "Premium mücevher ve kuyumculuk hizmetleri");
        updateMetaTag("keywords", seoData.keywords || keywords || "kuyumcu, mücevher, altın, gümüş");
        
        // Update Open Graph tags
        updateMetaTag("og:title", seoData.ogTitle || seoData.title || title || "GUL&RA Kuyumcu", "property");
        updateMetaTag("og:description", seoData.ogDescription || seoData.description || description || "Premium mücevher ve kuyumculuk hizmetleri", "property");
        updateMetaTag("og:image", seoData.ogImage || ogImage || "/images/logo.png", "property");
        updateMetaTag("og:type", "website", "property");
        updateMetaTag("og:url", window.location.href, "property");

        // Update Twitter Card tags
        updateMetaTag("twitter:card", "summary_large_image");
        updateMetaTag("twitter:title", seoData.ogTitle || seoData.title || title || "GUL&RA Kuyumcu");
        updateMetaTag("twitter:description", seoData.ogDescription || seoData.description || description || "Premium mücevher ve kuyumculuk hizmetleri");
        updateMetaTag("twitter:image", seoData.ogImage || ogImage || "/images/logo.png");

    }, [seoData, title, description, keywords, ogImage]);

    function updateMetaTag(name: string, content: string, attribute: string = "name") {
        let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
        
        if (!element) {
            element = document.createElement("meta");
            element.setAttribute(attribute, name);
            document.head.appendChild(element);
        }
        
        element.content = content;
    }

    // This component doesn't render anything visible
    return null;
}
