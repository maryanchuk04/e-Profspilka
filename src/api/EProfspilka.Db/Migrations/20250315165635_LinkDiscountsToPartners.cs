using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EProfspilka.Db.Migrations
{
    /// <inheritdoc />
    public partial class LinkDiscountsToPartners : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "SubTextLink",
                table: "Partners",
                newName: "WebSiteUrl");

            migrationBuilder.RenameColumn(
                name: "SubText",
                table: "Partners",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "MainText",
                table: "Partners",
                newName: "Description");

            migrationBuilder.AddColumn<Guid>(
                name: "PartnerId",
                table: "Discounts",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Discounts_PartnerId",
                table: "Discounts",
                column: "PartnerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Discounts_Partners_PartnerId",
                table: "Discounts",
                column: "PartnerId",
                principalTable: "Partners",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Discounts_Partners_PartnerId",
                table: "Discounts");

            migrationBuilder.DropIndex(
                name: "IX_Discounts_PartnerId",
                table: "Discounts");

            migrationBuilder.DropColumn(
                name: "PartnerId",
                table: "Discounts");

            migrationBuilder.RenameColumn(
                name: "WebSiteUrl",
                table: "Partners",
                newName: "SubTextLink");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Partners",
                newName: "SubText");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Partners",
                newName: "MainText");
        }
    }
}
