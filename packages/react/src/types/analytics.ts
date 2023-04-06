export interface Sale {
    date: string,
    category?: string,
    total: number
}

export interface SaleOrOpportunityByCategory {
    name: string,
    value: number,
}

export interface SaleByState {
    stateName: string,
    stateCoords: string,
    total: number,
    percentage: number,
}

export interface SaleByStateAndCity {
    stateName: string,
    stateCoords: string,
    city: string,
    total: number,
    percentage: number,
}

export interface TickerProps {
    value: number
}
