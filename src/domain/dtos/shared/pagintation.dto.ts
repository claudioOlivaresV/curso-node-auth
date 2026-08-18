export class PaginatorDto {
  private constructor(
    public readonly page: number,
    public readonly limit: number,
  ) {}

  static create(
    page: number = 1,
    limit: number = 10,
  ): [string?, PaginatorDto?] {
    if (isNaN(page) || isNaN(limit)) return ["Page and limit mus be numbers"];
    if (page <= 0) return ["Page must be greater than 0"];
    if (page <= 0) return ["Limit must be greater than 0"];

    return [undefined, new PaginatorDto(page, limit)];
  }
}
