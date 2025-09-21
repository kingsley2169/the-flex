export type CountryDataType = {
    id: number;
    name: string;
    iso3: string;
    iso2: string;
    numeric_code: string;
    phonecode: string;
    capital: string;
    currency: string;
    currency_name: string;
    currency_symbol: string;
    tld: string;
    native: string;
    language: string;
    region: string;
    region_id: number;
    subregion: string;
    subregion_id: number;
    nationality: string;
    timezones: {
        zoneName: string;
        gmtOffset: number;
        gmtOffsetName: string;
        abbreviation: string;
        tzName: string;
    }[];
    translations: { [key: string]: string };
    latitude: string;
    longitude: string;
    emoji: string;
    emojiU: string;
}

export const CountryData: CountryDataType[] = [
    {
        "id": 4,
        "name": "Algeria",
        "iso3": "DZA",
        "iso2": "DZ",
        "numeric_code": "012",
        "phonecode": "213",
        "capital": "Algiers",
        "currency": "DZD",
        "currency_name": "Algerian dinar",
        "currency_symbol": "دج",
        "tld": ".dz",
        "native": "الجزائر",
        "language": "العربية",
        "region": "Africa",
        "region_id": 1,
        "subregion": "Northern Africa",
        "subregion_id": 1,
        "nationality": "Algerian",
        "timezones": [
            {
                "zoneName": "Africa\/Algiers",
                "gmtOffset": 3600,
                "gmtOffsetName": "UTC+01:00",
                "abbreviation": "CET",
                "tzName": "Central European Time"
            }
        ],
        "translations": {
            "ko": "알제리",
            "pt-BR": "Argélia",
            "pt": "Argélia",
            "nl": "Algerije",
            "hr": "Alžir",
            "fa": "الجزایر",
            "de": "Algerien",
            "es": "Argelia",
            "fr": "Algérie",
            "ja": "アルジェリア",
            "it": "Algeria",
            "zh-CN": "阿尔及利亚",
            "tr": "Cezayir",
            "ru": "Алжир",
            "uk": "Алжир",
            "pl": "Algieria"
        },
        "latitude": "28.00000000",
        "longitude": "3.00000000",
        "emoji": "🇩🇿",
        "emojiU": "U+1F1E9 U+1F1FF"
    },
    {
        "id": 45,
        "name": "China",
        "iso3": "CHN",
        "iso2": "CN",
        "numeric_code": "156",
        "phonecode": "86",
        "capital": "Beijing",
        "currency": "CNY",
        "currency_name": "Chinese yuan",
        "currency_symbol": "¥",
        "tld": ".cn",
        "native": "中国",
        "language": "中文",
        "region": "Asia",
        "region_id": 3,
        "subregion": "Eastern Asia",
        "subregion_id": 12,
        "nationality": "Chinese",
        "timezones": [
            {
                "zoneName": "Asia\/Shanghai",
                "gmtOffset": 28800,
                "gmtOffsetName": "UTC+08:00",
                "abbreviation": "CST",
                "tzName": "China Standard Time"
            },
            {
                "zoneName": "Asia\/Urumqi",
                "gmtOffset": 21600,
                "gmtOffsetName": "UTC+06:00",
                "abbreviation": "XJT",
                "tzName": "China Standard Time"
            }
        ],
        "translations": {
            "ko": "중국",
            "pt-BR": "China",
            "pt": "China",
            "nl": "China",
            "hr": "Kina",
            "fa": "چین",
            "de": "China",
            "es": "China",
            "fr": "Chine",
            "ja": "中国",
            "it": "Cina",
            "zh-CN": "中国",
            "tr": "Çin",
            "ru": "Китай",
            "uk": "Китай",
            "pl": "Chiny"
        },
        "latitude": "35.00000000",
        "longitude": "105.00000000",
        "emoji": "🇨🇳",
        "emojiU": "U+1F1E8 U+1F1F3"
    },
    {
        "id": 75,
        "name": "France",
        "iso3": "FRA",
        "iso2": "FR",
        "numeric_code": "250",
        "phonecode": "33",
        "capital": "Paris",
        "currency": "EUR",
        "currency_name": "Euro",
        "currency_symbol": "€",
        "tld": ".fr",
        "native": "France",
        "language": "Français",
        "region": "Europe",
        "region_id": 4,
        "subregion": "Western Europe",
        "subregion_id": 17,
        "nationality": "French",
        "timezones": [
            {
                "zoneName": "Europe\/Paris",
                "gmtOffset": 3600,
                "gmtOffsetName": "UTC+01:00",
                "abbreviation": "CET",
                "tzName": "Central European Time"
            }
        ],
        "translations": {
            "ko": "프랑스",
            "pt-BR": "França",
            "pt": "França",
            "nl": "Frankrijk",
            "hr": "Francuska",
            "fa": "فرانسه",
            "de": "Frankreich",
            "es": "Francia",
            "fr": "France",
            "ja": "フランス",
            "it": "Francia",
            "zh-CN": "法国",
            "tr": "Fransa",
            "ru": "Франция",
            "uk": "Франція",
            "pl": "Francja"
        },
        "latitude": "46.00000000",
        "longitude": "2.00000000",
        "emoji": "🇫🇷",
        "emojiU": "U+1F1EB U+1F1F7"
    },
    {
        "id": 207,
        "name": "Spain",
        "iso3": "ESP",
        "iso2": "ES",
        "numeric_code": "724",
        "phonecode": "34",
        "capital": "Madrid",
        "currency": "EUR",
        "currency_name": "Euro",
        "currency_symbol": "€",
        "tld": ".es",
        "native": "España",
        "language": "Español",
        "region": "Europe",
        "region_id": 4,
        "subregion": "Southern Europe",
        "subregion_id": 16,
        "nationality": "Spanish",
        "timezones": [
            {
                "zoneName": "Africa\/Ceuta",
                "gmtOffset": 3600,
                "gmtOffsetName": "UTC+01:00",
                "abbreviation": "CET",
                "tzName": "Central European Time"
            },
            {
                "zoneName": "Atlantic\/Canary",
                "gmtOffset": 0,
                "gmtOffsetName": "UTC±00",
                "abbreviation": "WET",
                "tzName": "Western European Time"
            },
            {
                "zoneName": "Europe\/Madrid",
                "gmtOffset": 3600,
                "gmtOffsetName": "UTC+01:00",
                "abbreviation": "CET",
                "tzName": "Central European Time"
            }
        ],
        "translations": {
            "ko": "스페인",
            "pt-BR": "Espanha",
            "pt": "Espanha",
            "nl": "Spanje",
            "hr": "Španjolska",
            "fa": "اسپانیا",
            "de": "Spanien",
            "es": "España",
            "fr": "Espagne",
            "ja": "スペイン",
            "it": "Spagna",
            "zh-CN": "西班牙",
            "tr": "İspanya",
            "ru": "Испания",
            "uk": "Іспанія",
            "pl": "Hiszpania"
        },
        "latitude": "40.00000000",
        "longitude": "-4.00000000",
        "emoji": "🇪🇸",
        "emojiU": "U+1F1EA U+1F1F8"
    },
    {
        "id": 232,
        "name": "United Kingdom",
        "iso3": "GBR",
        "iso2": "GB",
        "numeric_code": "826",
        "phonecode": "44",
        "capital": "London",
        "currency": "GBP",
        "currency_name": "British pound",
        "currency_symbol": "£",
        "tld": ".uk",
        "native": "United Kingdom",
        "language": "English",
        "region": "Europe",
        "region_id": 4,
        "subregion": "Northern Europe",
        "subregion_id": 18,
        "nationality": "British, UK",
        "timezones": [
            {
                "zoneName": "Europe\/London",
                "gmtOffset": 0,
                "gmtOffsetName": "UTC±00",
                "abbreviation": "GMT",
                "tzName": "Greenwich Mean Time"
            }
        ],
        "translations": {
            "ko": "영국",
            "pt-BR": "Reino Unido",
            "pt": "Reino Unido",
            "nl": "Verenigd Koninkrijk",
            "hr": "Ujedinjeno Kraljevstvo",
            "fa": "بریتانیای کبیر و ایرلند شمالی",
            "de": "Vereinigtes Königreich",
            "es": "Reino Unido",
            "fr": "Royaume-Uni",
            "ja": "イギリス",
            "it": "Regno Unito",
            "zh-CN": "英国",
            "tr": "Birleşik Krallik",
            "ru": "Великобритания",
            "uk": "Сполучене Королівство",
            "pl": "Wielka Brytania"
        },
        "latitude": "54.00000000",
        "longitude": "-2.00000000",
        "emoji": "🇬🇧",
        "emojiU": "U+1F1EC U+1F1E7"
    },
]