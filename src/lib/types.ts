interface Link {
    id: string,
    url: string,
    clicks?: number,
    country_clicks: Array<CountryClicks>
}

interface CountryClicks {
    country: string,
    clicks: number
}

export type {Link, CountryClicks}