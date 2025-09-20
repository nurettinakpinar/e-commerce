using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class AddCategoriesAndSeoEntities : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 9, 20, 22, 9, 46, 515, DateTimeKind.Utc).AddTicks(4511));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2025, 9, 20, 22, 9, 46, 515, DateTimeKind.Utc).AddTicks(5969));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreatedAt",
                value: new DateTime(2025, 9, 20, 22, 9, 46, 515, DateTimeKind.Utc).AddTicks(5975));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 4,
                column: "CreatedAt",
                value: new DateTime(2025, 9, 20, 22, 9, 46, 515, DateTimeKind.Utc).AddTicks(5976));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 5,
                column: "CreatedAt",
                value: new DateTime(2025, 9, 20, 22, 9, 46, 515, DateTimeKind.Utc).AddTicks(5977));

            migrationBuilder.UpdateData(
                table: "SeoSettings",
                keyColumn: "Id",
                keyValue: 1,
                column: "UpdatedAt",
                value: new DateTime(2025, 9, 20, 22, 9, 46, 515, DateTimeKind.Utc).AddTicks(8283));

            migrationBuilder.UpdateData(
                table: "SeoSettings",
                keyColumn: "Id",
                keyValue: 2,
                column: "UpdatedAt",
                value: new DateTime(2025, 9, 20, 22, 9, 46, 516, DateTimeKind.Utc).AddTicks(662));

            migrationBuilder.UpdateData(
                table: "SeoSettings",
                keyColumn: "Id",
                keyValue: 3,
                column: "UpdatedAt",
                value: new DateTime(2025, 9, 20, 22, 9, 46, 516, DateTimeKind.Utc).AddTicks(666));

            migrationBuilder.UpdateData(
                table: "SeoSettings",
                keyColumn: "Id",
                keyValue: 4,
                column: "UpdatedAt",
                value: new DateTime(2025, 9, 20, 22, 9, 46, 516, DateTimeKind.Utc).AddTicks(667));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedAt",
                value: new DateTime(2025, 9, 20, 22, 8, 37, 792, DateTimeKind.Utc).AddTicks(8217));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedAt",
                value: new DateTime(2025, 9, 20, 22, 8, 37, 792, DateTimeKind.Utc).AddTicks(9431));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreatedAt",
                value: new DateTime(2025, 9, 20, 22, 8, 37, 792, DateTimeKind.Utc).AddTicks(9434));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 4,
                column: "CreatedAt",
                value: new DateTime(2025, 9, 20, 22, 8, 37, 792, DateTimeKind.Utc).AddTicks(9436));

            migrationBuilder.UpdateData(
                table: "Categories",
                keyColumn: "Id",
                keyValue: 5,
                column: "CreatedAt",
                value: new DateTime(2025, 9, 20, 22, 8, 37, 792, DateTimeKind.Utc).AddTicks(9437));

            migrationBuilder.UpdateData(
                table: "SeoSettings",
                keyColumn: "Id",
                keyValue: 1,
                column: "UpdatedAt",
                value: new DateTime(2025, 9, 20, 22, 8, 37, 793, DateTimeKind.Utc).AddTicks(537));

            migrationBuilder.UpdateData(
                table: "SeoSettings",
                keyColumn: "Id",
                keyValue: 2,
                column: "UpdatedAt",
                value: new DateTime(2025, 9, 20, 22, 8, 37, 793, DateTimeKind.Utc).AddTicks(1715));

            migrationBuilder.UpdateData(
                table: "SeoSettings",
                keyColumn: "Id",
                keyValue: 3,
                column: "UpdatedAt",
                value: new DateTime(2025, 9, 20, 22, 8, 37, 793, DateTimeKind.Utc).AddTicks(1717));

            migrationBuilder.UpdateData(
                table: "SeoSettings",
                keyColumn: "Id",
                keyValue: 4,
                column: "UpdatedAt",
                value: new DateTime(2025, 9, 20, 22, 8, 37, 793, DateTimeKind.Utc).AddTicks(1719));
        }
    }
}
