export type Opportunity = {
    name: string,
    date: string | Date,
    products: number,
    total: number,
    manager: string,
    price: number
};

export type Opportunities = Opportunity[];
