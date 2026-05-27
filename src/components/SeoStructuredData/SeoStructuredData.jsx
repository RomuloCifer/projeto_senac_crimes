import { useEffect } from 'react';

function toAbsoluteUrl(value, baseUrl) {
    if (!value) return undefined;

    try {
        return new URL(value, baseUrl).toString();
    } catch {
        return undefined;
    }
}

function buildStructuredData(cases, baseUrl) {
    const pageUrl = baseUrl.split('#')[0];
    const websiteId = `${pageUrl}#website`;
    const collectionId = `${pageUrl}#case-collection`;

    const itemListElement = cases.map((item, index) => {
        const itemUrl = `${pageUrl}#case-${item.id}`;

        return {
            '@type': 'ListItem',
            position: index + 1,
            url: itemUrl,
            item: {
                '@type': 'Thing',
                '@id': itemUrl,
                name: item.title,
                description: item.description,
                image: toAbsoluteUrl(item.imageUrl, baseUrl),
                url: itemUrl,
                genre: item.category,
            },
        };
    });

    return {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'WebSite',
                '@id': websiteId,
                url: pageUrl,
                name: 'Brasil Obscuro',
                description: 'Mapa interativo de crimes, lendas, assombrações e mistérios do Brasil.',
                inLanguage: 'pt-BR',
            },
            {
                '@type': 'CollectionPage',
                '@id': collectionId,
                url: pageUrl,
                name: 'Brasil Obscuro',
                description: 'Mapa interativo de crimes, lendas, assombrações e mistérios do Brasil.',
                inLanguage: 'pt-BR',
                isPartOf: {
                    '@id': websiteId,
                },
                mainEntity: {
                    '@id': `${pageUrl}#case-list`,
                },
            },
            {
                '@type': 'ItemList',
                '@id': `${pageUrl}#case-list`,
                name: 'Casos do Brasil Obscuro',
                itemListOrder: 'https://schema.org/ItemListOrderAscending',
                numberOfItems: cases.length,
                itemListElement,
            },
        ],
    };
}

export default function SeoStructuredData({ cases }) {
    useEffect(() => {
        const baseUrl = window.location.href;
        const scriptId = 'structured-data-brasil-obscuro';
        const nextData = buildStructuredData(cases, baseUrl);
        const nextJson = JSON.stringify(nextData);

        let script = document.getElementById(scriptId);
        if (!script) {
            script = document.createElement('script');
            script.id = scriptId;
            script.type = 'application/ld+json';
            document.head.appendChild(script);
        }

        script.textContent = nextJson;

        return () => {
            const currentScript = document.getElementById(scriptId);
            if (currentScript) currentScript.remove();
        };
    }, [cases]);

    return null;
}