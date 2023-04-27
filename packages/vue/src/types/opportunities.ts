export interface Opportunity {
    name: string,
    manager: string,
    products: number,
    total: number,
    price: number
}

export type Opportunities = Opportunity[];
