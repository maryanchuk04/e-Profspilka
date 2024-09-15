using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace YeProfspilka.Db.Migrations
{
    public partial class DiscountUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CodeWord",
                table: "Discounts");

            migrationBuilder.AddColumn<Guid>(
                name: "BarCodeImageId",
                table: "Discounts",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "WithBarCode",
                table: "Discounts",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "WithQrCode",
                table: "Discounts",
                type: "bit",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Discounts_BarCodeImageId",
                table: "Discounts",
                column: "BarCodeImageId");

            migrationBuilder.AddForeignKey(
                name: "FK_Discounts_Images_BarCodeImageId",
                table: "Discounts",
                column: "BarCodeImageId",
                principalTable: "Images",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Discounts_Images_BarCodeImageId",
                table: "Discounts");

            migrationBuilder.DropIndex(
                name: "IX_Discounts_BarCodeImageId",
                table: "Discounts");

            migrationBuilder.DropColumn(
                name: "BarCodeImageId",
                table: "Discounts");

            migrationBuilder.DropColumn(
                name: "WithBarCode",
                table: "Discounts");

            migrationBuilder.DropColumn(
                name: "WithQrCode",
                table: "Discounts");

            migrationBuilder.AddColumn<string>(
                name: "CodeWord",
                table: "Discounts",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
