export interface IItem {
    id: number,
    name: string,
    due: string,
    status: "active" | "completed" | "warning"
}