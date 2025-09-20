using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class AddReviewsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 9, 20, 22, 28, 56, 67, DateTimeKind.Utc).AddTicks(7759));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2025, 9, 20, 22, 28, 56, 67, DateTimeKind.Utc).AddTicks(9311));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreatedAt",
                value: new DateTime(2025, 9, 20, 22, 28, 56, 67, DateTimeKind.Utc).AddTicks(9315));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 4,
                column: "CreatedAt",
                value: new DateTime(2025, 9, 20, 22, 28, 56, 67, DateTimeKind.Utc).AddTicks(9318));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 5,
                column: "CreatedAt",
                value: new DateTime(2025, 9, 20, 22, 28, 56, 67, DateTimeKind.Utc).AddTicks(9319));

            migrationBuilder.UpdateData(
                table: "SeoSettings",
                keyColumn: "Id",
                keyValue: 1,
                column: "UpdatedAt",
                value: new DateTime(2025, 9, 20, 22, 28, 56, 68, DateTimeKind.Utc).AddTicks(953));

            migrationBuilder.UpdateData(
                table: "SeoSettings",
                keyColumn: "Id",
                keyValue: 2,
                column: "UpdatedAt",
                value: new DateTime(2025, 9, 20, 22, 28, 56, 68, DateTimeKind.Utc).AddTicks(2468));

            migrationBuilder.UpdateData(
                table: "SeoSettings",
                keyColumn: "Id",
                keyValue: 3,
                column: "UpdatedAt",
                value: new DateTime(2025, 9, 20, 22, 28, 56, 68, DateTimeKind.Utc).AddTicks(2471));

            migrationBuilder.UpdateData(
                table: "SeoSettings",
                keyColumn: "Id",
                keyValue: 4,
                column: "UpdatedAt",
                value: new DateTime(2025, 9, 20, 22, 28, 56, 68, DateTimeKind.Utc).AddTicks(2473));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 9, 20, 22, 27, 53, 42, DateTimeKind.Utc).AddTicks(9880));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2025, 9, 20, 22, 27, 53, 43, DateTimeKind.Utc).AddTicks(2242));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreatedAt",
                value: new DateTime(2025, 9, 20, 22, 27, 53, 43, DateTimeKind.Utc).AddTicks(2248));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 4,
                column: "CreatedAt",
                value: new DateTime(2025, 9, 20, 22, 27, 53, 43, DateTimeKind.Utc).AddTicks(2250));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 5,
                column: "CreatedAt",
                value: new DateTime(2025, 9, 20, 22, 27, 53, 43, DateTimeKind.Utc).AddTicks(2253));

            migrationBuilder.UpdateData(
                table: "SeoSettings",
                keyColumn: "Id",
                keyValue: 1,
                column: "UpdatedAt",
                value: new DateTime(2025, 9, 20, 22, 27, 53, 43, DateTimeKind.Utc).AddTicks(4491));

            migrationBuilder.UpdateData(
                table: "SeoSettings",
                keyColumn: "Id",
                keyValue: 2,
                column: "UpdatedAt",
                value: new DateTime(2025, 9, 20, 22, 27, 53, 43, DateTimeKind.Utc).AddTicks(7380));

            migrationBuilder.UpdateData(
                table: "SeoSettings",
                keyColumn: "Id",
                keyValue: 3,
                column: "UpdatedAt",
                value: new DateTime(2025, 9, 20, 22, 27, 53, 43, DateTimeKind.Utc).AddTicks(7385));

            migrationBuilder.UpdateData(
                table: "SeoSettings",
                keyColumn: "Id",
                keyValue: 4,
                column: "UpdatedAt",
                value: new DateTime(2025, 9, 20, 22, 27, 53, 43, DateTimeKind.Utc).AddTicks(7389));
        }
    }
}
