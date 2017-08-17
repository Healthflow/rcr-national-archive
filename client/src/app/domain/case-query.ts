type CaseQueryType = "all" | "my" | "favourite" | "collection"

interface CaseQuery {
    type: CaseQueryType,
    identifier: number,
    first: number,
    rows: number,
    sortField: string,
    sortOrder: number,
    globalFilter: string,
    filters: any,
}

export { 
    CaseQuery, 
    CaseQueryType 
}