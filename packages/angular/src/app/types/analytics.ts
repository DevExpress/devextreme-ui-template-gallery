export type Sale = {
    date: string | Date,
    category: string,
    total: number
};

export type Sales = Sale[];

export type SaleOrOpportunityByCategory = {
    name: string,
    value: number,
};

export type SalesOrOpportunitiesByCategory = SaleOrOpportunityByCategory[];

export type SaleByState = {
    stateName: string,
    stateCoords: string,
    total: number,
    percentage: number,
};

export type SalesByState = SaleByState[];

export type SaleByStateAndCity = {
    stateName: string,
    stateCoords: string,
    city: string,
    total: number,
    percentage: number,
};

export type SalesByStateAndCity = SaleByStateAndCity[];
