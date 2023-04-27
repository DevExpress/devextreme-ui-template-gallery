export type Opportunity = {
    name: string,
    date: string | Date,
    manager: string,
    price: number,
    products: number,
    total: number
};

export type Opportunities = Opportunity[];
