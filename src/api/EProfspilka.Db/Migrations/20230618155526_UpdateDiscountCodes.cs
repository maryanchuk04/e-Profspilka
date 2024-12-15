using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EProfspilka.Db.Migrations
{
    public partial class UpdateDiscountCodes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "CodeWord",
                table: "Discounts",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<DateTime>(
                name: "ActivateTimeUtc",
                table: "DiscountCodes",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "DeactivateTimeUtc",
                table: "DiscountCodes",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<Guid>(
                name: "UserId",
                table: "DiscountCodes",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_DiscountCodes_UserId",
                table: "DiscountCodes",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_DiscountCodes_Users_UserId",
                table: "DiscountCodes",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DiscountCodes_Users_UserId",
                table: "DiscountCodes");

            migrationBuilder.DropIndex(
                name: "IX_DiscountCodes_UserId",
                table: "DiscountCodes");

            migrationBuilder.DropColumn(
                name: "ActivateTimeUtc",
                table: "DiscountCodes");

            migrationBuilder.DropColumn(
                name: "DeactivateTimeUtc",
                table: "DiscountCodes");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "DiscountCodes");

            migrationBuilder.AlterColumn<string>(
                name: "CodeWord",
                table: "Discounts",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);
        }
    }
}
