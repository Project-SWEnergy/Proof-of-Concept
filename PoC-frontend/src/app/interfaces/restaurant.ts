export interface Restaurant {
    id: number,
    name: string,
    address: string,
    city: string,
    photo: JSON,
    telephone: string,
    website: string,
    cost: number,
    kids: boolean,
    disabled: boolean,
    tags: string[],
    description: string,
    opening_hours: OpeningHours[]
}

interface OpeningHours{
    day: string,
    begin: Date,
    end: Date
}
